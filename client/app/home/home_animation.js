// map for Geo data visual homepage
var width = window.innerWidth;
var height = window.innerHeight - 200;

var svg = d3.select("#map").append("svg")
  .attr("width", width)
  .attr("height", height);

// storing map using US state data, TODO ask team if they want world data.
var states = d3.geo.albersUsa()
  .scale(1250)
  .translate([width/2, height/2]);
// d3.geo.albersUsa for US map
// d3.geo.equirectangular for world map
// https://github.com/mbostock/d3/wiki/Geo-Projections

var g = svg.append("g");

// using states variable to render map
var map = d3.geo.path()
  .projection(states);

// stores generalized location info
var locStoreGen = {};
var dummyLocGen = [];
// stores precise location info
var dummyLoc = [];
// dummy data
var dummyLength = dummy().length;
var cohortCoords = {};

dummy().forEach(function(user){
  if (user.longitude) {
    var coordsGen = floorCoords([user.longitude, user.latitude]).slice();

    locStoreGen[coordsGen] = locStoreGen[coordsGen] || 0;
    if (locStoreGen[coordsGen] === 0) {
      dummyLocGen.push([coordsGen, user.city + ', ' + user.state + ' area']);
    }
    locStoreGen[coordsGen]++;
    
    var coords = [noise(user.longitude), noise(user.latitude)];
    dummyLoc.push(coords);  
    cohortCoords[user.cohort] = cohortCoords[user.cohort] || [];
    cohortCoords[user.cohort].push(coords);
  }
});

d3.json('app/home/us.json', function(err, us){
  // https://gist.github.com/markmarkoh/2969317
  // link for world data if group prefers world over us data
  if(err){
    console.log(err);
  }

  // draw the us map
  g.append('g')
    .attr("id", "states")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.states).features)
    .enter().append("path")
    .attr("d", map)
    .attr('fill', 'rgba(0, 0, 0, 0.95)')
    .attr('stroke', 'rgba(255, 255, 255, 0.35)')
    .attr('stroke-width', 0.5);
    // .on('mouseover', function(){
    //   d3.select(this).style('fill', 'rgba(0, 0, 0, 0.8)');
    // })
    // .on("mouseout", function(d) {
    //   d3.select(this).style('fill', 'rgba(0, 0, 0, 0.95)');
    // });

  // draw the us state border
  g.append('g')
    .attr('id', 'state-borders')
    .append("path")
    .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
    .attr('id', 'state-borders')
    .attr('d', map);

  // path connecting people from the same cohort
  for (var prop in cohortCoords) {
    var color= randomColor(0.6);
    var connectionData = cohortCoords[prop];
    var connection = d3.svg.line()
                           .x(function(d){return states(d)[0];})
                           .y(function(d){return states(d)[1];})
                           .interpolate('linear');
    // connections
    g.append('g')
      .attr('id', prop)
       .append('path')
       .attr('d', connection(connectionData))
       .attr('stroke', color)
       .attr('stroke-width', 0.2)
       .attr('fill', 'none')
       .on('mouseover', function(){
          d3.select(this).transition().duration(50).attr('stroke-width', 3);
       })
       .on('mouseleave', function(){
          d3.select(this).transition().duration(50).attr('stroke-width', 0.2);
       })

    // precise location info per cohort
    g.append('g')
      .attr('id', prop)
      .selectAll('circle')
      .data(connectionData).enter()
      .append('circle')
      .attr('class', 'user')
      .attr('transform', function(d) {
        return 'translate(' + states(d) + ')'; 
      })
      .attr('r', 5)
      .attr('fill', 'rgba(255, 0, 0, 0.5)');
  }  

  // general data location
  var divs = g.append('g')
    .attr('id', 'userGen')
    .selectAll('circle')
    .data(dummyLocGen).enter()
    .append('g')
    .on('mouseover', function(){
      d3.select(this).select('text')
        .transition()
        .duration(200)
        .style('font-size', '35px');
      var circle = d3.select(this).select('circle');
      if (circle.attr('toggled') === 'false') {
        circle.attr('prevColor', function(d) {
          circle.attr('toggled', 'true');
          return circle.attr('fill');
        });
      }
      circle.attr('fill', 'rgba(255, 255, 255, 0.5)');
    })
    .on('mouseleave', function(){
      d3.select(this).select('text')
        .transition()
        .duration(200)
        .style('font-size', '10px');
      var circle = d3.select(this).select('circle');
      circle.attr('toggled', 'false')
        .attr('fill', function(d) {
          return circle.attr('prevColor');
        });
    });

  divs.append('circle')
    .attr('class', 'userGen')
    .attr('transform', function(d) {
      return "translate(" + states(d[0]) + ")";  
    })
    .attr('toggled', 'false')
    .attr('r', function(d) {
      var num = floorCoords(d[0], function(data) {
        return locStoreGen[data];
      });
      // var scale = d3.scale.linear().domain([1, 200]).range([5, 50]);
      // num = scale(num);  
      num = num < 10 ? 10 : num;
      num = num > 50 ? 50 : num * 1.5;
      return num;
    })
    .attr('fill', function(d) {
      var num = floorCoords(d[0], function(data) {
        return locStoreGen[data];
      });
      var r = 120 + num;
      var g = 120 + num * 4;
      var b = 150 + num * 6;
      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + 0.4 + ')';
    })
    .attr('stroke', 'white')
    .attr('stroke-width', 0.35);

  // sort the circles so smaller ones appear before the bigger ones
  divs.sort(function(a, b){
    return locStoreGen[b] - locStoreGen[a];
  });

  divs.append('text')
    .attr('x', function(d) {
      return states(d[0])[0];  
    })
    .attr('y', function(d) {
      return states(d[0])[1];  
    })
    .text(function(d) {
      return d[1];
    });

});


// helper func
function noise(num) {
  var sign = Math.random() > 0.5 ? 1 : -1;
  var amp = Math.random() * 0.4;
  return num + sign * amp;
}

function floorCoords(arr, cb) {
  cb = cb || function(coords) {
    return coords;
  };
  var x = Math.floor(arr[0] * 1.25) / 1.25 + 0.25;
  var y = Math.floor(arr[1] * 1.25) / 1.25 + 0.25;
  return cb([x, y]);
}

function randomColor(alpha) {
  alpha = alpha || 1;
  var r = Math.floor(Math.random() * 150) + 100;
  var g = Math.floor(Math.random() * 150) + 100;
  var b = 200;
  return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
}




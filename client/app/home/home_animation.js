// map for Geo data visual homepage
var width = 1000;
var height = 800;

var svg = d3.select("#map").append("svg")
  .attr("width", width)
  .attr("height", height);

// storing map using US state data, TODO ask team if they want world data.
var states = d3.geo.albersUsa()
  .scale(1000);
  // .translate([width, height]);
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
      dummyLocGen.push(coordsGen);
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

  g.append('g')
    .attr("id", "states")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.states).features)
    .enter().append("path")
    .attr("d", map);

  g.append("path")
    .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
    .attr('id', 'state-borders')
    .attr('d', map)
    .attr('stroke', 'black')
    .attr('stroke-width', 0.1);

  // path connecting people from the same cohort
  for (var prop in cohortCoords) {
    var color = randomColor(0.4);
    var connectionData = cohortCoords[prop];
    var connection = d3.svg.line()
                           .x(function(d){return states(d)[0];})
                           .y(function(d){return states(d)[1];})
                           .interpolate('linear');
    g.append('g')
       .append('path')
       .attr('d', connection(connectionData))
       .attr('stroke', color)
       .attr('stroke-width', 0.2)
       .attr('fill', 'none');
  }  
  
  
  // general data location
  g.append('g')
    .selectAll('circle')
    .data(dummyLocGen).enter()
    .append('circle')
    .attr('class', 'userGen')
    .attr('transform', function(d) {
      return "translate(" + states(d) + ")";  
    })
    .attr('r', function(d) {
      var num = floorCoords(d, function(data) {
        return locStoreGen[data];
      });
      // var scale = d3.scale.linear().domain([1, 200]).range([5, 50]);
      // num = scale(num);
      return num < 10 ? 10 : num;
    })
    .attr('fill', function(d) {
      var num = floorCoords(d, function(data) {
        console.log(locStoreGen[data]);
        return locStoreGen[data];
      });
      var r = 120 + num * 2;
      var g = 120 + num * 4;
      var b = 150 + num * 6;
      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + 0.30 + ')';
    })
    .attr('stroke', 'white')
    .attr('stroke-width', 0.35);

  // precise data location
  g.append('g')
    .selectAll('circle')
    .data(dummyLoc).enter()
    .append('circle')
    .attr('class', 'user')
    .attr('transform', function(d) {
      return 'translate(' + states(d) + ')'; 
    })
    .attr('r', 5)
    .attr('fill', function(d) {
      return 'rgba(255, 0, 0, 0.25)';
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
  var x = Math.floor(arr[0] * 5) / 5;
  var y = Math.floor(arr[1] * 5) / 5;
  return cb([x, y]);
}

function randomColor(alpha) {
  alpha = alpha || 1;
  var r = 200;
  var g = Math.floor(Math.random() * 150) + 100;
  var b = Math.floor(Math.random() * 150) + 100;
  return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
}




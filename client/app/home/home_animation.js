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

var locStoreGen = {};
var dummyLoc = [];
// dummy data
var dummyLength = dummy().length;
dummy().forEach(function(user){
  var x, y;
  var coords = floorCoords([user.longitude, user.latitude], function(coords, lati, longi){
    x = lati;
    y = longi;
    return coords;
  });

  if (locStoreGen[coords] !== undefined) {
    locStoreGen[coords]++;
    dummyLoc.push([x, y]);
  }
  else {
    locStoreGen[coords] = 1;
  }
  // locStoreGen[coords] = locStoreGen[coords] === undefined ? 1 : locStoreGen[coords]++;
});

console.table(locStoreGen);


// svg.append('rect')
//   .attr('width', width)
//   .attr('height', height)
//   .classed('background', true);

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

  g.append('g')
  
  g.append('g')
    .selectAll('circle')
    .data(dummyLoc).enter()
    .append("circle")
    .attr('class', 'user')
    .attr('transform', function(d) {
      return "translate(" + states(d) + ")";  
    })
    .attr('r', function(d){
      var num = floorCoords(d, function(data){
        return locStoreGen[data];
      });
      // var scale = d3.scale.linear().domain([1, 50]).range([5, 20]);
      // num = scale(num);
      return num/(dummyLength/200);
    })
    .attr('fill', function(d){
      var num = floorCoords(d, function(data){
        return locStoreGen[data];
      });
      // var alphaScale = d3.scale.linear()
      //                         .domain([1, 25])
      //                         .range([0.7,1]);
      // var a = 1 - alphaScale(extractCoords(d));
      var r = 50;
      var g = 90 + num * 2;
      var b = 120 + num * 2;
      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + 0.05 + ')';
    });
    // .attr('stroke', 'black')
    // .attr('stroke-width', 2);
// create map using topojson or geojson
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
  return cb(x + ', ' + y, x, y);
}

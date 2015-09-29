// map for Geo data visual homepage
var width = 800;
var height = 600;

var svg = d3.select("#map").append("svg")
  .attr("width", width)
  .attr("height", height);

// storing map using US state data, TODO ask team if they want world data.
var states = d3.geo.albersUsa()
  .scale(1000)
  .translate([width, height]);
// d3.geo.albersUsa for US map
// d3.geo.equirectangular for world map
// https://github.com/mbostock/d3/wiki/Geo-Projections

// using states variable to render map
var map = d3.geo.path()
  .projection(states);

svg.append('rect')
  .attr('width', width)
  .attr('height', height)
  .classed('background', true);

d3.json('us.json', function(err, us){
  // https://gist.github.com/markmarkoh/2969317
  // link for world data if group prefers world over us data
  if(error){
    console.log(error);
  }
// create map using topojson or geojson
});
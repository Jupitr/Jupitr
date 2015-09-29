// map for Geo data visual homepage
var width = 800;
var height = 600;

var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);

// creating map using US state data, ask team if they want world data.

// d3.geo.albersUsa for US map
// d3.geo.equirectangular for world map
// https://github.com/mbostock/d3/wiki/Geo-Projections

d3.json('us.json', function(err, us){

  // https://gist.github.com/markmarkoh/2969317
  // link for world data if group prefers world over us data
  if(error){
    console.log(error);
  }
// create map using topojson or geojson
});
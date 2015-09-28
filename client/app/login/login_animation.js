(function(){

var width = 800,
    height = 600;

var nodeCount = [{}, {}, {}];

// force graph animation as basic introdution to the site
var forceGraph = d3.layout.force()
    .size([width, height])
    .nodes(nodeCount)
    .linkDistance(25)
    .charge(-60)
    .on("tick", tick);

var svg = d3.select(".animation").append("svg")
    .attr("width", width)
    .attr("height", height)
    .on("mousemove", function(){
      target.attr("transform", "translate(" + d3.mouse(this) + ")");
    })
    .on("mousedown", function(){
      var point = d3.mouse(this),
      node = {x: point[0], y: point[1]},
      n = nodes.push(node);

      // links are added to any nodes in the target circle
      nodes.forEach(function(target) {
        var x = target.x - node.x,
        y = target.y - node.y;
        if (Math.sqrt(x * x + y * y) < 30) {
        links.push({source: node, target: target});
        }
      });

      restart();
});

// visual may be better if it were a circle. TODO: revise
svg.append("rect")
    .attr("width", width)
    .attr("height", height);

var nodes = forceGraph.nodes(),
    links = forceGraph.links(),
    node = svg.selectAll(".node"),
    link = svg.selectAll(".link");

// target area/radius should be the same as distance between nodes/links
var target = svg.append("circle")
    .attr("r", 25)
    .attr("transform", "translate(-100,-100)")
    .attr("class", "target");

restart();

function tick() {
  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  node.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
}

function restart() {
  link = link.data(links);

  link.enter().insert("line", ".node")
      .attr("class", "link");

  node = node.data(nodes);

  node.enter().insert("circle", ".cursor")
      .attr("class", "node")
      .attr("r", 5)
      .call(forceGraph.drag);

  forceGraph.start();
}

})();


// Implement node link functionality
  // should nodes display dummy student info and links?
  // colors change if links are made

// fade in log in button after some time linking? Button always shown?
/* RESOURCES FOR LEGACY GROUP
  https://github.com/mbostock/d3/wiki/Force-Layout
  http://stackoverflow.com/questions/28745398/why-do-we-need-force-ontick-in-d3
  https://github.com/mbostock/d3/wiki/Ordinal-Scales
*/



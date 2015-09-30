(function(){

var width = 800;
var height = 600;

// var nodeCount = [{}, {}, {}];

var nodes = [
  {name: 'Kevin', group: 1}, 
  {name: 'Don', group: 2},
  {name: 'Melinda', group: 1}, 
  {name: 'Lain', group: 3}
];

var links = [
  {'source':1,'target':0,'value':1},
  {'source':2,'target':0,'value':8},
  {'source':3,'target':0,'value':10},
  {'source':3,'target':2,'value':6},
];

// force graph animation as basic introdution to the site
var forceGraph = d3.layout.force()
  .size([width, height])
  .distance(100)
  .charge(-100)
  .gravity(0.05);
  // .on('tick', tick);

var svg = d3.select('#animation').append('svg')
  .attr('width', width)
  .attr('height', height);
//   .on('mousemove', function(){
//     target.attr('transform', 'translate(' + d3.mouse(this) + ')');
//   })
//   .on('mousedown', function(){
//     var point = d3.mouse(this),
//     node = {x: point[0], y: point[1]},
//     n = nodes.push(node);

//     // links are added to any nodes in the target circle
//     nodes.forEach(function(target) {
//       var x = target.x - node.x,
//       y = target.y - node.y;
//       if (Math.sqrt(x * x + y * y) < 30) {
//       links.push({source: node, target: target});
//       }
//     });
//     restart();
// });

// var target = svg.append('circle')
//   .attr('r', 25)
//   .attr('transform', 'translate(-100,-100)')
//   .attr('class', 'target');  

// visual may be better if it were a circle. TODO: revise
svg.append('rect')
  .attr('width', width)
  .attr('height', height);

var drawGraph = function(){

  forceGraph
    .nodes(nodes)
    .links(links)
    .start();

  var link = svg.selectAll(".link")
    .data(links)
    .enter().append("line")
    .attr("class", "link");

  var node = svg.selectAll(".node")
    .data(nodes)
    .enter().append("g")
    .attr("class", "node")
    .call(forceGraph.drag);

  node.append("image")
    .attr("xlink:href", "https://github.com/favicon.ico")
    .attr("x", -8)
    .attr("y", -8)
    .attr("width", 25)
    .attr("height", 25);

  node.append("text")
    .attr("dx", 20)
    .attr("dy", ".35em")
    .text(function(d) { return d.name });

  forceGraph.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  });
};

drawGraph();

// var nodes = forceGraph.nodes(),
//   links = forceGraph.links(),
//   node = svg.selectAll('.node'),
//   link = svg.selectAll('.link');

// // target area/radius should be the same as distance between nodes/links
// var target = svg.append('circle')
//   .attr('r', 25)
//   .attr('transform', 'translate(-100,-100)')
//   .attr('class', 'target');

// restart();

// function tick() {
//   link.attr('x1', function(d) { return d.source.x; })
//     .attr('y1', function(d) { return d.source.y; })
//     .attr('x2', function(d) { return d.target.x; })
//     .attr('y2', function(d) { return d.target.y; });

//   node.attr('cx', function(d) { return d.x; })
//     .attr('cy', function(d) { return d.y; });
// }

// function restart() {
//   link = link.data(links);

//   link.enter().insert('line', '.node')
//     .attr('class', 'link');

//   node = node.data(nodes);

//   node.enter().insert('circle', '.cursor')
//     .attr('class', 'node')
//     .attr('r', 5)
//     .call(forceGraph.drag);

//   forceGraph.start();
// }

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



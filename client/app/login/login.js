angular.module('jupitr.login', [])
  .controller('loginController', function($scope){
    $scope.graph = {
      nodes: [
        {name: 'Kevin', group: 1}, 
        {name: 'Don', group: 2},
        {name: 'Melinda', group: 1}, 
        {name: 'Lain', group: 3},
        {name: 'Kevin', group: 1}, 
        {name: 'Don', group: 2},
        {name: 'Melinda', group: 1}, 
        {name: 'Lain', group: 3},
        {name: 'Kevin', group: 1}, 
        {name: 'Don', group: 2},
        {name: 'Melinda', group: 1}, 
        {name: 'Lain', group: 3},
        {name: 'Kevin', group: 1}, 
        {name: 'Don', group: 2},
        {name: 'Melinda', group: 1}, 
        {name: 'Lain', group: 3},
        {name: 'Kevin', group: 1}, 
        {name: 'Don', group: 2},
        {name: 'Melinda', group: 1}, 
        {name: 'Lain', group: 3},
        {name: 'Kevin', group: 1}, 
        {name: 'Don', group: 2},
        {name: 'Melinda', group: 1}, 
        {name: 'Lain', group: 3},
        {name: 'Kevin', group: 1}, 
        {name: 'Don', group: 2},
        {name: 'Melinda', group: 1}, 
        {name: 'Lain', group: 3}
      ],
      links: [
        {'source':1,'target':0,'value':1},
        {'source':2,'target':0,'value':8},
        {'source':3,'target':0,'value':10},
        {'source':3,'target':2,'value':6},
        {"source":1,"target":0,"value":1},
        {"source":2,"target":0,"value":8},
        {"source":3,"target":0,"value":10},
        {"source":3,"target":2,"value":6},
        {"source":4,"target":0,"value":1},
        {"source":5,"target":0,"value":1},
        {"source":6,"target":0,"value":1},
        {"source":7,"target":0,"value":1},
        {"source":8,"target":0,"value":2},
        {"source":9,"target":0,"value":1},
        {"source":11,"target":10,"value":1},
        {"source":11,"target":3,"value":3},
        {"source":11,"target":2,"value":3},
        {"source":11,"target":0,"value":5},
        {"source":12,"target":11,"value":1},
        {"source":13,"target":11,"value":1},
        {"source":14,"target":11,"value":1},
        {"source":15,"target":11,"value":1},
        {"source":17,"target":16,"value":4},
        {"source":18,"target":16,"value":4},
        {"source":18,"target":17,"value":4},
        {"source":19,"target":16,"value":4},
        {"source":19,"target":17,"value":4},
        {"source":19,"target":18,"value":4}
      ]
    }      
  })
  .directive('loginVis', function($window){
    return {
      restrict: 'EA',
      template: '<svg width="800" height="600"></svg>',
      link: function(scope, elem, attrs){
        var d3 = $window.d3;
        var rawSvg = elem.find("svg")[0];
        var svg = d3.select(rawSvg);
        
        var forceGraph = d3.layout.force()
          .size([width, height])
          .distance(100)
          .charge(-100)
          .gravity(0.05);
          // .on('tick', tick);


        svg.append('rect')
          .attr('width', width)
          .attr('height', height);

        var drawGraph = function(){

          forceGraph
            .nodes(scope.graph.nodes)
            .links(scope.graph.links)
            .start();

          var link = svg.selectAll(".link")
            .data(scope.graph.links)
            .enter().append("line")
            .attr("class", "link");

          var node = svg.selectAll(".node")
            .data(scope.graph.nodes)
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
      }
    }
  });
angular.module('jupitr.login', [])
  .controller('loginController', function($scope){
    $scope.graph = {
      nodes: [
        {name: 'Hack Reactor', group: 1},
        {name: 'Zeus', group: 2}, 
        {name: 'Athena', group: 2}, 
        {name: 'Hera', group: 2}, 
        {name: 'Hermes', group: 2}, 
        {name: 'Artemis', group: 2}, 
        {name: 'Apollo', group: 2}, 
        {name: 'Poseidon', group: 2},
        {name: 'Kevin', group: 3}, 
        {name: 'Don', group: 3},
        {name: 'Melinda', group: 3},
        {name: 'Lain', group: 3}, 
        {name: 'Taylor', group: 4},
        {name: 'Joyce', group: 4}, 
        {name: 'Tisha', group: 4},
        {name: 'Rod', group: 4}, 
        {name: 'Doug', group: 5},
        {name: 'Victoria', group: 5}, 
        {name: 'Rex', group: 5},
        {name: 'Verlon', group: 5}, 
        {name: 'Corey', group: 6},
        {name: 'Leo', group: 6}, 
        {name: 'James', group: 6},
        {name: 'Joe', group: 6}, 
        {name: 'Julia', group: 7},
        {name: 'Ben', group: 7}, 
        {name: 'Yeon', group: 7},
        {name: 'Erik', group: 8}, 
        {name: 'Igor', group: 8},
        {name: 'Sanjay', group: 8}, 
        {name: 'David', group: 8},
        {name: 'Max', group: 9}, 
        {name: 'Artem', group: 9},
        {name: 'Michael', group: 9},
        {name: 'Boshika', group: 9}
      ],
      links: [
        {'source':0,'target':0,'value':0},
        {'source':0,'target':1,'value':1},
        {'source':0,'target':2,'value':3},
        {'source':0,'target':3,'value':5},
        {"source":0,"target":4,"value":7},
        {"source":0,"target":5,"value":9},
        {"source":0,"target":6,"value":11},
        {"source":0,"target":7,"value":13},
        {"source":1,"target":8,"value":1},
        {"source":1,"target":9,"value":1},
        {"source":1,"target":10,"value":1},
        {"source":1,"target":11,"value":1},
        {"source":2,"target":12,"value":2},
        {"source":2,"target":13,"value":1},
        {"source":2,"target":14,"value":1},
        {"source":2,"target":15,"value":3},
        {"source":3,"target":16,"value":3},
        {"source":3,"target":17,"value":5},
        {"source":3,"target":18,"value":1},
        {"source":3,"target":19,"value":1},
        {"source":4,"target":20,"value":1},
        {"source":4,"target":21,"value":1},
        {"source":4,"target":22,"value":4},
        {"source":4,"target":23,"value":4},
        {"source":5,"target":24,"value":4},
        {"source":5,"target":25,"value":4},
        {"source":5,"target":26,"value":4},
        {"source":6,"target":27,"value":4},
        {"source":6,"target":28,"value":4},
        {"source":6,"target":29,"value":4},
        {"source":6,"target":30,"value":4},
        {"source":7,"target":31,"value":4},
        {"source":7,"target":32,"value":4},
        {"source":7,"target":33,"value":4},
        {"source":7,"target":34,"value":4}
      ]
    }      
  })
  .directive('loginVis', function(){
    return {
      restrict: 'EA',
      link: function(scope, elem, attrs){

        var color = d3.scale.category20();

        var svg = d3.select(elem[0])
          .append('svg')
          .attr('width', '100%')
          .attr('height', '600');
        
        var forceGraph = d3.layout.force()
          .size([800, 700])
          .distance(100)
          .charge(-400)
          .gravity(0.05);

        var drawGraph = function(){

          forceGraph
            .nodes(scope.graph.nodes)
            .links(scope.graph.links)
            .start();

          var link = svg.selectAll(".link")
            .data(scope.graph.links)
            .enter().append("line")
            .attr("class", "link");

          var studentNodes = scope.graph.nodes.slice(1);
          var hr = scope.graph.nodes.slice(0,1)

          var node = svg.selectAll(".node")
            .data(studentNodes)
            .enter().append("g")
            .attr("class", "node")
            .call(forceGraph.drag);

          node.append("image")
            .attr("xlink:href", "https://github.com/favicon.ico")
            .attr("x", -8)
            .attr("y", -8)
            .attr("width", 25)
            .attr("height", 25);

          var hrNode = svg.selectAll(".hr")
            .data(hr)
            .enter().append("g")
            .attr("class", "hr")
            .call(forceGraph.drag);

          hrNode.append("image")
            .attr("xlink:href", "http://www.hackreactor.com/favicon.ico")
            .attr("x", -8)
            .attr("y", -8)
            .attr("width", 25)
            .attr("height", 25);

          node.append("text")
            .attr("dx", 20)
            .attr("dy", ".35em")
            .text(function(d) { return d.name })
            .style('fill', function(d){return color(d.group);})
            .style('font-family', 'Courier');

          hrNode.append("text")
            .attr("dx", 20)
            .attr("dy", ".35em")
            .style('font-family', 'Courier')
            .text(function(d) { return d.name });

          forceGraph.on("tick", function() {
            link.attr("x1", function(d) { return d.source.x; })
              .attr("y1", function(d) { return d.source.y; })
              .attr("x2", function(d) { return d.target.x; })
              .attr("y2", function(d) { return d.target.y; });

            hrNode.x = 400;
            hrNode.y = 300;  

            node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
            hrNode.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
          });
        };

        drawGraph();
      }
    }
  });
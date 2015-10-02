angular.module('jupitr.cohort', [])
  .controller('cohortController', function($scope){

  })
  .directive('cohortVis', function(){
    return {
      restrict: 'EA',
      link: function(scope, elem, attrs){
        var width = window.innerWidth;
        var height = Math.ceil(width*0.7);
        var oR = 0;
        var nTop = 0;

        var svg = d3.select(elem[0])
          .append('svg')
          .attr('width', '100%')
          .attr('height', height);
          // .on('mouseleave', zoomout)

        d3.json('app/cohort/hrr8.json', function(error, root){
          if(error){
            console.log(error);
          }

          var studentName = svg.selectAll('.studentName')
            .data(root.bubbles)
            .enter()
            .append('g')
            .attr('id', function(d, i){return 'mainName' + i;});

          var students = root.bubbles.length;
          var color = d3.scale.category20();
          var yCord = root.bubbles.length;
          var xCord = width/(1+3*yCord);

          studentName.append('rect')
            .attr({
              'width': '175',
              'height': '175',
              'x': function(d, i){return (width/4) * (i) + 100},
              'y': '200'
            })
            .style('fill', function(d, i){return color(i);})
            .style('opacity', 0.2);
            // on mouseover focus

          studentName.append('text')
            .attr({
              'x': function(d, i){return (width/4) * (i) + 185},
              'y': '290',
              'font-size': 25,
              'text-anchor': 'middle'
            })
            .text(function(d){return d.name;})
            .style('fill', function(d, i){return color(i);});



        });
      }
    };
  });
angular.module('jupitr.cohort', [])
  .controller('cohortController', function($scope){

  })
  .directive('cohortVis', function(){
    return {
      restrict: 'EA',
      link: function(scope, elem, attrs){
        var svg = d3.select(elem[0])
          .append('svg')
          .attr('width', '800')
          .attr('height', '600');
          // .on('mouseleave', zoomout)

        d3.json('app/cohort/hrr8.json', function(error, root){
          if(error){
            console.log(error);
          }
          console.log(root);
          console.log(root.bubbles);
          var studentName = svg.selectAll('.studentName')
            .data(root.bubbles)
            .enter()
            .append('g')
            .attr('id', function(d, i){return 'mainName' + i;});

          var students = root.bubbles.length;
          var color = d3.scale.category20();

          studentName.append('circle')
            .attr({
              'r': '30',
              'cx': '400',
              'cy': '300'
            })
            .style('fill', function(d, i){return color(i);});
        });
      }
    };
  });
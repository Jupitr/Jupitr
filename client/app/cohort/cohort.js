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
      }
    };
  });
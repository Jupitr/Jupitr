angular.module('jupitr.cohort', [])
  .controller('cohortController', function($scope){

  })
  .directive('cohortVis', function(){
    return {
      restrict: 'EA',
      link: function(scope, elem, attrs){
        var width = window.innerWidth;
        var height = window.innerHeight - 300;

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
          var xCord = width/(1+3*students);
          var yCord = Math.ceil(width/students*2);

          studentName.append('circle')
            .attr({
              'class': 'parent',
              'r': '85',
              'cx': function(d, i){return (width/4.5) * (i) + 185;},
              'cy': '345'
            })
            .style('fill', '#254255')
            .style('opacity', 0.2)
            .on('mouseover', function(d, i){return zoom(d, i);});

          studentName.append('text')
            .attr({
              'class': 'parentText',
              'x': function(d, i){return (width/4.5) * (i) + 185;},
              'y': '355',
              'font-size': 25,
              'text-anchor': 'middle'
            })
            .text(function(d){return d.name;})
            .style('fill', 'black')
            .on('mouseover', function(d, i){return zoom(d, i);});

          for(var j = 0; j < students; j++){
            var descriptBubbles = svg.selectAll('.descriptors')
              .data(root.bubbles[j].description)
              .enter()
              .append('g');

              descriptBubbles.append('circle')
                .attr({
                  'class': 'child',
                  'r': '40',
                  'cx': function(d,i) {return (xCord*(3*(j+1)-1) + xCord*1.5*Math.cos((i-1)*45/180*3.1415926) -160);},
                  'cy': function(d,i) {return ((yCord+xCord)/3 + xCord*1.5*Math.sin((i-1)*45/180*3.1415926));},
                  'cursor': 'pointer',
                  'font-size': '6'
                })
                .style({
                  'opacity': '0.2',
                  'fill': function(d, i){return color(i);}
                })
                .text(function(d){return d.name;})
                .on('click', function(d, i){
                  window.open(d.address);
                });

              descriptBubbles.append('text')
                .attr({
                  'class': 'childText',
                  'x': function(d,i) {return (xCord*(3*(j+1)-1) + xCord*1.5*Math.cos((i-1)*45/180*3.1415926)-160);},
                  'y': function(d,i) {return ((yCord+xCord)/3 + xCord*1.5*Math.sin((i-1)*45/180*3.1415926));},
                  'font-size': 10,
                  'cursor': 'pointer',
                  'text-anchor': 'middle'
                })
                .text(function(d){return d.name;});
          }

          function reset(){

          }

          function zoom(d, i){
            var transition = svg.transition()
              .duration(d3.event.altKey ? 7500 : 350);

            transition.selectAll('.parent')
              .attr('cx', function(d, ii){
                if(i === ii){
                  return xCord*(3*(1+ii)-1) - 0.6*xCord*(ii-1);
                }else{
                  if(ii < i){
                    return xCord*0.6*(3*(1+ii)-1);
                  }else{
                    return xCord*(students*3+1) - xCord*0.6*(3*(students-ii)-1);
                  }
                }
              })
              .attr('r', function(d, ii){
                if(i === ii){
                  return xCord * 1.8;
                }else{
                  return xCord * 0.8;
                }
              });

            
          }
        });
      }
    };
  });
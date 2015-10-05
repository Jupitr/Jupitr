angular.module('jupitr.cohort', [])
  .controller('cohortController', function($scope){

  })
  .directive('cohortVis', function(){
    return {
      restrict: 'EA',
      link: function(scope, elem, attrs){
        var width = window.innerWidth*0.90;
        var height = window.innerHeight - 300;

        var svg = d3.select(elem[0])
          .append('svg')
          .attr('width', '100%')
          .attr('height', '800');
          // on mouseleave zoom out

        // manually created json file. May be better suited in DB if additional cohorts added.  
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
          var xCord = width/(1+3*students);
          var yCord = Math.ceil(width/students*2);

          studentName.append('circle')
            .attr({
              'class': 'parent',
              'r': '90',
              'cx': function(d, i) {return xCord*(2.75*(1+i)-1);},
              'cy': (yCord + xCord)/3.3
            })
            .style('fill', '#888')
            .style('opacity', '0.5')
            .on('mouseover', function(d, i){return zoom(d, i);});

          studentName.append('text')
            .attr({
              'class': 'parentText',
              'x': function(d, i) {return xCord*(2.75*(1+i)-1);},
              'y': (yCord + xCord)/3.3,
              'font-size': 20,
              'text-anchor': 'middle'
            })
            .text(function(d){return d.name;})
            .style('fill', 'black')
            .on('mouseover', function(d, i){return zoom(d, i);});

          // append descriptor bubbles for each child of parent bubble
          for(var j = 0; j < students; j++){
            var descriptBubbles = svg.selectAll('.child' + j)
              .data(root.bubbles[j].description)
              .enter()
              .append('g');

              descriptBubbles.append('circle')
                .attr({
                  'class': 'child' + j,
                  'r': '45',
                  'cx': function(d,i) {return (xCord*(2.75*(j+1)-1) + xCord*1.5*Math.cos((i-1)*45/180*3.1415926));},
                  'cy': function(d,i) {return ((yCord+xCord)/3.3 + xCord*1.5*Math.sin((i-1)*45/180*3.1415926));},
                  'cursor': 'pointer',
                  'font-size': '6'
                })
                .style({
                  'opacity': '0.5',
                  'fill': '#888'
                })
                .text(function(d){return d.name;})
                .on('click', function(d, i){
                  window.open(d.address);
                });

              descriptBubbles.append('text')
                .attr({
                  'class': 'childText' + j,
                  'x': function(d,i) {return (xCord*(2.75*(j+1)-1) + xCord*1.5*Math.cos((i-1)*45/180*3.1415926));},
                  'y': function(d,i) {return ((yCord+xCord)/3.3 + xCord*1.5*Math.sin((i-1)*45/180*3.1415926));},
                  'font-size': '10',
                  'font-weight': 'bold',
                  'cursor': 'pointer',
                  'text-anchor': 'middle',
                  'fill': 'blue'
                })
                .text(function(d){return d.name;});
          }

          function zoom(d, i){
            var transition = svg.transition()
              .duration(d3.event.altKey ? 7500 : 350);

            transition.selectAll('.parent')
              .attr('cx', function(d, ii){
                if(i === ii){
                  return xCord*(3*(1+ii)-1) - 0.6*xCord*(ii-1);
                }else if(ii < i){
                  return xCord*0.6*(3*(1+ii)-1);
                }else{
                  return xCord*(students*3+1) - xCord*0.6*(3*(students-ii)-1);
                }
              })
              .attr('r', function(d, ii){
                if(i === ii){
                  return xCord * 1.2;
                }else{
                  return xCord * 0.6;
                }
              });

            transition.selectAll('.parentText')
              .attr('x', function(d ,ii){
                if(i === ii) {
                  return xCord*(3*(1+ii)-1) - 0.6*xCord*(ii-1);
                }else if(ii < i){
                  return xCord*0.6*(3*(1+ii)-1);
                }else{
                  return xCord*(students*3+1) - xCord*0.6*(3*(students-ii)-1);
                }
              })
              .attr("font-size", function(d,ii){
                if(i === ii){
                  return 20*1.2;
                }
                else{
                  return 20*0.6;    
                }          
              });

            var zoomPos = -1;
            for(var k = 0; k < students; k++) {
              zoomPos = 1;
              if(k < students/2){
                zoomPos = 1;
              } 
              transition.selectAll(".childText" + k)
                .attr("x", function(d,i) {return (xCord*(3*(k+1)-1) - 0.6*xCord*(k-1) + zoomPos*xCord*2.5*Math.cos((i-1)*45/180*3.1415926));})
                .attr("y", function(d,i) {return ((yCord+xCord)/3.2 + zoomPos*xCord*2.5*Math.sin((i-1)*45/180*3.1415926));})
                .attr("font-size", function(){
                  return (k==i)?12:6;
                })
                .style("opacity",function(){
                  return (k==i)?1:0;
                });
                     
              transition.selectAll(".child" + k)
                .attr("cx", function(d,i) {return (xCord*(3*(k+1)-1) - 0.6*xCord*(k-1) + zoomPos*xCord*2.5*Math.cos((i-1)*45/180*3.1415926));})
                .attr("cy", function(d,i) {return ((yCord+xCord)/3.2 + zoomPos*xCord*2.5*Math.sin((i-1)*45/180*3.1415926));})
                .attr("r", function(){
                  return (k==i)?(xCord*0.40):(xCord/3.0);               
                })
                .style("opacity", function(){
                  return (k==i)?0.2:0;                  
                }); 
            }
          }
        });
      }
    };
  });
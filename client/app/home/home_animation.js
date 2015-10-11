// map for Geo data visual homepage


var width = window.innerWidth;
var height = window.innerHeight - 100;

var scale0 = 1250;
// var scale0 = 1000;
var svg = d3.select("#map").append('svg')
  .attr('class', 'vis')
  .attr("width", width)
  .attr("height", height);

// storing map using US state data
var states = d3.geo.albersUsa()
  .scale(1200)
  // .scale(1000)
  .translate([width / 2, height / 2 - 25]);
// d3.geo.albersUsa for US map
// d3.geo.equirectangular for world map
// https://github.com/mbostock/d3/wiki/Geo-Projections

var g = svg.append("g");

// using states variable to render map
var map = d3.geo.path()
  .projection(states);

// zoom event
// var zoom = d3.behavior.zoom().scaleExtent([1, 40]).on("zoom", zoomed);
// var zoomToggle = false;
// var zoomToggle = true;
// svg
//   .call(zoom)
//   .call(zoom.event);

// stores generalized location count
// format: {'[x, y]': 24, '[x2, y2]': 2, ...}
var locStoreGen = {};
// stores generalized location coords
// format: [[x, y], [x2, y2], ...]
var userLocGen = [];
// stores precise user location coords by cohort
// format: {HRR8: [{coords: [x, y], name: 'xyz', ... }, {coords: [x, y], name: 'xyz', ... }], ...}
var cohortCoords = {};
var userStore = {};

// get data obj from localStorage
var allUsers = JSON.parse(window.localStorage.getItem('hrr8.jupitr'));
// iterate through data obj and extract out coords info to save into 
// respective arrays and objects
allUsers.forEach(function(user) {
  if (user.longitude) {
    var coordsGen = floorCoords([user.longitude, user.latitude]).slice();

    locStoreGen[coordsGen] = locStoreGen[coordsGen] || 0;
    if (locStoreGen[coordsGen] === 0) {
      userLocGen.push([coordsGen, user.city + ', ' + user.state]);
    }
    locStoreGen[coordsGen]++;

    var profile = getUserProfile(user);
    userStore[profile.cohort + profile.name] = profile;
    cohortCoords[user.cohort] = cohortCoords[user.cohort] || [];
    cohortCoords[user.cohort].push(profile);
  }
});

d3.json('app/home/us.json', function(err, us) {
  if (err) {
    console.log(err);
  }

  // draw the us map
  g.append('g')
    .attr("id", "states")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.states).features)
    .enter().append("path")
    .attr("d", map)
    .attr('fill', 'rgba(0, 0, 0, 0.95)')
    .attr('stroke', 'rgba(255, 255, 255, 0.35)')
    .attr('stroke-width', 0.5);

  // draw the us state border
  g.append('g')
    .attr('id', 'state-borders')
    .append("path")
    .datum(topojson.mesh(us, us.objects.states, function(a, b) {
      return a !== b;
    }))
    .attr('id', 'state-borders')
    .attr('d', map);

  // create group container to hold all connection paths between user nodes
  var connectionGroup = g.append('g').attr('id', 'conneciton');
  // create group container to hold all user nodes; appended after connecitonGroup
  // so this group takes priority over the other one on HTML mouse events
  var userGroup = g.append('g').attr('id', 'user');
  // path connecting people from the same cohort
  for (var prop in cohortCoords) {
    // create random color for the connection path; each cohort has a different color
    var color = randomColor(0.8);
    var connectionData = cohortCoords[prop];
    var connection = d3.svg.line()
      .x(function(d) {
        return states(d.coords)[0];
      })
      .y(function(d) {
        return states(d.coords)[1];
      })
      .interpolate('linear');
    // connections between people in the same cohort; right now for demo and 
    // speed, only use path from start to end so it's not a one to one connection
    // will fix later; low priority
    connectionGroup.append('g')
      .attr('id', prop)
      .append('path')
      .attr('class', 'connection')
      .attr('d', connection(connectionData))
      .attr('stroke', color)
      .attr('stroke-width', 0.2)
      .attr('baseS', 0.2)
      .attr('fill', 'none')
      .on('mouseover', function() {
        d3.select(this).transition().duration(50).attr('stroke-width', 1.5);
      })
      .on('mouseleave', function() {
        d3.select(this).transition().duration(50).attr('stroke-width', 0.2);
      })

    // precise location info per cohort
    var individual = userGroup.append('g')
      .attr('id', prop)
      .append('a')
      .attr('xlink:href', '/#/discover');
    // individual person's name
    individual
      .selectAll('text')
      .data(connectionData).enter()
      .append('text')
      // .attr('class', 'zoom')
      .attr('id', function(d) {
        return prop + d.name;
      })
      .attr('transform', function(d) {
        return 'translate(' + states(d.coords) + ')';
      })
      .text(function(d) {
        return d.name;
      })
      .attr('fill', 'white')
      .style('display', 'none');
    // individual person's location info, represented by red dots
    individual
      .selectAll('circle')
      .data(connectionData).enter()
      .append('circle')
      .attr('class', 'user')
      .attr('id', function(d) {
        return prop + d.name;
      })
      .attr('transform', function(d) {
        return 'translate(' + states(d.coords) + ')';
      })
      .attr('baseR', 7)
      .attr('r', 7)
      .attr('fill', 'rgba(255, 0, 0, 0.5)')
      .on('mouseover', function() {
        var rect = d3.select(this)[0][0].getBoundingClientRect();
        var name = d3.select(this).attr('id');
        var x = rect.left - 350;
        var y = rect.top - 250;
        var popup = svg.append('g')
          .attr('id', 'popup')
          .attr('transform', 'translate(' + x + ',' + y + ')');
        popup.append('rect')
          .attr('rx', 10)
          .attr('ry', 10)
          .attr('width', 300)
          .attr('height', 135)
          .attr('stroke-width', 1)
          .attr('stroke', 'rgba(40, 40, 40, 0.9)')
          .style('fill', 'rgba(255, 255, 255, 0.6)');
        var text = popup.append('text')
          .attr('transform', 'translate(0, 10)')
          .attr('fill', 'rgb(20, 20, 20)');
        var record = userStore[name];
        for (var prop in record) {
          if (prop !== 'coords') {
            text.append('tspan')
              .text(record[prop])
              .attr('dy', 20)
              .attr('x', 20);
          }
        }
      })
      .on('mouseleave', function() {
        d3.selectAll('#popup').remove();
        // d3.selectAll('.zoom').attr('font-size', 0.3);
      }).on('click', function() {

      });
  }

  // general data location
  var divs = g.append('g')
    .attr('id', 'userGen')
    .selectAll('circle')
    .data(userLocGen).enter()
    .append('g')
    .attr('num', function(d) {
      return locStoreGen[d[0]];
    })
    .on('mouseover', function() {
      var self = d3.select(this);
      var dad = d3.select(this.parentNode);
      // transform location text upon mouse event
      self.select('text')
        .transition()
        .duration(200)
        .style('font-size', '35px');
      // change circle fill to be highlighted
      var circle = self.select('circle');
      if (circle.attr('toggled') === 'false') {
        circle.attr('prevColor', function(d) {
          circle.attr('toggled', 'true');
          return circle.attr('fill');
        });
      }
      circle.attr('fill', 'rgba(255, 255, 255, 0.5)');
      // manage popup - shows how many hack reactor students are in the general area
      var num = self.attr('num');
      var arc = d3.svg.arc()
        .innerRadius(40)
        .outerRadius(80)
        .startAngle(0)
        .endAngle((num / 35 + 0.5) * Math.PI);
      var x = d3.mouse(this)[0] - 200;
      var y = d3.mouse(this)[1] - 200;

      if (!d3.select('#popup')[0][0]) {
        var popup = dad.append('g')
          .attr('id', 'popup')
          .attr('transform', 'translate(' + x + ',' + y + ')');

        // popup background - grey
        popup.append('rect')
          .attr('width', 200)
          .attr('height', 200)
          .attr('rx', 10)
          .attr('ry', 10)
          .attr('stroke-width', 1)
          .attr('stroke', 'rgba(150, 150, 150, 0.9)')
          .style('fill', 'rgba(255, 255, 255, 0.6)');
        // amount of students in each location
        popup.append('circle')
          .attr('transform', 'translate(' + 100 + ',' + 100 + ')')
          .attr('stroke-width', 0.1)
          .attr('stroke', 'rgba(0, 0, 0, 0.3)')
          .attr('fill', 'rgba(120, 120, 120, 0.4)')
          .attr('r', 75);
        popup.append('path')
          .attr('d', arc)
          .attr('transform', 'translate(' + 100 + ',' + 100 + ')')
          .attr('stroke', 'rgba(255, 255, 255, 0.3)')
          .attr('fill', 'rgba(120, 120, 120, 0.5)')
          .style('fill', 'rgba(60, 60, 60, 0.9)');
        popup.append('text')
          .attr('transform', 'translate(' + 77 + ',' + 110 + ')')
          .style('font-size', '35px')
          .text(function() {
            var text = self.attr('num');
            if (text.length < 2) {
              text = 0 + text;
            }
            return text;
          });
      }
    })
    .on('mouseleave', function() {
      var self = d3.select(this);
      self.select('text')
        .transition()
        .duration(200)
        .style('font-size', '10px');
      var circle = self.select('circle');
      circle.attr('toggled', 'false')
        .attr('fill', function(d) {
          return circle.attr('prevColor');
        });
      d3.selectAll('#popup').remove();
    });

  // sort the circles so smaller ones appear before the bigger ones
  divs.sort(function(a, b) {
    return locStoreGen[b[0]] - locStoreGen[a[0]];
  });

  divs.append('circle')
    .attr('class', 'userGen')
    .attr('transform', function(d) {
      return "translate(" + states(d[0]) + ")";
    })
    // .attr('zoomed', 'false')
    .attr('toggled', 'false')
    .attr('r', function(d) {
      return getCirGenRadius(d);
    })
    .attr('baseR', function(d) {
      return getCirGenRadius(d);
    })
    .attr('fill', function(d) {
      var num = floorCoords(d[0], function(data) {
        return locStoreGen[data];
      });
      var r = 120 + num;
      var g = 120 + num * 4;
      var b = 150 + num * 6;
      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + 0.4 + ')';
    })
    .attr('stroke', 'white')
    .attr('stroke-width', 0.35);

  divs.append('text')
    .attr('x', function(d) {
      return states(d[0])[0];
    })
    .attr('y', function(d) {
      return states(d[0])[1];
    })
    .text(function(d) {
      return d[1];
    });

  var userGenCir = g.select('#userGen').selectAll('circle');
  userGenCir.on('click', function() {
    console.log('I am being clicked');
    collapsedtree();
  });


});




// helper func 
// random location generator based on lattitude and longitude around its location
// fully for demo only (the dummy data generator only has a few specific zips)
function noise(num) {
  var sign = Math.random() > 0.5 ? 1 : -1;
  var amp = Math.random() * 0.2;
  return num + sign * amp;
}

// group location via lattitude & longitude and save in locStoreGen
function floorCoords(arr, cb) {
  cb = cb || function(coords) {
    return coords;
  };
  var x = Math.floor(arr[0] * 1.25) / 1.25 + 0.3;
  var y = Math.floor(arr[1] * 1.25) / 1.25 + 0.3;
  return cb([x, y]);
}

// random color generator based on rgba() function
function randomColor(alpha) {
  alpha = alpha || 1;
  var r = Math.floor(Math.random() * 150) + 100;
  var g = Math.floor(Math.random() * 150) + 100;
  var b = 200;
  return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
}

function getCirGenRadius(d) {
  var num = floorCoords(d[0], function(data) {
    return locStoreGen[data];
  });
  num = num < 10 ? 10 : num;
  num = num > 50 ? 50 : num * 1.5;
  return num;
}

// extract the essential user profiles from the objects stored in localStorage
function getUserProfile(user) {
  return {
    coords: [noise(user.longitude), noise(user.latitude)],
    name: user.name,
    location: user.city + ', ' + user.state,
    email: user.email,
    company: user.currentemployer,
    cohort: user.cohort
  };
}

// var userGenCir = g.select('#userGen').selectAll('circle');
// userGenCir.on('click', function() {
//   console.log('I am being clicked');
//   collapsedtree();
// });

function collapsedtree() {

  var flare = {
    "name": "San Francisco, CA",
    "children": [{
      "name": "Doug Shamoo",
      "children": [{
        "name": "something@example.com"
      }, {
        "name": "Uber"
      }, {
        "name": "HRR8"
      }, {
        "name": "Greenfield",
        "children": [{
          "name": "Contextualize",
          "url": "https://contextualize.herokuapp.com/"
        }],
        "url": "#/home"
      }],
      "url": "#/home"
    }, {
      "name": "Victoria Tapia",
      "children": [{
        "name": "something@example.com"
      }, {
        "name": "Uber"
      }, {
        "name": "HRR8"
      }],
      "url": "#/home"
    }, {
      "name": "Rex Suter",
      "children": [{
        "name": "something@example.com"
      }, {
        "name": "Uber"
      }, {
        "name": "HRR8"
      }, {
        "name": "Google",
        "url": "https://www.google.com"
      }],
      "url": "#/home"
    }, {
      "name": "Verlon Smith",
      "children": [{
        "name": "vsmith3113@gmail.com"
      }, {
        "name": "Uber"
      }, {
        "name": "HRR8"
      }],
      "url": "#/home"
    }],
    "url": "#home"
  };

  var margin = {
      top: 30,
      right: 20,
      bottom: 30,
      left: 20
    },
    width = 320 - margin.left - margin.right,
    barHeight = 20,
    barWidth = width * 0.8;

  var i = 0,
    duration = 400,
    root;

  var tree = d3.layout.tree()
    .nodeSize([0, 10]);

  var diagonal = d3.svg.diagonal()
    .projection(function(d) {
      return [d.y, d.x];
    });

  var svg = d3.select("#collapsedtree").append("svg")
    .attr("width", width + margin.left + margin.right)
    // .attr('height', barHeight)
    // .attr('class', 'vis')
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  // d3.json('flare.json', function(error, flare) {
  //   if (error) throw error;

  flare.x0 = 0;
  flare.y0 = 0;
  moveChildren(flare);
  update(root = flare);
  // });

  function update(source) {

    // Compute the flattened node list. TODO use d3.layout.hierarchy.
    var nodes = tree.nodes(root);

    var height = Math.max(500, nodes.length * barHeight + margin.top + margin.bottom);

    d3.select("svg").transition()
      .duration(duration)
      .attr("height", height);

    d3.select(self.frameElement).transition()
      .duration(duration)
      .style("height", height + "px");

    // Compute the "layout".
    nodes.forEach(function(n, i) {
      n.x = i * barHeight;
    });

    // Update the nodes…
    var node = svg.selectAll("g.node")
      .data(nodes, function(d) {
        return d.id || (d.id = ++i);
      });

    var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) {
        return "translate(" + source.y0 + "," + source.x0 + ")";
      })
      .style("opacity", 1e-6);

    // Enter any new nodes at the parent's previous position.
    // nodeEnter.append("rect")
    //   .attr("y", -barHeight / 2)
    //   .attr("height", barHeight)
    //   .attr("width", barWidth)
    //   .style("fill", color)
    //   .on("click", click); 

    nodeEnter.append("svg:a")
      .attr("xlink:href", function(d) {
        return d.url;
      }) // <-- reading the new "url" property
      .append("svg:rect")
      .attr("y", -barHeight / 2)
      .attr("height", barHeight)
      .attr("width", barWidth)
      .style("fill", color)
      .on("click", click);

    nodeEnter.append("text")
      .attr("dy", 3.5)
      .attr("dx", 5.5)
      .text(function(d) {
        return d.name;
      });


    // Transition nodes to their new position.
    nodeEnter.transition()
      .duration(duration)
      .attr("transform", function(d) {
        return "translate(" + d.y + "," + d.x + ")";
      })
      .style("opacity", 1);

    node.transition()
      .duration(duration)
      .attr("transform", function(d) {
        return "translate(" + d.y + "," + d.x + ")";
      })
      .style("opacity", 1)
      .select("rect")
      .style("fill", color);

    // Transition exiting nodes to the parent's new position.
    node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) {
        return "translate(" + source.y + "," + source.x + ")";
      })
      .style("opacity", 1e-6)
      .remove();

    // Update the links…
    var link = svg.selectAll("path.link")
      .data(tree.links(nodes), function(d) {
        return d.target.id;
      });

    // Enter any new links at the parent's previous position.
    link.enter().insert("path", "g")
      .attr("class", "link")
      .attr("d", function(d) {
        var o = {
          x: source.x0,
          y: source.y0
        };
        return diagonal({
          source: o,
          target: o
        });
      })
      .transition()
      .duration(duration)
      .attr("d", diagonal);

    // Transition links to their new position.
    link.transition()
      .duration(duration)
      .attr("d", diagonal);

    // Transition exiting nodes to the parent's new position.
    link.exit().transition()
      .duration(duration)
      .attr("d", function(d) {
        var o = {
          x: source.x,
          y: source.y
        };
        return diagonal({
          source: o,
          target: o
        });
      })
      .remove();

    // Stash the old positions for transition.
    nodes.forEach(function(d) {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }

  function moveChildren(node) {
    if (node.children) {
      node.children.forEach(function(c) {
        moveChildren(c);
      });
      node._children = node.children;
      node.children = null;
    }
  }

  // Toggle children on click.
  function click(d) {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    update(d);
  }

  function color(d) {
    return d._children ? "#3182bd" : d.children ? "#c6dbef" : "#fd8d3c";
  }
}


// var userGenCir = g.select('#userGen').selectAll('circle');
// userGenCir.on('click', function() {
//   console.log('I am being clicked');
//   collapsedtree();
// });
// zoom handler
// currently zoom out doesn't center on US map
// function zoomed() {


// g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");

// // individual circles are scaled based on zoom
// g.selectAll('.user')
//   .each(function() {
//     var baseR = d3.select(this).attr('baseR');
//     d3.select(this).attr('r', Math.max(baseR / d3.event.scale, 0.5));
//   });

// // connection path info is scaled based on zoom
// g.selectAll('.connection')
//   .each(function() {
//     var baseS = d3.select(this).attr('baseS');
//     d3.select(this).attr('stroke-width', Math.max(baseS / d3.event.scale, 0.15))
//       .attr('opacity', Math.max(0.8 / d3.event.scale, 0.3));
//   });

// upon clicking on a circle, zoom in and close up to the circle location
// to reveal individual users
// bug: since this is in the zoom handler, clicking won't work until first zoomed

// var userGenCir = g.select('#userGen').selectAll('circle');
// userGenCir.on('click', function() {
//   collapsedtree();
// var spacer = document.getElementById('spacer');
// spacer.style.position = 'default';
// spacer.style.display = 'inline-block';
// var map = d3.select('.vis').selectAll('svg')
// .attr("transform", "translate(" + 100 + "," + 0 + ")"); 
// var t = d3.transform(map.attr("transform"));
// console.log(map);
// x = t.translate[0],
// y = t.translate[1];
// var scale = 20;
// t.transition().style('translate', '50px, 0');
// .call(zoom.translate([((x * -scale) + (width / 2)), ((y * -scale) + height / 2)])
//   .scale(scale).event);
// .style('display', 'none');
// });

// if zoom in to more than 18 times
// if (d3.event.scale > 18) {
//   // general user location circle is hidden
//   g.select('#userGen').style('display', 'none');
//   g.selectAll('.user').attr('stroke-width', 0.02).attr('stroke', 'rgba(255, 255, 255, 0.7)');
//   // all the user's names are displayed
//   g.selectAll('.zoom')
//     .style('display', 'inline-block')
//     .attr('font-size', 0.3);
// } else {
//   // when zoom out, general location circles are back on display
//   g.select('#userGen').style('display', 'inline-block');
//   // user names are hidden
//   g.selectAll('.zoom').style('display', 'none');
// }
// }
// collapsedtree();

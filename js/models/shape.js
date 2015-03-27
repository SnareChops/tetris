Array.max = function( array ){
  return Math.max.apply( Math, array );
};

var Shape = function(shape){
  var self = this;
  self.coordinates = shapes[shape].coordinates;
  self.color = shapes[shape].color;
  self.max = {
    x: Array.max(self.coordinates.map(function(coord){return coord.x;})),
    y: Array.max(self.coordinates.map(function(coord){return coord.y;}))
  };
  self.min = {x:0, y:0};

};

var shapes = [];
shapes.push({coordinates:[{x:0, y:0}, {x:1, y:0}, {x:2, y:0}, {x:3, y:0}],color:'#00f0f0'}); //Block 1
	shapes.push({coordinates:[{x:0, y:0}, {x:0, y:1}, {x:1, y:0}, {x:2, y:0}],color:'#0000f0'}); //Block 2
	shapes.push({coordinates:[{x:0, y:0}, {x:1, y:0}, {x:2, y:0}, {x:2, y:1}],color:'#f0a000'}); //Block 3
	shapes.push({coordinates:[{x:0, y:0}, {x:0, y:1}, {x:1, y:0}, {x:1, y:1}],color:'#f0f000'}); //Block 4
	shapes.push({coordinates:[{x:0, y:0}, {x:1, y:0}, {x:1, y:1}, {x:2, y:1}],color:'#f0f000'}); //Block 5
	shapes.push({coordinates:[{x:0, y:0}, {x:1, y:0}, {x:1, y:1}, {x:2, y:0}],color:'#a0f000'}); //Block 6
	shapes.push({coordinates:[{x:0, y:1}, {x:1, y:1}, {x:1, y:0}, {x:2, y:0}],color:'#f00000'}); //Block 7
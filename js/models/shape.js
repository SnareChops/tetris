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
shapes.push({coordinates:[{x:0, y:0}, {x:1, y:0}, {x:2, y:0}, {x:3, y:0}],color:'#00f0f0'}); //straight block
shapes.push({coordinates:[{x:0, y:0}, {x:0, y:1}, {x:1, y:0}, {x:2, y:0}],color:'#0000f0'}); //left angle
shapes.push({coordinates:[{x:0, y:0}, {x:1, y:0}, {x:2, y:0}, {x:2, y:1}],color:'#f0a000'}); //right angle
shapes.push({coordinates:[{x:0, y:0}, {x:0, y:1}, {x:1, y:0}, {x:1, y:1}],color:'#f0f000'}); //square
shapes.push({coordinates:[{x:0, y:0}, {x:1, y:0}, {x:1, y:1}, {x:2, y:1}],color:'#f0f000'}); //right s block
shapes.push({coordinates:[{x:0, y:0}, {x:1, y:0}, {x:1, y:1}, {x:2, y:0}],color:'#a0f000'}); //pyramid block
shapes.push({coordinates:[{x:0, y:1}, {x:1, y:1}, {x:1, y:0}, {x:2, y:0}],color:'#f00000'}); //left z block
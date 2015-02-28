Array.max = function( array ){
  return Math.max.apply( Math, array );
};

var Shape = function(shape){
  var self = this;
  self.coordinates = shapes[shape];
  self.color = 'red';
  self.max = {
    x: Array.max(self.coordinates.map(function(coord){return coord.x;})),
    y: Array.max(self.coordinates.map(function(coord){return coord.y;}))
  };
  self.min = {x:0, y:0};

};

var shapes = [];
shapes.push([{x:0, y:0}, {x:1, y:0}, {x:2, y:0}, {x:3, y:0}]); //Block 1
shapes.push([{x:0, y:0}, {x:0, y:1}, {x:1, y:0}, {x:2, y:0}]); //Block 2
shapes.push([{x:0, y:0}, {x:1, y:0}, {x:2, y:0}, {x:2, y:1}]); //Block 3
shapes.push([{x:0, y:0}, {x:0, y:1}, {x:1, y:0}, {x:1, y:1}]); //Block 4
shapes.push([{x:0, y:0}, {x:1, y:0}, {x:1, y:1}, {x:2, y:1}]); //Block 5
shapes.push([{x:0, y:0}, {x:1, y:0}, {x:1, y:1}, {x:2, y:0}]); //Block 6
shapes.push([{x:0, y:1}, {x:1, y:1}, {x:1, y:0}, {x:2, y:0}]); //Block 7
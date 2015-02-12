var i, j,
    $box = $('.box'),
    rows = 20,
    cols = 10;

for(i=0;i<rows;i++){
  var $row = $('<div/>').addClass('row');
  for(j=0;j<cols;j++){
    $row.append($('<div/>').addClass('cell'));
  }
  $box.append($row);
}

var Block = function(shape){
  var self = this;
  self.shape = new Shape(shape);
};

var Shape = function(shape){
  var self = this;
  self.coordinates = shapes[shape];
};

var shapes = [];
shapes.push([{x:0, y:0}, {x:1, y:0}, {x:2, y:0}, {x:3, y:0}]); //Block 1
shapes.push([{x:0, y:0}, {x:0, y:1}, {x:1, y:0}, {x:2, y:0}]); //Block 2
shapes.push([{x:0, y:0}, {x:1, y:0}, {x:2, y:0}, {x:2, y:1}]); //Block 3
shapes.push([{x:0, y:0}, {x:0, y:1}, {x:1, y:0}, {x:1, y:1}]); //Block 4
shapes.push([{x:0, y:0}, {x:1, y:0}, {x:1, y:1}, {x:2, y:1}]); //Block 5
shapes.push([{x:0, y:0}, {x:1, y:0}, {x:1, y:1}, {x:2, y:0}]); //Block 6
shapes.push([{x:0, y:1}, {x:1, y:1}, {x:1, y:0}, {x:2, y:0}]); //Block 7
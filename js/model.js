Array.max = function( array ){
  return Math.max.apply( Math, array );
};

var Board = function($box, rows, cols){
  var self = this,i,j;
  self.rows = [];
  self.area = $('.box');
  self.blocks = [];
  self.bounds = {max: {x:cols-1, y:rows-1}, min: {x: 0, y: 0}};

  for(i=0;i<rows;i++){
    var $row = $('<div/>').addClass('row'),
        row = new Row($row);
    for(j=0;j<cols;j++){
      var $col = $('<div/>').addClass('cell');
      $row.append($col);
      row.columns.push(new Column($col));
    }
    $box.append($row);
    self.rows.push(row);
  }
  self.rows = self.rows.reverse();
};

var Row = function($obj){
  var self = this;
  self.$obj = $obj;
  self.columns = [];
};

var Column = function($obj){
  var self = this;
  self.$obj = $obj;
};

var Block = function(shape, x, y){
  var self = this;
  self.shape = new Shape(shape);
  self.position = {x:x, y:y};
  self.max = {
    x: self.shape.max.x + self.position.x,
    y: self.shape.max.y + self.position.y
  };
  self.min = {
    x: self.shape.min.x + self.position.x,
    y: self.shape.min.y + self.position.y
  };


  self.moveDown = function(board){
    if(self.collide(board, 0, -1)){return false;}
    self.position.y--;
    return true;
  };

  self.moveRight = function(board){
    if(self.collide(board, 1, 0)){return false;}
    self.position.x++;
    return true;
  };

  self.moveLeft = function(board){
    if(self.collide(board, -1, 0)){return false;}
    self.position.x--;
    return true;
  };

  self.rotateRight = function(){
    var midx = Math.floor(self.shape.max.x / 2);
    var midy = Math.floor(self.shape.max.y / 2);
    self.shape.coordinates.forEach(function(coord){
      coord.x = coord.x + (midx - coord.x);
      coord.y = coord.y + (midy - coord.y);
    });
  };

  self.rotateLeft = function(){

  };

  self.draw = function(board){
    self.shape.coordinates.forEach(function(coord) {
      var calcx = coord.x + self.position.x;
      var calcy = coord.y + self.position.y;
      board.rows[calcy].columns[calcx].$obj.css('background-color', self.color);
    });
  };

  self.collide = function(board, xdiff, ydiff){
    if(self.position.x + xdiff < board.bounds.min.x){return true;}
    if(self.position.y + ydiff < board.bounds.min.y){return true;}
    if(self.position.x + xdiff + self.shape.max.x > board.bounds.max.x){return true;}
    if(self.position.y + ydiff + self.shape.max.y > board.bounds.max.y){return true;}
    return false;
  };
};

Object.defineProperty(Block.prototype, 'color', {
  get: function(){
    return this.shape.color;
  }
});

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
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
    if(self.collision(board, {x: self.position.x, y: self.position.y - 1}, self.shape.coordinates)){
      self.shape.coordinates.forEach(function(coord){
        board.blob[coord.y+self.position.y].push(coord.x+self.position.x);
      });
      board.blocks = [];
      return false;
    }
    self.position.y--;
    return true;
  };

  self.moveRight = function(board){
    if(self.collision(board, {x: self.position.x + 1, y: self.position.y}, self.shape.coordinates)){return false;}
    self.position.x++;
    return true;
  };

  self.moveLeft = function(board){
    if(self.collision(board, {x: self.position.x - 1, y: self.position.y}, self.shape.coordinates)){return false;}
    self.position.x--;
    return true;
  };

  self.rotateRight = function(board){
    var midx = Math.floor(self.shape.max.x / 2);
    var midy = Math.floor(self.shape.max.y / 2);
    var newCoordinates = [];
    self.shape.coordinates.forEach(function(coord){
      var xdiff = coord.x - midx;
      var ydiff = coord.y - midy;
      var result = translateCell(xdiff, ydiff);
      newCoordinates.push({x: result.x, y: result.y});
    });
    if(self.collision(board, self.position, newCoordinates)){return false;}
    self.shape.coordinates = newCoordinates;
  };

  function translateCell(x, y){
    var newx = 0, newy = 0;
    if(x < 0){newy = x*-1;} // -x => +y
    if(y > 0){newx = y;}    // +y => +x
    if(x > 0){newy = x*-1;} // +x => -y
    if(y < 0){newx = y;}    // -y => -x
    return {x: newx, y: newy};
  }

  self.draw = function(board){
    self.shape.coordinates.forEach(function(coord) {
      var calcx = coord.x + self.position.x;
      var calcy = coord.y + self.position.y;
      board.rows[calcy].columns[calcx].$obj.css('background-color', self.color);
    });
  };

  self.collision = function(board, position, coordinates){
    return !coordinates.every(function(coord) {
      if (coord.x + position.x < board.bounds.min.x) {return false;}
      if (coord.y + position.y < board.bounds.min.y) {return false;}
      if (coord.x + position.x > board.bounds.max.x) {return false;}
      if (coord.y + position.y > board.bounds.max.y) {return false;}
      for(var row in board.blob){
        if(!board.blob[row].every(function(cell){
          var test = (coord.x + position.x === cell && coord.y + position.y === parseInt(row));
          if(test){return false;}
          return true;
        })){return false;}
      }
      return true;
    });
  }
};

Object.defineProperty(Block.prototype, 'color', {
  get: function(){
    return this.shape.color;
  }
});
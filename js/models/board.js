var Board = function(game, $box, rows, cols){
  var self = this,i,j;
  self.rows = [];
  self.area = $('.box');
  self.block;
  self.blob = {};
  self.bounds = {max: {x:cols-1, y:rows-1}, min: {x: 0, y: 0}};

  for(i=0;i<rows;i++){
    self.blob[i] = [];
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

  self.newBlock = function(){
    self.block = new Block(Math.floor(Math.random() * 6), 4, 18);
    if(self.block.collision(self, {x:4, y:18}, self.block.shape.coordinates)){
      game.gameOver();
    }
  };

  self.draw = function(){
    var i,j;
    if(self.block != null) {
      self.block.draw(self);
    }
    for(i=0;i<self.rows.length;i++){
      for(j=0;j<self.blob[i].length;j++){
        self.rows[i].columns[self.blob[i][j]].$obj.css('background-color', 'green');
      }
    }
  };

  self.checkBlobRows = function(game){
    var i;
    for(i=0;i<self.rows.length;i++){
      if(self.blob[i].length >= self.rows[i].columns.length){
        self.dropRows(i);
        game.addPoints(10);
      }
    }
  };

  self.dropRows = function(start){
    var i;
    for(i=start;i<self.rows.length;i++){
      if(i===self.rows.length-1){self.blob[i]=[];}
      else {self.blob[i] = self.blob[i+1];}
    }
  }
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
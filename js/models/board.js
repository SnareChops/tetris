var Board = function($box, rows, cols){
  var self = this,i,j;
  self.rows = [];
  self.area = $('.box');
  self.blocks = [];
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
    self.blocks[0] = new Block(Math.floor(Math.random() * 6), 4, 18);
  };

  self.draw = function(){
    var i,j;
    board.blocks.forEach(function(x){
      x.draw(board);
    });
    for(i=0;i<self.rows.length;i++){
      for(j=0;j<self.blob[i].length;j++){
        self.rows[i].columns[self.blob[i][j]].$obj.css('background-color', 'green');
      }
    }
  };

  self.checkBlobRows = function(){
    var i;
    for(i=0;i<self.rows.length;i++){
      if(self.blob[i].length >= self.rows[i].columns.length){
        self.dropRows(i);
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
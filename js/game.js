var Game = function($box, controls, displays){
  var self = this;
  self.$box = $box;
  self.controls = controls;
  self.displays = displays;
  self.paused = false;
  self.score = 0;
  self.blockCount = 0;
  self.board;
  self.engine;

  self.addPoints = function(points){
    self.score += points;
    self.displays.score.html(self.score.toString());
  };

  self.incrementBlockCount = function(){
    self.blockCount++;
    self.displays.blockCount.html(self.blockCount.toString());
  };

  function start(){
    self.score = 0;
    self.blockCount = 0;
    self.displays.score.html('0');
    self.displays.blockCount.html('0');
    self.board = new Board(self.$box, 20, 10);
    self.engine = new Engine(self.board, self);
    self.engine.start();
  }

  function pause(){
    if(self.paused){
      self.$box.find('div.paused').remove();
      self.engine.resume();
      self.paused = false;
    } else {
      self.$box.append($('<div/>').addClass('paused'));
      self.engine.pause();
      self.paused = true;
    }
  }

  controls.new.click(start);
  controls.pause.click(pause);

  $(document).on('keydown', function(e){
    switch(e.which){
      case controls.left:
        self.board.blocks[0].moveLeft(self.board);
        break;
      case controls.right:
        self.board.blocks[0].moveRight(self.board);
        break;
      case controls.down:
        self.board.blocks[0].moveDown(self.board);
        break;
      case controls.rotate:
        self.board.blocks[0].rotateRight(self.board);
        break;
    }
  });
};
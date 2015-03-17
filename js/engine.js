var Engine = function(board, game) {
  var self = this, intervalId, blockMoveCounter = 0, speed = 31, speedIntervalId;

  self.start = function () {
    blockMoveCounter = 0;
    intervalId = setInterval(tick, 16);
    speedIntervalId = setInterval(increaseSpeed, 1000 * 20);
  };

  self.pause = function () {
    clearInterval(intervalId);
  };

  self.resume = function () {
    intervalId = setInterval(tick, 16);
  };

  function tick() {
    // All gaming logic handled here
    clear();
    autoBlockMove();
    board.checkBlobRows(game);
    board.draw();
    console.log('tick');
  }

  function clear() {
    $('.cell').css('background-color', 'white');
  }

  function autoBlockMove() {
    blockMoveCounter++;
    if (blockMoveCounter > (speed < 0 ? 0 : speed)) {
      blockMoveCounter = 0;
      if (board.block == null) {
        board.newBlock();
        game.incrementBlockCount();
      } else {
        board.block.moveDown(board);
      }
    }
  }

  function increaseSpeed(){
    speed--;
  }
};

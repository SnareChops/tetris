var Engine = function(board, game) {
  var self = this, intervalId, blockMoveCounter = 0;

  self.start = function () {
    blockMoveCounter = 0;
    intervalId = setInterval(tick, 100);
  };

  self.pause = function () {
    clearInterval(intervalId);
  };

  self.resume = function () {
    intervalId = setInterval(tick, 100);
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
    if (blockMoveCounter > 10) {
      blockMoveCounter = 0;
      if (board.blocks[0] == null) {
        board.newBlock();
        game.incrementBlockCount();
      } else {
        board.blocks[0].moveDown(board);
      }
    }
  }
};

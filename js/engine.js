var board = new Board($('.box'), 20, 10),
    blockMoveCounter = 0;


function tick(){
  // All gaming logic handled here
  clear();
  autoBlockMove();
  board.checkBlobRows();
  board.draw();
  console.log('tick');
}

function clear(){
  $('.cell').css('background-color', 'white');
}

function autoBlockMove(){
  blockMoveCounter++;
  if(blockMoveCounter > 10){
    blockMoveCounter = 0;
    if(board.blocks[0] == null){
      board.newBlock();
    } else {
      board.blocks[0].moveDown(board);
    }
  }
}

setInterval(tick, 100);
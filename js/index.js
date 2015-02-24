
$(document).on('keyup', function(e){
  switch(e.which){
    case 78: // n
      board.blocks.push(new Block(0, 0, 18));
      break;
    case 37: // left
      board.blocks[0].moveLeft(board);
      break;
    case 39: // right
      board.blocks[0].moveRight(board);
      break;
    case 40: // down
      board.blocks[0].moveDown(board);
      break;
    case 38: // up
      board.blocks[0].rotateRight();
      break;
  }
});

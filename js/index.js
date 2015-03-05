
$(document).on('keydown', function(e){

  switch(e.which){
    case 78: // n
      board.newBlock();
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

$('.box').height(($(window).height()-75+'px'));
$('.box').width(($(this).height()/2));
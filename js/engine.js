var intervalId,board,tick;
var paused = false;

$('#new').click(function(){
   $('.box').html(' ');

   board = new Board($('.box'), 20, 10),
    blockMoveCounter = 0;


tick = function(){
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

    clearInterval(intervalId);
    board.blocks=[];

intervalId = setInterval(tick, 100);
});
$('#pause').click(function(){
    if (paused){
        $('.box').find('div.paused').remove();
        intervalId = setInterval(tick, 100);
        paused = false;
    } else {
        $('.box').append($('<div/>').addClass('paused'));
        clearInterval(intervalId);
        paused = true;
    }
});
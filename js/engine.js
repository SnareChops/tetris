var board = new Board($('.box'), 20, 10);

function tick(){
  // All gaming logic handled here
  clear();
  board.checkBlobRows();
  board.draw();
  console.log('tick');
}

function clear(){
  $('.cell').css('background-color', 'white');
}

setInterval(tick, 100);
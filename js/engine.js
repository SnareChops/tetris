var board = new Board($('.box'), 20, 10);

function tick(){
  // All gaming logic handled here
  clear();
  draw();
  console.log('tick');
}

function clear(){
  $('.cell').css('background-color', 'white');
}

function draw(){
  board.blocks.forEach(function(x){
    x.draw(board);
  });
}

setInterval(tick, 100);
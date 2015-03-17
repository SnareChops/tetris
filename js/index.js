var $box = $('.box'),
    $new = $('#new'),
    $pause = $('#pause'),
    $score = $('#score'),
    $blockCount = $('#block-count'),
    game = new Game($box, {new: $new, pause: $pause, left: 37, right: 39, down: 40, rotate: 38}, {score: $score, blockCount: $blockCount}),
    ui = ui || {};

$box.height(($(window).height()-75+'px'));
$box.width(($(window).height()/2));

ui.gameOver = function(score, time, blockCount){
  var $template = $('#game-over-template').html();
  $template.find('.score').html(score);
  $template.find('.time').html(time);
  $template.find('.block-count').html(blockCount);
  return $template;
};
var $box = $('.box'),
    $new = $('#new'),
    $pause = $('#pause'),
    $score = $('#score'),
    $blockCount = $('#block-count'),
    game = new Game($box, {new: $new, pause: $pause, left: 37, right: 39, down: 40, rotate: 38}, {score: $score, blockCount: $blockCount});

$box.height(($(window).height()-75+'px'));
$box.width(($(window).height()/2));
var i, j, $box = $('.box');
for(i=0;i<20;i++){
  $row = $('<div/>').addClass('row');
  for(j=0;j<10;j++){
    $row.append($('<div/>').addClass('cell'));
  }
  $box.append($row);
}
import 'bootstrap';

// Popover の処理を追加してみた
$(function () {
  $("button[data-toggle='popover']").popover({
    container: 'body'
  })
})

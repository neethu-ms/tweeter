$(document).ready(function() {
  let counter = 0;
  $("textarea").keydown(function() {
    counter = 140 - ($(this).val().length);
    let modifyStyle = {};
    if (counter < 0) {
      modifyStyle = { color: "red" };
    } else {
      modifyStyle = { color: "black" };
    }
    if (modifyStyle) {
      $($(this).siblings('.counter')).text(counter).css(modifyStyle);
    } else {
      $($(this).siblings('.counter')).text(counter);
    }
  });
  $("textarea").keyup(function() {
    counter = 140 - ($(this).val().length);
    let modifyStyle = {};
    if (counter < 0) {
      modifyStyle = { color: "red" };
    } else {
      modifyStyle = { color: "black" };
    }
    if (modifyStyle) {
      $($(this).siblings('.counter')).text(counter).css(modifyStyle);
    } else {
      $($(this).siblings('.counter')).text(counter);
    }
  });
});
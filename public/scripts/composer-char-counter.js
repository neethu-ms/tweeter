$(document).ready(function() {
  let counter = 0;
  $("textarea").keydown(function() {
    console.log("this=", this);
    console.log('this.val', $(this).text().length);
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
    console.log('counter=', counter);
  });
  $("textarea").keyup(function() {
    console.log("this=", this);
    console.log('this.val', $(this).text().length);
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
    console.log('counter=', counter);
  });

});
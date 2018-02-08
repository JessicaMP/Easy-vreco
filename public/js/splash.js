"use strict";

//____________CONTADOR________________
var counter = function counter() {
  var counter = 0;
  var c = 0;
  var i = setInterval(function () {
    $(".loading-page .counter h2").html(c + "%");
    $(".loading-page .counter hr").css("width", c + "%");
    counter++;
    c++;

    if (counter == 101) {
      clearInterval(i);
    }
  }, 23);
};

//____________SPLASH________________
var begin = function begin() {
  setTimeout(function () {
    $('#splash');
    window.location.href = 'views/index.html';
  }, 4000);

  //$('location').attr('href', 'views/index.html');
  counter();
};
// Materialize
$(document).ready(begin);
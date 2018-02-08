//____________CONTADOR________________
let counter = () => {
  let counter = 0;
  let c = 0;
  let i = setInterval(() => {
      $(".loading-page .counter h2").html(c + "%");
      $(".loading-page .counter hr").css("width", c + "%");
    counter++;
    c++;

    if(counter == 101) {
        clearInterval(i);
    }
  }, 23);
};

//____________SPLASH________________
let begin = () => {
  setTimeout(() => {
    $('#splash').fadeOut();
    $('#page-map').removeClass('hide');
  }, 4000);
  counter();
};
// Materialize
$(document).ready(begin);

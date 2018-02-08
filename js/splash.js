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
    $('#splash');
    window.location.href = 'views/index.html';
  }, 4000);

  //$('location').attr('href', 'views/index.html');
  counter();
};
// Materialize
$(document).ready(begin);

var laboratoriaLima = {lat: -12.1191427, lng: -77.0349046};

var inputGoing = document.getElementById('going'),
    inputFinish = document.getElementById('finish');

var image = 'assets/icons/bici2.ico';

function initMap() {

  var map = new google.maps.Map(document.getElementById('map'),{
    zoom: 6,
    center: laboratoriaLima
  });

  new google.maps.places.Autocomplete(inputGoing);
  new google.maps.places.Autocomplete(inputFinish);


  var markadorLaboratoria = new google.maps.Marker({
    position: laboratoriaLima,
    icon: image,
    title: 'Easy-vreco!',
    animation: google.maps.Animation.DROP,
    map: map
  });
  document.getElementById('encuentrame').addEventListener('click', buscar);
};
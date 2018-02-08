'use strict';

//____________GEOLOCATION________________

var laboratoriaLima = { lat: -12.1191427, lng: -77.0349046 };

var inputGoing = document.getElementById('going'),
    inputFinish = document.getElementById('finish');

var image = '../assets/icons/bici2.ico';

function initMap() {

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 6,
    center: laboratoriaLima
  });
  var contentString = '<p class="here">You´re here.</p>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
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
  markadorLaboratoria.addListener('click', function () {
    if (markadorLaboratoria.getAnimation() !== null) {
      markadorLaboratoria.setAnimation(null);
    } else {
      markadorLaboratoria.setAnimation(google.maps.Animation.BOUNCE);
    }
    infowindow.open(map, markadorLaboratoria);
  });
  document.getElementById('encuentrame').addEventListener('click', function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
    }
  });
};

var latitud = void 0,
    longitud = void 0;
var funcionExito = function funcionExito(posicion) {

  latitud = posicion.coords.latitude;
  longitud = posicion.coords.longitude;

  var map = new google.maps.Map(document.getElementById('map'));

  map.setZoom(18);
  map.setCenter({ lat: latitud, lng: longitud });
  var contentString = '<p class="here">You´re here.</p>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  var newPosition = { lat: latitud, lng: longitud };
  markadorLaboratoria = new google.maps.Marker({
    position: newPosition,
    icon: image,
    title: 'Easy-vreco!',
    animation: google.maps.Animation.DROP,
    map: map
  });
  //console.log(newPosition);
  markadorLaboratoria.addListener('click', function () {
    if (markadorLaboratoria.getAnimation() !== null) {
      markadorLaboratoria.setAnimation(null);
    } else {
      markadorLaboratoria.setAnimation(google.maps.Animation.BOUNCE);
    }
    infowindow.open(map, markadorLaboratoria);
  });
};

var funcionError = function funcionError(error) {
  alert('Tenemos un problema con encontrar tu ubicación');
};

document.getElementById('traceRoute').addEventListener('click', function () {
  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();
  var map = new google.maps.Map(document.getElementById('map'));
  calculateAndDisplayRoute(directionsService, directionsDisplay);
  directionsDisplay.setMap(map);
});

var calculateAndDisplayRoute = function calculateAndDisplayRoute(directionsService, directionsDisplay) {

  directionsService.route({
    origin: inputGoing.value,
    destination: inputFinish.value,
    travelMode: 'DRIVING'
  }, function (response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('No encontramos una ruta.');
    }
  });
};
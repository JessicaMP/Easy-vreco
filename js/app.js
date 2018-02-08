//____________GEOLOCATION________________

let laboratoriaLima = {lat: -12.1191427, lng: -77.0349046};

let inputGoing = document.getElementById('going'),
    inputFinish = document.getElementById('finish');

let image = 'assets/icons/bici2.ico';

function initMap() {

  let map = new google.maps.Map(document.getElementById('map'),{
    zoom: 6,
    center: laboratoriaLima
  });
  let contentString = '<p class="here">You´re here.</p>';

  let infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  new google.maps.places.Autocomplete(inputGoing);
  new google.maps.places.Autocomplete(inputFinish);


  let markadorLaboratoria = new google.maps.Marker({
    position: laboratoriaLima,
    icon: image,
    title: 'Easy-vreco!',
    animation: google.maps.Animation.DROP,
    map: map
  });
  markadorLaboratoria.addListener('click', () => {
    if (markadorLaboratoria.getAnimation() !== null) {
      markadorLaboratoria.setAnimation(null);
    } else {
      markadorLaboratoria.setAnimation(google.maps.Animation.BOUNCE);
    }
    infowindow.open(map, markadorLaboratoria);
  });
  document.getElementById('encuentrame').addEventListener('click', () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
    }
  });
};

let latitud,longitud;
let funcionExito = (posicion) => {

  latitud = posicion.coords.latitude;
  longitud = posicion.coords.longitude;

  let map = new google.maps.Map(document.getElementById('map'));

  map.setZoom(18);
  map.setCenter({lat:latitud, lng:longitud});
  let contentString = '<p class="here">You´re here.</p>';

  let infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  let newPosition = {lat: latitud, lng: longitud};
  markadorLaboratoria = new google.maps.Marker({
    position: newPosition,
    icon: image,
    title: 'Easy-vreco!',
    animation: google.maps.Animation.DROP,
    map: map
  });
  //console.log(newPosition);
  markadorLaboratoria.addListener('click', () => {
    if (markadorLaboratoria.getAnimation() !== null) {
      markadorLaboratoria.setAnimation(null);
    } else {
      markadorLaboratoria.setAnimation(google.maps.Animation.BOUNCE);
    }
    infowindow.open(map, markadorLaboratoria);
  });
};

let funcionError = (error) => {
  alert('Tenemos un problema con encontrar tu ubicación');
};

document.getElementById('traceRoute').addEventListener('click', () => {
  let directionsService = new google.maps.DirectionsService;
  let directionsDisplay = new google.maps.DirectionsRenderer;
  let map = new google.maps.Map(document.getElementById('map'));
  calculateAndDisplayRoute(directionsService,directionsDisplay);
  directionsDisplay.setMap(map);
});

let calculateAndDisplayRoute = (directionsService, directionsDisplay) => {

  directionsService.route({
    origin: inputGoing.value,
    destination: inputFinish.value,
    travelMode: 'DRIVING'
  }, (response, status) => {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('No encontramos una ruta.');
    }
  });
};

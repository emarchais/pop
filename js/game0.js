var out; // peut être delete quand tableau refait
var map;
var ArrayLocations;
var allMarkersMap = {};
var currentID = 0;

$.startgame = function(){

  alert ('Startgame v73');

  // RECUP DONNEES DE LA PARTIE QUI SE LANCE
  var xmlhttp = new XMLHttpRequest();
  //var url = "php/gatherAllDataForCurrentGame.php";
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      recupdonneesdujeu(this.responseText);
    }
  }
  //xmlhttp.open("GET", url, true); // FONCTIONNE !
  xmlhttp.open("GET", "php/gatherAllDataForCurrentGame.php?q="+PlayerCurrentGameId, true);
  xmlhttp.send();

  function recupdonneesdujeu(response) {
    ArrayLocations = JSON.parse(response);
      $.PreEventOrActionsScreen();
  }

}

$.PreEventOrActionsScreen = function(){

  ///////////////// DESIGNER LE PRE EVENT LOAD PHP MYSQL dans le gathering du player
  var IncomingEventRequest = 0;
  if (IncomingEventRequest == 1) {
    alert ('lancement incoming event');
    $('#Loading').hide();
    $('#GamesScreen').hide();
    $('#ScreenPreEvent').show();
    $("#IncomingEvent").load("events/event_0.html");
  }
  else {
    // AJOUTER LE NON INCOMING EVENT
    $('#Loading').hide();
    $('#GamesScreen').hide();
    $('#ScreenPreEvent').hide();
    $('#ScreenDecisions').show();
    $("#Decisions").load("home.html");
    //document.getElementById("id01").innerHTML = out;
    // insertion du tableau fait plus haut
    $.launch_main();
  }
}

$.launch_main  = function(){

};


/// Bon à savoir : insérer un scrip :
//$.getScript('js/locations.js', function()
//{ });











  /*
  // XY wrapper
  var yx = L.latLng;
  var xy = function(x, y) {
      if (L.Util.isArray(x)) {    // When doing xy([x, y]);
          return yx(x[1], x[0]);
      }
      return yx(y, x);  // When doing xy(x, y);
  };

  var sol      = xy(175.2, 145.0);
  var mizar    = xy( 41.6, 130.1);
  var kruegerZ = xy( 13.4,  56.5);
  var deneb    = xy(218.7,   8.3);

  L.marker(     sol, {icon: myIcon}).addTo(map).bindPopup("<p><b>Hello world!</b><br>I am a popup.</p><button class='btn btn-default HtmlInser'>Point Map</button>");
  L.marker(   mizar, {icon: myIcon}).addTo(map).bindPopup(    'Mizar');
  L.marker(kruegerZ, {icon: myIcon}).addTo(map).bindPopup('Krueger-Z');
  L.marker(   deneb, {icon: myIcon}).addTo(map).bindPopup(    'Deneb');

  var travel = L.polyline([sol, deneb]).addTo(map);

  var MarkerOptions = {
      fillColor: "#ff7800",
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
  };

  var polygon = L.polygon([
      [100, 100],
      [200, 200],
      [300, 100],
      [300,600],
      [500,800]
  ], MarkerOptions).addTo(map);

  var polygon2;

  $(document).on('click', '.MapCreate', function () {
    polygon2 = L.polygon([[700, 900],[600, 800],[500, 950]]).addTo(map);
  });

  $(document).on('click', '.MapDelete', function () {
    if (polygon2) {
      polygon2.remove();
    }
  });

  $(document).on('click', '.HtmlInser', function () {
    $('#youpi').append("<br>Ok trop cool super");
  });
  */

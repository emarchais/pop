
var PlayerName;
var PlayerCurrentGameId;

$.gatherplayerdata = function(){

  alert('JS version 15');

  $.post("php/gatherPlayersTable.php",{ id1: PlayerId},
  function(data2)
  {
    var json = $.parseJSON(data2);
    PlayerName = json[1];
    PlayerCurrentGameId = json[8];

    $.orientationfirstscreens();

  });
}

$.orientationfirstscreens = function(){

  if (PlayerCurrentGameId == 0) {
    // LE JOUEUR N'A PAS DE GAME ACTIVE, ON RECUPERE GAMES OUVERTES

    //$('#Loading').hide(); FONCTIONNE !
    //$('#GamesScreen').show();

    $.ajax({
      url: 'php/gatherOpenGames.php', data: "", dataType: 'json',  success: function(rows)
      {
        //alert (rows.length);
        if (rows.length == 0) {
          // PAS DE GAME OUVERTE, ON CREE UNE NOUVELLE GAME OUVERTE
          $.createnewopengame();
        }
        else {
          // ON TROUVE DES GAMES OUVERTES, ON LES AFFICHE
          $('#Loading').hide();
          $('#GamesScreen').show();

          for (var i in rows)
          {
            var row = rows[i];
            var id = row[0];
            var name = row[1];
            var number_of_players = row[2];
            var state = row[3];
            var creation_date = row[4];
            var last_activity = row[5];

            //$('#GamesTable').append("<b>id: </b>"+id+"<b> fname: </b>"+name+"<b> lname: </b>"+number_of_players+"<b> email: </b>"+state+"<b> password: </b>"+creation_date+"<b> mobile: </b>"+last_activity+"<b> phone: </b>");

            $('#GamesTable').append("<tr><th>"+id+"</th><th>"+name+"</th><th>"+number_of_players+"</th><th><button class='btn btn-default OpenGameTable' id='"+id+"'>Select this game</button></th></tr>");
          }
        }
      }, error: function(rows)
      {
        alert('Error gathering open games');
      }
    });
  }
  else{
    //LE JOUEUR A UNE GAME ACTIVE, ON LA LANCE
    $.gathergamedata();
  }
}


$.createnewopengame = function(){
  alert ('go create new open game');

  $.post("php/createNewGame.php",{ PlayerID1: PlayerId},
  function(game_created)
  {
    alert('create NEW GAME lancée');
    var json = $.parseJSON(game_created);
    GameID = json[0];
    GameName = json[1];
    GameQuantityPlayers = json[2];
    GameState = json[3];
    alert('gameid : '+ GameID);
    alert('gamename : '+ GameName);
    alert('gamequantityplayers : '+ GameQuantityPlayers);
    alert('gamestate : '+ GameState);
    $.golobbyorstart();
  });

}


// INSCRIPTION A UNE GAME
$(document).on('click', '.OpenGameTable', function () {
    var OpenGameId = this.id; //Get button ID

    $.post("php/registerOpenGame.php",{ PlayerID1: PlayerId, SelectedOpenGameID: OpenGameId},
    function(game_selection)
    {
      PlayerCurrentGameId = OpenGameId; /// ATTENTION PAS TESTE PEUT POSER PROBLEME
      $.gathergamedata();
    });
});


$.gathergamedata = function(){

  /// Gather game info
  /// Game pas commencé : lobby d'attente
  /// Game commencé : screen pre-event

  $.post("php/gatherGamesTable.php",{ id: PlayerCurrentGameId},
  function(data3)
  {
    //alert('PlayerCurrentGameId : ' + PlayerCurrentGameId);
    var json = $.parseJSON(data3);
    GameID = json[0];
    GameName = json[1];
    GameQuantityPlayers = json[2];
    GameState = json[3];

    $.golobbyorstart();
  });
}

$.golobbyorstart = function(){
  if (GameState == 'open') {
    $('#Loading').hide();
    $('#GamesScreen').hide();
    $('#WaitingInGameLobby').show();

    $('#WaitingInGameLobby_Message').append(GameQuantityPlayers+"/8 players");

  }
  else {

    $.startgame();

  }
}

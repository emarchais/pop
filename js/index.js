$(document).ready(function(){
  $("#login").click(function()
  {
    var email = $("#email").val();
    var password = $("#password").val();
    // Checking for blank fields.
    if( email =='' || password =='')
    {
      $('input[type="text"],input[type="password"]').css("border","2px solid red");
      $('input[type="text"],input[type="password"]').css("box-shadow","0 0 3px red");
      alert("Please fill all fields...!!!!!!");
    }else
    {
      $.post("php/index.php",{ email1: email, password1:password},
      function(data)
      {
        if(data=='Invalid Email.......')
        {
          $('input[type="text"]').css({"border":"2px solid red","box-shadow":"0 0 3px red"});
          $('input[type="password"]').css({"border":"2px solid #00F5FF","box-shadow":"0 0 5px #00F5FF"});
          alert(data);
        }
        else if(data=='Email or Password is wrong...!!!!')
        {
          $('input[type="text"],input[type="password"]').css({"border":"2px solid red","box-shadow":"0 0 3px red"});
          alert(data);
        }
        //else if(data=='Successful Login')
        else if(data.indexOf('Successful Login') >= 0)
        {
          $("form")[0].reset();
          $('input[type="text"],input[type="password"]').css({"border":"2px solid #00F5FF","box-shadow":"0 0 5px #00F5FF"});

          PlayerId = data.replace("Successful Login", "");

          //alert("lancement gatherplayerdata");
          //alert(PlayerId);

          $.gatherplayerdata();

          $('#Loading').show();
          $('#Login').hide();



          return false;
        }
        else
        {
          alert(data);
        }
      });
    }
  });
  $('#BtnCreateAccount').click(function()
  {
    window.location.href='registration.html';
  });
});

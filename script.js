$(document).ready(function(){

  //Twitch API query and DOM modification all at once
  function checkstreams(chanid, elm){
    qrystring = "https://wind-bow.gomix.me/twitch-api/streams/" + chanid + "?callback=?";
    $.getJSON(qrystring,function(result){
      console.log(result);
      // console.log(this); //returns getJSON function
      // console.log(elm); //returns passed in argument
      if(result.stream == null){
        $(elm).parent().append("<p>Sorry, not streaming right now.</p>");
      }else{
        $(elm).parent().append("<p>Here is the info!</p>");
      }
    });
  }


// $(this).parent().append(<p>How about trying one of these other streamers?</p>");
// $("#others").show();

  $("#fccresult button").click(function(){
    var elm = this;
    checkstreams("freecodecamp", elm);
  });

  $("#others button").click(function(){
    var elm = this;
    checkstreams("esl_sc2",elm);
  });

});

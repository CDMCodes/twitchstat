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
        if($(elm).parent().hasClass("fcc")){ //special option for fcc button
          $(elm).parent().append("<p>Try one of these other channels</p>")
          $("#others").slideDown("slow",function(){
            //animation complete, do nothing
          })
        }
      }else{
        $(elm).parent().append("<p>Here is the info!</p>");
      }
    });
  }
  $("#fccresult button").click(function(){
    $("#others").hide();
    $(this).siblings().remove();
    var elm = this;
    checkstreams("freecodecamp", elm);
  });

  $("#others button").click(function(){
    $(this).siblings().remove();
    var elm = this;
    checkstreams("esl_sc2",elm);
  });

});

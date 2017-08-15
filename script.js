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
        var infofields = ["game","created_at","stream_type","viewers"];
        // $(elm).parent().append("<p>Game: "+result.stream.game"</p>"+"<p>");
        var htmladd = "";
        infofields.forEach(function(val){
          htmladd +="<p>" + val + ": " + result.stream[val] + "</p>";
        });
        var imgadd = '<a href=' + result.stream.channel.url + ' target="_blank"><img src='+ result.stream.channel.logo + '></a>' ;
        $(elm).parent().append(imgadd)
        $(elm).parent().append(htmladd);
      }
    });
  }
  //should probably make this a reusable function
  $("#fccresult button").click(function(){
    $("#others").hide();
    $(this).siblings().remove();
    var elm = this;
    checkstreams("freecodecamp", elm);
  });

  $("#ESL_SC2 button").click(function(){
    $(this).siblings().remove();
    var elm = this;
    checkstreams("esl_sc2",elm); //use html data attributes for this?
  });

  $("#storbeck button").click(function(){
    $(this).siblings().remove();
    var elm = this;
    checkstreams("storbeck",elm);
  });

  $("#cretetion button").click(function(){
    $(this).siblings().remove();
    var elm = this;
    checkstreams("cretetion",elm);
  });

  $("#RobotCaleb button").click(function(){
    $(this).siblings().remove();
    var elm = this;
    checkstreams("RobotCaleb",elm);
  });

  checkstreams("freecodecamp",$("#fccresult button"))

});

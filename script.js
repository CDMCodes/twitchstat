$(document).ready(function(){

  //Twitch API query and DOM modification all at once
  function checkstreams(chanid, elm){
    qrystring = "https://wind-bow.gomix.me/twitch-api/streams/" + chanid + "?callback=?";
    $.getJSON(qrystring,function(result){
      console.log(result);
      if(result.stream == null){
        $(elm).parent().append("<p>Sorry, not streaming right now.</p>");
        $(elm).parent().addClass("offline");
        if($(elm).parent().hasClass("fcc")){ //special option for fcc button
          $(elm).parent().append("<p>Try one of these other channels</p>")
          $(".others").slideDown("slow",function(){
            //animation complete, do nothing
          })
        }
      }else{
        $(elm).parent().addClass("streaming");
        //better results is to add child div with collapse button,
        // image, and stream details.  That way collapse button could hide it's
        // parent div and still leave the initial button
        $(elm).parent().append("<button class='collapse'>Collapse</button>");

        //Nest image inside anchor linked to stream url
        var imgadd = '<a href=' + result.stream.channel.url + ' target="_blank"><img src='+ result.stream.channel.logo + '></a>' ;
        $(elm).parent().append(imgadd)

        //loop through 4 keys named in this array and grab values for stream info
        var infofields = ["game","created_at","stream_type","viewers"];
        var htmladd = "";
        infofields.forEach(function(val){
          htmladd +="<p>" + val + ": " + result.stream[val] + "</p>";
        });

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

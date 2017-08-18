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
        //Show collapse button, hide query button
        $(elm).parent().find('.collapse').show();
        $(elm).hide();

        //build everything you want to append
        var streamdiv = "";
        //Nest image inside anchor linked to stream url
        var imgadd = '<a href=' + result.stream.channel.url + ' target="_blank"><img src='+ result.stream.channel.logo + '></a>'
        //loop through 4 keys named in this array and grab values for stream info
        var infofields = ["game","created_at","stream_type","viewers"];
        var paradd = "";
        infofields.forEach(function(val){
          paradd +="<p>" + val + ": " + result.stream[val] + "</p>";
        });
        streamdiv = "<div class='strmdetails'>" + imgadd + "<div>" + paradd + "</div></div>";

        $(elm).parent().append(streamdiv);
        $(elm).parent().find('.strmdetails').slideDown();
      }
    });
  }

  //should probably make this a reusable function
  $("#fccresult .query").click(function(){
    $("#others").hide();
    $(this).siblings().remove();
    var elm = this;
    checkstreams("freecodecamp", elm);
  });

  //repeat above but for the 5 other streams
  $("#ESL_SC2 .query").click(function(){
    $(this).siblings('p').remove();
    var elm = this;
    checkstreams("esl_sc2",elm); //use html data attributes for this?
  });

  $("#storbeck .query").click(function(){
    $(this).siblings().remove();
    var elm = this;
    checkstreams("storbeck",elm);
  });

  $("#cretetion .query").click(function(){
    $(this).siblings().remove();
    var elm = this;
    checkstreams("cretetion",elm);
  });

  $("#RobotCaleb .query").click(function(){
    $(this).siblings().remove();
    var elm = this;
    checkstreams("RobotCaleb",elm);
  });

  //collapse button hides all streamdetails divs
  $(".strmbox").on("click",".collapse",function(){
    //hide box then remove it, so next button push doesn't create doubles
    $(".strmdetails").hide('slow',function(){
      $(".strmdetails").remove();
    });
    //hide the collapse button and show the query button again
    $(this).hide();
    $('.query').show();
  });

  checkstreams("freecodecamp",$("#fccresult button"))

});

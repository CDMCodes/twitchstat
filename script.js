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
        //Better tactic is to add child div with collapse button,
        // image, and stream details.  That way collapse button could hide it's
        // parent div and still leave the initial button

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
        streamdiv = "<div class='strmdetails'>" + imgadd + "<div>" + paradd + "</div><button class='collapse'>Collapse</button></div>";
        $(elm).parent().append(streamdiv);
        $(elm).parent().find('.strmdetails').slideDown();
        // var imgadd = '<a href=' + result.stream.channel.url + ' target="_blank"><img src='+ result.stream.channel.logo + '></a>' ;
        // $(elm).parent().append(imgadd)
        // var infofields = ["game","created_at","stream_type","viewers"];
        // var htmladd = "";
        // infofields.forEach(function(val){
        //   htmladd +="<p>" + val + ": " + result.stream[val] + "</p>";
        // });
        // $(elm).parent().append(htmladd);
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

  //repeat above but for the 5 other streams
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

  //collapse button hides all streamdetails divs
  $(".strmbox").on("click",".collapse",function(){
    $(".strmdetails").hide('slow');
  });

  checkstreams("freecodecamp",$("#fccresult button"))

});

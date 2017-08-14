$(document).ready(function(){
  //declare empty variable for API call return
  var streamlist = "";
  //stream API call as standalone function
  function checkstreams(chanid){
    qrystring = "https://wind-bow.gomix.me/twitch-api/streams/" + chanid + "?callback=?";
    $.getJSON(qrystring,function(result){
      console.log(result);
      streamlist = result;
      //need to do something better here
    });
  }

  // checkstreams("freecodecamp");
  // console.log(streamlist);

  $("button").click(function(){
    checkstreams("freecodecamp");
    console.log(streamlist);
    if(streamlist.stream == null){
      $(this).parent().append("<p>Sorry, not streaming right now");
    }else{
      $(this).parent().append("<p>Here is the info!</p>");
    }
  })


});

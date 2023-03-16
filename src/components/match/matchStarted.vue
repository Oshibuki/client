<template>

</template>

<script>
     $(function(){

var matchStatus = 'matchsoon';
var countDownDate;
var countDownStarted = false;
var resultsShown = false;

$('#match_options_div').css('background-image', 'url(dist/img/maps/NavalOutpost.jpg)');
$('#match_options_div').css('background-position', 'center');
$('#match_options_div').css('background-repeat', 'no-repeat');
$('#match_options_div').css('background-size', 'cover');

if($('input[name=match_timer]').val() === 'false'){

    // Keep checking until a numerical value is present
    var	matchTimer = setInterval(function() {

            $('input[name=match_timer]').val(matchTimer);

            $.ajax({
              url: "../matchmaking/timers/EA_CN_05.timer",
              success: function(response){

                matchStatus = response;

                // check if response is a numerical value
                if(!isNaN(matchStatus)){

                    $('#match_timer').css({"color":"#f39c12"});

                      // check if timer has been set already
                      if(countDownStarted === false){
                        countDownDate = new Date();
                        countDownDate.setSeconds(countDownDate.getSeconds() + parseInt(matchStatus, 10));
                        countDownStarted = true;
                      }

                      if (countDownStarted === true) {
                          var now = new Date().getTime();
                          var distance = countDownDate - now;
                          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                          var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                          if (distance < 0) {
                                $("#match_timer").text("...");
                          }else{
                                $("#match_timer").text(minutes + " minute(s) " + seconds + " second(s) ");
                          }
                      }

                }else if (matchStatus == 'matchcancelled') {
                    $('#match_timer').css({"color":"#bf271c"});
                    $("#match_timer").removeClass().addClass('glow-text-red');
                    $("#match_timer").text("The match has been cancelled!");

                    $('#content').css('background-image', 'url(dist/img/wbmm_bg.png)');

                    // Update lobby status menu
                    $("#wbmm_lobby_status").removeClass().addClass('glow-text-red hidden-xs');
                    $('#wbmm_lobby_status').css({"color":"#bf271c"});
                    $("#wbmm_lobby_status").html("MATCH CANCELLED!").css({'opacity':0}).animate({'opacity':1});

                    $('input[name=match_timer]').val('false');
                    clearInterval(matchTimer);
                }else if (matchStatus == 'matchstarted') {
                    $('#match_timer').css({"color":"#00A65A"});
                    $("#match_timer").removeClass().addClass('glow-text-green');
                    $("#match_timer").text("The match has started!");
                }else if ((matchStatus == 'matchresult') && (resultsShown == false)) {
                    $('#match_timer').css({"color":"#0073b7"});
                    $("#match_timer").removeClass().addClass('glow-text-red');
                    $("#match_timer").text("The match has ended!");

                    $('#content').css('background-image', 'url(dist/img/wbmm_bg.png)');

                    // Update lobby status menu
                    $("#wbmm_lobby_status").removeClass().addClass('glow-text-red hidden-xs');
                    $('#wbmm_lobby_status').css({"color":"#0073b7"});
                    $("#wbmm_lobby_status").html("MATCH ENDED!").css({'opacity':0}).animate({'opacity':1});

                        $.ajax({
                            url : "templates/results.php",
                            type: "POST",
                            data:{
                              type: "ended"
                            }
                        }).done(function(response){
                            $("#content").html(response).css({'opacity':0}).animate({'opacity':1});
                            resultsShown = true;
                        });


                }else if (matchStatus == 'matchended') {

                    // Update lobby status menu
                    $("#wbmm_lobby_status").removeClass().addClass('hidden-xs');
                    $('#wbmm_lobby_status').css({"color":"#FFFFFF"});
                    $("#wbmm_lobby_status").html("NOT IN-LOBBY").css({'opacity':0}).animate({'opacity':1});

                    $.ajax({
                            url : "templates/play.php",
                            type: "POST",
                            data:{
                              gamemode: sessionStorage.getItem("gamemode")
                            }
                    }).done(function(response){

                            $('#content').css('background-image', 'url(dist/img/wbmm_bg.png)');
                            $("#content").html(response).css({'opacity':0}).animate({'opacity':1});

                            $('input[name=match_timer]').val('false');
                            clearInterval(matchTimer);
                    });


                }else if (matchStatus == 'matchsoon') {
                    $('#match_timer').css({"color":"#f39c12"});
                    $("#match_timer").removeClass().addClass('glow-text-yellow');
                    $("#match_timer").text("The match will start shortly...");
                }

              },
              cache: false
            });

        }, 500);

}
});
</script>

<style lang="scss" scoped>
</style>

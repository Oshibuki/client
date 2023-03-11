<template>
   <section id="content" class="content container-fluid" style="opacity: 1;">
<script type="text/javascript">
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

<div class="row">
	<div class="col-lg-12">
	    <div class="box bg-default-light" style="color:#fff">
            <div id="match_options_div" class="box-body box-header-border-top" style="background-image: url(&quot;dist/img/maps/NavalOutpost.jpg&quot;); background-position: center center; background-repeat: no-repeat; background-size: cover;">
                <div class="text-center">
                    <h3><span style="font-weight:900;text-shadow: 0px 0px 8px #fff;">WBMM_EA_CN_05</span></h3>
                    <h4><span style="text-shadow:0px 0px 8px #fff;">Naval Outpost</span></h4>
                    <h4><span style="text-shadow:0px 0px 8px #fff;">Sarranids vs Nords</span></h4>
                    <h4><span id="match_timer" class="glow-text-yellow" style="font-weight: 900; color: rgb(243, 156, 18);">1 minute(s) 48 second(s) </span></h4>
                </div>
            </div>
        </div>
	</div>
</div>

<div class="row">

    <div class="col-sm-6">

		<div>
            <h3 style="margin:0; padding:10px;" class="text-center bg-green">TEAM 1</h3>

            <div id="cards" class="text-center bg-default-light">

            <figure id="view_profile" class="card card--peasant">
                            <input name="player_id" type="hidden" value="4946740">
                              <div class="card__image-container">
                                <img style="margin:5px;" src="dist/img/ranks/Peasant.png" width="64" height="64">

                                <h3 class="card__type">Peasant</h3>
                              </div>
                              <figcaption class="card__caption">
                                <h1 class="card__name">Benboba</h1>

                                <table class="card__stats">
                                  <tbody>

                                  <tr>
                                    <th>MMR</th>
                                    <td><b>1000</b></td>
                                  </tr>

                                  <tr>
                                    <th>K/D</th>
                                    <td><b>nan</b></td>
                                  </tr>

                                  <tr>
                                    <th>Win rate</th><td class="text-red">NAN%</td></tr>
                                </tbody></table><div class="card__abilities"><span class="card__label"><img src="dist/img/emblems/top_25.png" title="Achieved a place in the top 25 players of the last season" width="24" height="24"></span><span class="card__label"><img src="dist/img/emblems/battle_bronze.png" title="Achieved third place in the top 25 battle players of the last season" width="24" height="24"></span><span class="card__label"><img src="dist/img/emblems/groupfight_gold.png" title="Achieved first place in the top 25 groupfight players of the last season" width="24" height="24"></span></div>
                              </figcaption>
                            </figure><figure id="view_profile" class="card card--peasant">
                            <input name="player_id" type="hidden" value="5699709">
                              <div class="card__image-container">
                                <img style="margin:5px;" src="dist/img/ranks/Peasant.png" width="64" height="64">

                                <h3 class="card__type">Peasant</h3>
                              </div>
                              <figcaption class="card__caption">
                                <h1 class="card__name">dian_ji_xiao_zi</h1>

                                <table class="card__stats">
                                  <tbody>

                                  <tr>
                                    <th>MMR</th>
                                    <td><b>1000</b></td>
                                  </tr>

                                  <tr>
                                    <th>K/D</th>
                                    <td><b>nan</b></td>
                                  </tr>

                                  <tr>
                                    <th>Win rate</th><td class="text-red">NAN%</td></tr>
                                </tbody></table><div class="card__abilities"><span class="card__label"><small></small></span></div>
                              </figcaption>
                            </figure><figure id="view_profile" class="card card--peasant">
                            <input name="player_id" type="hidden" value="3290582">
                              <div class="card__image-container">
                                <img style="margin:5px;" src="dist/img/ranks/Peasant.png" width="64" height="64">

                                <h3 class="card__type">Peasant</h3>
                              </div>
                              <figcaption class="card__caption">
                                <h1 class="card__name">jmz</h1>

                                <table class="card__stats">
                                  <tbody>

                                  <tr>
                                    <th>MMR</th>
                                    <td><b>1000</b></td>
                                  </tr>

                                  <tr>
                                    <th>K/D</th>
                                    <td><b>nan</b></td>
                                  </tr>

                                  <tr>
                                    <th>Win rate</th><td class="text-red">NAN%</td></tr>
                                </tbody></table><div class="card__abilities"><span class="card__label"><img src="dist/img/emblems/top_25.png" title="Achieved a place in the top 25 players of the last season" width="24" height="24"></span></div>
                              </figcaption>
                            </figure><figure id="view_profile" class="card card--peasant">
                            <input name="player_id" type="hidden" value="5582070">
                              <div class="card__image-container">
                                <img style="margin:5px;" src="dist/img/ranks/Peasant.png" width="64" height="64">

                                <h3 class="card__type">Peasant</h3>
                              </div>
                              <figcaption class="card__caption">
                                <h1 class="card__name">MDadolescent</h1>

                                <table class="card__stats">
                                  <tbody>

                                  <tr>
                                    <th>MMR</th>
                                    <td><b>1000</b></td>
                                  </tr>

                                  <tr>
                                    <th>K/D</th>
                                    <td><b>nan</b></td>
                                  </tr>

                                  <tr>
                                    <th>Win rate</th><td class="text-red">NAN%</td></tr>
                                </tbody></table><div class="card__abilities"><span class="card__label"><small></small></span></div>
                              </figcaption>
                            </figure><figure id="view_profile" class="card card--peasant">
                            <input name="player_id" type="hidden" value="2775553">
                              <div class="card__image-container">
                                <img style="margin:5px;" src="dist/img/ranks/Peasant.png" width="64" height="64">

                                <h3 class="card__type">Peasant</h3>
                              </div>
                              <figcaption class="card__caption">
                                <h1 class="card__name">tiantangshejing</h1>

                                <table class="card__stats">
                                  <tbody>

                                  <tr>
                                    <th>MMR</th>
                                    <td><b>1000</b></td>
                                  </tr>

                                  <tr>
                                    <th>K/D</th>
                                    <td><b>nan</b></td>
                                  </tr>

                                  <tr>
                                    <th>Win rate</th><td class="text-red">NAN%</td></tr>
                                </tbody></table><div class="card__abilities"><span class="card__label"><img src="dist/img/emblems/top_25.png" title="Achieved a place in the top 25 players of the last season" width="24" height="24"></span></div>
                              </figcaption>
                            </figure><figure id="view_profile" class="card card--peasant">
                            <input name="player_id" type="hidden" value="3428029">
                              <div class="card__image-container">
                                <img style="margin:5px;" src="dist/img/ranks/Peasant.png" width="64" height="64">

                                <h3 class="card__type">Peasant</h3>
                              </div>
                              <figcaption class="card__caption">
                                <h1 class="card__name">twomad</h1>

                                <table class="card__stats">
                                  <tbody>

                                  <tr>
                                    <th>MMR</th>
                                    <td><b>1000</b></td>
                                  </tr>

                                  <tr>
                                    <th>K/D</th>
                                    <td><b>nan</b></td>
                                  </tr>

                                  <tr>
                                    <th>Win rate</th><td class="text-red">NAN%</td></tr>
                                </tbody></table><div class="card__abilities"><span class="card__label"><small></small></span></div>
                              </figcaption>
                            </figure>
            </div>
        </div>
    </div>

    <div class="col-sm-6">

		<div>
			<h3 style="margin:0; padding:10px;" class="text-center bg-red">TEAM 2</h3>

			<div id="cards" class="text-center bg-default-light">

            <figure id="view_profile" class="card card--peasant">
                            <input name="player_id" type="hidden" value="1934092">
                            <div class="card__image-container">
                                <img style="margin:5px;" src="dist/img/ranks/Peasant.png" width="64" height="64">

                    <h3 class="card__type">Peasant</h3>
                            </div>
                            <figcaption class="card__caption">
                                <h1 class="card__name">NeverwinterSwor</h1>


                                <table class="card__stats">
                                <tbody>

                                <tr>
                                    <th>MMR</th>
                                    <td><b>1000</b></td>
                                </tr>

                                <tr>
                                    <th>K/D</th>
                                    <td><b>nan</b></td>
                                </tr>

                                <tr>
                                    <th>Win rate</th><td class="text-red">NAN%</td></tr>
                                </tbody></table><div class="card__abilities"><span class="card__label"><small></small></span></div>
                            </figcaption>
                            </figure><figure id="view_profile" class="card card--peasant">
                            <input name="player_id" type="hidden" value="4642268">
                            <div class="card__image-container">
                                <img style="margin:5px;" src="dist/img/ranks/Peasant.png" width="64" height="64">

                    <h3 class="card__type">Peasant</h3>
                            </div>
                            <figcaption class="card__caption">
                                <h1 class="card__name">DaCongMing</h1>


                                <table class="card__stats">
                                <tbody>

                                <tr>
                                    <th>MMR</th>
                                    <td><b>1000</b></td>
                                </tr>

                                <tr>
                                    <th>K/D</th>
                                    <td><b>nan</b></td>
                                </tr>

                                <tr>
                                    <th>Win rate</th><td class="text-red">NAN%</td></tr>
                                </tbody></table><div class="card__abilities"><span class="card__label"><img src="dist/img/emblems/top_25.png" title="Achieved a place in the top 25 players of the last season" width="24" height="24"></span></div>
                            </figcaption>
                            </figure><figure id="view_profile" class="card card--peasant">
                            <input name="player_id" type="hidden" value="1860809">
                            <div class="card__image-container">
                                <img style="margin:5px;" src="dist/img/ranks/Peasant.png" width="64" height="64">

                    <h3 class="card__type">Peasant</h3>
                            </div>
                            <figcaption class="card__caption">
                                <h1 class="card__name">diyuluguan</h1>


                                <table class="card__stats">
                                <tbody>

                                <tr>
                                    <th>MMR</th>
                                    <td><b>1000</b></td>
                                </tr>

                                <tr>
                                    <th>K/D</th>
                                    <td><b>nan</b></td>
                                </tr>

                                <tr>
                                    <th>Win rate</th><td class="text-red">NAN%</td></tr>
                                </tbody></table><div class="card__abilities"><span class="card__label"><img src="dist/img/emblems/top_25.png" title="Achieved a place in the top 25 players of the last season" width="24" height="24"></span><span class="card__label"><img src="dist/img/emblems/top_neutraliser.png" title="Top neutraliser of the last season" width="24" height="24"></span></div>
                            </figcaption>
                            </figure><figure id="view_profile" class="card card--peasant">
                            <input name="player_id" type="hidden" value="4951826">
                            <div class="card__image-container">
                                <img style="margin:5px;" src="dist/img/ranks/Peasant.png" width="64" height="64">

                    <h3 class="card__type">Peasant</h3>
                            </div>
                            <figcaption class="card__caption">
                                <h1 class="card__name">Michael_Jackson</h1>


                                <table class="card__stats">
                                <tbody>

                                <tr>
                                    <th>MMR</th>
                                    <td><b>1000</b></td>
                                </tr>

                                <tr>
                                    <th>K/D</th>
                                    <td><b>nan</b></td>
                                </tr>

                                <tr>
                                    <th>Win rate</th><td class="text-red">NAN%</td></tr>
                                </tbody></table><div class="card__abilities"><span class="card__label"><img src="dist/img/emblems/top_25.png" title="Achieved a place in the top 25 players of the last season" width="24" height="24"></span><span class="card__label"><img src="dist/img/emblems/battle_gold.png" title="Achieved first place in the top 25 battle players of the last season" width="24" height="24"></span><span class="card__label"><img src="dist/img/emblems/top_fast_killer.png" title="Top fast killer of the last season" width="24" height="24"></span></div>
                            </figcaption>
                            </figure><figure id="view_profile" class="card card--peasant">
                            <input name="player_id" type="hidden" value="5195096">
                            <div class="card__image-container">
                                <img style="margin:5px;" src="dist/img/ranks/Peasant.png" width="64" height="64">

                    <h3 class="card__type">Peasant</h3>
                            </div>
                            <figcaption class="card__caption">
                                <h1 class="card__name">RStar</h1>


                                <table class="card__stats">
                                <tbody>

                                <tr>
                                    <th>MMR</th>
                                    <td><b>1000</b></td>
                                </tr>

                                <tr>
                                    <th>K/D</th>
                                    <td><b>nan</b></td>
                                </tr>

                                <tr>
                                    <th>Win rate</th><td class="text-red">NAN%</td></tr>
                                </tbody></table><div class="card__abilities"><span class="card__label"><small></small></span></div>
                            </figcaption>
                            </figure><figure id="view_profile" class="card card--peasant">
                            <input name="player_id" type="hidden" value="2926954">
                            <div class="card__image-container">
                                <img style="margin:5px;" src="dist/img/ranks/Peasant.png" width="64" height="64">

                    <h3 class="card__type">Peasant</h3>
                            </div>
                            <figcaption class="card__caption">
                                <h1 class="card__name">UTD_DH</h1>


                                <table class="card__stats">
                                <tbody>

                                <tr>
                                    <th>MMR</th>
                                    <td><b>1000</b></td>
                                </tr>

                                <tr>
                                    <th>K/D</th>
                                    <td><b>nan</b></td>
                                </tr>

                                <tr>
                                    <th>Win rate</th><td class="text-red">NAN%</td></tr>
                                </tbody></table><div class="card__abilities"><span class="card__label"><small></small></span></div>
                            </figcaption>
                            </figure>
		    </div>

		</div>

    </div>
</div>

  	<div class="modal fade" id="wbmm_profile_modal" style="display:none">
	  <div class="modal-dialog" style="width:630px;">
		<div class="modal-content bg-default-light">
			<div class="modal-header" style="border-bottom: 1px solid #333">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
				  <span style="color:#fff" aria-hidden="true">??</span></button>
				<h4 class="modal-title" id="history_modal_title">Profile</h4>
		  </div>
		  <div id="profile_modal_content" class="modal-body bg-default-light">

		  </div>
		</div>
	  </div>
	</div>

</section>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>

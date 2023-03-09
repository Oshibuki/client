<template>
    <div class="content-wrapper" style="min-height: 874px;">
        <input name="match_timer" type="hidden" value="869">

        <!-- Main content -->
        <section id="content" class="content container-fluid"
         style="opacity: 1; background-image: url(&quot;dist/img/wbmm_bg.png&quot;);">
            <div class="row">
                <div class="col-lg-12">
                    <div class="small-box" style="color:white; box-shadow: none;">
                        <h3 class="text-center"><span class="label text-yellow lb-lg">You will be redirected to queue
                                shortly...</span></h3>
                        <h3 class="text-center">BATTLE</h3>
                        <h3 class="text-center"><span class="text-green">6</span> - <span class="text-red">1</span></h3>

                        <div class="row text-center" id="rank_progress">

                            <div class="col-md-2 vcenter">
                                <div class="info-box-noshadow" style="background:transparent">
                                    <h4 class="strong-text">Current Rank</h4>
                                    <img src="dist/img/ranks/Peasant.png" alt="Current Rank" width="64" height="64">
                                    <p>Peasant</p>
                                </div>
                            </div>

                            <div class="col-md-4 vcenter">

                                <h3 class="text-center"><span class="text-green">+ 47 MMR</span></h3>

                                <div class="glow-progress-bar">

                                    <div class="glow-progress" style="width: 55%;">
                                        <div class="glow"></div>
                                    </div>
                                </div>

                                <span id="mmr_start" class="pull-left label text-white lb-lg strong-text"
                                 style="margin-top:-5px;">800</span>
                                <span id="mmr_text" class="text-center label lb-lg strong-text text-green">1020 MMR</span>
                                <span id="mmr_next" class="pull-right label text-white lb-lg strong-text"
                                 style="margin-top:-5px;">1200</span>

                            </div>

                            <div class="col-md-2 vcenter">
                                <div class="info-box-noshadow" style="background:transparent">

                                    <h4 class="strong-text">Next rank</h4>
                                    <img src="dist/img/ranks/Guard.png" class="grayscale-img" alt="Next Rank" width="64"
                                     height="64">
                                    <p>Guard</p>
                                </div>
                            </div>
                        </div>

                    </div>


                    <div class="row">
                        <div class="col-sm-6">
                            <div class="small-box bg-green" style="margin:0;box-shadow: none;">
                                <p class="text-center" style="margin:0;font-size:26px;font-weight:bold;">TEAM 1</p>
                            </div>


                            <div class="box-body no-padding table-responsive bg-default-light">
                                <table class="table table-responsive table-striped table-condensed">
                                    <thead class="thead-inverse">
                                        <tr>
                                            <th class="text-center" style="width: 4%">#</th>
                                            <th class="text-center" style="width: 10%;">Name</th>
                                            <th class="text-center" style="width: 6%">DMG%</th>
                                            <th class="text-center" style="width: 6%">DMG</th>
                                            <th class="text-center" style="width: 6%">K</th>
                                            <th class="text-center" style="width: 6%">D</th>
                                            <th class="text-center" style="width: 6%">TDMG%</th>
                                            <th class="text-center" style="width: 6%">TDMG</th>
                                            <th class="text-center" style="width: 6%">TK</th>
                                            <th class="text-center" style="width: 6%">Hits</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr style="height: 32px">
                                            <td style="vertical-align:middle;"><span class="label text-white lb-md">1</span>
                                            </td>
                                            <td style="vertical-align:middle;"><span class="label text-white lb-md truncate"
                                                 style="display:inline-block; text-align: left; overflow:visible; width:auto;"
                                                 title="Peasant"><img src="dist/img/ranks/Peasant.png" alt="Peasant"
                                                     width="28" height="28"> tiantangshejing<!--<img--></span></td>
                                            <td style="vertical-align:middle;"><span
                                                 class="label text-green lb-md">28</span></td>
                                            <td style="vertical-align:middle;"><span
                                                 class="label text-white lb-md">244</span></td>
                                            <td style="vertical-align:middle;"><span class="label text-green lb-md">2</span>
                                            </td>
                                            <td style="vertical-align:middle;"><span class="label text-red lb-md">4</span>
                                            </td>
                                            <td style="vertical-align:middle;"><span
                                                 class="label text-yellow lb-md">0</span></td>
                                            <td style="vertical-align:middle;"><span class="label text-white lb-md">0</span>
                                            </td>
                                            <td style="vertical-align:middle;"><span
                                                 class="label text-yellow lb-md">0</span></td>
                                            <td style="vertical-align:middle;"><span class="label text-white lb-md">8</span>
                                            </td>
                                        </tr>
                                        <tr style="height: 32px">
                                            <td style="vertical-align:middle;"><span class="label text-white lb-md">2</span>
                                            </td>
                                            <td style="vertical-align:middle;"><span class="label text-white lb-md truncate"
                                                 style="display:inline-block; text-align: left; overflow:visible; width:auto;"
                                                 title="Peasant"><img src="dist/img/ranks/Peasant.png" alt="Peasant"
                                                     width="28" height="28"> jmz<!--<img--></span></td>
                                            <td style="vertical-align:middle;"><span
                                                 class="label text-green lb-md">23</span></td>
                                            <td style="vertical-align:middle;"><span
                                                 class="label text-white lb-md">195</span></td>
                                            <td style="vertical-align:middle;"><span class="label text-green lb-md">3</span>
                                            </td>
                                            <td style="vertical-align:middle;"><span class="label text-red lb-md">5</span>
                                            </td>
                                            <td style="vertical-align:middle;"><span
                                                 class="label text-yellow lb-md">0</span></td>
                                            <td style="vertical-align:middle;"><span class="label text-white lb-md">0</span>
                                            </td>
                                            <td style="vertical-align:middle;"><span
                                                 class="label text-yellow lb-md">0</span></td>
                                            <td style="vertical-align:middle;"><span class="label text-white lb-md">7</span>
                                            </td>
                                        </tr>
                                        <tr style="height: 32px">
                                            <td style="vertical-align:middle;"><span class="label text-white lb-md">3</span>
                                            </td>
                                            <td style="vertical-align:middle;"><span class="label text-white lb-md truncate"
                                                 style="display:inline-block; text-align: left; overflow:visible; width:auto;"
                                                 title="Peasant"><img src="dist/img/ranks/Peasant.png" alt="Peasant"
                                                     width="28" height="28"> MDadolescent<!--<img--></span></td>
                                            <td style="vertical-align:middle;"><span
                                                 class="label text-green lb-md">22</span></td>
                                            <td style="vertical-align:middle;"><span
                                                 class="label text-white lb-md">188</span></td>
                                            <td style="vertical-align:middle;"><span class="label text-green lb-md">2</span>
                                            </td>
                                            <td style="vertical-align:middle;"><span class="label text-red lb-md">5</span>
                                            </td>
                                            <td style="vertical-align:middle;"><span
                                                 class="label text-yellow lb-md">0</span></td>
                                            <td style="vertical-align:middle;"><span class="label text-white lb-md">0</span>
                                            </td>
                                            <td style="vertical-align:middle;"><span
                                                 class="label text-yellow lb-md">0</span></td>
                                            <td style="vertical-align:middle;"><span class="label text-white lb-md">6</span>
                                            </td>
                                        </tr>
                                        <tr style="height: 32px">
                                            <td style="vertical-align:middle;"><span class="label text-white lb-md">4</span>
                                            </td>
                                            <td style="vertical-align:middle;"><span class="label text-white lb-md truncate"
                                                 style="display:inline-block; text-align: left; overflow:visible; width:auto;"
                                                 title="Peasant"><img src="dist/img/ranks/Peasant.png" alt="Peasant"
                                                     width="28" height="28"> DaCongMing<!--<img--></span></td>
                                            <td style="vertical-align:middle;"><span
                                                 class="label text-green lb-md">13</span></td>
                                            <td style="vertical-align:middle;"><span
                                                 class="label text-white lb-md">110</span></td>
                                            <td style="vertical-align:middle;"><span class="label text-green lb-md">4</span>
                                            </td>
                                            <td style="vertical-align:middle;"><span class="label text-red lb-md">4</span>
                                            </td>
                                            <td style="vertical-align:middle;"><span
                                                 class="label text-yellow lb-md">0</span></td>
                                            <td style="vertical-align:middle;"><span class="label text-white lb-md">0</span>
                                            </td>
                                            <td style="vertical-align:middle;"><span
                                                 class="label text-yellow lb-md">0</span></td>
                                            <td style="vertical-align:middle;"><span class="label text-white lb-md">7</span>
                                            </td>
                                        </tr>
                                        <tr style="height: 32px">
                                            <td style="vertical-align:middle;"><span class="label text-white lb-md">5</span>
                                            </td>
                                            <td style="vertical-align:middle;"><span class="label text-white lb-md truncate"
                                                 style="display:inline-block; text-align: left; overflow:visible; width:auto;"
                                                 title="Peasant"><img src="dist/img/ranks/Peasant.png" alt="Peasant"
                                                     width="28" height="28"> RStar<!--<img--></span></td>
                                            <td style="vertical-align:middle;"><span
                                                 class="label text-green lb-md">12</span></td>
                                            <td style="vertical-align:middle;"><span
                                                 class="label text-white lb-md">104</span></td>
                                            <td style="vertical-align:middle;"><span class="label text-green lb-md">1</span>
                                            </td>
                                            <td style="vertical-align:middle;"><span class="label text-red lb-md">4</span>
                                            </td>
                                            <td style="vertical-align:middle;"><span
                                                 class="label text-yellow lb-md">0</span></td>
                                            <td style="vertical-align:middle;"><span class="label text-white lb-md">0</span>
                                            </td>
                                            <td style="vertical-align:middle;"><span
                                                 class="label text-yellow lb-md">0</span></td>
                                            <td style="vertical-align:middle;"><span class="label text-white lb-md">5</span>
                                            </td>
                                        </tr>
                                        <tr style="height: 32px">
                                            <td style="vertical-align:middle;"><span class="label text-white lb-md">6</span>
                                            </td>
                                            <td style="vertical-align:middle;"><span class="label text-white lb-md truncate"
                                                 style="display:inline-block; text-align: left; overflow:visible; width:auto;"
                                                 title="Peasant"><img src="dist/img/ranks/Peasant.png" alt="Peasant"
                                                     width="28" height="28"> dian_ji_xiao_zi<!--<img--></span></td>
                                            <td style="vertical-align:middle;"><span class="label text-green lb-md">2</span>
                                            </td>
                                            <td style="vertical-align:middle;"><span
                                                 class="label text-white lb-md">21</span></td>
                                            <td style="vertical-align:middle;"><span class="label text-green lb-md">0</span>
                                            </td>
                                            <td style="vertical-align:middle;"><span class="label text-red lb-md">4</span>
                                            </td>
                                            <td style="vertical-align:middle;"><span
                                                 class="label text-yellow lb-md">0</span></td>
                                            <td style="vertical-align:middle;"><span class="label text-white lb-md">0</span>
                                            </td>
                                            <td style="vertical-align:middle;"><span
                                                 class="label text-yellow lb-md">0</span></td>
                                            <td style="vertical-align:middle;"><span class="label text-white lb-md">2</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="col-sm-6">
                            <div class="small-box bg-red" style="margin:0;box-shadow: none;">
                                <p class="text-center" style="margin:0;font-size:26px;font-weight:bold;">TEAM 2</p>
                            </div>


                            <div class="box-body no-padding table-responsive bg-default-light">
                                <table class="table table-striped table-responsive table-condensed">
                                    <thead class="thead-inverse">
                                        <tr>
                                            <th class="text-center" style="width: 7%">Hits</th>
                                            <th class="text-center" style="width: 7%">TK</th>
                                            <th class="text-center" style="width: 7%">TDMG</th>
                                            <th class="text-center" style="width: 7%">TDMG%</th>
                                            <th class="text-center" style="width: 7%">D</th>
                                            <th class="text-center" style="width: 7%">K</th>
                                            <th class="text-center" style="width: 7%">DMG</th>
                                            <th class="text-center" style="width: 7%">DMG%</th>
                                            <th class="text-center" style="width: 20%;">Name</th>
                                            <th class="text-center" style="width: 5%">#</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr style="height: 32px">
                                            <td style="vertical-align:middle;"><span
                                                 class="label text-white lb-md">20</span></td>
                                            <td style="vertical-align:middle;"><span
                                                 class="label text-yellow lb-md">0</span></td>
                                            <td style="vertical-align:middle;"><span
                                                 class="label text-white lb-md">25</span></td>
                                            <td style="vertical-align:middle;"><span
                                                 class="label text-yellow lb-md">20</span></td>
                                            <td style="vertical-align:middle;"><span class="label text-red lb-md">0</span>
                                            </td>
                                            <td style="vertical-align:middle;"><span class="label text-green lb-md">8</span>
                                            </td>
                                            <td style="vertical-align:middle;"><span
                                                 class="label text-white lb-md">390</span></td>
                                            <td style="vertical-align:middle;"><span
                                                 class="label text-green lb-md">24</span></td>
                                            <td style="vertical-align:middle;"><span class="label text-white lb-md truncate"
                                                 style="display:inline-block; text-align: right; overflow:visible; width:auto;"
                                             title="Peasant">Michael_Jackson <img src="dist/img/ranks/Peasant.png"
                                                 alt="Rank Image" width="28" height="28"></span></td>
                                        <td style="vertical-align:middle;"><span class="label text-white lb-md">1</span>
                                        </td>
                                    </tr>
                                    <tr style="height: 32px">
                                        <td style="vertical-align:middle;"><span
                                             class="label text-white lb-md">15</span></td>
                                        <td style="vertical-align:middle;"><span
                                             class="label text-yellow lb-md">1</span></td>
                                        <td style="vertical-align:middle;"><span
                                             class="label text-white lb-md">56</span></td>
                                        <td style="vertical-align:middle;"><span
                                             class="label text-yellow lb-md">44</span></td>
                                        <td style="vertical-align:middle;"><span class="label text-red lb-md">1</span>
                                        </td>
                                        <td style="vertical-align:middle;"><span class="label text-green lb-md">5</span>
                                        </td>
                                        <td style="vertical-align:middle;"><span
                                             class="label text-white lb-md">389</span></td>
                                        <td style="vertical-align:middle;"><span
                                             class="label text-green lb-md">24</span></td>
                                        <td style="vertical-align:middle;"><span class="label text-white lb-md truncate"
                                             style="display:inline-block; text-align: right; overflow:visible; width:auto;"
                                             title="Peasant">twomad <img src="dist/img/ranks/Peasant.png"
                                                 alt="Rank Image" width="28" height="28"></span></td>
                                        <td style="vertical-align:middle;"><span class="label text-white lb-md">2</span>
                                        </td>
                                    </tr>
                                    <tr style="height: 32px">
                                        <td style="vertical-align:middle;"><span
                                             class="label text-white lb-md">21</span></td>
                                        <td style="vertical-align:middle;"><span
                                             class="label text-yellow lb-md">0</span></td>
                                        <td style="vertical-align:middle;"><span class="label text-white lb-md">3</span>
                                        </td>
                                        <td style="vertical-align:middle;"><span
                                             class="label text-yellow lb-md">2</span></td>
                                        <td style="vertical-align:middle;"><span class="label text-red lb-md">3</span>
                                        </td>
                                        <td style="vertical-align:middle;"><span class="label text-green lb-md">7</span>
                                        </td>
                                        <td style="vertical-align:middle;"><span
                                             class="label text-white lb-md">375</span></td>
                                        <td style="vertical-align:middle;"><span
                                             class="label text-green lb-md">23</span></td>
                                        <td style="vertical-align:middle;"><span class="label text-white lb-md truncate"
                                             style="display:inline-block; text-align: right; overflow:visible; width:auto;"
                                             title="Peasant">Benboba <img src="dist/img/ranks/Peasant.png"
                                                 alt="Rank Image" width="28" height="28"></span></td>
                                        <td style="vertical-align:middle;"><span class="label text-white lb-md">3</span>
                                        </td>
                                    </tr>
                                    <tr style="height: 32px" class="bg-black">
                                        <td style="vertical-align:middle;"><span class="label text-white lb-md">7</span>
                                        </td>
                                        <td style="vertical-align:middle;"><span
                                             class="label text-yellow lb-md">0</span></td>
                                        <td style="vertical-align:middle;"><span class="label text-white lb-md">0</span>
                                        </td>
                                        <td style="vertical-align:middle;"><span
                                             class="label text-yellow lb-md">0</span></td>
                                        <td style="vertical-align:middle;"><span class="label text-red lb-md">2</span>
                                        </td>
                                        <td style="vertical-align:middle;"><span class="label text-green lb-md">4</span>
                                        </td>
                                        <td style="vertical-align:middle;"><span
                                             class="label text-white lb-md">227</span></td>
                                        <td style="vertical-align:middle;"><span
                                             class="label text-green lb-md">14</span></td>
                                        <td style="vertical-align:middle;"><span class="label text-white lb-md truncate"
                                             style="display:inline-block; text-align: right; overflow:visible; width:auto;"
                                             title="Peasant">NeverwinterSwor <img src="dist/img/ranks/Peasant.png"
                                                 alt="Rank Image" width="28" height="28"></span></td>
                                        <td style="vertical-align:middle;"><span class="label text-white lb-md">4</span>
                                        </td>
                                    </tr>
                                    <tr style="height: 32px">
                                        <td style="vertical-align:middle;"><span class="label text-white lb-md">8</span>
                                        </td>
                                        <td style="vertical-align:middle;"><span
                                             class="label text-yellow lb-md">0</span></td>
                                        <td style="vertical-align:middle;"><span class="label text-white lb-md">0</span>
                                        </td>
                                        <td style="vertical-align:middle;"><span
                                             class="label text-yellow lb-md">0</span></td>
                                        <td style="vertical-align:middle;"><span class="label text-red lb-md">3</span>
                                        </td>
                                        <td style="vertical-align:middle;"><span class="label text-green lb-md">2</span>
                                        </td>
                                        <td style="vertical-align:middle;"><span
                                             class="label text-white lb-md">189</span></td>
                                        <td style="vertical-align:middle;"><span
                                             class="label text-green lb-md">11</span></td>
                                        <td style="vertical-align:middle;"><span class="label text-white lb-md truncate"
                                             style="display:inline-block; text-align: right; overflow:visible; width:auto;"
                                             title="Peasant">Baimayinqiang <img src="dist/img/ranks/Peasant.png"
                                                 alt="Rank Image" width="28" height="28"></span></td>
                                        <td style="vertical-align:middle;"><span class="label text-white lb-md">5</span>
                                        </td>
                                    </tr>
                                    <tr style="height: 32px">
                                        <td style="vertical-align:middle;"><span class="label text-white lb-md">3</span>
                                        </td>
                                        <td style="vertical-align:middle;"><span
                                             class="label text-yellow lb-md">0</span></td>
                                        <td style="vertical-align:middle;"><span
                                             class="label text-white lb-md">44</span></td>
                                        <td style="vertical-align:middle;"><span
                                             class="label text-yellow lb-md">34</span></td>
                                        <td style="vertical-align:middle;"><span class="label text-red lb-md">4</span>
                                        </td>
                                        <td style="vertical-align:middle;"><span class="label text-green lb-md">0</span>
                                        </td>
                                        <td style="vertical-align:middle;"><span
                                             class="label text-white lb-md">74</span></td>
                                        <td style="vertical-align:middle;"><span class="label text-green lb-md">5</span>
                                        </td>
                                        <td style="vertical-align:middle;"><span class="label text-white lb-md truncate"
                                             style="display:inline-block; text-align: right; overflow:visible; width:auto;"
                                             title="Peasant">UTD_DH <img src="dist/img/ranks/Peasant.png"
                                                 alt="Rank Image" width="28" height="28"></span></td>
                                        <td style="vertical-align:middle;"><span class="label text-white lb-md">6</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>

    <div class="modal fade" id="wbmm_modal" style="display: none;">
        <div class="modal-dialog" style="width:60%">
            <div class="modal-content">
                <div class="modal-header bg-gray-darker">
                    <button type="button" class="close" data-dismiss="modal"><i class="fas fa-times"
                         style="color:#fff"></i></button>
                    <h4 class="modal-title" id="modal_title" style="font-weight:bold;">WBMM</h4>
                </div>
                <div class="modal-body bg-gray-dark">
                    <p id="modal_status"></p>
                </div>
                <div class="modal-footer bg-gray-darker">
                    <button type="button" class="btn btn-main pull-right" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="wbmm_profile_modal" style="display:none">
        <div class="modal-dialog" style="width:630px;">
            <div class="modal-content">
                <div class="modal-header bg-gray-darker">
                    <button type="button" class="close" data-dismiss="modal"><i class="fas fa-times"
                         style="color:#fff"></i></button>
                    <h3 class="modal-title" id="history_modal_title" style="font-weight:bold;">Profile</h3>
                </div>
                <div id="profile_modal_content" class="modal-body bg-gray-dark"></div>
                <div class="modal-footer bg-gray-darker">
                    <button type="button" class="btn btn-main pull-right" data-dismiss="modal"><b>Close</b></button>
                </div>
            </div>
        </div>
    </div>

</div></template>

<script>
        $(function(){
	
    var audioScoreCounter = document.createElement('audio');
    audioScoreCounter.setAttribute('src', 'dist/sounds/score_counter.mp3');
    audioScoreCounter.volume = 0.25;
    audioScoreCounter.autoPlay = false;
    audioScoreCounter.loop = true;
    audioScoreCounter.preLoad = false;
    audioScoreCounter.controls = false;
                
    var audioLevelUp = document.createElement('audio');
    audioLevelUp.setAttribute('src', 'dist/sounds/level_up.mp3');
    audioLevelUp.volume = 0.25;
    audioLevelUp.autoPlay = false;
    audioLevelUp.preLoad = false;
    audioLevelUp.controls = false;

    var rankImage = $(".grayscale-img");
    var progressBar = $(".glow-progress");
    var currentPercent = 43;
    var newPercent = 55;
    var position = true;
    var mmrValue = 973;
    var mmrFinalValue = 1020;
    var mmrPerPercent = 4;

    var progressTick = setInterval(function() {
        if(currentPercent >= newPercent && position === true){
            if(currentPercent >= 100){
                rankImage.css({
                    '-webkit-filter': 'grayscale(0)',
                    'filter': 'grayscale(0)'
                });
            
                rankImage.effect('bounce', 3000);
                progressBar.effect('highlight', {color: '#00A65A'}, 2000);
                audioLevelUp.play();

            }else
                progressBar.effect('highlight', {color: '#00A65A'}, 2000);
        
            $("#mmr_text").html(mmrFinalValue + " MMR");
            audioScoreCounter.pause();	
            clearInterval(progressTick);
        
        }else if(newPercent <= currentPercent && position === false){
            progressBar.effect('highlight', {color: '#DD4B39'}, 2000);
        
            $("#mmr_text").html(mmrFinalValue + " MMR");
            audioScoreCounter.pause();	
            clearInterval(progressTick);
        
        }else{
            
            if(audioScoreCounter.currentTime == 0){
            
                if(position == true)
                    $("#mmr_text").removeClass("text-white").addClass("text-green");
                else if(position == false)
                    $("#mmr_text").removeClass("text-white").addClass("text-red");
            
                audioScoreCounter.play();
            }

            if(position == true){
                currentPercent = currentPercent + 1;
                progressBar.width(currentPercent + "%");
                mmrValue = mmrValue + mmrPerPercent;
            }else if(position == false){
                newPercent = newPercent - 1;
                progressBar.width(newPercent + "%");
                mmrValue = mmrValue - mmrPerPercent;
            }	
        
            $("#mmr_text").html(mmrValue + " MMR");			
        }
    }, 100);

});
</script>

<style lang="scss" scoped>
</style>

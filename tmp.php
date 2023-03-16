<?php
session_start();

if (isset($_SESSION['UID']))
{
    session_write_close();

    $uid = $_SESSION['UID'];

    $link = mysqli_connect("127.0.0.1", "root", "LujcHZT8q7ie2a3c", "wbmm");

    // Check connection
    if ($link === false) die("Could not connect. " . mysqli_connect_error());

    function GetRank($user_mmr)
    {
        if ($user_mmr < 1200) return 'Peasant';
        elseif (($user_mmr >= 1200) && ($user_mmr < 1400)) return 'Guard';
        elseif (($user_mmr >= 1400) && ($user_mmr < 1600)) return 'Knight';
        elseif (($user_mmr >= 1600) && ($user_mmr < 1800)) return 'Master Knight';
        elseif (($user_mmr >= 1800) && ($user_mmr < 2000)) return 'Lord';
        elseif (($user_mmr >= 2000) && ($user_mmr < 2500)) return 'Duke';
        elseif (($user_mmr >= 2500) && ($user_mmr < 3000)) return 'Prince';
        elseif (($user_mmr >= 3000) && ($user_mmr < 4000)) return 'King';
        elseif (($user_mmr > 4000)) return 'Emperor';
    }

    // Check if im queued already and retrieve Lobby ID
    $sql = "SELECT LobbyID, Name, LobbyStatus FROM active_lobby WHERE UID = $uid;";
    $query = mysqli_query($link, $sql);

    if (!$query)
    {
        return '0:' . 'SQL Error: ' . mysqli_error($link);
    }
    // Check if user is in queue, proceed with showing lobby
    if (mysqli_num_rows($query) == 1)
    {

        $row = mysqli_fetch_assoc($query);
        $lobbyid = $row['LobbyID'];
        $myname = $row['Name'];
        $mystatus = $row['LobbyStatus'];

        // Retrieve lobby information
        $sql = "SELECT Gamemode, Faction1, Faction2, Map, LobbyFull, LobbyReady, MatchStarted FROM servers WHERE LobbyID = '$lobbyid';";

        $query = mysqli_query($link, $sql);

        if (!$query)
        {
            die('SQL Error: ' . mysqli_error($link));
        }

        $row = mysqli_fetch_assoc($query);
        $gamemode = $row['Gamemode'];
        $faction1 = $row['Faction1'];
        $faction2 = $row['Faction2'];
        $map = $row['Map'];
        $mapbg = preg_replace("/[ ']+/", '', trim($map));
        $lobbyfull = $row['LobbyFull'];
        $lobbyready = $row['LobbyReady'];
        $matchstarted = $row['MatchStarted'];

        // Total friends
        $sql = "SELECT COUNT(FriendUID) AS TotalFriends FROM active_lobby WHERE LobbyID = '$lobbyid' AND FriendUID <> 0;";

        $query = mysqli_query($link, $sql);

        if (!$query)
        {
            die('SQL Error: ' . mysqli_error($link));
        }

        $row = mysqli_fetch_assoc($query);

        $totalfriends = $row['TotalFriends'];

        // Load all lobby players
        $sql = "SELECT UID, FriendUID, Name, MMR, Team, LobbyStatus FROM active_lobby WHERE LobbyID = '$lobbyid' ORDER BY (Name = '$myname') DESC, Name ASC;";

        $query = mysqli_query($link, $sql);

        if (!$query)
        {
            die('SQL Error: ' . mysqli_error($link));
        }

        $row = mysqli_fetch_assoc($query);

        $mylobbystatus = $row['LobbyStatus'];
        $lobbycount = mysqli_num_rows($query);

        if ($matchstarted == 1)
        {
?>

<script type="text/javascript">
$(function(){
 
 // clear all previous timers
 var highestTimeoutId = setTimeout(";");
 for (var i = 0 ; i < highestTimeoutId ; i++) {
  clearTimeout(i); 
 }
 
 var matchStatus = 'matchsoon';
 var countDownDate;
 var countDownStarted = false;
 var resultsShown = false;

 $('.map-bg').css('background-image', 'url(dist/img/maps/<? echo $mapbg . '.jpg'; ?>)');
  
 // Keep checking until a numerical value is present
 var matchTimer = setInterval(function() {
   
   $.ajax({
     url: "matchmaking/timers/<? echo $lobbyid . '.timer'; ?>",
     success: function(response){
      
    matchStatus = response;
       
    // check if response is a numerical value
    if(!isNaN(matchStatus)){
     
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
     $('#match_timer').css({"color":"#f39c12"});
     $("#match_timer").text("The match has been cancelled!");
     clearInterval(matchTimer);
    }else if (matchStatus == 'matchstarted') {
     $('#match_timer').css({"color":"#00A65A"});
     $("#match_timer").text("The match has started!");
    }else if ((matchStatus == 'matchresult') && (resultsShown == false)) {
     $('#match_timer').css({"color":"#00A65A"});
     $("#match_timer").text("The match has ended!");
     
      $.ajax({
       url : "templates/results.php",
       type: "POST", 
       data:{
         type: "ended"
       }
      }).done(function(response){ 
       
       $("#content").html(response).css({'opacity':0}).animate({'opacity':1});;
       
      });
      
     resultsShown = true;
    }else if (matchStatus == 'matchended') {
     $('#match_timer').css({"color":"#00A65A"});
     $("#match_timer").text("The match has ended!");
     $("#content").load("templates/play.php").css({'opacity':0}).animate({'opacity':1});
     clearInterval(matchTimer);
    }else if (matchStatus == 'matchsoon') {
     $('#match_timer').css({"color":"#f39c12"});
     $("#match_timer").text("The match will start shortly...");
    }
      
     },
     cache: false
   });

  }, 500);
});
</script>

<!-- Match started -->

<div class="row map-bg">
 <div class="col-lg-12 col-xs-6">
   <div class="small-box" style="color:#FFF;">
    <div class="inner text-center "><h3><? echo $faction1 . " VS " . $faction2; ?></h3><small><? echo $map; ?></small></div>
    <div class="inner text-center"><h3>SERVER: <? echo 'WBMM_' . $lobbyid; ?></h3><h4><b><span id="match_timer">...</span></b></h4></div>
  <!-- /.info-box-content -->
   </div>
   <!-- /.info-box -->
 </div>
</div>

  <div class="row">
  
    <div class="col-sm-6">
 
    <div class="small-box bg-green">
     <div class="inner text-center"><h3>TEAM 1</h3></div>
   <!-- /.info-box-content -->
    </div>
 
<?
            mysqli_data_seek($query, 0);
            while ($row = mysqli_fetch_assoc($query))
            {
                $playeruid = $row['UID'];
                $name = $row['Name'];
                $mmr = $row['MMR'];
                $team = $row['Team'];
                $frienduid = $row['FriendUID'];

                if ($team == 1)
                {

                    echo '<div class="info-box bg-gray-darkest">
      <span class="info-box-icon bg-gray-dark">
       <img src="dist/img/ranks/' . GetRank($mmr) . '.png" width="64" height="64">
      </span>
      <div class="info-box-content bg-gray-darkest">';

                    if ($frienduid != 0) echo '<div class="pull-right"><img src="dist/img/emblems/duo_team1.png" width="24" height="24" title="Duo"></div>';

                    echo '<span class="info-box-number"><b>' . $name . '</b></span>
        <span class="info-box-text"><b>' . GetRank($mmr) . ' - ' . $mmr . '</b></span>';

                    // show player achievements
                    $sql = "SELECT Top25, TopGold, TopSilver, TopBronze, TopGroupfight, TopDuel FROM season_stats WHERE UID = $playeruid;";

                    $achievements_query = mysqli_query($link, $sql);

                    if (!$achievements_query)
                    {
                        die('SQL Error: ' . mysqli_error($link));
                    }

                    $achievements_row = mysqli_fetch_assoc($achievements_query);

                    $top25 = $achievements_row['Top25'];
                    $topgold = $achievements_row['TopGold'];
                    $topsilver = $achievements_row['TopSilver'];
                    $topbronze = $achievements_row['TopBronze'];
                    $topgroupfight = $achievements_row['TopGroupfight'];
                    $topduel = $achievements_row['TopDuel'];

                    if ($topduel == true) echo '<span class="pull-right"><img src="dist/img/emblems/top_duel.png" width="24" height="24" title="Achieved first place in duels last season"></span>';
                    if ($topgroupfight == true) echo '<span class="pull-right"><img src="dist/img/emblems/top_groupfight.png" width="24" height="24" title="Achieved first place in groupfights last season"></span>';
                    if ($topgold == true) echo '<span class="pull-right"><img src="dist/img/emblems/gold_medal.png" width="24" height="24" title="Achieved first place in battles last season"></span>';
                    if ($topsilver == true) echo '<span class="pull-right"><img src="dist/img/emblems/silver_medal.png" width="24" height="24" title="Achieved second place in battles last season"></span>';
                    if ($topbronze == true) echo '<span class="pull-right"><img src="dist/img/emblems/bronze_medal.png" width="24" height="24" title="Achieved third place in battles last season"></span>';
                    if ($top25 == true) echo '<span class="pull-right"><img src="dist/img/emblems/top_25.png" width="24" height="24" title="Top 25 in battles last season"></span>';

                    echo '</div>
       </div>';

                }
            }
?>
   
   
    </div>
 
    <div class="col-sm-6">
 
    <div class="small-box bg-red">
     <div class="inner text-center"><h3>TEAM 2</h3></div>
   <!-- /.info-box-content -->
    </div>
<?
            mysqli_data_seek($query, 0);

            while ($row = mysqli_fetch_assoc($query))
            {
                $playeruid = $row['UID'];
                $name = $row['Name'];
                $mmr = $row['MMR'];
                $team = $row['Team'];
                $frienduid = $row['FriendUID'];

                if ($team == 2)
                {

                    echo '<div class="info-box bg-gray-darkest">
      <span class="info-box-icon bg-gray-dark">
       <img src="dist/img/ranks/' . GetRank($mmr) . '.png" width="64" height="64">
      </span>

      <div class="info-box-content">';

                    if ($frienduid != 0) echo '<div class="pull-right"><img src="dist/img/emblems/duo_team2.png" width="24" height="24" title="Duo"></div>';

                    echo '<span class="info-box-number"><b>' . $name . '</b></span>
        <span class="info-box-text"><b>' . GetRank($mmr) . ' - ' . $mmr . '</b></span>';

                    // show player achievements
                    $sql = "SELECT Top25, TopGold, TopSilver, TopBronze, TopGroupfight, TopDuel FROM season_stats WHERE UID = $playeruid;";

                    $achievements_query = mysqli_query($link, $sql);

                    if (!$achievements_query)
                    {
                        die('SQL Error: ' . mysqli_error($link));
                    }

                    $achievements_row = mysqli_fetch_assoc($achievements_query);

                    $top25 = $achievements_row['Top25'];
                    $topgold = $achievements_row['TopGold'];
                    $topsilver = $achievements_row['TopSilver'];
                    $topbronze = $achievements_row['TopBronze'];
                    $topgroupfight = $achievements_row['TopGroupfight'];
                    $topduel = $achievements_row['TopDuel'];

                    if ($topduel == true) echo '<span class="pull-right"><img src="dist/img/emblems/top_duel.png" width="24" height="24" title="Achieved first place in duels last season"></span>';
                    if ($topgroupfight == true) echo '<span class="pull-right"><img src="dist/img/emblems/top_groupfight.png" width="24" height="24" title="Achieved first place in groupfights last season"></span>';
                    if ($topgold == true) echo '<span class="pull-right"><img src="dist/img/emblems/gold_medal.png" width="24" height="24" title="Achieved first place in battles last season"></span>';
                    if ($topsilver == true) echo '<span class="pull-right"><img src="dist/img/emblems/silver_medal.png" width="24" height="24" title="Achieved second place in battles last season"></span>';
                    if ($topbronze == true) echo '<span class="pull-right"><img src="dist/img/emblems/bronze_medal.png" width="24" height="24" title="Achieved third place in battles last season"></span>';
                    if ($top25 == true) echo '<span class="pull-right"><img src="dist/img/emblems/top_25.png" width="24" height="24" title="Top 25 in battles last season"></span>';

                    echo '</div>
       </div>';

                }
            }
?>
   
   
    </div>
  </div>
 
<?
        }
        else
        {

?> 
<div class="row">
  <div class="col-lg-12 col-xs-6">
    <div class="small-box bg-gray-darker">
     <div class="inner"><h3>Matchmaking</h3><small>WBMM Web version 1.5</small></div>
   <!-- /.info-box-content -->
    </div>
    <!-- /.info-box -->
  </div>
</div> 

<!-- Lobby -->
<div class="row">
 <div class="col-xs-12">
   <div class="box box-primary">
   
     <div class="box-header with-border bg-gray-darker">
     <h3 class="box-title"><b>Lobby - <? echo $lobbyid; ?></b></h3>
     <div class="box-tools pull-right">
     
    <span class="label label-success">Total friends: <? echo $totalfriends; ?></span>
     </div><!-- /.box-tools -->
   </div><!-- /.box-header -->

    <div class="box-body bg-gray-darker">
    
   <div class="row">
    <div class="col-lg-12 col-xs-6 text-center">
     <div class="info-box bg-gray-dark">
      <div class="info-box-content">
       <div class="inner text-center">
        <div id="lobby_status">
        <?
            if ($mylobbystatus == 1) echo '<h2><span class="text-green" style="font-weight:bold;">WAITING FOR PLAYERS TO ACCEPT</span></h2>';
            else echo '<h1>' . $lobbycount . '/' . $gamemode . ' PLAYERS IN THE LOBBY</h1>';
?>
        </div>
        
       </div>
      </div>
      </div>
    </div>
   </div>
   
   <div id="lobby_players" class="row">
   
<?
            mysqli_data_seek($query, 0);
            while ($row = mysqli_fetch_assoc($query))
            {
                $frienduid = $row['FriendUID'];
                $name = $row['Name'];
                $mmr = $row['MMR'];
                $lobbystatus = $row['LobbyStatus'];

                if ($name == $myname || $uid == $frienduid)
                {

                    if ($gamemode > 6)
                    // Battle mode template
                    echo '<div class="col-md-3">';
                    else if ($gamemode == 6)
                    // Groupfight mode template
                    echo '<div class="col-md-4">';

                    else if ($gamemode == 2)
                    // Duel mode template
                    echo '<div class="col-md-3 center-block" style="float:none;">';

                    echo '<div class="info-box bg-gray-darker" style="border: 1px solid #444;">';

                    if ($lobbystatus == 1) echo '<span class="info-box-icon bg-green">';
                    else echo '<span class="info-box-icon bg-gray-dark">';

                    echo '<img src="dist/img/ranks/' . GetRank($mmr) . '.png" width="64" height="64">
      </span>
      
      <div class="info-box-content">
        <span class="info-box-text"><big><b>' . $name . '</b></big></span>
        <span class="info-box-number"><b>' . GetRank($mmr) . ' - ' . $mmr . '</b></span>';

                    echo '
      </div>
       </div>
     </div>';

                }
                else
                {

                    // invisible player details
                    if ($gamemode > 6)
                    // Battle mode template
                    echo '<div class="col-md-3">';
                    else if ($gamemode == 6)
                    // Groupfight mode template
                    echo '<div class="col-md-4">';

                    else if ($gamemode == 2)
                    // Duel mode template
                    echo '<div class="col-md-3 center-block" style="float:none;">';

                    echo '<div class="info-box bg-gray-darker" style="border: 1px solid #444;">';

                    if ($lobbystatus == 1) echo '<span class="info-box-icon bg-green">';
                    else echo '<span class="info-box-icon">';
                    echo '<i class="ion ion-person"></i>
       </span>
       
       <div class="info-box-content">
        <hr />
        <hr />
       </div>
        </div>
      </div>';
                }
            }

            // placeholders
            for ($x = $lobbycount;$x < $gamemode;$x++)
            {

                if ($gamemode > 6)
                // Battle mode template
                echo '<div class="col-md-3">';
                else if ($gamemode == 6)
                // Groupfight mode template
                echo '<div class="col-md-4">';

                else if ($gamemode == 2)
                // Duel mode template
                echo '<div class="col-md-3 center-block" style="float:none;">';

                echo '<div class="info-box bg-gray-darker" style="border: 1px solid #444;">
      <span class="info-box-icon">
       <i class="ion ion-person"></i>
      </span>
      
      <div class="info-box-content">
       <hr />
       <hr />
      </div>
       </div>
     </div>';
            }
?>
    
   </div>
     
     
   </div>
   
  </div>
  <?
            if ($mystatus == 0 && $lobbyfull == 1) echo '<button id="accept_match" type="submit" class="btn btn-success btn-block btn-flat btn-lg"><b>Accept</b></button>';

            if ($lobbyfull == 0) echo '<button id="exit_queue" type="submit" class="btn btn-danger btn-block btn-flat btn-lg"><b>Exit Queue</b></button>';
?>
 </div>
</div>

<?

        }

    }
    else
    {

        $sql = "SELECT Gamemode FROM servers WHERE MatchStarted = 1;";
        $query = mysqli_query($link, $sql);

        if (!$query)
        {
            die('0:' . 'SQL Error: ' . mysqli_error($link));
        }
        $battles = 0;
        $groupfights = 0;
        $duels = 0;

        while ($row = mysqli_fetch_assoc($query))
        {
            $gamemode = $row['Gamemode'];

            if ($gamemode > 6) $battles++;
            elseif ($gamemode > 2 && $gamemode <= 6) $groupfights++;
            elseif ($gamemode == 2) $duels++;

        }

?>

<div class="row">
  <div class="col-lg-12 col-xs-6">
    <div class="small-box bg-gray-darker">
     <div class="inner"><h3>Matchmaking</h3><small>WBMM Web version 1.5</small></div>
   <!-- /.info-box-content -->
    </div>
    <!-- /.info-box -->
  </div>
</div>

<!-- Settings -->
<div class="row">
 <div class="col-lg-12 col-xs-6">
  <div class="box box-primary">
   <div class="box-header with-border bg-gray-darker">
     <h3 class="box-title"><b>Match Settings</b></h3>
     <div id="servers_count" class="box-tools pull-right" style="font-size:18px;">
    <span class="label label-success">BATTLES: <? echo $battles; ?></span>
    <span class="label label-success">GROUPFIGHTS: <? echo $groupfights; ?></span>
    <span class="label label-success">DUELS: <? echo $duels; ?></span>
     </div>
   </div>
   <div class="box-body bg-gray-darker">
   
    <div id="matchmaking_description">
    
    <h4 class="box-title"><b>Battle (6vs6) competitive map pool</b></h4>
    <p>Mountain Fortress, Nord Town, Fort of Honour, San'Di'Boush, Legacy Town, Verloren, Naval Outpost, Castellum, Legacy Town, Reveran Village, Waterfall and Barricade</p>
    <table class="paddingBetweenRows">
    <tr>
    <td><b>Format:</b></td>
    <td>6 versus 6 - first to 3 with side switch</td>
    </tr>
    <tr>
    <th><b>Flag spawn:</b></th>
    <th>40 seconds</th>
    </tr>
    <tr>
    <td><b>Round time:</b></td>
    <td>180 seconds</td>
    </tr>
    <tr>
    <td><b>Combat speed:</b></td>
    <td>Medium</td>
    </tr>
    <tr>
    <td><b>Friendly fire:</b></td>
    <td>Enabled</td>
    </tr>
    <tr>
    <td><b>Starting gold:</b></td>
    <td>1000</td>
    </tr>
    <tr>
    <td><b>Spectator camera:</b></td>
    <td>Team Locked</td>
    </tr>
    </table>
    
    </div>
     
    <h4 class="box-title"><b>Matchmaking modes</b></h4>
    <table class="table text-center">
     <tbody>
     <tr>
       <td style="width:50%;">
      <button id="6vs6_queue" type="button" class="btn btn-block btn-default btn-lg"><b>Battle</b></button>
       </td>
       <td style="width:50%;">
      <button id="3vs3_queue" type="button" class="btn btn-block btn-default btn-flat btn-lg"><b>Groupfight</b></button>
       </td>
     </tr>
      </tbody>
    </table>
    
    </div>
   
    </div><!-- /.box -->
   <button id="join_queue" type="submit" class="btn btn-success btn-block btn-flat btn-lg"><b>Join Queue</b></button>
 </div>
</div>

<?

    }
    // Close connection
    mysqli_close($link);

}

  
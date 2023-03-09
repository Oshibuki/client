<template lang="">
 <!-- Main content -->
 <section id="content" class="content container-fluid">
 <div class="row">

  <div class="col-md-12">
   <div class="box bg-default-light">
    <div class="box-body box-header-border-top">
     <div class="col-md-8">
      <h3 style="font-family: Open Sans Condensed, Open Sans, helvetica, sans-serif;"><b>Welcome {{userStore.username}}!</b></h3>
     </div>
     <div class="text-right col-md-4">
        <Suspense>
        <template #default>
            <region-status></region-status>
        </template>
        <template #fallback>
            <div>
                <h5>数据加载中……</h5>
            </div>
        </template>
    </Suspense>
     </div>
    </div>
   </div>
  </div>

 </div>
 


    <div class="row">
        <div class="col-xs-12">
            <div class="box bg-default-light">
                <div class="box-header with-border bg-brown">
                    <span class="pull-left box-header-icon">
                        <i class="fas fa-newspaper"></i>
                    </span>
                    <h3 class="box-title">Latest rumours</h3>
                    <div class="box-tools pull-right">
      <button id="wbmm_report" type="button" class="btn btn-block btn-danger">Report a player</button>
     </div>
                </div>

                <div class="box-body table-responsive no-padding">
                    <table class="table table-striped" style="font-size:18px;">
                        <thead>
                            <tr>
                                <th class="text-center">Date</th>
                                <th class="text-center">Username</th>
                                <th class="text-center">Action</th>
                                <th class="text-center">Reason</th>
                            </tr>
                        </thead>
                        <tbody style="font-size:17px; font-weight: 550;">
                            <tr>
                                                <td class="text-center"><span>2023-01-30 08:25:23</span></td>
                                                <td class="text-center"><span>Athu</span></td>
                                                <td class="text-center"><span class="text-green">Unbanned</span></td>
                                                <td class="text-center"><span>1</span></td>
                                        </tr><tr>
                                                <td class="text-center"><span>2023-01-30 08:24:35</span></td>
                                                <td class="text-center"><span>Athu</span></td>
                                                <td class="text-center"><span class="text-red">Banned</span></td>
                                                <td class="text-center"><span>Dodging a match (Autoban)</span></td>
                                        </tr><tr>
                                                <td class="text-center"><span>2023-01-30 08:05:57</span></td>
                                                <td class="text-center"><span>OU9527</span></td>
                                                <td class="text-center"><span class="text-green">Unbanned</span></td>
                                                <td class="text-center"><span>1</span></td>
                                        </tr><tr>
                                                <td class="text-center"><span>2023-01-30 08:05:36</span></td>
                                                <td class="text-center"><span>OU9527</span></td>
                                                <td class="text-center"><span class="text-red">Banned</span></td>
                                                <td class="text-center"><span>Dodging a match (Autoban)</span></td>
                                        </tr><tr>
                                                <td class="text-center"><span>2023-01-19 15:10:49</span></td>
                                                <td class="text-center"><span>CAIBIBI</span></td>
                                                <td class="text-center"><span class="text-green">Unbanned</span></td>
                                                <td class="text-center"><span>1</span></td>
                                        </tr>                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    </div>

    <div class="row">

  <div class="col-md-12">
   <div class="box bg-default-light">
      <div class="box-header with-border bg-brown">
     <span class="pull-left box-header-icon">
                        <i class="fas fa-info"></i>
     </span>
     <h3 class="box-title">About WBMM</h3>
    </div>

    <div class="box-body">
                    <div class="col-sm-12 col-md-10">
                        <p style="font-size:15px;text-align: justify;">Warband
 Matchmaking is a system developed to play Mount&amp;Blade: Warband that
 resembles the format which players experience in competitive tournament
 matches. It is easy for new players to pick up and only requires basic 
understanding of the game before jumping into a realm of the competitive
 side of the game. You can play matches solo or with your friend on two 
diffrent gamemodes: </p>
                        <ul>
                            <li><p style="font-size:15px;text-align: justify;"><b>Battle</b>
 which involves a brutal contest in death where the last man standing 
wins. In battle the pressure will be on like in no other mode, winning 
in this mode solidifies your fighting skill in all of Calradia!</p></li>
                            <li><p style="font-size:15px;text-align: justify;"><b>Groupfight</b>
 that allows you to improve your melee skills and infantry teamwork. In 
groupfight you can fight like a gladiator and prove to everyone that you
 are the god of the arena!</p></li>
                        </ul>
                        <p style="font-size:15px;text-align: justify;">As a team we've set a <a id="wbmm_roadmap" href="#"><b>roadmap</b></a> to give you an idea of planned features. Feel free to tell us what you think!</p>
                    </div>
                    <div class="col-md-2">
                        <img src="../assets/img/wbmm_about.png" class="img-responsive" style="display:block;margin:0 auto;">
                    </div>
    </div>
           </div>
        </div>

    </div>

    <div class="row">

      <div class="col-md-6">
       <div class="box bg-default-light">
          <div class="box-header with-border bg-brown">
         <span class="pull-left box-header-icon">
          <i class="fas fa-poll-h"></i>
         </span>
         <h3 class="box-title">Poll</h3>
        </div>

        <div class="box-body">
         <div id="poll_section">
          
            <h3><u>No active poll.</u></h3>
            <p><big></big></p><fieldset class="form-group">
             <form id="poll_post" method="post">
                      <br><br>
              <button type="submit" class="btn btn-block btn-success btn-md"> Vote </button>
             </form>
                    </fieldset>
          <p style="font-size:15px;text-align: center;">The Warband 
Matchmaking Development Team wants to hear the opinion from our players.
 Therefore we created this poll system where users can vote on certain 
questions regarding outstanding changes.</p>
          </div>

        </div>
         </div>
        </div>

        <div class="col-md-6">
       <div class="box bg-default-light">
          <div class="box-header with-border bg-brown">
         <span class="pull-left box-header-icon">
          <i class="fas fa-award"></i>
         </span>
         <h3 class="box-title">Ranks</h3>
        </div>

        <div class="box-body">

         <div class="col-12 col-sm-6 col-md-8">
          <img src="../assets/img/ranksoverview.png" style="display:block; margin-left: 10%;margin-right: auto;" width="500" height="500">
         </div>

         </div>
        </div>
    </div>
 </div></section>

 <div class="modal fade" id="wbmm_modal" style="display: none;">
  <div class="modal-dialog" style="width:60%">
   <div class="modal-content">
    <div class="modal-header bg-gray-darker">
     <button type="button" class="close" data-dismiss="modal"><i class="fas fa-times" style="color:#fff"></i></button>
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
    <button type="button" class="close" data-dismiss="modal"><i class="fas fa-times" style="color:#fff"></i></button>
    <h3 class="modal-title" id="history_modal_title" style="font-weight:bold;">Profile</h3>
   </div>
   <div id="profile_modal_content" class="modal-body bg-gray-dark"></div>
   <div class="modal-footer bg-gray-darker">
    <button type="button" class="btn btn-main pull-right" data-dismiss="modal"><b>Close</b></button>
   </div>
  </div>
 </div>
</div>



</template>
<script setup>
import RegionStatus from '../components/regionStatus.vue'
import useUserStore from '../stores/user';

const userStore = useUserStore()

</script>
<style lang="">
    
</style>

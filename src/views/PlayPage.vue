<template lang="">
    <section id="content" class="content container-fluid">
<!-- Settings -->
<div class="row">
      <div class="col-md-6 col-xs-12">
      <div class="info-box bg-default-light">
        <div class="box bg-gray-darker">
          <div class="box-header with-border bg-brown">
            <span class="pull-left box-header-icon">
              <i class="fas fa-gamepad"></i>
            </span>
            <h3 class="box-title">Matchmaking</h3>
          </div>

          <div class="box-body">

              
            <carousel />
            

            <div class="box-header with-border">
              <h3 class="box-title" style="margin-right:8px;"> Gamemode</h3>
              <span>
                <i class="fas fa-random"></i>
              </span>
            </div>

            <div class="box-body bg-default-light text-center">
              <div class="btn-group">
              <button id="battle_gamemode" type="button" class="btn btn-main active">Battle</button><button id="groupfight_gamemode" type="button" class="btn btn-main">Groupfight</button>              </div>
            </div>


          <div id="gamemode_settings">
            <div class="box-body table-responsive no-padding bg-gray-darker">

                            
                <table class="table table-striped">
                  <tbody>
                    <tr>
                      <td colspan="2">
                        <p style="font-size:16px; text-align:justify;">Battle gamemode involves a brutal contest in death where the last man standing wins. In battle the pressure will be on like in no other mode, winning in this mode solidifies your fighting skill in all of Calradia!</p>
                      </td>
                    </tr>
                    <tr>
                      <td class="bg-gray-dark"><b>Format:</b></td>
                      <td>6 versus 6 - first to 3 with side switch</td>
                    </tr>
                    <tr>
                      <td class="bg-gray-dark"><b>Flag spawn:</b></td>
                      <td>40 seconds</td>
                    </tr>
                    <tr>
                      <td class="bg-gray-dark"><b>Round time:</b></td>
                      <td>180 seconds</td>
                    </tr>
                    <tr>
                      <td class="bg-gray-dark"><b>Combat speed:</b></td>
                      <td>Medium</td>
                    </tr>
                    <tr>
                      <td class="bg-gray-dark"><b>Friendly fire:</b></td>
                      <td>Enabled</td>
                    </tr>
                    <tr>
                      <td class="bg-gray-dark"><b>Starting gold:</b></td>
                      <td>1000</td>
                    </tr>
                    <tr>
                      <td class="bg-gray-dark"><b>Spectator camera:</b></td>
                      <td>Team locked</td>
                    </tr>
                  </tbody>
                </table>

                            
            </div>
          </div>
            </div>

          <div class="form-group text-center">
            <button id="wbmm_join_queue" type="button" class="btn btn-block btn-success btn-md">Join Queue</button>
          </div>

          </div>

</div>

    </div>

        <div class="col-md-6 col-xs-12">
            <div class="box bg-default-light">
                <div class="box-body box-header-border-top text-center">
                    <span id="online_users" class="info-box-number text-green">1 <small>ONLINE USERS | SA</small></span>
                    <div id="servers_count" style="margin-bottom:10px">
                        <span class="label label-success">BATTLES: 0</span>
                        <span class="label label-success">GROUPFIGHTS: 0</span>
                        <!-- <span class="label label-success">DUELS: -->  <!-- </span> -->
                    </div>
                </div>
            </div>
        </div>

      <div class="col-md-6 col-xs-12">

        <div class="info-box bg-default-light">
          <div class="box-header with-border bg-brown">
            <span class="pull-left box-header-icon">
              <i class="fas fa-plug"></i>
            </span>
            <h3 class="box-title">Active friends</h3>
          </div>
              <div class="box-body table-responsive no-padding" style="max-height:680px">
            <h4 class="text-center text-red">You don't have any friends online at the moment!</h4><table class="table" style="font-size:20px;color:#fff;">
            <tbody>
    
            </tbody>
           </table>
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

</section>
</template>
<script>
import carousel from '../components/myCarousel.vue'
export default {
    components:{
        carousel
    }
}
</script>
<style lang="">
    
</style>

<template lang="">
    <section id="content" class="content container-fluid">
  <div class="row">
    <div class="col-md-12">
      <div class="box box-primary bg-default-light">
        <div class="box-header with-border bg-brown">
          <span class="pull-left box-header-icon">
            <i class="fas fa-chart-bar" style="font-size:18px;"></i>
          </span>
          <h3 class="box-title">General statistics</h3>
        </div>
        <div class="box-body ">

            <h3>
              NeverwinterSwor <br>
            <small>Member since January 2021</small>            </h3>
                        <hr>

            <div class="inner"><p style="font-size:16px; padding-left: 10px;">You have <b>no warnings or suspensions</b></p></div>
            <hr>

      <div class="row">
        <div class="col-md-6">
          <table class="ex_card__stats left_align">
            <tbody><tr>
              <th>Matches:</th>
              <td class="text-white"><b>267</b></td>
            </tr>

                        <tr>
                            <th>Most played map:</th>
                            <td class="text-white"><b>Gosgrad (19)</b></td>
                        </tr>

            <tr>
              <th>Wins:</th>
              <td class="text-green"><b>123</b></td>
                        </tr>

            <tr>
              <th>Draws:</th>
              <td class="text-yellow"><b>34</b></td>
            </tr>

            <tr>
              <th>Losses:</th>
              <td class="text-red"><b>110</b></td>
                        </tr>

                        <tr>
            <th>Win rate:</th><td class="text-green"><b>53%</b></td></tr>
                    </tbody></table>
                </div>

        <div class="col-md-6">
                    <table class="ex_card__stats left_align">
                        <tbody><tr>
                            <th>Favorite Class</th>
                            <td class="text-white"><b>Nord Huscarl (576)</b></td>
                        </tr>

                        <tr>
                            <th>Favorite Weapon</th>
                            <td class="text-white"><b>Scimitar (642)</b></td>
                        </tr>

            <tr>
              <th>Kills</th>
              <td class="text-green"><b>821</b></td>
            </tr>

            <tr>
              <th>Teamkills</th>
              <td class="text-yellow"><b>30</b></td>
            </tr>

            <tr>
              <th>Deaths</th>
              <td class="text-red"><b>1441</b></td>
            </tr>

            <tr>
                            <th>K/D</th><td class="text-red"><b>0.57</b></td></tr>

                        <tr>
                <th>Average Damage</th><td class="text-white"><b>236</b></td></tr>

                        <tr>
                            <th>Most hitted body part</th>
                            <td class="text-white"><b>Arm (1154)</b></td>
                        </tr>

          </tbody></table>
        </div>
      </div>
      <hr>





      <div class="ex_card__abilities"><span class="ex_card__label">No Achievements</span>                    </div>
        </div>
      </div>
    </div>
  </div>

    <div class="row">
    <div class="col-xs-12">

        <div class="box box-primary bg-default-light">
        <div class="box-header with-border bg-brown">
          <span class="pull-left box-header-icon">
            <i class="fas fa-chart-pie" style="font-size:18px;"></i>
          </span>
          <h3 class="box-title">Groupfighting - current season</h3>          <div class="box-tools pull-right">
            <button id="battle_stats" type="button" class="brown-bar btn btn-md btn-main btn-hover-white">Battle</button>
            <button id="groupfighting_stats" type="submit" class="brown-bar btn btn-md btn-main btn-hover-white">Groupfighting</button>
          </div>
        </div>

        <div id="profile_stats" class="box-body">

          <div class="row">

            <div class="col-lg-3 col-md-6 col-xs-12">
              <div class="info-box bg-default-light">
                <span class="info-box-icon">
                  <img src="../assets/img/ranks/Peasant.png" style="margin-bottom:12px" width="64" height="64">
                </span>

                <div class="info-box-content">
                  <span class="info-box-number">CURRENT RANK</span>
                  <span class="info-box-text">Peasant - 1009</span>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-md-6 col-xs-12">
              <div class="info-box bg-default-light">
                <span class="info-box-icon">
                  <i class="fas fa-shield-alt" style="color:#fff"></i>
                </span>

                <div class="info-box-content">
                  <span class="info-box-number">MATCHES PLAYED</span>
                  <span class="info-box-text">10 <small>MATCHES</small></span>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-md-6 col-xs-12">
              <div class="info-box bg-default-light">
                <span class="info-box-icon bg-green">
                  <i class="far fa-flag" style="color:#fff"></i>
                </span>

                <div class="info-box-content">
                  <span class="info-box-number">WINS</span>
                  <span class="info-box-text">5 <small>WINS</small></span>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-md-6 col-xs-12">
              <div class="info-box bg-default-light">
                <span class="info-box-icon bg-red">
                  <i class="fas fa-flag" style="color:#fff"></i>
                </span>

                <div class="info-box-content">
                  <span class="info-box-number">LOSSES</span>
                  <span class="info-box-text">5 <small>LOSSES</small></span>
                </div>
              </div>
            </div>

          </div>

          <div class="row">

            <div class="col-lg-3 col-md-6 col-xs-12">
              <div class="info-box bg-default-light">
                <span class="info-box-icon">
                  <i class="fas fa-award" style="color:#fff"></i>
                </span>

                <div class="info-box-content">
                  <span class="info-box-number">LEADERBOARD RANK</span>
                  <span class="info-box-text">#78</span>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-md-6 col-xs-12">
              <div class="info-box bg-default-light">
                <span class="info-box-icon bg-green">
                  <i class="fas fa-fist-raised" style="color:#fff"></i>
                </span>

                <div class="info-box-content">
                  <span class="info-box-number">KILLS</span>
                  <span class="info-box-text">58 <small>KILLS</small></span>
                </div>
              </div>
                        </div>

            
              <div class="col-lg-3 col-md-6 col-xs-12">
                <div class="info-box bg-default-light">
                  <span class="info-box-icon bg-yellow">
                    <i class="fas fa-skull-crossbones" style="color:#fff"></i>
                  </span>

                  <div class="info-box-content">
                    <span class="info-box-number">TEAMKILLS</span>
                    <span class="info-box-text">1 <small>TEAMKILLS</small></span>
                  </div>
                </div>
              </div>

            
            <div class="col-lg-3 col-md-6 col-xs-12">
              <div class="info-box bg-default-light">
                <span class="info-box-icon bg-red">
                  <i class="fas fa-skull-crossbones" style="color:#fff"></i>
                </span>

                <div class="info-box-content">
                  <span class="info-box-number">DEATHS</span>
                  <span class="info-box-text">95 <small>DEATHS</small></span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  </div>


<div class="row">
  <div class="col-lg-12">
    <div id="my-profile-settings-box" class="box box-primary collapsed-box bg-default-light">
      <div class="box-header with-border bg-brown">
        <span class="pull-left box-header-icon">
          <i class="fas fa-cog" style="font-size:18px;"></i>
        </span>
        <h3 class="box-title">Account settings</h3>
                <div class="box-tools pull-right">
                <!-- Collapse Button -->
                    <button type="button" id="my-profile-settings-collapse-button" class="btn btn-col btn-box-tool" data-widget="collapse">
                        <i class="fa fa-plus text-white"></i>
                    </button>
                </div>
      </div>
      <div class="box-body" style="display:none;">

        <div class="btn-group" style="display:none">
          <input type="hidden" name="playername" value="NeverwinterSwor">        </div>

        <div class="row">

          
                <div class="col-md-12 col-lg-3">
                  <label for="editusername">New username:</label>
                  <input name="editusername" type="text" class="form-control">
                </div>
                <div class="col-md-12 col-lg-2">
                  <label for="editname">&nbsp;</label><br>
                  <button id="editname" type="button" class="btn btn-primary"><b>Change username</b><i class="fas fa-user-edit" style="margin-left: 8px;"></i></button>
                </div>
                            
          
        </div>

        <hr>

        <div class="row">
          <div class="col-xs-12 col-lg-3">
            <label for="editnewpassword">New password:</label>
            <input name="editnewpassword" type="password" class="form-control">
          </div>
        </div>
        <div class="row" style="margin-top: 15px;">
          <div class="col-xs-12 col-lg-3">
            <label for="editnewpasswordretype">Retype new password:</label>
            <input name="editnewpasswordretype" type="password" class="form-control">
          </div>
          <div class="col-xs-12 col-lg-2">
            <label for="changepass">&nbsp;</label><br>
            <button id="changepass" type="click" class="btn btn-primary"><b>Change password</b><i class="fas fa-user-lock" style="margin-left: 8px;"></i></button>
          </div>
        </div>

        <hr>

        <div class="row">
                <div class="col-lg-12">
                  <div class="box box-primary bg-default-light">
                     <div class="box-body box-header-border-top bg-gray-darker table-responsive no-padding">
                            <table class="table table-hover table-condensed" style="font-size:18px">
                              <tbody><tr>
                    <td class="text-center" style="vertical-align: middle;">
                      <small>Your last namechange request to</small>
                    </td><td style="vertical-align: middle;" class="text-center">
                      <small class="label label-primary text-green lb-lg" style="display: block;">NeverwinterSwor</small>
                    </td><td class="text-center" style="vertical-align: middle;">
                      <small>has been accepted.</small>
                    </td></tr>
              </tbody>
                        </table>
                    </div>
                  </div>
                </div>
              </div><hr>
        <div class="row">
          <div class="col-xs-12 col-lg-12">
            <button id="removeaccount" type="button" class="btn btn-danger" style="margin-right: 8px;" disabled=""><b>Remove account</b><i class="fas fa-user-slash" style="margin-left: 8px;"></i></button>
            <b class="text-red">Be careful this will be permanent!</b>
          </div>
        </div>

        <br>
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
<style lang="">
    
</style>

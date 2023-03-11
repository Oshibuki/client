<template>
   
  <div class="btn-group">
   <input type="hidden" name="playername" value="NeverwinterSwor">
  </div>

  <div class="row">


   <div class="col-md-12 col-lg-3">
    <label for="editusername">New username:</label>
    <input name="editusername" type="text" class="form-control">
   </div>
   <div class="col-md-12 col-lg-2">
    <label for="editname">&nbsp;</label><br>
    <button id="editname" type="button" class="btn btn-primary"><b>Change username</b><i
      class="fas fa-user-edit" style="margin-left: 8px;"></i></button>
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
    <button id="changepass" type="click" class="btn btn-primary"><b>Change password</b><i
      class="fas fa-user-lock" style="margin-left: 8px;"></i></button>
   </div>
  </div>

  <hr>

  <div class="row">
   <div class="col-lg-12">
    <div  class="box box-primary bg-default-light ">
     <div class="box-body box-header-border-top bg-gray-darker table-responsive no-padding">
      <table class="table table-hover table-condensed" style="font-size:18px">
       <tbody>
        <tr>
         <td class="text-center" style="vertical-align: middle;">
          <small>Your last namechange request to</small>
         </td>
         <td style="vertical-align: middle;" class="text-center">
          <small class="label label-primary text-green lb-lg"
           style="display: block;">NeverwinterSwor</small>
         </td>
         <td class="text-center" style="vertical-align: middle;">
           <small>has been accepted.</small>
         </td>
        </tr>
       </tbody>
      </table>
     </div>
    </div>
   </div>
  </div>
  <hr>
  <div class="row">
   <div class="col-xs-12 col-lg-12">
    <button id="removeaccount" type="button" class="btn btn-danger" style="margin-right: 8px;"
     disabled><b>Remove account</b><i class="fas fa-user-slash" style="margin-left: 8px;"></i></button>
    <b class="text-red">Be careful this will be permanent!</b>
   </div>
  </div>

  <br>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>

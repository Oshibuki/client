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
     {{userStore.username}} <br>
     <small>Member since {{ new Date(userStore.createAt).toLocaleDateString()}}--{{ new Date(userStore.createAt).toLocaleTimeString()}}</small>
    </h3>
    <hr>

    <div class="inner">
     <p style="font-size:16px; padding-left: 10px;">You have <b>no warnings or suspensions</b></p>
    </div>
    <hr>

    <div class="row">
        
        <player-status-panel />
    </div>
    <hr>
   </div>
   </div>
  </div>
 </div>

 <div class="row">
  <div class="col-xs-12">
    <season-status-panel />
  </div>
 </div>

 <div class="row">
   <div class="col-lg-12">
    <div id="my-profile-settings-box" class="box box-primary bg-default-light">
 <div class="box-header with-border bg-brown">
  <span class="pull-left box-header-icon">
   <i class="fas fa-cog" style="font-size:18px;"></i>
  </span>
  <h3 class="box-title">Account settings</h3>
  <div class="box-tools pull-right">
   <!-- Collapse Button -->
   <button type="button" id="my-profile-settings-collapse-button" class="btn btn-col btn-box-tool" @click.stop="pageStatus.profileCollapase = !pageStatus.profileCollapase">
    <i class="fa fa-plus text-white"></i>
   </button>
  </div>
 </div>
 <Transition>
 <div v-show="!pageStatus.profileCollapase" class="box-body">
    <edit-profile-panel />
 </div>
</Transition>
</div>

   </div>
</div>

</section>

</template>
<script setup>
import useUserStore from '../stores/user';
import PlayerStatusPanel from "../components/playerStatusPanel.vue"
import EditProfilePanel from "../components/editProfilePanel.vue"
import SeasonStatusPanel from "../components/seasonStatusPanel.vue"
import { reactive } from 'vue';

const userStore = useUserStore()
const pageStatus= reactive({
    profileCollapase:true
})
</script>
<style lang="">
 
</style>

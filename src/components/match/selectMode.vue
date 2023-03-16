<template>
 <section id="content" class="content container-fluid">
  <!-- Settings -->
  <div class="row">
   <div class="col-lg-6 col-xs-12">
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
         <label class="btn btn-main" :class="activeComponent==battleMode?'active':''">
          <input type="radio" v-model="activeComponent" :value="battleMode">Battle
         </label>
         <label class="btn btn-main"  :class="activeComponent==groupfightMode?'active':''">
          <input type="radio" v-model="activeComponent" :value="groupfightMode">Groupfighting
         </label>
        </div>
       </div>


       <Transition name="fade" mode="out-in">
            <KeepAlive>
                <component :is="activeComponent"></component>
            </KeepAlive>
        </Transition>
      </div>

      <div class="form-group text-center">
       <button id="wbmm_join_queue" @click.stop="debouncedJoinlobby" type="button" class="btn btn-block btn-success btn-md">Join
        Queue</button>
      </div>

     </div>

    </div>

   </div>

   <div class="col-lg-6 col-xs-12">
    <div class="box bg-default-light">
     <div class="box-body box-header-border-top text-center">
      <region-status></region-status>
     </div>
    </div>
   </div>

   <div class="col-lg-6 col-xs-12">

    <div class="info-box bg-default-light">
     <div class="box-header with-border bg-brown">
      <span class="pull-left box-header-icon">
       <i class="fas fa-plug"></i>
      </span>
      <h3 class="box-title">Active friends</h3>
     </div>
     <div class="box-body table-responsive no-padding" style="max-height:680px">
      <h4 class="text-center text-red">You don't have any friends online at the moment!</h4>
      <table class="table" style="font-size:20px;color:#fff;">
       <tbody>

       </tbody>
      </table>
     </div>
    </div>
   </div>
  </div>
 </section>
</template>

<script setup>
import carousel from '../common/myCarousel.vue'
import regionStatus from '../common/regionStatus.vue'
import { shallowRef,computed } from 'vue'
import Gamemode from '@/constants/gamemode.js'

import battleMode from './battleMode.vue'
import groupfightMode from './groupfightMode.vue'
import useUserStore from "@/stores/user"
const userStore = useUserStore()
// use shallowRef to avoid component being deeply observed
const activeComponent = shallowRef(battleMode)

const onJoinQueue = ()=>{
    let timer;
    // console.log(userStore.socket)
    // console.log(userStore.socketConnected)
    // 
    return () => {
    clearTimeout(timer);
    timer = setTimeout(() => { 
        let gamemode = (activeComponent.value == battleMode)?Gamemode.battle:Gamemode.groupfight
        userStore.socket.emit("joinlobby",{gamemode}) 
    }, 800);
  };
}

const debouncedJoinlobby = onJoinQueue()

</script>

<style lang="scss" scoped>
</style>

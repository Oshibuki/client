<template lang="">
    <router-view class="view header" name="Header"></router-view>
    <router-view class="view left-sidebar" name="LeftSidebar"></router-view>
    <div class="content-wrapper">
        <router-view class="view main-content" name="Main"></router-view>
        <router-view class="view main-footer" name="MainFooter"></router-view>
        <router-view  name="RightSidebar"></router-view>
    </div>

</template>
<script setup>
import headerPanel from '../components/common/headerPanel.vue'
import sidebarLogged from '../components/side/sidebarLogged.vue'
import chatPanel from '../components/chat/chatPanel.vue'
import useMatchStatusStore from '@/stores/match'
import { onMounted } from 'vue';
import router from '@/router'

const matchStore = useMatchStatusStore()
onMounted(()=>{
    // 存一份this
    window.onbeforeunload = function() {
        matchStore.$reset()
    };
  })
</script>
<style lang="scss">
.main-content {
    min-height:89vh;
}
</style>

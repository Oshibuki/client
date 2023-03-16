<template>
    <div class="box box-primary bg-default-light">
        <div class="box-header with-border bg-brown">
            <span class="pull-left box-header-icon">
                <i class="fas fa-chart-pie" style="font-size:18px;"></i>
            </span>
            <h3 class="box-title">Statistics - current season</h3>
            <div class="box-tools pull-right">
                <label class="brown-bar ml-5 btn btn-md btn-main btn-hover-white">
                    <input type="radio" v-model="activeComponent" :value="BattlePanel"> Battle
                </label>
                <label class="brown-bar btn btn-md btn-main btn-hover-white">
                    <input type="radio" v-model="activeComponent" :value="GroupFightPanel"> Groupfighting
                </label>
            </div>
        </div>
        <Transition name="fade" mode="out-in">
            <KeepAlive>
                <Suspense>
                <!-- 主要内容 -->
                <template #default>
                    <component :is="activeComponent"></component>
                </template>
                <!-- 加载中状态 -->
                <template #fallback>
                    正在加载...
                </template>
                </Suspense>
            </KeepAlive>
        </Transition>

    </div>
</template>

<script setup>
import { shallowRef } from 'vue'

import GroupFightPanel from './groupfightPanel.vue'
import BattlePanel from './battlePanel.vue'

// use shallowRef to avoid component being deeply observed
const activeComponent = shallowRef(BattlePanel)

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

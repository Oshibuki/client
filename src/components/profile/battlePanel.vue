<template>
    <div id="profile_stats" class="box-body">
        <div class="row">

            <div class="col-lg-3 col-md-6 col-xs-12">
                <div class="info-box bg-default-light">
                    <span class="info-box-icon">
                        <img :src="rankImgUrl" style="margin-bottom:12px" width="64" height="64">
                    </span>

                    <div class="info-box-content">
                        <span class="info-box-number">CURRENT RANK</span>
                        <span class="info-box-text">{{ seasonStatusStore.BRank }} - {{ seasonStatusStore.MMR }}</span>
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
                        <span class="info-box-text">{{ seasonStatusStore.BTotalMatches }} <small>MATCHES</small></span>
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
                        <span class="info-box-text">{{ seasonStatusStore.BWins }} <small>WINS</small></span>
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
                        <span class="info-box-text">{{ 
                            seasonStatusStore.BLosses }} <small>LOSSES</small></span>
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
                        <span class="info-box-number">Average Damage</span>
                        <span class="info-box-text">{{ seasonStatusStore.BAverageDamage }}</span>
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
</template>

<script setup>
import { onMounted,computed } from 'vue';
import useUserStore from '@/stores/user.js';
import getRankImg from '@/utils/getRankImg.js'
import useSeasonStatusStore from '@/stores/seasonStatus.js';
const seasonStatusStore = useSeasonStatusStore()
const userStore = useUserStore()


const rankImgUrl =  computed(()=>{
    return getRankImg(seasonStatusStore.BRank)
})


onMounted(async()=>{
    await seasonStatusStore.getStatusByUID(userStore.uid)
})
</script>

<style lang="scss" scoped>
</style>

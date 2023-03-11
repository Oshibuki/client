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
                        <span class="info-box-text">{{ seasonStatusStore.GRank }} - {{ seasonStatusStore.GMMR }}</span>
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
                        <span class="info-box-text">{{ seasonStatusStore.GTotalMatches }} <small>MATCHES</small></span>
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
                        <span class="info-box-text">{{ seasonStatusStore.GWins }} <small>WINS</small></span>
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
                            seasonStatusStore.GLosses }} <small>LOSSES</small></span>
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
                        <span class="info-box-text">{{ seasonStatusStore.GAverageDamage }}</span>
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
                        <span class="info-box-text">{{seasonStatusStore.GKills  }} <small>KILLS</small></span>
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
                        <span class="info-box-text">{{seasonStatusStore.GTeamkills}} <small>TEAMKILLS</small></span>
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
                        <span class="info-box-text">{{seasonStatusStore.GDeaths}} <small>DEATHS</small></span>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import getRankImg from '@/utils/getRankImg'
import useSeasonStatusStore from '@/stores/seasonStatus.js';
import useUserStore from '@/stores/user.js';
import { onMounted,computed } from 'vue';
const seasonStatusStore = useSeasonStatusStore()
const userStore = useUserStore()

const rankImgUrl =  computed(()=>{
    return getRankImg(seasonStatusStore.GRank)
})

onMounted(async()=>{
    await seasonStatusStore.getStatusByUID(userStore.uid)
})
</script>

<style lang="scss" scoped>
</style>

<template>
    <figure id="view_profile" class="card" 
        :class="this.cardRankClass()"
    >
        <input name="player_id" type="hidden" :value="player.uid">
        <div class="card__image-container">
            <img style="margin:5px;" :src="rankImgUrl(getRank(player.mmr))" width="64" height="64">

            <h3 class="card__type">{{ getRank(player.mmr) }}</h3>
        </div>
        <figcaption class="card__caption">
            <h1 class="card__name">{{player.username}}</h1>

            <table class="card__stats">
                <tbody>

                    <tr>
                        <th>MMR</th>
                        <td><b>{{player.mmr}}</b></td>
                    </tr>

                    <tr>
                        <th>K/D</th>
                        <td><b>{{player.kdRate}}</b></td>
                    </tr>

                    <tr>
                        <th>Win rate</th>
                        <td class="text-red">{{ player.winRate }}</td>
                    </tr>
                </tbody>
            </table>
            
            <!-- <div class="card__abilities" data-type="赛季奖章"> 
                <span class="card__label">
                    <img src="dist/img/emblems/top_25.png" title="Achieved a place in the top 25 players of the last season" width="24" height="24">
                </span>
                <span class="card__label">
                    <img src="dist/img/emblems/battle_bronze.png" title="Achieved third place in the top 25 battle players of the last season" 
                    width="24" height="24">
                </span>
                <span class="card__label">
                    <img src="dist/img/emblems/groupfight_gold.png" title="Achieved first place in the top 25 groupfight players of the last season" 
                    width="24" height="24">
                </span>
            </div> -->
        </figcaption>
    </figure>
</template>

<script>
import getRank from '../../utils/getRank'
import rankImgUrl from '@/utils/getRankImg'
export default {
  props: ['player'],
  created() {
  },
  methods:{
    getRank,
    rankImgUrl,
    cardRankClass(){
        return 'card--'+getRank(this.player.mmr).toLowerCase()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

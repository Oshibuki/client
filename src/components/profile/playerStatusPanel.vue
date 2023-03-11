<template>
        <div class="col-md-6">
      <table class="ex_card__stats left_align">
      <tbody>
       <tr>
        <th>Matches:</th>
        <td class="text-white"><b>{{playerStore.TotalMatches}}</b></td>
       </tr>

       <tr>
        <th>Wins:</th>
        <td class="text-green"><b>{{playerStore.Wins}}</b></td>
       </tr>

       <tr>
        <th>Draws:</th>
        <td class="text-yellow"><b>{{playerStore.Draws}}</b></td>
       </tr>

       <tr>
        <th>Losses:</th>
        <td class="text-red"><b>{{playerStore.Losses}}</b></td>
       </tr>

       <tr>
        <th>Win rate:</th>
        <td class="text-green"><b>{{playerStore.WinRate}}</b></td>
       </tr>
      </tbody>
      </table>
     </div>

     <div class="col-md-6">
        <table class="ex_card__stats left_align">
        <tbody>
            <!-- <tr>
   <th>Favorite Class</th>
   <td class="text-white"><b>Nord Huscarl (576)</b></td>
  </tr> -->

            <!-- <tr>
   <th>Favorite Weapon</th>
   <td class="text-white"><b>Scimitar (642)</b></td>
  </tr> -->
            <tr>
                <th>Average Damage</th>
                <td class="text-white"><b>{{ playerStore.AverageDamage }}</b></td>
            </tr>
            <tr>
                <th>Kills</th>
                <td class="text-green"><b>{{ playerStore.Kills }}</b></td>
            </tr>

            <tr>
                <th>Teamkills</th>
                <td class="text-yellow"><b>{{ playerStore.Teamkills }}</b></td>
            </tr>

            <tr>
                <th>Deaths</th>
                <td class="text-red"><b>{{ playerStore.Deaths }}</b></td>
            </tr>
            <tr>
                <th>K/D</th>
                <td class="text-red"><b>{{ playerStore.KDRate }}</b></td>
            </tr>

        </tbody>
    </table>
     </div>
</template>

<script setup>
import usePlayerStatusStore from '@/stores/playerStatus';
import useUserStore from '@/stores/user';
import { onMounted } from 'vue';

const playerStore = usePlayerStatusStore()
const userStore = useUserStore()

onMounted(async () => {
    await playerStore.getStatusByUID(userStore.uid)
})
</script>
<style lang="scss" scoped>
</style>

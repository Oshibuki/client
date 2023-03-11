<template>
    <span id="online_users" class="info-box-number text-green">

        {{ regionStore.regionUserCount }} <small>ONLINE USERS | {{ userStore.region }}</small>
    </span>
    <div id="servers_count">
        <span class="label label-success">BATTLES: {{regionStore.battleServersCount}}</span>
        <span class="label label-success">GROUPFIGHTS: {{ regionStore.groupfightServersCount }}</span>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import useRegionStatusStore from "@/stores/regionStatus"
import useUserStore from "@/stores/user"

// 实例化 store
const regionStore = useRegionStatusStore()
const userStore = useUserStore()

onMounted(async()=>{
    await regionStore.getStatusByRegion(userStore.region)
})
</script>

<style lang="scss" scoped>
</style>

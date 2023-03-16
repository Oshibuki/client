<template>
    <span id="online_users" class="info-box-number text-green">

        {{ siteStore.regionUsers }} <small>ONLINE USERS | {{ userStore.region }}</small>
    </span>
    <div id="servers_count">
        <span class="label label-success">BATTLES: {{siteStore.battleCount}}</span>
        <span class="label label-success">GROUPFIGHTS: {{ siteStore.groupfightCount }}</span>
    </div>
</template>

<script setup>
import useSiteStatusStore from "@/stores/siteStatus"
import useUserStore from "@/stores/user"

// 实例化 store
const siteStore = useSiteStatusStore()
const userStore = useUserStore()

</script>

<style lang="scss" scoped>
</style>

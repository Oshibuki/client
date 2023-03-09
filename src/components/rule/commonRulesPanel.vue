<template>
     <a id="wbmm_rules" data-toggle="modal" data-target="#basicModal">Rules and regulations</a>
     <modal>
        <template #header>Rules and Regulations</template>
        <template #body>
            <common-rules></common-rules>
        </template>
        <template #footer><span></span></template>
    </modal>
</template>

<script setup>
import modal from './modal.vue'
import commonRules from './commonRulesContent.vue'


</script>

<style lang="scss" scoped>

</style>

<template>
    <a id="wbmm_rules" data-toggle="modal" data-target="#basicModal">Privacy Policy</a>
    <modal>
       <template #header>Privacy Policy</template>
       <template #body>
           <policy-content></policy-content>
       </template>
       <template #footer><span></span></template>
   </modal>
</template>

<script setup>
import modal from '@/components/common/modal.vue'
import policyContent from './policyContent.vue'


</script>

<style lang="scss" scoped>

</style>

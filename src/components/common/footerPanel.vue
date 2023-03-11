<template>
    <footer class="main-footer">

        <!-- To the right -->
        <div class="pull-right hidden-xs">
            Coded by 
        </div>
        <!-- Default to the left -->
        <div>
            <ul style="padding:0;list-style-type:none;margin:0;">
                <li  style="display:inline;cursor: pointer;">
                    <rules-panel></rules-panel>
                </li>
                <li style="display:inline;">&nbsp;</li>
                <li style="display:inline;cursor: pointer;">
                    <policy-panel></policy-panel>
                </li>
            </ul>
        </div>
        <p><strong>Copyright &copy; 2023 <a href="#">WBMM</a>.</strong> All rights reserved.</p>
    </footer>
</template>
<script setup>
import PolicyPanel from '@/components/rule/policyPanel.vue'
import RulesPanel from '@/components/rule/commonRulesPanel.vue'

</script>
<style lang="">
    
</style>

<template lang="">
    <router-view class="view header" name="Header"></router-view>
    <router-view class="view left-sidebar" name="LeftSidebar"></router-view>
    <div class="content-wrapper">
        <router-view class="view main-content" name="Main"></router-view>
        <router-view class="view main-footer" name="MainFooter"></router-view>
        <router-view class="view right-sidebar" name="RightSidebar"></router-view>
    </div>

</template>
<script>
export default {

}
</script>
<style lang="">
    
</style>

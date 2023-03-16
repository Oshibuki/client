<template>
   <router-view />
</template>

<script setup>
</script>

<style>
html,
body,
#app {
    min-height: 100%;
    height: auto;
    width: 100%;
    margin: 0;
    padding: 0;
}

* {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    scrollbar-width: none;

}
::-webkit-scrollbar {
    display: none;
}
.msgSuccess{color:#00A65A}
.msgFailure {color:#DD4B39}


input[type="radio"] {
    opacity: 0;
    width: 0;
    height: 0;
}
</style>

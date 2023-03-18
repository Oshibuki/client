<template lang="">
  <!-- Main Header -->
  <header class="main-header">

<!-- Logo -->
<a href="https://warbandmatchmaking.com/" class="logo">
<!-- mini logo for sidebar mini 50x50 pixels -->
<span class="logo-mini"><img src="@/assets/img/small_logo.png" class="img-fluid" alt="wbmm_na"></span>
<!-- logo for regular state and mobile devices -->
<span class="logo-lg">
    <img src="@/assets/img/logo.png" class="img-fluid" alt="WBMM Logo">
</span>
</a>

<!-- Header Navbar -->
<nav class="navbar navbar-static-top" role="navigation">


<!-- Sidebar toggle button-->
<a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
    <i class="fas fa-bars"></i>
</a>


<!-- Navbar Right Menu -->
<div class="navbar-custom-menu">

    <ul class="nav navbar-nav">
        
        <!-- Queue -->
        <li id="wbmm_play" class="user-menu bg-brown">

            <!-- Menu Toggle Button -->
            <router-link to="/play" class="dropdown-toggle">
                <img src="@/assets/img/wbmm_icon.png" class="user-image">
            <span id="wbmm_lobby_status" class="hidden-xs">{{ matchStatusStore.wbmm_lobby_status}}</span></router-link>
        </li>



        <!-- Notifications -->
            <li id="notifications_menu" class="dropdown messages-menu bg-gray-dark">

                <!-- Menu toggle button -->
                <a href="#" id="notifications_toggle" class="dropdown-toggle" data-toggle="dropdown">
                    <i class="fas fa-bell"></i>
                    <span id="notifications_count" class="label" style="background-color:#9b7841">0</span>
                </a>

                <ul class="dropdown-menu">
                    <li class="header"><h5>Notifications:</h5></li>
                    <li>
                        <!-- inner menu: contains the actual data -->
                        <ul id="wbmm_notifications" class="menu"></ul>
                    </li>
                </ul>


            </li>

            <!-- CHAT TOGGLE -->
            <li class="bg-gray-dark">
                <a href="#" class="sidebar-toggle" data-toggle="control-sidebar" role="button" @click.stop="controlSidebarToggle"><i class="far fa-comment-dots"></i></a>
            </li>

        
    </ul>
</div>
</nav>
</header>


</template>
<script setup>
import $ from 'jquery'
import useMatchStatusStore from '../../stores/match';

const matchStatusStore = useMatchStatusStore()
function controlSidebarToggle(){
    $('body').toggleClass("control-sidebar-open")
}
</script>
<style lang="">
 
</style>

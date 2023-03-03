<template>
    <aside class="main-sidebar">

        <!-- sidebar: style can be found in sidebar.less -->
        <section class="sidebar">

            <div class="user-panel">
                <div class="pull-left image">
                    <img src="../assets/img/ranks/Guard.png" class="user-image" alt="User Image">
                </div>
                <div class="pull-left info">
                    <p><b>NeverwinterSwor</b></p>

                    <div class="pull-left info">
                        <span id="connection_status" style="color: rgb(221, 75, 57);"><span>Connection closed:</span>
                            1006</span>
                    </div>

                </div>
            </div>

            <!-- Sidebar Menu -->
            <ul class="sidebar-menu tree" data-widget="tree">
                <li class="header">MENU</li>
                <li class="active"><router-link to="/home" id="wbmm_home"><i class="fas fa-home"></i><span>Home</span></router-link></li>
                <li class=""><router-link to="/profile" id="wbmm_profile"><i class="fas fa-trophy"></i><span>Profile</span></router-link></li>
                <li><router-link to="/play" id="wbmm_play"><i class="fas fa-gamepad"></i><span>Play</span></router-link></li>
                <li><router-link to="/friends" id="wbmm_friends"><i class="fas fa-user-friends"></i><span>Friends</span></router-link></li>
                <li><router-link to="/leaderBoards" id="wbmm_leaderboards"><i class="fas fa-trophy"></i><span>Leaderboards</span></router-link></li>
                <li><router-link to="/matchHistory" id="wbmm_history"><i class="fas fa-history"></i><span>Match history</span></router-link></li>
                <li class="header">OTHER</li>
                <li><router-link to="/about" id="wbmm_about"><i class="fas fa-info-circle"></i><span>About</span></router-link></li>
                <li><router-link to="/rules" id="wbmm_rules"><i class="fas fa-book"></i><span>Rules</span></router-link></li>
                <li><a href="https://bbs.mountblade.com.cn/" rel="noopener" target="_blank" id="wbmm_forums"><i class="fas fa-comment-alt"></i><span>论坛</span></a></li>
                <li><a href="https://kook.top/f32yMf/" rel="noopener" target="_blank" id="wbmm_discord"><i class="fab fa-discord"></i><span>语音交流频道</span></a></li>
                <li><a id="wbmm_logout" @click="onLogout" style="cursor: pointer;"><i
                         class="fas fa-sign-out-alt"></i><span>Logout</span></a></li>
            </ul>

        </section>
        <!-- /.sidebar -->
    </aside>
</template>
  
<script>
import useUserStore from "../stores/user"
const userStore = useUserStore()

export default {
    data: function () {
        return {

        };
    },
    computed: {

    },
    components: {
        //   Icon
    },
    methods: {
        onLogout:async function () {
            await userStore.logout()
            setTimeout(()=>{
                this.$router.push('/login')
            },1000)
        }

    }
}

</script>
  
<style>
</style>
  
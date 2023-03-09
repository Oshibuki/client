<template lang="">
   <div class="content-wrapper" >
 <!-- Main content -->
 <section id="content" class="content container-fluid" style="opacity: 1;">

  <div class="row">
 <div class="col-xs-12">
  <div class="login-box">
   
   <div class="login-logo">
    <img src="../assets/img/logo_large.png" class="img-fluid" alt="WBMM Logo">
   </div>

   <div class="login-box-body bg-default-light">
    <p id="wbmm_login_status" class="login-box-msg" :class="{msgSuccess:userData.code==1,msgFailure:userData.code==0}">{{ userData.loginStatus }}</p>

    <form id="wbmm_login_form" @submit.prevent="onLogin" method="post">
     <div class="form-group has-feedback">
      <input name="username" type="text" class="form-control" placeholder="Username" v-model="userData.username" minlength='3' maxlength='15'>
      <span class="form-control-feedback"><i class="fas fa-user"></i></span>
     </div>
     <div class="form-group has-feedback">
      <input name="password" type="password" class="form-control" placeholder="Password" v-model="userData.password" minlength='6' maxlength='15'>
      <span class="form-control-feedback"><i class="fas fa-key"></i></span>
     </div>
     
     <div class="row">
      <div class="col-xs-8">
        <router-link to="/register" id="wbmm_register" class="text-center">New to WBMM?</router-link>
      </div>
      <div class="col-xs-4">
       <button type="submit" class="btn btn-main btn-block">Log In</button>
      </div>
     </div>
    </form>
   </div>
   
  </div>
 </div>
</div>
 </section>
 </div>
</template>
<script setup>
import { reactive, onMounted,onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import useUserStore from "../../stores/user"


const router = useRouter()
const userData = reactive({
    username: 'justice',
    password: 'justice1',
    loginStatus:'Login to start your session',
    code:-1
})
// 实例化 store
const userStore = useUserStore()

const onLogin = async () => {
    // 使用 actions，当作函数一样直接调用
    // login action 定义为了 async 函数，所以它返回一个 Promise
    let result = await userStore.login({username:userData.username,password:userData.password})
    userData.code = result.code
    if(userData.code==1){
        userData.loginStatus = "Authentication successful!"
        setTimeout(()=>{
            router.push('/')
        },2000)
    }else {
        userData.loginStatus = result.message
    }
}

onMounted(() => {
    //取消adminlte main header和右侧sidebar空间
    document.body.classList.remove('control-sidebar-open')
})
onUnmounted(() => {
    document.body.classList.add('control-sidebar-open')
})
</script>

<style>
.content-wrapper {
    min-height: calc(98vh)
}
</style>

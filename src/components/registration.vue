<template>
    <div class="content-wrapper">
        <div class="row">
            <div class="register-box">
                <div class="register-logo">
                    <a><img src="../assets/img/logo_large.png" alt="WBMM Logo"></a>
                </div>

                <div class="register-box-body">
                    <p class="login-box-msg" :class="{msgSuccess:userData.code==1,msgFailure:userData.code==0}">{{ userData.registerStatus }}</p>

                    <form id="wbmm_register_form" @submit.prevent="onSignUp" method="post">
                        <div class="form-group has-feedback">
                            <input name="username" type="text" class="form-control" placeholder="Username"  v-model="userData.username"   minlength='3' maxlength='15'>
                            <span class="glyphicon glyphicon-user form-control-feedback"></span>
                        </div>
                        <div class="form-group has-feedback">
                            <input name="password" type="password" class="form-control" placeholder="Password"  v-model="userData.password"  minlength='6' maxlength='15'>
                            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                        </div>
                        <div class="form-group has-feedback">
                            <input name="cpassword" type="password" class="form-control" placeholder="Retype password"  v-model="userData.cpassword"  minlength='6' maxlength='15'>
                            <span class="glyphicon glyphicon-log-in form-control-feedback"></span>
                        </div>
                        <div class="row">
                            <div class="col-xs-8">
                                <div class="checkbox icheck">
                                    <label>
                                        <ul style="padding:0;list-style-type:none;margin:0;">
                                            <li>
                                                <a id="wbmm_rules" href="#">Rules and regulations</a>
                                            </li>
                                            <li>
                                                <a id="wbmm_policy" href="#">Privacy Policy</a>
                                            </li>
                                        </ul>
                                    </label>
                                </div>
                            </div>
                            <!-- /.col -->
                            <div class="col-xs-4">
                                <button type="submit" class="btn btn-primary btn-block btn-flat">Register</button>
                            </div>
                            <!-- /.col -->
                        </div>
                    </form>

                    <router-link to="/login" class="text-center">I already have an account</router-link>
                </div>
                <!-- /.form-box -->
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

import $ from 'jquery'
import useUserStore from "../stores/user"

const userData = reactive({
    username: 'justice',
    password: 'tomcat123',
    cpassword: 'tomcat123',
    registerStatus:"Create an account",
    code:-1 //initial
})

const router = useRouter()


// 实例化 store
const userStore = useUserStore()

const Valid = (formData)=>{
    const {username,password,cpassword} = formData
    if(!username || !password || !cpassword) {
        userData.registerStatus = "Please enter your usernmae and password."
        return false
    }
    if(password != cpassword) return false
    return true
}

const onSignUp = async () => {
    if(Valid(userData)){
        const result = await userStore.signUp(userData)
        userData.code = result.code
        userData.registerStatus = result.msg
        setTimeout(()=>{
            router.push('/login')
        },1000)
    }

}

onMounted(() => {
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

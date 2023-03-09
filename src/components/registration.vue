<template>
    <div class="content-wrapper">
        <div class="row">
            <div class="register-box">
                <div class="register-logo">
                    <a><img src="../assets/img/logo_large.png" alt="WBMM Logo"></a>
                </div>

                <div class="register-box-body">
                    <p class="login-box-msg" :class="{ msgSuccess: userData.code == 1, msgFailure: userData.code == 0 }">
                        {{ userData.registerStatus }}
                    </p>

                    <form id="wbmm_register_form" @submit.prevent="onSignUp" method="post">
                        <div class="form-group has-feedback">
                            <input name="username" type="text" class="form-control" placeholder="Username"
                             v-model="userData.username" minlength='3' maxlength='15'>
                            <span class="glyphicon glyphicon-user form-control-feedback"></span>
                        </div>
                        <div class="form-group">
                            <select class="form-control" id="regionSelector" v-model="userData.region">
                                <option disabled value="">Please select one region</option>
                                <option value="NAF">Northern Africa</option>
                                <option value="EAF">Eastern Africa</option>
                                <option value="MAF">Middle Africa</option>
                                <option value="SAF">Southern Africa</option>
                                <option value="WAF">Western Africa</option>
                                <option value="EA">East Asia</option>
                                <option value="SA">South Asia</option>
                                <option value="SEA">Southeast Asia</option>
                                <option value="CA">Central Asia</option>
                                <option value="WA">Western Asia</option>
                                <option value="NA">Northern America</option>
                                <option value="LA">Latin America</option>
                                <option value="EE">Eastern Europe(including Northern Asia)</option>
                                <option value="WE">Western Europe</option>
                                <option value="NE">Northern Europe</option>
                                <option value="SE">Southern Europe</option>
                                <option value="OC">Oceania</option>
                            </select>
                        </div>
                        <div class="form-group has-feedback">
                            <input name="password" type="password" class="form-control" placeholder="Password"
                             v-model="userData.password" minlength='6' maxlength='15'>
                            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                        </div>
                        <div class="form-group has-feedback">
                            <input name="cpassword" type="password" class="form-control" placeholder="Retype password"
                             v-model="userData.cpassword" minlength='6' maxlength='15'>
                            <span class="glyphicon glyphicon-log-in form-control-feedback"></span>
                        </div>
                        <div class="row">
                            <div class="col-xs-8">
                                <div class="checkbox icheck">
                                    <label>
                                        <ul style="padding:0;list-style-type:none;margin:0;">
                                            <li>
                                                <rules-panel></rules-panel>
                                            </li>
                                            <li>
                                                <policy-panel></policy-panel>
                                                <!-- <a id="wbmm_policy" href="#"></a> -->
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
import PolicyPanel from './policyPanel.vue'
import RulesPanel from './commonRulesPanel.vue'
import useUserStore from "../stores/user"

const userData = reactive({
    username: 'justice',
    password: 'tomcat123',
    cpassword: 'tomcat123',
    region: '',
    registerStatus: "Create an account",
    code: -1 //initial
})

const router = useRouter()


// 实例化 store
const userStore = useUserStore()

const ValidInput = () => {
    const { username, password, cpassword, region } = userData
    if (!username || !password || !cpassword || region == "") {
        userData.registerStatus = "Please enter your usernmae,region and password."
        return false
    }
    if (password != cpassword) return false
    return true
}

const onSignUp = async () => {
    if (ValidInput()) {
        const { username, password, region } = userData
        const result = await userStore.signUp({ username, password, region })
        userData.code = result.code
        userData.registerStatus = result.message
        setTimeout(() => {
            router.push('/login')
        }, 500)
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

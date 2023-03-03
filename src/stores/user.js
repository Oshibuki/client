import axios from 'axios'
axios.defaults.withCredentials = true

import { defineStore } from 'pinia'

// 创建 store
const useUserStore = defineStore('user', {
    // 定义状态：一个函数，返回一个对象
    persist: {
        key: "USER",
        storage: sessionStorage,
        paths: ["username","uid"]
      },
    state: () => ({
        username: '',
        uid:null
    }),

    // 定义 getters，等同于组件的计算属性
    getters: {
        // getter 函数接收 state 作为参数，推荐使用箭头函数
        isLoggedIn: state => state.uid != null
    },

    // 定义 actions，有同步和异步两种类型
    actions: {
        // 异步 action，一般用来处理异步逻辑
        async login(userData) {
            const result = await axios.post('/api/user/login', userData)
            let data = result.data
            let {username,uid} = data.payload
            if(data.code==1){
                this.username= username
                this.uid = uid
            }
            return result.data
        },
        // 异步 action，一般用来处理异步逻辑
        async signUp(userData) {
            const result = await axios.post('/api/user/register', userData)
            return result.data
        },
        // 异步 action，一般用来处理异步逻辑
        async logout() {
            await axios.post('/api/user/logout')
            this.uid=null
            this.username=null
        },
    }
})

export default useUserStore

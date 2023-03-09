import axios from '../utils/httpClient'

import { defineStore } from 'pinia'

// 创建 store
const useSiteStatusStore = defineStore('siteStatus', {
    state: () => ({
        onLineUsers:0
    }),

    // 定义 getters，等同于组件的计算属性
    getters: {
        
    },

    // 定义 actions，有同步和异步两种类型
    actions: {
        // 异步 action，一般用来处理异步逻辑
        async updateOnlineUsers(newValue) {
            this.onLineUsers = newValue
        },

    }
})

export default useSiteStatusStore

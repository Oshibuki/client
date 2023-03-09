import axios from '../utils/httpClient'

import { defineStore } from 'pinia'

// 创建 store
const useRegionStatusStore = defineStore('region', {
    state: () => ({
        regionUserCount:0,
        battleServersCount:0,
        groupfightServersCount:0
    }),

    // 定义 getters，等同于组件的计算属性
    getters: {
        // getter 函数接收 state 作为参数，推荐使用箭头函数
    },

    // 定义 actions，有同步和异步两种类型
    actions: {
        // 异步 action，一般用来处理异步逻辑
        async getStatusByRegion(region) {
            const result = await axios.post('/api/region/status', {region})
            let data = result.data
            let {regionUserCount,battleServersCount,groupfightServersCount} = data.payload
            if(data.code==1){
                this.regionUserCount= regionUserCount
                this.battleServersCount = battleServersCount
                this.groupfightServersCount = groupfightServersCount
            }
            return result.data
        },
        
    }
})

export default useRegionStatusStore

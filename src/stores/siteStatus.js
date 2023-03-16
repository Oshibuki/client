import { defineStore } from 'pinia'
// 创建 store
const useSiteStatusStore = defineStore('siteStatus', {
    // persist: {
    //     key: "Site",
    //     storage: sessionStorage,
    //     // paths: ["username", "uid"]
    // },
    state: () => ({
        onLineUsers:0,
        muted:false,
        regionUsers:0,
        battleCount:0,
        groupfightCount:0
    }),

    // 定义 getters，等同于组件的计算属性
    getters: {
        
    },

    // 定义 actions，有同步和异步两种类型
    actions: {
        // 异步 action，一般用来处理异步逻辑
        async updateStatus(data) {
            const {onLineUsers,regionUsers,battleCount,groupfightCount} = data
            this.onLineUsers = onLineUsers
            this.regionUsers = regionUsers
            this.battleCount = battleCount
            this.groupfightCount = groupfightCount
        },
        changeMuted(){
            this.muted = !this.muted
        }

    }
})

export default useSiteStatusStore

import { defineStore } from 'pinia'
import useUserStore from './user.js'
// 创建 store
const useMatchStatusStore = defineStore('MatchStatus', {
    // persist: {
    //     key: "Match",
    //     storage: sessionStorage,
    //     // paths: ["username", "uid"]
    // },
    state: () => ({
        currentLobby: [],
        gamemode: 2,
        lobbyInfo: null,
        readyTimer: null,
        wbmm_lobby_status: "NOT IN LOBBY",
        currentStep:'selectmode' //['selectmode','waitlobby','matchstarted','matchended','matchcanceled']
    }),

    // 定义 getters，等同于组件的计算属性
    getters: {
        emptyItems: (state) => {
            return state.gamemode - state.currentLobby.length
        },
        myLobbyStatus: (state) => {
            const userStore = useUserStore()
            return state.currentLobby.filter(player => player.username == userStore.username)[0]
        },
        lobbyCaption: (state) => {
            if (!state.readyTimer) {
                return state.currentLobby.length + "/" + state.gamemode + ' PLAYERS IN THE LOBBY'
            }else {
                return `YOU HAVE ${state.readyTimer} SECONDS LEFT TO ACCEPT THE MATCH`
            }
        }
    },

    // 定义 actions，有同步和异步两种类型
    actions: {
        // 异步 action，一般用来处理异步逻辑
        updateLobbyInfo(data) {
            this.gamemode = data.gamemode
            this.lobbyInfo = data.lobbyInfo
            // this.$patch(()=>{

            // })
        },
        changeMuted() {
            this.muted = !this.muted
        },
        updateReadyTimer(data) {
            this.readyTimer = data
        },
        updateCurrentStep(step){
            this.currentStep = step
        }

    }
})

export default useMatchStatusStore

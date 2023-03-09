import axios from '../utils/httpClient'
import getRank from '../utils/getRank'
import percentageFormater from '../utils/getPercentage'

import { defineStore } from 'pinia'

// 创建 store
const usePlayerStatusStore = defineStore('playerStatus', {
    state: () => ({
        GMMR: 0,
        MMR: 0,
        BWins: 0,
        GWins: 0,
        GLosses: 0,
        BLosses: 0,
        BDraws: 0,
        GDraws: 0,
        BKills: 0,
        BTeamkills: 0,
        BDeaths: 0,
        BTotalMatches: 0,
        GKills: 0,
        GTeamkills: 0,
        GDeaths: 0,
        GTotalMatches: 0,
        BTotalDamage: 0,
        GTotalDamage: 0
    }),

    // 定义 getters，等同于组件的计算属性
    getters: {
        // getter 函数接收 state 作为参数，推荐使用箭头函数
        Rank: state => getRank(state.MMR),
        Wins: state => state.BWins + state.GWins,
        Losses: state => state.BLosses + state.GLosses,
        Draws: state => state.BDraws + state.GDraws,
        WinRate(){ return percentageFormater(this.Wins,(this.Wins + this.Draws + this.Losses))},
        Kills: state => state.BKills + state.GKills,
        Deaths: state => state.BDeaths + state.GDeaths,
        Teamkills: state => state.BTeamkills + state.GTeamkills,
        KDRate() {return  (this.Kills / this.Deaths).toFixed(2)},
        TotalMatches() { return this.Wins + this.Losses + this.Draws },
        AverageDamage(state){return parseInt(state.BTotalDamage / this.TotalMatches)}
    },

    // 定义 actions，有同步和异步两种类型
    actions: {
        // 异步 action，一般用来处理异步逻辑
        async getStatusByUID(uid) {
            const result = await axios.post('/api/player/status', {uid})
            let data = result.data
            let { gmmr,
                mmr,
                bwins,
                gwins,
                glosses,
                blosses,
                bdraws,
                gdraws,
                bkills,
                bteamkills,
                bdeaths,
                gkills,
                gteamkills,
                gdeaths,
                bTotalDamage,
                gTotalDamage} = data.payload
            if (data.code == 1) {
                    this.GMMR = gmmr,
                    this.MMR = mmr,
                    this.BWins = bwins,
                    this.GWins = gwins,
                    this.BDraws = bdraws,
                    this.GDraws = gdraws,
                    this.GLosses = glosses,
                    this.BLosses = blosses,
                    this.BKills = bkills,
                    this.BTeamkills = bteamkills,
                    this.BDeaths = bdeaths,
                    this.GKills = gkills,
                    this.GTeamkills = gteamkills,
                    this.GDeaths = gdeaths,
                    this.BTotalDamage = bTotalDamage,
                    this.GTotalDamage = gTotalDamage
            }
        },

    }
})

export default usePlayerStatusStore

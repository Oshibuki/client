import axios from '../utils/httpClient'
import getRank from '../utils/getRank'
import percentageFormater from '../utils/getPercentage'

import { defineStore } from 'pinia'

// 创建 store
const useSeasonStatusStore = defineStore('seasonStatus', {
    state: () => ({
        NameChanged: false,
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
        GKills: 0,
        GTeamkills: 0,
        GDeaths: 0,
        Top25: false,
        TopGold: false,
        TopSilver: false,
        TopBronze: false,
        TopGroupfight: false,
        BTotalDamage: 0,
        GTotalDamage: 0
    }),

    // 定义 getters，等同于组件的计算属性
    getters: {
        // getter 函数接收 state 作为参数，推荐使用箭头函数
        BRank: state => getRank(state.MMR),
        GRank: state => getRank(state.GMMR),
        BWinRate(state) { return percentageFormater(state.BWins,this.BTotalMatches) },
        KDRate() { return (this.Kills / this.Deaths).toFixed(2) },
        BTotalMatches: state => state.BWins + state.BLosses + state.BDraws,
        GTotalMatches: state => state.GWins + state.GLosses + state.GDraws,
        BAverageDamage(state) { return parseInt(state.BTotalDamage / this.BTotalMatches) },
        GAverageDamage(state) { return parseInt(state.GTotalDamage / this.GTotalMatches) },
},

    // 定义 actions，有同步和异步两种类型
    actions: {
    // 异步 action，一般用来处理异步逻辑
    async getStatusByUID(uid) {
        const result = await axios.post('/api/season/status', {uid})
        let data = result.data
        let { bTotalDamage,
            bdeaths,
            bdraws,
            bkills,
            blosses,
            bteamkills,
            bwins,
            gTotalDamage,
            gdeaths,
            gdraws,
            gkills,
            glosses,
            gmmr,
            gteamkills,
            gwins,
            mmr,
            nameChanged,
            top25,
            topbronze,
            topgold,
            topgroupfight,
            topsilver, } = data.payload
        if (data.code == 1) {
                this.NameChanged = nameChanged,
                this.GMMR = gmmr,
                this.MMR = mmr,
                this.BWins = bwins,
                this.GWins = gwins,
                this.GLosses = glosses,
                this.BLosses = blosses,
                this.BDraws = bdraws,
                this.GDraws = gdraws,
                this.BKills = bkills,
                this.BTeamkills = bteamkills,
                this.BDeaths = bdeaths,
                this.GKills = gkills,
                this.GTeamkills = gteamkills,
                this.GDeaths = gdeaths,
                this.BTotalDamage = bTotalDamage,
                this.GTotalDamage = gTotalDamage,
                this.Top25 = top25,
                this.TopBronze = topbronze,
                this.TopGold = topgold,
                this.TopGroupfight = topgroupfight,
                this.TopSilver = topsilver
        }
    },
}
})

export default useSeasonStatusStore

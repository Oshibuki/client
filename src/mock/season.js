export default [
    // 用户登录
    {
        // 请求地址
        url: "/api/season/status",
        // 请求方法
        method: "post",
        // 响应数据
        response: () => {
            return {
                code: 1,
                payload: {
                    bTotalDamage:0,
                    bdeaths:0,
                    bdraws:0,
                    bkills:0,
                    blosses:0,
                    bteamkills:0,
                    bwins:0,
                    gTotalDamage:0,
                    gdeaths:0,
                    gdraws:0,
                    gkills:0,
                    glosses:0,
                    gmmr:0,
                    gteamkills:0,
                    gwins:0,
                    mmr:0,
                    nameChanged:false,
                    top25:false,
                    topbronze:false,
                    topgold:false,
                    topgroupfight:false,
                    topsilver:false
                }
            }
        }
    },

]

export default [
    // 用户登录
    {
        // 请求地址
        url: "/api/player/status",
        // 请求方法
        method: "post",
        // 响应数据
        response: () => {
            return {
                code: 1,
                payload: {
                    gmmr:0,
                    mmr:0,
                    bwins:0,
                    gwins:0,
                    glosses:0,
                    blosses:0,
                    bdraws:0,
                    gdraws:0,
                    bkills:0,
                    bteamkills:0,
                    bdeaths:0,
                    gkills:0,
                    gteamkills:0,
                    gdeaths:0,
                    bTotalDamage:0,
                    gTotalDamage:0
                }
            }
        }
    }

]

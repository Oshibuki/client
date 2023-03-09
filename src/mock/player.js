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
                    GMMR:12,
                    MMR:12,
                    PresetMMR:12,
                    BWins:12,
                    GWins:12,
                    BLosses:12,
                    GLosses:12,
                    BKills:12,
                    BTeamkills:12,
                    BDeaths:12,
                    BTotalMatches:12,
                    GKills:12,
                    GTeamkills:12,
                    GDeaths:12,
                    GTotalMatches:12,
                    TotalDamage:0
                }
            }
        }
    },

]

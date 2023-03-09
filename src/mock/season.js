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
                    GMMR:1200,
                    MMR:12,
                    BWins:12,
                    GWins:12,
                    BLosses:12,
                    GLosses:12,
                    BDraws:15,
                    GDraws:16,
                    BKills:12,
                    BTeamkills:12,
                    BDeaths:12,
                    GKills:12,
                    GTeamkills:12,
                    GDeaths:12,
                    BTotalDamage:12120,
                    GTotalDamage:1212
                }
            }
        }
    },

]

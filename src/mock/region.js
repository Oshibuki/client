export default [
    // 用户登录
    {
        // 请求地址
        url: "/api/region/status",
        // 请求方法
        method: "post",
        // 响应数据
        response: () => {
            return {
                code: 1,
                payload: {
                    regionUserCount: 3,
                    battleServersCount: 4,
                    groupfightServersCount:0
                }
            }
        }
    },

]

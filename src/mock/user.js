export default [
    // 用户登录
    {
        // 请求地址
        url: "/api/user/login",
        // 请求方法
        method: "post",
        // 响应数据
        response: () => {
            return {
                code: 1,
                payload: {
                    uid: "1934092",
                    username: "baigei",
                    region: 'SA',
                    createdAt: new Date().toLocaleDateString()
                }
            }
        }
        // 1 is success,0 is failure
        // '1:'.$uid.':'.$username.':'.$hashed_password.':'.$rank; 
        // '0:Please enter your username.';
        // '0:Please enter your password.';
        // '0:'.'You have been banned permanently. You may request an appeal on the WBMM forum.';
        // '0:'.'You have been banned. Your ban will be lasting for '.(($since_start->d * 24) + $since_start->h).' hrs '.$since_start->i.' mins '.$since_start->s.' secs ';
        // '0:'.'The username/password you entered was not valid.';
        // '0:'.'You must join a WBMM server under your username to register your unique ID.';
        // '0:'.'The username/password you entered was not valid.';     
    },
    // 用户注册
    {
        // 请求地址
        url: "/api/user/register",
        // 请求方法
        method: "post",
        // 响应数据
        response: () => {
            return {
                code: 1, // 1 is success,0 is failure
                msg:"Your account has been created. You may now join any WBMM server under the nickname <b>'jiugui'</b> to register your UID in order to complete registration." 
                //1 "Your account has been created. You may now join any WBMM server under the nickname <b>'".$username."'</b> to register your UID in order to complete registration."
                //0 "The passwords you entered do not match."
                //'0:'."Password must have atleast 6 characters.";
                // '0:'."Username already taken!";
                // '0:'."Username must be between 3 and 15 characters.";
                // '0:'.'Please enter your username.';
                // '0:'.'Please enter your password.';
            }
        }
    },
        // 退出登录
        {
            // 请求地址
            url: "/api/user/logout",
            // 请求方法
            method: "post",
            // 响应数据
            response: () => {
                return
            }
        },
]

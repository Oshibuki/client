import { createRouter, createWebHistory } from 'vue-router'
import pinia from '@/stores/index'
import useUserStore from '@/stores/user'
import useMatchStatusStore from '@/stores/match'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import '@/assets/css/customNprogress.css'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            // 首页
            path: '/',
            name: 'Main',
            component: () => import('../views/MainPage.vue'),
            children: [// 开始嵌套路由，这下面的所有路由都是Main路由的子路由
                {
                    path: '/', // 嵌套路由里默认是哪个网页
                    components: {
                        Header: () => import('../components/common/headerPanel.vue'),
                        LeftSidebar: () => import('../components/side/sidebarLogged.vue'),
                        Main: () => import('../views/HomePage.vue'),
                        MainFooter: () => import('../components/common/footerPanel.vue'),
                        RightSidebar: () => import('../components/chat/chatPanel.vue')
                    },
                    alias: '/home'
                },
                {
                    path: '/profile', // 嵌套路由里默认是哪个网页
                    components: {
                        Header: () => import('../components/common/headerPanel.vue'),
                        LeftSidebar: () => import('../components/side/sidebarLogged.vue'),
                        Main: () => import('../views/ProfilePage.vue'),
                        MainFooter: () => import('../components/common/footerPanel.vue'),
                        RightSidebar: () => import('../components/chat/chatPanel.vue')
                    }
                },
                {
                    path: '/play', // 嵌套路由里默认是哪个网页
                    components: {
                        Header: () => import('../components/common/headerPanel.vue'),
                        LeftSidebar: () => import('../components/side/sidebarLogged.vue'),
                        Main: () => import('../views/PlayPage.vue'),
                        MainFooter: () => import('../components/common/footerPanel.vue'),
                        RightSidebar: () => import('../components/chat/chatPanel.vue')
                    },
                    beforeEnter:(to, from,next)=>{
                        const matchStatusStore = useMatchStatusStore(pinia)
                        console.log(matchStatusStore.currentStep)
                        if(matchStatusStore.currentStep=="selectmode"){
                            next({path:'/selectmode'})
                        }else if(matchStatusStore.currentStep=="waitlobby"){
                            next({path:'/waitlobby'})
                        }else if(matchStatusStore.currentStep=="matchstarted"){
                            next({path:'/matchstarted'})
                        }else if(matchStatusStore.currentStep=="matchended"){
                            next({path:'/matchended'})
                        }else if(matchStatusStore.currentStep=="matchcanceled"){
                            next({path:'/matchcanceled'})
                        }
                    },
                },
                {
                    path: '/selectmode', // 嵌套路由里默认是哪个网页
                    components: {
                        Header: () => import('../components/common/headerPanel.vue'),
                        LeftSidebar: () => import('../components/side/sidebarLogged.vue'),
                        Main:() => import('../components/match/selectMode.vue'),
                        MainFooter: () => import('../components/common/footerPanel.vue'),
                        RightSidebar: () => import('../components/chat/chatPanel.vue')
                    }
                },
                {
                    path: '/waitlobby', // 嵌套路由里默认是哪个网页
                    components: {
                        Header: () => import('../components/common/headerPanel.vue'),
                        LeftSidebar: () => import('../components/side/sidebarLogged.vue'),
                        Main: () => import('../components/match/waitLobby.vue'),
                        MainFooter: () => import('../components/common/footerPanel.vue'),
                        RightSidebar: () => import('../components/chat/chatPanel.vue')
                    }
                },
                {
                    path: '/matchstarted', // 嵌套路由里默认是哪个网页
                    components: {
                        Header: () => import('../components/common/headerPanel.vue'),
                        LeftSidebar: () => import('../components/side/sidebarLogged.vue'),
                        Main: () => import('../components/match/matchStarted.vue'),
                        MainFooter: () => import('../components/common/footerPanel.vue'),
                        RightSidebar: () => import('../components/chat/chatPanel.vue')
                    }
                },
                {
                    path: '/matchended', // 嵌套路由里默认是哪个网页
                    components: {
                        Header: () => import('../components/common/headerPanel.vue'),
                        LeftSidebar: () => import('../components/side/sidebarLogged.vue'),
                        Main: () => import('../components/match/matchEnded.vue'),
                        MainFooter: () => import('../components/common/footerPanel.vue'),
                        RightSidebar: () => import('../components/chat/chatPanel.vue')
                    }
                },
                {
                    path: '/matchcanceled', // 嵌套路由里默认是哪个网页
                    components: {
                        Header: () => import('../components/common/headerPanel.vue'),
                        LeftSidebar: () => import('../components/side/sidebarLogged.vue'),
                        Main: () => import('../components/match/matchCanceled.vue'),
                        MainFooter: () => import('../components/common/footerPanel.vue'),
                        RightSidebar: () => import('../components/chat/chatPanel.vue')
                    }
                },
                {
                    path: '/friends', // 嵌套路由里默认是哪个网页
                    components: {
                        Header: () => import('../components/common/headerPanel.vue'),
                        LeftSidebar: () => import('../components/side/sidebarLogged.vue'),
                        Main: () => import('../views/FriendsPage.vue'),
                        MainFooter: () => import('../components/common/footerPanel.vue'),
                        RightSidebar: () => import('../components/chat/chatPanel.vue')
                    }
                },
                {
                    path: '/leaderBoards', // 嵌套路由里默认是哪个网页
                    components: {
                        Header: () => import('../components/common/headerPanel.vue'),
                        LeftSidebar: () => import('../components/side/sidebarLogged.vue'),
                        Main: () => import('../views/LeaderBoardsPage.vue'),
                        MainFooter: () => import('../components/common/footerPanel.vue'),
                        RightSidebar: () => import('../components/chat/chatPanel.vue')
                    }
                },
                {
                    path: '/matchHistory', // 嵌套路由里默认是哪个网页
                    components: {
                        Header: () => import('../components/common/headerPanel.vue'),
                        LeftSidebar: () => import('../components/side/sidebarLogged.vue'),
                        Main: () => import('../views/MatchHistoryPage.vue'),
                        MainFooter: () => import('../components/common/footerPanel.vue'),
                        RightSidebar: () => import('../components/chat/chatPanel.vue')
                    }
                },
                {
                    path: '/about', // 嵌套路由里默认是哪个网页
                    components: {
                        Header: () => import('../components/common/headerPanel.vue'),
                        LeftSidebar: () => import('../components/side/sidebarLogged.vue'),
                        Main: () => import('../views/AboutPage.vue'),
                        MainFooter: () => import('../components/common/footerPanel.vue'),
                        RightSidebar: () => import('../components/chat/chatPanel.vue')
                    }
                },
                {
                    path: '/rules', // 嵌套路由里默认是哪个网页
                    components: {
                        Header: () => import('../components/common/headerPanel.vue'),
                        LeftSidebar: () => import('../components/side/sidebarLogged.vue'),
                        Main: () => import('../views/RulesPage.vue'),
                        MainFooter: () => import('../components/common/footerPanel.vue'),
                        RightSidebar: () => import('../components/chat/chatPanel.vue')
                    }
                },
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginPage.vue'),
            children: [
                {
                    path: '', // 嵌套路由里默认是哪个网页
                    components: {
                        Header: () => import('../components/common/header.vue'),
                        LeftSidebar: () => import('../components/side/sidebarUnlogged.vue'),
                        LoginForm: () => import('../components/login/loginForm.vue'),
                        MainFooter: () => import('../components/common/footerPanel.vue')
                    }
                }
            ]
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/RegisterPage.vue'),
            children: [
                {
                    path: '', // 嵌套路由里默认是哪个网页
                    components: {
                        Header: () => import('../components/common/header.vue'),
                        LeftSidebar: () => import('../components/side/sidebarUnlogged.vue'),
                        RegisterForm: () => import('../components/register/registration.vue'),
                        Footer: () => import('../components/common/footerPanel.vue')
                    }
                }
            ]
        },
        {
            path: '/404',
            name: 'NotFound',
            component: () => import('../views/NotFound.vue'),
        },
        {
            path: '/:catchAll(.*)',
            redirect: '/404'
        }
    ]
})

let store = null
const whiteList = ['/login', '/register', '/404'];
router.beforeEach((to, from, next) => {
    NProgress.start();

    if (whiteList.indexOf(to.path) !== -1) {
        next();
    } else {
        if (store === null) {
            store = useUserStore();
        }
        if (!store.isLoggedIn) {
            next({ path: '/login' });
            NProgress.done()
        } else {
            next();
            NProgress.done()
        }
          
    }
})

router.afterEach(() => {
    NProgress.done() // 结束Progress
})

export default router

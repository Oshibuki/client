import { createRouter, createWebHistory } from 'vue-router'
import useUserStore from '@/stores/user'
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
                    redirect: '/home'
                },
                {
                    path: '/home', // 嵌套路由里默认是哪个网页
                    components: {
                        Header: () => import('../components/headerPanel.vue'),
                        LeftSidebar: () => import('../components/sidebarLogged.vue'),
                        Main: () => import('../views/HomePage.vue'),
                        MainFooter: () => import('../components/footerPanel.vue'),
                        RightSidebar: () => import('../components/chatPanel.vue')
                    }
                },
                {
                    path: '/profile', // 嵌套路由里默认是哪个网页
                    components: {
                        Header: () => import('../components/headerPanel.vue'),
                        LeftSidebar: () => import('../components/sidebarLogged.vue'),
                        Main: () => import('../views/ProfilePage.vue'),
                        MainFooter: () => import('../components/footerPanel.vue'),
                        RightSidebar: () => import('../components/chatPanel.vue')
                    }
                },
                {
                    path: '/play', // 嵌套路由里默认是哪个网页
                    components: {
                        Header: () => import('../components/headerPanel.vue'),
                        LeftSidebar: () => import('../components/sidebarLogged.vue'),
                        Main: () => import('../views/PlayPage.vue'),
                        MainFooter: () => import('../components/footerPanel.vue'),
                        RightSidebar: () => import('../components/chatPanel.vue')
                    }
                },
                {
                    path: '/friends', // 嵌套路由里默认是哪个网页
                    components: {
                        Header: () => import('../components/headerPanel.vue'),
                        LeftSidebar: () => import('../components/sidebarLogged.vue'),
                        Main: () => import('../views/FriendsPage.vue'),
                        MainFooter: () => import('../components/footerPanel.vue'),
                        RightSidebar: () => import('../components/chatPanel.vue')
                    }
                },
                {
                    path: '/leaderBoards', // 嵌套路由里默认是哪个网页
                    components: {
                        Header: () => import('../components/headerPanel.vue'),
                        LeftSidebar: () => import('../components/sidebarLogged.vue'),
                        Main: () => import('../views/LeaderBoardsPage.vue'),
                        MainFooter: () => import('../components/footerPanel.vue'),
                        RightSidebar: () => import('../components/chatPanel.vue')
                    }
                },
                {
                    path: '/matchHistory', // 嵌套路由里默认是哪个网页
                    components: {
                        Header: () => import('../components/headerPanel.vue'),
                        LeftSidebar: () => import('../components/sidebarLogged.vue'),
                        Main: () => import('../views/MatchHistoryPage.vue'),
                        MainFooter: () => import('../components/footerPanel.vue'),
                        RightSidebar: () => import('../components/chatPanel.vue')
                    }
                },
                {
                    path: '/about', // 嵌套路由里默认是哪个网页
                    components: {
                        Header: () => import('../components/headerPanel.vue'),
                        LeftSidebar: () => import('../components/sidebarLogged.vue'),
                        Main: () => import('../views/AboutPage.vue'),
                        MainFooter: () => import('../components/footerPanel.vue'),
                        RightSidebar: () => import('../components/chatPanel.vue')
                    }
                },
                {
                    path: '/rules', // 嵌套路由里默认是哪个网页
                    components: {
                        Header: () => import('../components/headerPanel.vue'),
                        LeftSidebar: () => import('../components/sidebarLogged.vue'),
                        Main: () => import('../views/RulesPage.vue'),
                        MainFooter: () => import('../components/footerPanel.vue'),
                        RightSidebar: () => import('../components/chatPanel.vue')
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
                        Header: () => import('../components/header.vue'),
                        LeftSidebar: () => import('../components/sidebarUnlogged.vue'),
                        LoginForm: () => import('../components/loginForm.vue'),
                        MainFooter: () => import('../components/footerPanel.vue')
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
                        Header: () => import('../components/header.vue'),
                        LeftSidebar: () => import('../components/sidebarUnlogged.vue'),
                        RegisterForm: () => import('../components/registration.vue'),
                        Footer: () => import('../components/footerPanel.vue')
                    }
                }
            ]
        },
        {
            path: '/*', // 注意，这里不是嵌套路由了，这是为了设置404页面，一定要放在最后面，这样当服务器找不到页面的时候就会全部跳转到404
            name: '404',
            component: () => import('../views/404.vue')
        }
    ]
})

const whiteList = ['/login', '/register'];
router.beforeEach((to, from, next) => {
    NProgress.start();

    if (whiteList.indexOf(to.path) !== -1) {
        next();
    } else {
        const userStore = useUserStore()
        if (userStore.isLoggedIn) {
            next();
            NProgress.done()
        } else {
            next({ path: '/login' });
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done() // 结束Progress
})

export default router

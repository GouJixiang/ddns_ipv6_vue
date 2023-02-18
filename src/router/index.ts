import {createRouter, createWebHashHistory, RouteRecordRaw, Router} from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/layout/home/Home.vue'),
        meta: {
            title: '首页',
            authentication: true
        },
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/layout/login/Login.vue'),
        meta: {
            title: '登录',
        }
    }
]

const router: Router = createRouter({
    history: createWebHashHistory(),
    routes
})

// 路由拦截器
router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.authentication) && to.meta.authentication) {
        let token = localStorage.getItem('dns_token')
        if (token) {
            next()
        } else {
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            })
        }
    }
    next()
})

export default router
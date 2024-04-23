import { createRouter, createWebHistory } from 'vue-router'
import { asyncAddRoute } from './config/dynamicRoute'
import { options } from './config/config'
import { loadNavigationGuards } from './config/navigationGuards'

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: options,
})

// 守卫导航
// loadNavigationGuards(router)
// 白名单路由 [name]
const whitelistRoute = ['login', 'not-found']

// 动态添加路由， router.addRoute() 是一个同步函数
asyncAddRoute(router)
// console.log('静态路由的数组', router.options, '所有路由的数组', router.getRoutes())

export default router
export { whitelistRoute }

import { whitelistRoute } from '../index'
import { message } from 'ant-design-vue'

export function loadNavigationGuards(router) {
    router.beforeEach((to, from) => {
        // console.log('before', to, from)
        if (to.name === 'D') {
            return false
        }
    })

    // router.beforeEach((to, from) => {
    //     const isWhitelist = whitelistRoute.includes(to.name)
    //     const token = window.localStorage.getItem('token')
    //     // 如果 不是白名单 且 没有token，则跳转至登录页
    //     if (!isWhitelist && !token) {
    //         message.error('登录已失效，请重新登录')
    //         return { name: 'login' }
    //     }
    // })

    // router.afterEach((to, from) => console.log('before', to, from))
}

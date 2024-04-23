// export function asyncAddRoute(router) {
//     // 动态路由添加 方式一 ：
//     // router.addRoute({
//     //     path: '/A',
//     //     name: 'A',
//     //     component: () => import('@/views/page-A.vue'),
//     //     children: [
//     //         {
//     //             path: 'A1/:name/:age', // 子组件的path不带 /
//     //             name: 'A1',
//     //             component: () => import('@/views/page-A1.vue'),
//     //         },
//     //         {
//     //             path: 'A2',
//     //             name: 'A2',
//     //             component: () => import('@/views/page-A2.vue'),
//     //         },
//     //         {
//     //             path: 'A3',
//     //             name: 'A3',
//     //             component: () => import('@/views/page-A3.vue'),
//     //         },
//     //     ],
//     // })

//     // 动态路由添加 方式二 ：
//     const children = [
//         {
//             path: 'A1/:name/:age', // 子组件的path不带 /
//             name: 'A1',
//             component: () => import('@/views/page-A1.vue'),
//             meta: {
//                 keepAlive: true,
//                 title: 'A1',
//             },
//         },
//         {
//             path: 'A2',
//             name: 'A2',
//             component: () => import('@/views/page-A2.vue'),
//             meta: {
//                 keepAlive: true,
//                 title: 'A2',
//             },
//         },
//         {
//             path: 'A3',
//             name: 'A3',
//             component: () => import('@/views/page-A3.vue'),
//             meta: {
//                 // keepAlive: true,
//                 title: 'A3',
//             },
//         },
//     ]
//     children.forEach(item => {
//         router.addRoute('A', item)
//     })
// }

// export function clearRouter(router) {
//     router.addRoute({
//         path: '/A',
//         name: 'A',
//         redirect: '/A/A3',
//         component: () => import('@/views/page-A.vue'),
//     })
// }

// 动态路由应该是从后端请求而来的，然后存在pinia中。这里只是模拟

/**
 * 注：path前面不用加 /main/ ,
 * 加了的原因: 为了方便使用path跳转页面，如果全部使用name跳转页面，则不用考虑这种情况
 *     路由注入到router中后，会自动加上/main/，以path: 'A1'为例，注入后 为 path: '/main/A/A1',
 *     那么如果想用path跳转页面，path应该是/main/A/A1，而不是A1，
 */
export const children = [
    {
        path: '/main/A',
        name: 'A',
        meta: { title: 'A' },
        redirect: '/main/A/A3',
        children: [
            {
                path: '/main/A/A1/:name/:age',
                name: 'A1',
                meta: { title: 'A1', keepAlive: true },
                component: () => import('@/views/page-A1.vue'),
            },
            {
                path: '/main/A/A2',
                name: 'A2',
                meta: { title: 'A2', keepAlive: true },
                component: () => import('@/views/page-A2.vue'),
            },
            {
                // 当使用path访问/A时，如果想默认匹配一个嵌套路由，你可以提供一个空的嵌套路径，
                // 但当使用name访问A时，则子路由不会显示，解决办法：父路由A设置 redirect: '/A'
                // 上面方案有个弊端，就是使用name访问A时不会显示子路由，
                // 最终方法：父子路由都设置name，父路由设置redirect到具体的子路由，
                path: '/main/A/A3', // 也可以写成 path: 'A3'，下面有两者的区别
                name: 'A3',
                meta: { title: 'A3', keepAlive: true },
                component: () => import('@/views/page-A3.vue'),
            },
        ],
    },
    {
        path: '/main/B/:keyword', // path: '/B/:keyword?'  ？表示可传可不传
        name: 'B',
        meta: { title: 'B', keepAlive: true },
        component: () => import('@/views/page-B.vue'),
    },
    {
        path: '/main/C', // 以 / 开头的嵌套路径将被视为根路径。
        name: 'C',
        meta: { title: 'C', keepAlive: true },
        component: () => import('@/views/page-C.vue'),
    },
    {
        path: '/main/D/:id', // 没有以/开头的路径，会被处理成嵌套路径，
        name: 'D',
        meta: { title: 'D', keepAlive: true }, // meta用于存储自定义信息
        component: () => import('@/views/page-D.vue'),
        props: true,
    },
    {
        path: '/main/pinia',
        name: 'pinia',
        meta: { title: 'pinia', keepAlive: true },
        component: () => import(/* webpackChunkName: "about" */ '@/views/page-pinia.vue'),
    },
    {
        path: '/main/vuex',
        name: 'vuex',
        meta: { title: 'vuex', keepAlive: true },
        component: () => import('@/views/page-vuex.vue'),
    },
]
export function asyncAddRoute(router) {
    // 动态路由添加 方式一 ：
    /**
       router.addRoute({
            path: '/main',
            name: 'main',
            component: () => import('@/components/layout-main/layout-main.vue'),
            children,
        })
    **/

    // 动态路由添加 方式二 ：
    children.forEach(item => {
        router.addRoute('main', item)
    })
}

export function clearRouter(router) {
    router.addRoute({
        path: '/main',
        name: 'main',
        redirect: '/main/A/A3',
        component: () => import('@/components/layout-main/layout-main.vue'),
    })
}

export const options = [
    {
        path: '/',
        redirect: '/main',
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/login.vue'),
    },
    {
        path: '/main',
        name: 'main',
        redirect: '/main/A/A3',
        component: () => import('@/components/layout-main/layout-main.vue'),
    },
    {
        path: '/:pathMatch(.*)',
        name: 'not-found',
        component: () => import('@/components/not-found.vue'),
    },
]

/** 
           children: [
            {
                path: 'A',
                name: 'A',
                meta: { title: 'A', type: 1 },
                redirect: '/A/A3',
                children: [
                    {
                        path: 'A1',  
                        name: 'A1',
                        meta: { title: 'A1', keepAlive: true, type: 2 },
                        component: () => import('@/views/page-A1.vue'),
                    },
                    {
                        path: 'A2',
                        name: 'A2',
                        meta: { title: 'A2', keepAlive: true, type: 2 },
                        component: () => import('@/views/page-A2.vue'),
                    },
                    {
                        // 当使用path访问/A时，如果想默认匹配一个嵌套路由，你可以提供一个空的嵌套路径，
                        // 但当使用name访问A时，则子路由不会显示，解决办法：父路由A设置 redirect: '/A'
                        // 上面方案有个弊端，就是使用name访问A时不会显示子路由，
                        // 最终方法：父子路由都设置name，父路由设置redirect到具体的子路由，
                        path: '/main/A/A3', // 也可以写成 path: 'A3'，下面有两者的区别
                        name: 'A3',
                        meta: { title: 'A3', keepAlive: true, type: 2 },
                        component: () => import('@/views/page-A3.vue'),
                    },
                ],
            },
            {
                path: 'B/:keyword', // path: '/B/:keyword?'  ？表示可传可不传
                name: 'B',
                meta: { title: 'B', keepAlive: true, type: 2 },
                component: () => import('@/views/page-B.vue'),
            },
            {
                path: '/main/C',  // 以 / 开头的嵌套路径将被视为根路径。
                name: 'C',
                meta: { title: 'C', keepAlive: true, type: 2 },
                component: () => import('@/views/page-C.vue'),
            },
            {
                path: 'D/:id',  // 没有以/开头的路径，会被处理成嵌套路径，
                name: 'D',
                meta: { title: 'D', keepAlive: true, type: 2 }, // meta用于存储自定义信息
                component: () => import('@/views/page-D.vue'),
                props: true,
            },
            {
                path: 'pinia',
                name: 'pinia',
                meta: { title: 'pinia', keepAlive: true, type: 2 },
                component: () =>
                    import('@/views/page-pinia.vue'),
            },
            {
                path: 'vuex',
                name: 'vuex',
                meta: { title: 'vuex', keepAlive: true, type: 2 },
                component: () => import('@/views/page-vuex.vue'),
            },
        ], 
        */

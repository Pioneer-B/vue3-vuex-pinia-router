<template>
    <div class="page-A3-cls">
        <p>page-A3</p>
        <button @click="toPageB">跳转pageB（params传参）</button>
        <button @click="toPageC">跳转pageC（query传参）</button>
        <br />

        <button @click="toPageA1({ name: 'why', age: 18 })">
            跳转子路由pageA1（params传参）
        </button>
        <button @click="toPageA2">跳转子路由pageA2（query传参）</button>
        <br />

        <button @click="console.log(router.getRoutes())">打印router.getRoutes()</button>
        <button @click="clearRouter(router)">删除A下面所有的动态路由</button>
        <button @click="console.log(router.hasRoute('B'))">
            检查是否存在name为 'B' 的路由
        </button>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { clearRouter } from '@/router/config/dynamicRoute'
    const route = useRoute()
    const router = useRouter()

    function toPageB() {
        // 1. 不带参数
        // router.push({ name: 'B' })  // 等效于 router.push('/main/B')
        // router.push({path: '/main/B'})

        // 2. 带参数
        // 2.1 params传参（ url显示形式：http://192.168.31.63:8080/main/B/21 ）
        // params传参需要使用name进行指定路由，（必须修改路由配置 正确格式：path: '/main/B/:keyword'）
        router.push({
            name: 'B',
            params: { keyword: 21 },
        })
        // 这种写法效果和上面一样，唯一区别在于：上面写法必须在路由中定义name，下面写法不用定义name
        // router.push({ path: '/main/B/21' })
    }
    function toPageC() {
        // 2.2 query传参（ url显示形式：http://192.168.31.63:8080/main/C?keyword=22）
        // query传参不需要修改路由配置，（配置了会出错 正确格式：path: '/main/C'）
        router.push({
            path: '/main/C',
            query: { keyword: 22 },
        })
    }
    function toPageA1(params) {
        // params传参（ url显示形式：http://192.168.31.63:8080/main/A/A1/why/18 ）
        router.push({
            name: 'A1',
            params,
        })
        // router.push({ path: '/main/A/A1/why/18' }) // 效果和上面一样
    }
    function toPageA2() {
        // query传参( url显示形式：http://192.168.31.63:8080/main/A/A2?height=180 )
        router.push({
            path: '/main/A/A2',
            query: { height: 180 },
        })
    }
    // console.log('query', route.query)
    // console.log('params', route.params)
</script>
<style scoped>
    button {
        margin: 5px 10px;
    }
</style>

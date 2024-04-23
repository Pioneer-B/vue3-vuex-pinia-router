<template>
    <p>page-B</p>
    <button @click="toPageA">跳转main后重定向到A3</button>
    <button @click="toPageA3">直接跳转到A3</button>
    <button @click="toPageD">直接跳转到D(将 props 传递给路由组件)</button>
</template>
<script setup>
    import { ref } from 'vue'
    import { useRouter, useRoute } from 'vue-router'
    const router = useRouter()
    const route = useRoute()

    const isMenuOpen = ref(true)

    // console.log('query', route.query)
    // console.log('params', route.params)

    function toPageA() {
        router.push({ name: 'main' })
        // router.push('/main') // 等效的跳转
        // router.push({ path: '/main' }) // 等效的跳转
    }
    function toPageA3() {
        router.push({ name: 'A3' })
    }
    async function toPageD() {
        /**
         * 如果我们想在跳转D后隐藏菜单，则需要使用await router.push 返回的 promise. 这是因为 导航是异步的,
         * 但如果导航被阻止，菜单也会被隐藏。我们需要一种方法来检测我们是否真的改变了页面。
         * 如果导航被阻止，导致用户停留在同一个页面上，由 router.push 返回的 Promise 的解析值将是 Navigation Failure。
         * 否则，它将是一个 falsy 值(通常是 undefined)。这样我们就可以区分我们导航是否离开了当前位置：
         */
        const navigationResult = await router.push({
            name: 'D',
            params: { id: 321 },
            replace: true,
        }) // 替换当前路由，不保留在history中
        if (navigationResult) {
            // 导航被阻止
        } else {
            // 导航成功 (包括重新导航的情况)
            isMenuOpen.value = false
        }
    }
</script>
<style scoped>
    button {
        margin: 5px 10px;
    }
</style>

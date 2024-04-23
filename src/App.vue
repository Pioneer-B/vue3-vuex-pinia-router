<template>
    <!-- <nav>
        <router-link to="/vuex">vuex</router-link> | <router-link to="/pinia">pinia</router-link>
        <router-link to="/A" style="margin-left: 40px">pageA</router-link> |
        <router-link to="/B/2">pageB</router-link> |
        <router-link
            :to="{
                path: '/C',
                query: { keyword: 1 },
            }"
        >
            pageC
        </router-link>
        | <router-link to="/D/88">pageD</router-link>
    </nav>
    <hr /> -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view />
</template>
<script>
    // 解决ERROR ResizeObserver loop completed with undelivered notifications问题.
    const debounce = (fn, delay) => {
        let timer = null

        return function () {
            let context = this

            let args = arguments

            clearTimeout(timer)

            timer = setTimeout(function () {
                fn.apply(context, args)
            }, delay)
        }
    }

    // 解决ERROR ResizeObserver loop completed with undelivered notifications.

    const _ResizeObserver = window.ResizeObserver

    window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
        constructor(callback) {
            callback = debounce(callback, 36)

            super(callback)
        }
    }
</script>

<style>
    /* #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50; 
    } */

    /* nav {
        padding: 30px;
    }

    nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    nav a.router-link-exact-active {
        color: #42b983;
    } */
</style>

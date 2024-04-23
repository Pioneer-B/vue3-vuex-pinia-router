<template>
    <a-tabs
        v-model:activeKey="activeKey"
        type="editable-card"
        :hide-add="true"
        @edit="targetKey => remove(targetKey)"
        @tabClick="tabClick"
    >
        <a-tab-pane v-for="pane in panes" :key="pane.tabKey" :closable="pane.closable">
            <template #tab>
                <SyncOutlined
                    v-if="activeKey === pane.tabKey"
                    @click="refreshTab(pane)"
                />
                {{ pane.title }}
            </template>
            <!-- {{ pane.content }} -->
        </a-tab-pane>
    </a-tabs>
    <p>缓存组件：{{ tabsCacheStore.tabsCacheList }}</p>
</template>

<script setup>
    import { ref, watch, onMounted, onUnmounted } from 'vue'
    import { useRouter, useRoute } from 'vue-router'
    import { useTabsCache } from '@/pinia/index'
    import { tuple } from 'ant-design-vue/es/_util/type'
    const route = useRoute()
    const router = useRouter()
    const tabsCacheStore = useTabsCache()

    //custom data
    const cmpNames = {}

    // antd data
    const panes = ref([
        {
            title: '首页',
            content: '首页',
            key: '首页',
            closable: false,
        },
    ])
    const activeKey = ref(panes.value[0].key)

    const props = defineProps({
        // tab页签的标题，默认从路由meta.title中获取
        tabTitleKey: {
            type: String,
            default: 'title',
        },
    })
    watch(
        () => route.path,
        newValue => {
            console.log(route)
            collectCaches()
            changeCurTab()
        },
        { immediate: true }
    )
    onMounted(() => {
        loadCacheTabs()
        window.addEventListener('unload', listenUnload)
    })
    onUnmounted(() => {
        window.addEventListener('unload', listenUnload)
    })

    // 收集缓存（通过监听）
    function collectCaches() {
        route.matched.forEach(item => {
            const instance = item.components?.default
            const file = instance?.__file
            const componentName = instance?.name || instance?.__name

            checkRouteComponentName(componentName, file)

            // 配置了meta.keepAlive的路由组件添加到缓存
            if (item.meta?.keepAlive) {
                if (!componentName) {
                    console.warn(`${routeMatch.path} , sb吗路由组件的name都不写？`)
                    return
                }
                tabsCacheStore.addCache(componentName)
            } else {
                tabsCacheStore.removeCache(componentName)
            }
        })
    }
    // 检测路由组件名称是否重复（组件重名会缓存到不该缓存的组件，而且不容易排查问题，所以开发环境时检测重名）
    function checkRouteComponentName(name, file) {
        if (cmpNames[name]) {
            if (cmpNames[name] !== file) {
                console.warn(`组件名称重复：${name}`)
            }
        } else {
            cmpNames[name] = file
        }
    }
    // 路由变化时切换tab
    function changeCurTab() {
        // 当前路由信息
        const { path, query, params, hash, matched, name } = route
        // tab标签页路由信息：meta、componentName
        const routeMatch = matched.find(item => item.name === route.name)
        console.log(routeMatch)
        const meta = routeMatch.meta
        const componentName = routeMatch.components?.default?.__name
        // 获取tab标签页信息：tabKey-标签页key值；title-标签页标题；tab-存在的标签页
        const tabKey = routeMatch.path // 这里使用matchRoute.path值作为标签页key值(也可以用其他值)
        const title = String(meta[props.tabTitleKey] || '')
        const tab = panes.value.find(tab => tab.tabKey === tabKey)

        if (!tabKey) {
            console.warn(`sb吗?, ${path}路由没有设置path`)
            return
        }

        // 同一个路由，但是新旧路径不同时，需要清除路由缓存。例如route.path配置为 '/detail/:id'时路径会不同
        // 这里判断 props.tabRouteViewDepth === matched.length 必须是跟tab同级路由，否则会影响多级路由缓存
        const boolean =
            tab && tab.path !== path && props.tabRouteViewDepth === matched.length
        // debugger
        if (boolean) {
            console.log(1, componentName)
            tabsCacheStore.removeCacheEntry(componentName || '')
        }

        const newTab = {
            tabKey,
            title: tab?.title || title,
            path,
            params,
            query,
            hash,
            componentName,
            name,
        }
        tab ? Object.assign(tab, newTab) : panes.value.push(newTab)
        activeKey.value = tabKey
    }
    // 点击tab
    function tabClick(key) {
        const tab = panes.value.find(tab => tab.tabKey === key)
        // 防止重复点击
        if (tab.path !== route.path) {
            router.push({
                name: tab.name,
                params: tab.params,
                query: tab.query,
            })
        }
    }
    // 刷新当前tab页面
    async function refreshTab(tab) {
        tabsCacheStore.isRenderTab = false
        await tabsCacheStore.removeCacheEntry(tab.componentName || '')
        tabsCacheStore.isRenderTab = true
        console.log(1)
    }
    // 页面 unload 事件监听器，添加页签到 session 缓存，用于刷新时保留页签
    function listenUnload() {
        sessionStorage.setItem('tabs', JSON.stringify(panes.value))
    }
    // 加载缓存的 tabs
    function loadCacheTabs() {
        const cacheTabs = sessionStorage.getItem('tabs')
        if (cacheTabs) {
            try {
                const tabs = JSON.parse(cacheTabs)
                if (tabs.length) {
                    panes.value = tabs
                }
            } catch (error) {
                console.warn('load tabs cache error', error)
            } finally {
                sessionStorage.removeItem('tabs')
            }
        }
    }

    // antd
    const remove = tabKey => {
        const index = panes.value.findIndex(pane => pane.tabKey === tabKey)
        if (index < -1) return

        const tab = panes.value[index]
        panes.value.splice(index, 1)
        // 首页禁止了删除，不用考虑删除首页的情况
        // 1. 假如删除的是当前tab，则要切换到上一个tab
        if (tab.tabKey === activeKey.value) {
            const lastTab = panes.value[index - 1]
            router.push({
                name: lastTab.name,
                params: lastTab.params,
                query: lastTab.query,
            })
        }
        // 2. 假如删除不是当前tab，页面不做切换，只清除被删除tab的缓存
        tabsCacheStore.removeCache(tab.componentName)
    }
</script>

<style scoped>
    .ant-tabs >>> .ant-tabs-nav {
        margin-bottom: 0;
    }
</style>

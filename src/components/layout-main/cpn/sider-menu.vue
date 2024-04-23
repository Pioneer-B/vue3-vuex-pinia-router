<template>
    <a-menu
        v-model:selectedKeys="state.selectedKeys"
        theme="dark"
        mode="inline"
        :open-keys="state.openKeys"
        @openChange="onOpenChange"
        @click="onClick"
    >
        <template v-for="item in menus" :key="item.name">
            <a-sub-menu :key="item.key" v-if="item.type === 1">
                <template #title>
                    <span>
                        <user-outlined />
                        <span>{{ item.title }}</span>
                    </span>
                </template>
                <template v-for="item in item.children" :key="item.name">
                    <a-sub-menu :key="item.key" v-if="item.type === 1">
                        <template #title>
                            <span>
                                <user-outlined />
                                <span>{{ item.title }}</span>
                            </span>
                        </template>
                    </a-sub-menu>
                    <a-menu-item :key="item.key" v-else>
                        <user-outlined />
                        <span>{{ item.title }}</span>
                    </a-menu-item>
                </template>
            </a-sub-menu>
            <a-menu-item
                :key="item.key"
                :disabled="item.key === 'vuex' ? true : false"
                v-else
            >
                <user-outlined />
                <span>{{ item.title }}</span>
            </a-menu-item>
        </template>
    </a-menu>
</template>

<script setup>
    import { reactive, watch } from 'vue'
    import { useRouter, useRoute } from 'vue-router'
    import { children } from '@/router/config/dynamicRoute'
    const router = useRouter()
    const route = useRoute()

    const state = reactive({
        openKeys: ['A'],
        rootSubmenuKeys: [],
        selectedKeys: [],
    })
    const menus = mapMenus(children)

    watch(
        route,
        (newValue, oldValue) => {
            state.selectedKeys = [newValue.name]
        },
        { immediate: true }
    )

    function mapMenus(children) {
        return children.map(item => {
            const obj = {
                key: item.name,
                name: item.name, // 页面跳转时需要的name
                title: item.meta.title,

                children:
                    item.children && item.children.length && mapMenus(item.children),
            }
            if (item.children && item.children.length) {
                obj.type = 1
                state.rootSubmenuKeys = [...state.rootSubmenuKeys, item.name]
            } else {
                obj.type = 2
            }

            return obj
        })
    }

    // SubMenu 展开/关闭的回调
    const onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => state.openKeys.indexOf(key) === -1)
        if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            state.openKeys = openKeys
        } else {
            state.openKeys = latestOpenKey ? [latestOpenKey] : []
        }
    }
    // 点击 MenuItem 调用此函数
    const onClick = ({ item, key, keyPath }) => {
        if (key === 'B') {
            router.push({ name: 'B', params: { keyword: 21 } })
            return
        }
        if (key === 'D') {
            router.push({ name: 'D', params: { id: 9 } })
            return
        }
        if (key === 'A1') {
            router.push({ name: 'A1', params: { name: 'cc', age: 100 } })
            return
        }
        router.push({ name: key })
    }
</script>

<style></style>

<template>
    <a-layout id="components-layout-demo-custom-trigger" style="height: 100%">
        <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
            <div class="logo" />
            <!-- 侧边栏 -->
            <sider-menu />
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0">
                <DoubleRightOutlined
                    v-if="collapsed"
                    class="trigger"
                    @click="() => (collapsed = !collapsed)"
                />
                <DoubleLeftOutlined
                    v-else
                    class="trigger"
                    @click="() => (collapsed = !collapsed)"
                />
            </a-layout-header>
            <tabs-cache />
            <a-layout-content
                :style="{
                    margin: '24px 16px',
                    padding: '24px',
                    background: '#fff',
                    minHeight: '280px',
                }"
            >
                <router-view v-slot="{ Component }">
                    <keep-alive :include="tabsCacheStore.tabsCacheList">
                        <component
                            :is="Component"
                            :key="route.name"
                            v-if="tabsCacheStore.isRenderTab"
                        />
                    </keep-alive>
                    <component
                        :is="Component"
                        :key="route.name"
                        v-if="!tabsCacheStore.isRenderTab"
                    />
                </router-view>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script setup>
    import { reactive, ref } from 'vue'
    import { useRoute } from 'vue-router'
    import { useTabsCache } from '@/pinia/index'
    import siderMenu from './cpn/sider-menu.vue'
    import tabsCache from '@/components//tabs-cache.vue'
    const tabsCacheStore = useTabsCache()
    const route = useRoute()
    const collapsed = ref(false)
</script>

<style scoped>
    #components-layout-demo-custom-trigger .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color 0s;
    }

    #components-layout-demo-custom-trigger .trigger:hover {
        color: #1890ff;
    }

    #components-layout-demo-custom-trigger .logo {
        height: 32px;
        background: rgba(255, 255, 255, 0.3);
        margin: 16px;
    }

    .site-layout .site-layout-background {
        background: #fff;
    }
</style>

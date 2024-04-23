<template>
    <div class="page-A2-cls">
        <p>page-A2</p>
        <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane key="1" tab="Tab 1"> <a-input /></a-tab-pane>
            <a-tab-pane key="2" tab="Tab 2" force-render>
                <a-input />
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script setup>
    import { useRoute } from 'vue-router'

    const route = useRoute()
    import { ref } from 'vue'
    const activeKey = ref('1')
    // console.log('query', route.query)
    // console.log('params', route.params)
</script>
<style scoped>
    .page-A2-cls {
    }
</style>

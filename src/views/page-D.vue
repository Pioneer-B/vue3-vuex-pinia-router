<template>
    <p>page-D</p>
</template>
<script setup>
    import { defineProps } from 'vue'
    import { useRouter, useRoute } from 'vue-router'

    const router = useRouter()
    const route = useRoute()
    const prop = defineProps(['id'])

    console.log('query', route.query)
    console.log('params', route.params)

    // 在路由中添加props: true后，可以直接使用props拿到params 参数，
    // 注意：必须在路由中配置参数，如：path: '/D/:id', 否则无法使用
    console.log(prop.id)
</script>

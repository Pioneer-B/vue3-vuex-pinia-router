<template>
    <div class="page-A1-cls">
        <p>page-A1</p>
        <a-input />
    </div>
</template>

<script setup>
    import { useRoute } from 'vue-router'

    const route = useRoute()

    // console.log('query', route.query)
    // console.log('params', route.params)
</script>
<style scoped>
    .page-A1-cls {
    }
</style>

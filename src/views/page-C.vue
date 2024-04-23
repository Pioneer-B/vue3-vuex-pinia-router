<template>
    <p>page-C</p>
</template>
<script setup>
    import { useRoute } from 'vue-router'
    import { ref, watch } from 'vue'

    const route = useRoute()

    // console.log('query', route.query)
    // console.log('params', route.params)
</script>

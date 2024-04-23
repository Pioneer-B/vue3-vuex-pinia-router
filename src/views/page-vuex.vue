<template>
    <h1>这里是vuex的使用方法</h1>

    <h3>state</h3>
    <p>count：{{ count }} - name：{{ name }}</p>
    <p>count：{{ store.state.count }} - name： {{ store.state.name }}</p>

    <h3>getter</h3>
    <p>{{ doneHeight }}</p>
    <p>{{ doneHeightAge }}</p>
    <p>{{ getNameAdress('深圳市') }}</p>

    <h3>mutation(只能修改同步数据)</h3>
    <button @click="handleClick1">count+1</button>
    <button @click="handleClick10(10)">count+10（以载荷形式分发）</button>
    <button @click="handleClickOther10(10)">count+10（以对象形式分发）</button>

    <h3>action</h3>
    <p>
        fruit: {{ store.state.fruit }}
        <button @click="handleActionA">只更新fruit（以载荷形式分发）</button>
    </p>
    <p>
        fruit: {{ store.state.fruit }} - height:
        {{ store.state.height }}
        <button @click="handleActionB">先更新fruit再更新height（以对象形式分发）</button>
    </p>

    <h3>module</h3>
    <p>
        moduleA.count：{{ store.state.moduleA.count }} - moduleB.count：{{
            store.state.moduleB.count
        }}
    </p>
    <p>
        getters: <span>{{ rootCount1 }}</span> - <span>{{ rootCount2 }}</span> -
        <span>{{ rootCount3 }}</span> -
        <span>{{ rootCount4 }}</span>
    </p>
    <p>{{ store.state }}</p>
    <button @click="handleClickmoduleA">moduleA.count+1</button>
    <button @click="moduleAactions">moduleA.actions</button>
</template>

<script setup>
    import { computed, ref } from 'vue'
    import { useStore } from 'vuex'
    // 可以通过调用 useStore 函数，来在 setup 钩子函数中访问 store。这与在组件中使用选项式 API 访问 this.$store 是等效的。
    const store = useStore()

    const tempCount = ref(100) // 测试数据

    // state
    const count = computed(() => store.state.count + tempCount.value)
    const name = computed(() => store.state.name)
    // getter
    const doneHeight = computed(() => store.getters.doneHeight)
    const doneHeightAge = computed(() => store.getters.doneHeightAge)
    const getNameAdress = computed(() => store.getters.getNameAdress)
    // mutation 只能修改同步数据
    const handleClick1 = () => {
        store.commit('increment1')
    }
    const handleClick10 = num => {
        store.commit('increment10', { num })
    }
    const handleClickOther10 = num => {
        store.commit({
            type: 'increment10',
            num,
        })
    }
    // action
    const handleActionA = () => {
        store.dispatch('actionA', { fruit: 'apple' })
    }
    const handleActionB = () => {
        store.dispatch({
            type: 'actionB',
        })
    }
    // modules
    const rootCount1 = computed(() => store.getters['moduleA/countWithRootCount'])
    const rootCount2 = computed(() => store.getters['moduleA/getterA'])
    const rootCount3 = computed(() => store.getters['moduleA/getterB'])
    const rootCount4 = computed(() => store.getters['moduleA/getterC'])
    const handleClickmoduleA = () => {
        store.commit('moduleA/increment1')
    }
    const moduleAactions = () => {
        store.dispatch('moduleA/actionA')
    }
</script>
<style scoped></style>

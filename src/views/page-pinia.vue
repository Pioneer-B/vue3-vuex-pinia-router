<template>
    <h1>这里是pinia的使用方法</h1>

    <h3>state</h3>
    <p>userName：{{ userName }} 、 age：{{ age }} 、 height：{{ height }}</p>
    <p>userName：{{ userName }} - {{ userStore.userName }}</p>

    <h3>getters</h3>
    <p>{{ userStore.isAdult }}</p>
    <p>调用本模块其他getter： {{ userStore.msg }}</p>
    <p>getters传参： {{ userStore.moreMsg(true) }}</p>
    <p>调用其他store里面的getter： {{ userStore.otherMsg }}</p>

    <h3>actions</h3>
    <button @click="updateName">异步修改userName</button>
    <button @click="updatePhoneInfo">异步修改其他store</button>
</template>
<script setup>
    import { ref } from 'vue'
    import { storeToRefs } from 'pinia'
    import { useUser } from '@/pinia/index'

    const userStore = useUser()

    // 如果直接解构出数据，这个数据不是响应式的。如果想要变成响应式的，需要调用storeToRefs方法
    // 或者你也可以直接在template中直接使用userStore.userName，这样是响应式的
    // 请注意，你需要使用在set up中使用`.value` 来访问
    const { userName, age, height, isAdult } = storeToRefs(userStore)
    // 作为 action 的 changeNameAsync 可以直接解构
    const { changeNameAsync, $patch } = userStore

    // 1. state
    // 1.1 直接修改单个属性
    // setTimeout(() => {
    //     userStore.userName = '张三'
    // }, 500)

    // 1.2 可以使用patch修改多个属性
    // setTimeout(() => {
    //     userStore.$patch({
    //         userName: '张三',
    //         height: 180,
    //     })
    // }, 500)

    // 1.3 这种回调函数的形式适合修改集合类的数据，比如数组
    // 使用$patch，我们只能重新赋值一个新的数组，而下面的方法，可以调用数组的方法，在原有数组的基础上修改
    setTimeout(() => {
        userStore.$patch(state => {
            state.userName = '张三'
        })
    }, 500)

    // 1.4 重置
    // setTimeout(() => {
    //     userStore.$reset()
    // }, 1000)

    // 3. actions
    const updateName = () => {
        userStore.changeNameAsync('子龙')
    }
    const updatePhoneInfo = () => {
        userStore.changePhoneAsync('iphone 13')
    }
</script>
<style scoped></style>

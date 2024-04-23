import { nextTick } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useUser = defineStore('user', {
    // state是一个函数，返回一个对象
    state: () => {
        return {
            // test data
            userName: 'coderwhy',
            age: 18,
            height: 1.88,
            // data
        }
    },
    getters: {
        isAdult: state => {
            return state.age >= 18 ? '成年人' : '未成年'
        },
        msg: state => {
            return `${state.userName}是${state.isAdult}`
        },
        moreMsg: state => isTrue => {
            const role = isTrue ? '管理员' : '普通用户'
            return `${state.msg}, 是${role} `
        },
        otherMsg: state => {
            const goodsStore = useGoods()
            return state.userName + '买了' + goodsStore.newIphone
        },
    },
    actions: {
        // 这里的方法要写成普通函数，因为里面需要通过this去访问state里面的数据
        async changeNameAsync(newName) {
            const { data } = await axios.put('http://httpbin.org/put', { newName })
            const { newName: userName } = JSON.parse(data.data)
            this.userName = userName
        },
        async changePhoneAsync(newPhone) {
            await this.changeNameAsync('子龙')
            const goodsStore = useGoods()
            await goodsStore.changePhoneInfo(newPhone)
        },
    },
})

export const useGoods = defineStore('goods', {
    // state是一个函数，返回一个对象
    state: () => {
        return {
            goodsName: 'iphone 8',
            price: 8000,
        }
    },
    getters: {
        newIphone: state => {
            return state.goodsName + ' pro'
        },
    },
    actions: {
        async changePhoneInfo(newPhone) {
            const { data } = await axios.get('http://httpbin.org/get', {
                params: { newPhone },
            })
            this.goodsName = data.args.newPhone
        },
    },
})

export const useTabsCache = defineStore('tabsCache', {
    state: () => {
        return {
            isRenderTab: true, // 用于tab刷新
            tabsCacheList: [], // tabs data
        }
    },
    actions: {
        addCache(componentName) {
            if (Array.isArray(componentName)) {
                componentName.forEach(item => {
                    this.addCache(item)
                })
                return
            }
            if (!componentName || this.tabsCacheList.includes(componentName)) return
            this.tabsCacheList.push(componentName)
            console.log('缓存路由组件：', componentName)
        },
        removeCache(componentName) {
            if (Array.isArray(componentName)) {
                componentName.forEach(item => {
                    this.removeCache(item)
                })
                return
            }
            const index = this.tabsCacheList.indexOf(componentName)
            // console.log('removeIndex', componentName, index)
            if (index > -1) {
                console.log('清除缓存的路由组件：', componentName)
                return this.tabsCacheList.splice(index, 1)[0]
            }
        },
        // 移除缓存的路由组件的实例
        async removeCacheEntry(componentName) {
            // console.log(componentName)
            const tabkey = this.removeCache(componentName)
            if (tabkey) {
                await nextTick()
                this.addCache(componentName)
            }
        },
    },
})

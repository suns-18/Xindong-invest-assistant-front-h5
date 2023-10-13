import {defineStore} from "pinia"

export const useFavStore
    = defineStore({
    id: 'fav',
    persist: {
        enabled: true,
        strategies: [
            {
                storage: localStorage,
                paths: [
                    'data'
                ]
            }
        ]
    },
    state: () => {
        return {
            data: [{
                thumb: 'https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg',
                id: 0,
                name: '产品1',
                description: "这是描述",
                price: '2.00'
            },{
                thumb: 'https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg',
                id: 1,
                name: '产品2',
                description: "这也是描述",
                price: '2.00'
            }]
        }
    }
})
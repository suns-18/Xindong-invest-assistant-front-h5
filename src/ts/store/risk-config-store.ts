import {defineStore} from "pinia";

export const useRiskConfigStore
    = defineStore({
    id: 'riskConfig',
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
    state:()=>  {
        return {
            data:{

            }
        }
    }
})
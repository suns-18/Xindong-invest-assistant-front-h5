<script setup lang="ts">

import router from "../../ts/router.ts";
import {useFavStore} from "../../ts/store/fav-store.ts";
import pinia from "../../ts/store.ts";
import {computed, ref} from "vue";

const favStore = useFavStore(pinia)

const investAmount = ref(0)

const totalPrice = computed(() => {
    let sum = 0
    favStore.data.forEach(item => {
        sum += Number(item.price)
    })
    return sum
})
const goFinishPurchase = () => {
    
    router.push('/investSimulation/finished')
}
</script>

<template>
    <h4>已选的产品列表</h4>
    <template v-for="(item,index) in favStore.data">
        <van-card
                :price="item.price"
                :desc="item.description"
                :title="item.name"
                :thumb="item.thumb"
        />
    </template>
    <van-submit-bar :price="totalPrice*100"
                    button-text="提交"
                    @submit="router.push('/check')">
    </van-submit-bar>
</template>

<style scoped>

</style>
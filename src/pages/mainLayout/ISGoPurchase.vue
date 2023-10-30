<script setup lang="ts">

import router from "../../ts/router.ts";
import {useFavStore} from "../../ts/store/fav-store.ts";
import pinia from "../../ts/store.ts";
import {computed, ref} from "vue";

const favStore = useFavStore(pinia)

const investPrice = ref<string[]>([])
const investCount = ref<number[]>([])

const totalPrice = computed(() => {
    let sum = 0
    favStore.data.forEach((item, index) => {
        sum += Number(investPrice.value[index])
            * investCount.value[index]
    })
    return sum
})
const goFinishPurchase = () => {
    router.push('/investSimulation/finished')
}
const initComponent = () => {
    favStore.data.forEach((item) => {
        investPrice.value.push(item.price)
        investCount.value.push(0)
    })
}

initComponent()
</script>

<template>
    <h4>已选的产品列表</h4>
    <template v-for="(item,index) in favStore.data">
        <van-card
                :desc="item.description"
                :title="item.name"
                :thumb="item.thumb"
        >
            <template #desc>
                <strong style="color: orangered">
                    ￥{{ item.price }}
                </strong>
            </template>
            <template #price>
                <van-row>
                    <van-col span="12">
                        <van-field placeholder="输入买入价"
                                   left-icon="gold-coin-o"
                                   v-model="investPrice[index]"
                                   type="number"
                        ></van-field>
                    </van-col>
                    <van-col span="4"></van-col>
                    <van-col span="8" :align="'center'">
                        <van-stepper v-model="investCount[index]"
                                     theme="round"/>
                    </van-col>
                </van-row>
            </template>
        </van-card>
    </template>
    <van-submit-bar :price="totalPrice*100"
                    button-text="提交"
                    @submit="goFinishPurchase">
    </van-submit-bar>
</template>

<style scoped>

</style>
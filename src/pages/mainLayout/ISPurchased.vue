<script setup lang="ts">

import router from "../../ts/router.ts";
import {usePurchasedStore} from "../../ts/store/purchased-store.ts";
import pinia from "../../ts/store.ts";
import {computed, ref} from "vue";

const purchasedStore = usePurchasedStore(pinia)

const totalIncome = computed(() => {
    let sum = 0
    purchasedStore.data.forEach((item, index) => {
        sum += item.income
    })
    return sum
})
</script>

<template>
    <van-cell center>
        <template #title>
            <h3>当前总收入</h3>
        </template>
        <template #value>
            <h2 style="color: orangered">{{ totalIncome }}</h2>
        </template>
    </van-cell>
    <template v-for="(item,index) in purchasedStore.data">
        <van-card
                :desc="`模拟购买时间：`+item.purchasedTime"
                :title="item.name"
                :thumb="item.thumb"
        >
            <template #price>
                <span style="color: orangered">
                    {{ item.income }}
                </span>
            </template>
        </van-card>
    </template>
</template>

<style scoped>

</style>
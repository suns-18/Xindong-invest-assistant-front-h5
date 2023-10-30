<script setup lang="ts">
import {ref} from "vue";

const sellCount = ref(0)
</script>

<template>
    <van-cell title="产品名" value="产品1"></van-cell>
    <van-cell title="买入时间" value="2023/10/11 8:43:00"></van-cell>
    <van-cell title="持仓" value="100"></van-cell>
    <van-cell title="卖出数">
        <van-stepper v-model="sellCount"
                     theme="round"/>
    </van-cell>
    <br />
    <van-button block type="primary">
        卖出
    </van-button>
</template>

<style scoped>

</style>
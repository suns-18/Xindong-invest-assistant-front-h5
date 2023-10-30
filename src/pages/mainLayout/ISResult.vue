<script setup lang="ts">

import router from "../../ts/router.ts"

const goPurchased = () => {
    router.push('/investSimulation/purchased')
}
</script>

<template>
    <van-cell center is-link @click="goPurchased">
        <template #title>
            <h3>模拟购买成功！</h3>
        </template>
        <template #value>
            <a><h4>查看我的模拟资产</h4></a>
        </template>
    </van-cell>
    <p>可以前往模拟持仓界面查看模拟购买的理财产品</p>
    <p>购买产品<strong>24小时后</strong>可查看产品收益预测</p>
    <van-divider/>
    <van-button type="success" block @click="goPurchased">
        点击查看模拟持仓</van-button>
</template>

<style scoped>

</style>
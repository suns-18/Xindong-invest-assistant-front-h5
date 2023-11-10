<script setup lang="ts">

import Detail from "../../components/Detail.vue";
</script>

<template>
    <div style="margin-block:3rem">
        <detail></detail>
        <div style="padding: 1rem">
            <van-button
                    block
                    color="linear-gradient(to right, #ff6034, #ee0a24)">
                <template #default>
                    <van-icon name="cart"/>
                    点击跳转购买
                </template>
            </van-button>
            <van-button
                    block
                    color="linear-gradient(to right, #81CAFE, #0396ff)">
                <template #default>
                    <van-icon name="plus"/>
                    添加收藏
                </template>
            </van-button>
        </div>
    </div>
</template>

<style scoped>

</style>
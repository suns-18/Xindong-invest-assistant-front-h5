<script setup lang="ts">
import router from "../../ts/router.ts";

const initComponent = () =>{
    alert(router.currentRoute.value.params["productID"])
}
initComponent()
</script>

<template>
    <div style="margin-block:3rem">
        <van-cell title="产品名" value="产品1"/>
        <van-cell title="描述" value="这是描述"/>
        <van-cell title="利率" value="0.114514%"/>
        <van-cell title="期限" value="1.14年"/>
        <van-cell title="风险" value="风险"/>
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
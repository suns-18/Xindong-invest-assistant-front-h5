<script setup lang="ts">

import Recommend from "../../components/Recommend.vue";
</script>

<template>
    <p class="text-center">欢迎阿米诺亚斯使用信东智能投资顾问</p>
    <p class="text-center">欢迎叶可使用信东智能投资顾问</p>
    <p class="text-center">爱东信东等东</p>
    <van-divider></van-divider>
    <h3>产品搜索</h3>
    <van-search
      placeholder="请输入搜索关键词"
      input-align="center"
    />
    <recommend></recommend>
</template>

<style scoped>
.text-center {
    text-align: center;
}
</style>
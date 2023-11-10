<script setup lang="ts">

import  Recommend from "../../components/Recommend.vue";
import router from "../../ts/router.ts";
</script>

<template>
    <van-search
      placeholder="请输入搜索关键词"
      input-align="center"
    />
    <recommend style="margin-bottom:3rem"></recommend>
<!--    -->
<!--    <p>没有符合需求的？-->
<!--        <van-button type="primary" block-->
<!--                                  @click="router.push('/riskConfig')">-->
<!--        点我调整风险配置</van-button>-->
<!--    </p>-->
<!--    <br />-->
<!--    <br />-->
<!--    <br />-->
<!--    <br />-->
<!--    <br />-->
</template>

<style scoped>

</style>
<script setup lang="ts">

import Recommend from "../../components/Recommend.vue";
import {ref} from "vue";

const activeIndicator = ref("0")
</script>

<template>
    <van-search
            placeholder="请输入搜索关键词"
            input-align="center"
    />
    <van-tabs
            v-model:active="activeIndicator"
    >
        <van-tab title="综合" name="0"></van-tab>
        <van-tab title="属性1" name="1"></van-tab>
        <van-tab title="属性2" name="2"></van-tab>
        <van-tab title="属性3" name="3"></van-tab>
    </van-tabs>
    <recommend style="margin-bottom:3rem" :indicator="activeIndicator"/>
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
<template>
    <div class="risk-analysis">
        <van-cell center is-link @click="router.push('/riskConfig')">
            <template #title >
                <h2>我的风险评估结果</h2>
            </template>
            <template #value>
                <a><h4>重新填写</h4></a>
            </template>
        </van-cell>
        <van-row>
            <van-col span="10">
                <div style="background-color: white;flex: auto">
                    <p style="color: royalblue;font-size: x-large">稳健型</p>
                    上次更新 2023/10/8
                </div>
            </van-col>
            <van-col span="14">
                <van-image src="/pentangle.png"></van-image>
            </van-col>
        </van-row>
        <van-cell title="您的风险偏好等级" :value="riskLevel"/>
        <van-cell title="建议您的投资年限" value="1-2年"/>
        <van-button @click="router.push('/recommend')"
                    block
                    style="margin-block:3rem"
                    type="success">
            查看推荐的理财产品
        </van-button>
    </div>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import router from "../../ts/router.ts";
import {useRiskConfigStore} from "../../ts/store/risk-config-store.ts";
import pinia from "../../ts/store.ts";

const answers = useRiskConfigStore(pinia).data || [];

const scores = {
    q1: {A: 5, B: 10, C: 10, D: 5, E: 5},
    q2: {A: 5, B: 5, C: 10, D: 10, E: 5},
    q3: {A: 5, B: 5, C: 10, D: 10},
    q4: {A: 10, B: 15, C: 15, D: 20, E: 20},
    q5: {A: 10, B: 15, C: 20, D: 20},
    q6: {A: 10, B: 15, C: 20, D: 20},
    q7: {A: 5, B: 5, C: 10, D: 10}
};

const totalScore = computed(() => {
    let total = 0;
    answers.forEach((answer, index) => {
        const key = 'q' + (index + 1);
        if (scores[key] && scores[key][answer]) {
            total += scores[key][answer];
        }
    });
    return total;
});

const riskLevel = computed(() => {
    if (totalScore.value <= 50) return '低风险';
    if (totalScore.value <= 60) return '中低风险';
    if (totalScore.value <= 70) return '中风险';
    if (totalScore.value <= 90) return '中高风险';
    return '高风险';
});

</script>

<style scoped>
.risk-analysis {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 5px;
}

p {
    font-size: 18px;
    margin-bottom: 10px;
}

</style>

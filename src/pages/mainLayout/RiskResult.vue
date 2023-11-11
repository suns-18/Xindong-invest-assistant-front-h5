<template>
    <div>
        <van-cell center is-link @click="redirectToRiskConfig">
            <template #title>
                <h3>我的风险评估结果</h3>
            </template>
            <template #value>
                <a><h4 style="color: #535bf2">重新填写</h4></a>
            </template>
        </van-cell>

        <!-- 显示风险评估结果 -->
        <van-cell center title="非风险性" :value="result.antiRisk.toFixed(2)"/>

        <van-cell center title="回报率" :value="result.returnRate.toFixed(2)"/>

        <van-cell center title="稳定性" :value="result.stability.toFixed(2)"/>
    </div>
    <van-row>
        <van-col span="8" style="text-align: center">
            <van-circle
                    color="#ee0a24"
                    v-model:current-rate="resultRate.antiRisk"
                    :text="`非风险性：${resultRate.antiRisk.toFixed(0)}%`"
            />
        </van-col>
        <van-col span="8" style="text-align: center">
            <van-circle
                    color="#FADA07"
                    v-model:current-rate="resultRate.returnRate"
                    :text="`回报率：${resultRate.returnRate.toFixed(0)}%`"
            />
        </van-col>
        <van-col span="8" style="text-align: center">
            <van-circle
                    v-model:current-rate="resultRate.stability"
                    :text="`稳定性：${resultRate.stability.toFixed(0)}%`"
            />
        </van-col>

    </van-row>
    <van-button @click="router.push('/recommend')"
                block
                style="margin-block:3rem"
                type="success">
        查看为我推荐的理财产品
    </van-button>
</template>

<script setup lang="ts">
import router from "../../ts/router.ts";
import {computed, ref} from "vue";
import axios from "../../ts/axios.ts";
import {showFailToast} from "vant";

const result = ref({
    antiRisk: 0,
    stability: 0,
    returnRate: 0
});
const resultRate = computed(() => {
    return {
        antiRisk: (result.value.antiRisk * 100),
        stability: (result.value.stability * 100),
        returnRate: (result.value.returnRate * 100)
    }
})

const initComponent = async () => {
    try {
        const res = await axios.get('/riskConfigResult/queryResult');
        if (res.data.code) {
            result.value = res.data.data;
        } else {
            showFailToast(res.data.msg);
        }
    } catch (error) {
        console.error('Error fetching risk analysis result:', error);
        showFailToast('获取风险评估结果失败！');
    }
};

const redirectToRiskConfig = () => {
    router.push('/riskConfig');
};

initComponent();
</script>

<style scoped>
.risk-analysis {
    background-color: #f5f5f5;
    padding: 1px;
}

.analysis-title {
    font-size: 16px;
    margin-bottom: 20px;
    color: #0078d4; /* 蓝色 */
}

/* Optional: Customize styles further if needed */
</style>

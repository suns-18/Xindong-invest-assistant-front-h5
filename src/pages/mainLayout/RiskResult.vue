<template>
  <div class="risk-analysis">
    <van-cell center is-link @click="redirectToRiskConfig">
      <template #title>
        <h2 class="analysis-title">我的风险评估结果</h2>
      </template>
      <template #value>
        <a><h4>重新填写</h4></a>
      </template>
    </van-cell>

    <!-- 显示风险评估结果 -->
    <van-divider />
    <van-cell center title="非风险性" :value="result.antiRisk.toFixed(2)" />
    <van-divider />

    <van-cell center title="回报率" :value="result.returnRate.toFixed(2)" />
    <van-divider />

    <van-cell center title="稳定性" :value="result.stability.toFixed(2)" />
    <van-divider />
  </div>
</template>

<script setup lang="ts">
import router from "../../ts/router.ts";
import { ref } from "vue";
import axios from "../../ts/axios.ts";
import { showFailToast } from "vant";

const result = ref({
  antiRisk: 0,
  stability: 0,
  returnRate: 0
});

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

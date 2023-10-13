<script setup lang="ts">

</script>

<template>
    <div class="risk-assessment">
        <h3>风险配置问卷</h3>

        <div v-for="(question, index) in questions" :key="index">
            <h4>{{ question.text }}</h4>
            <van-radio-group v-model="answers[index]">
                <van-cell-group
                        inset
                >
                    <van-cell v-for="option in question.options"
                              :key="option.value"
                              :title="`${option.value}. ${option.label}`"
                              clickable
                              @click="answers[index] = option.value"
                    >
                        <template #right-icon>
                            <van-radio :name="option.value"/>
                        </template>
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
        </div>
        <van-button @click="submitAnswers"
                    block
                    type="primary"
                    style="margin-block:3rem">提交
        </van-button>
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {showFailToast, showSuccessToast} from "vant";
import router from "../../ts/router.ts";
import {useRiskConfigStore} from "../../ts/store/risk-config-store.ts";
import pinia from "../../ts/store.ts";

const riskConfigStore = useRiskConfigStore(pinia)

const answers = ref<string[]>([]);
const questions = ref([
    {
        text: "1. 您的年龄是？",
        options: [
            {label: "18-25岁", value: "A"},
            {label: "26-35岁", value: "B"},
            {label: "36-45岁", value: "C"},
            {label: "46-55岁", value: "D"},
            {label: "56岁以上", value: "E"},
        ],
    },
    {
        text: "2. 您当前的职业状况是？",
        options: [
            {label: "学生", value: "A"},
            {label: "工作不稳定或暂无工作", value: "B"},
            {label: "稳定工作，固定收入", value: "C"},
            {label: "自主创业或自由职业", value: "D"},
            {label: "已退休", value: "E"},
        ],
    }, {
        text: "3. 您的投资经验是？",
        options: [
            {label: "无经验", value: "A"},
            {label: "1-3年", value: "B"},
            {label: "4-6年", value: "C"},
            {label: "7年以上", value: "D"},
        ],
    }, {
        text: "4. 您预计的投资期限是？",
        options: [
            {label: "3个月以下", value: "A"},
            {label: "3-12个月", value: "B"},
            {label: "1-3年", value: "C"},
            {label: "3-5年", value: "D"},
            {label: "5年以上", value: "E"},
        ],
    },
    {
        text: "5. 当您的投资面临亏损时，您的反应是？",
        options: [
            {label: "马上卖出，不能接受任何亏损", value: "A"},
            {label: "观望，看是否有恢复的迹象", value: "B"},
            {label: " 买入更多，看到了投资机会", value: "C"},
            {label: "不会做出过多反应，坚信长期投资策略", value: "D"},
        ],
    }, {
        text: "6. 您期望的年回报率是？",
        options: [
            {label: "1-3%", value: "A"},
            {label: "4-6%", value: "B"},
            {label: "7-10%", value: "C"},
            {label: "10%以上", value: "D"},
        ],
    }, {
        text: "7. 您的财务状况如何？",
        options: [
            {label: "无储蓄，或有负债", value: "A"},
            {label: "有一定储蓄，但无其他投资", value: "B"},
            {label: "有多元化的投资组合", value: "C"},
            {label: "财务宽裕，有大量的可投资资金", value: "D"},
        ],
    },
])

const submitAnswers = () => {
    let notFinished = false
    questions.value.forEach((question, index) => {
        if (!answers.value[index]) {
            notFinished = true
            return
        }
    })
    
    if(notFinished){
        showFailToast('您还有未完成的配置项')
        return
    }

    showSuccessToast('提交成功')
    riskConfigStore.data = answers.value

    router.push('/riskConfig/result');
};

const submitButtonStyle = {
    position: 'absolute',
    right: '20px',
    bottom: '20px',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer'
};

</script>

<style scoped>
.risk-assessment {
    position: relative;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    background-color: #f5f5f5;
    min-height: 500px;
}

</style>
<template>
    <div class="risk-assessment">
        <h3>风险配置问卷</h3>

        <div v-for="(question, questionIndex) in questions" :key="questionIndex">
            <h4>{{ questionIndex + 1 }}. {{ question.title.title }}</h4>
            <van-radio-group v-model="answers[questionIndex]">
                <van-cell-group
                        inset
                >
                    <van-cell v-for="(option, optionIndex) in question.options"
                              :key="option.id"
                              :title="`${indexToAlphabets(optionIndex)}. ${option.title}`"
                              clickable
                              @click="answers[questionIndex] = option.id"
                    >
                        <template #right-icon>
                            <van-radio :name="option.id"/>
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
import {indexToAlphabets} from "../../ts/transcript.ts";
import axios from "../../ts/axios.ts";

//showSuccessToast('已经保存您的问卷进度')

const riskConfigStore = useRiskConfigStore(pinia)

const answers = ref<number[]>([]);
const questions = ref([
    {
        "title": {
            "id": 0,
            "title": "string"
        },
        "options": [
            {
                "id": 0,
                "question": 0,
                "title": "string",
                "value": 0,
                "questionType": 0
            }
        ]
    }
],)

const submitAnswers = async () => {
    let notFinished = false
    questions.value.forEach((question, index) => {
        if (!answers.value[index]) {
            notFinished = true
            return
        }
    })

    if (notFinished) {
        showFailToast('您还有未完成的配置项')
        return
    }

    showSuccessToast('提交成功')
    riskConfigStore.data = answers.value

    await router.push('/riskConfig/result');
};

const initComponent = async () => {
    let res = await axios.get(`/question/queryList`)
    
    if(!res.data["code"]){
        showFailToast(res.data["msg"])
        return
    }
    
    questions.value = res.data["data"]
}
initComponent()

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
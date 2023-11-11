<template>
    <div class="risk-assessment">
        <h3>风险配置问卷</h3>

        <div v-for="(question, questionIndex) in questions" :key="questionIndex">
            <h4>{{ questionIndex + 1 }}. {{ question.title.title }}</h4>
            <van-radio-group v-model="answers[questionIndex].option">
                <van-cell-group
                        inset
                >
                    <van-cell v-for="(option, optionIndex) in question.options"
                              :key="option.id"
                              :title="`${indexToAlphabets(optionIndex)}. ${option.title}`"
                              clickable
                              @click="answers[questionIndex].option = option.id"
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

const answers = ref([{id: 0, question: 0, option: 0}])
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
    try {
        let notFinished = false;

        // 检查是否有未回答的问题
        questions.value.forEach((question, index) => {
            if (answers.value[index].option === 0) {
                notFinished = true;
                return;
            }
        });

        if (notFinished) {
            showFailToast('您还有未完成的配置项');
            return;
        }

        // 更新答案中的问题ID
        answers.value.forEach((item, index) => {
            answers.value[index].question = questions.value[index].title.id;
        });

        // 将答案发送到服务器
        const response = await axios.post('/answer/save', {
            answers: answers.value,
        });

        if (response.data.code == 200) {
            showSuccessToast('提交成功');
            riskConfigStore.data = answers.value;
            await router.push('/riskConfig/result');
        } else {
            showFailToast('提交失败，请稍后重试');
        }
    } catch (error) {
        showFailToast('提交失败，请稍后重试');
    }
};


const initComponent = async () => {
    let res = await axios.get(`/question/queryList`);

    if (!res.data["code"]) {
        showFailToast(res.data["msg"]);
        return;
    }
    answers.value.splice(0, answers.value.length);
    questions.value = res.data["data"];
    questions.value.forEach((item, index) => {
        answers.value.push({id: index + 1, question: item.title.id, option: 0});
    });

    // 如果需要在组件初始化时保存答案，取消下一行注释
    //await postAnswers();
};
initComponent();
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
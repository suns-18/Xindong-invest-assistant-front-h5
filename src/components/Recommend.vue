<script setup lang="ts">

import router from "../ts/router.ts";
import {ref} from "vue";
import {showFailToast, showSuccessToast} from "vant";
import axios from "../ts/axios";
import {Product} from "../ts/model.ts";


const list = ref<Product[]>([
    {
        "id": 0,
        "name": "string",
        "details": "string",
        "price": 0,
        "antiRisk": 0,
        "flexibility": 0,
        "returnRate": 0,
        "state": 0
    }
],)

const initComponent = async () => {
    let indicator = [
        "Comprehensive",
        "Comprehensive",
        "Comprehensive",
        "Comprehensive"
    ]
    let res = await axios.get(`/product/sortBy${indicator[props.indicator]}`)

    if (!res.data["code"]) {
        showFailToast(res.data["msg"])
        return
    }

    if (props.indicator == "0") {
        list.value.splice(0, list.value.length)
        res.data.data.forEach((item) => {
            list.value.push(item["product"])
        })
    } else {
        list.value = res.data["data"]
    }

}
initComponent()

const props = defineProps(["indicator"])
</script>

<template>
    <div style="margin-bottom: 3rem">
        <div v-for="(item, index) in list">
            <van-row justify="center" align="center">
                <van-col span="20">
                    <van-card
                            :price="item.price.toFixed(2)"
                            :title="item.name"
                            :desc="item.details"
                            @click="router.push(`/recommend/detail/${item.id}`)"
                    >
                    </van-card>
                </van-col>
                <van-col span="4">
                    <van-button
                            color="linear-gradient(to right, #81CAFE, #0396ff)"
                            @click="showSuccessToast('收藏成功！')"
                            block
                            size="large"
                    >
                        <template #default>
                            <van-icon name="plus"/>
                            <br/>
                            添加收藏
                        </template>
                    </van-button>
                </van-col>
            </van-row>

        </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
    </div>
</template>

<style scoped>

</style>
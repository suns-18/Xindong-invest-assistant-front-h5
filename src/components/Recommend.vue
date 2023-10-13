<script setup lang="ts">

import router from "../ts/router.ts";
import {ref} from "vue";
import {Product} from "../ts/model.ts";
import {showSuccessToast} from "vant";

const list = ref<Product[]>([
    {
        id: 1,
        name: "产品1",
        description: "描述信息1",
        price: "2.00",
        thumb: "https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg",
    }, {
        id: 2,
        name: "产品2",
        description: "描述信息2",
        price: "2.00",
        thumb: "https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg",
    }, {
        id: 3,
        name: "产品3",
        description: "描述信息3",
        price: "2.00",
        thumb: "https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg",
    }, {
        id: 4,
        name: "产品4",
        description: "描述信息4",
        price: "2.00",
        thumb: "https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg",
    }
])
</script>

<template>
    <div style="margin-bottom: 3rem">
        
        <div v-for="(item, index) in list">
            <van-row justify="center" align="center">
                <van-col span="20">
                    <van-card
                      :price="item.price"
                      :desc="item.description"
                      :title="item.name"
                      :thumb="item.thumb"
                      @click="router.push('/recommend/detail')"
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
                            <van-icon name="plus"/><br/>
                            添加收藏
                        </template>
                    </van-button>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<style scoped>

</style>
<script setup lang="ts">

import router from "../ts/router.ts";
import {ref} from "vue";
import {Product} from "../ts/model.ts";
import {showFailToast, showSuccessToast} from "vant";
import axios from "../ts/axios";


const list = ref([
  {
    "product": {
      "id": 0,
      "name": "string",
      "details": "string",
      "price": 0,
      "antiRisk": 0,
      "flexibility": 0,
      "returnRate": 0,
      "state": 0
    }
  }
],)

const initComponent = () => {
  let res = await axios.get(`/product/sortByComprehensive`)

  if(!res.data["code"]){
    showFailToast(res.data["msg"])
    return
  }

  list.value = res.data["data"]
}
initComponent()
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
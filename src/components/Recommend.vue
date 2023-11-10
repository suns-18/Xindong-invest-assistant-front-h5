<script setup lang="ts">

import router from "../ts/router.ts";
import {ref, watch} from "vue";
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
    "Return",
    "Flexibility",
    "Risk"
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
const add = async (index: number, productId: number) => {//添加收藏，调用时候用@click="add(index, item.id)"
  try {
    const res = await axios.post('/product/changeFavState', {
      id: productId,
      name: list.value[index].name,
      details: list.value[index].details,
      price: list.value[index].price,
      antiRisk: list.value[index].antiRisk,
      flexibility: list.value[index].flexibility,
      returnRate: list.value[index].returnRate,
      state: list.value[index].state
    });
    if (res.data.code === 200) {
      alert('收藏成功！');

    } else {
      alert(res.data.msg);
    }
  } catch (error) {
    console.error('Error adding to favorites:', error);
    showFailToast('收藏失败！');
  }
}
initComponent()

watch(() => props.indicator, (newIndicator, oldIndicator) => {
  if (newIndicator !== oldIndicator) {
    initComponent();
  }
});

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
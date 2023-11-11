<script setup lang="ts">
import {ref} from "vue"
import {localTime} from "../../ts/transcript.ts";
import router from "../../ts/router.ts";
import axios from "../../ts/axios.ts";
import {showFailToast, showSuccessToast} from "vant";

const tRecord = ref({
  "id": 0,
  "product": {
    "id": 0,
    "name": "string",
    "details": "string",
    "price": 0,
    "antiRisk": 0,
    "flexibility": 0,
    "returnRate": 0,
    "state": 0
  },
  "price": 0,
  "amount": 0,
  "dealTime": "2023-11-11T08:41:58.258Z",
  "sold": 0
})
const doSell = async ()=>{
  // 发请求
  // 提示
  // 跳转

    let res = await axios.post('/tradeRecord/sell',{
      "productId": tRecord.value.product.id,
      "price": tRecord.value.product.price,
      "amount": tRecord.value.amount,
      "dealTime": "2023-11-11T08:48:10.359Z",
      "sold": 1
    });
    if (res.data.code==200) {
      showSuccessToast('卖出成功');
      await router.push('/investSimulation/purchased');
    } else {
      showFailToast(res.data.msg);
    }


}
const initComponent = async ()=>{
  let productId = router.currentRoute.value.params["productID"]
  let res = await axios.get(`/tradeRecord/queryByProductId?id=${productId}`)

  if(!res.data["code"]){
    showFailToast("获取产品数据失败")
    return
  }

  tRecord.value = res.data.data[0]
}
initComponent()
</script>

<template>
    <van-cell title="产品名" :value="tRecord.product.name"></van-cell>
    <van-cell title="买入时间" :value="localTime(tRecord.dealTime)"></van-cell>
    <van-cell title="持仓" :value="tRecord.amount"/>
    <van-cell title="卖出数" :value="tRecord.amount" />
    <br />
    <van-button block type="primary" @click="doSell">
        卖出
    </van-button>
</template>

<style scoped>

</style>
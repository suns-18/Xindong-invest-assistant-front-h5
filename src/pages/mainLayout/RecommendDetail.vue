<script setup lang="ts">
import router from "../../ts/router.ts";
import axios from "../../ts/axios";
import { ref } from "vue";
import {showFailToast} from "vant";

const product = ref({
  "id": 0,
  "name": "string",
  "details": "string",
  "price": 0,
  "antiRisk": 0,
  "flexibility": 0,
  "returnRate": 0,
  "state": 0
});

const initComponent = async () => {
  let productID = router.currentRoute.value.params["productID"];

  try {
    let res = await axios.get(`/product/getById?id=${productID}`);
    product.value = res.data["data"];
  } catch (error) {
    console.error("Error fetching product:", error);
    alert("Error!");
  }
};
const add = async () => {//添加收藏，调用时候用@click="add(index, item.id)"
  try {
    const res = await axios.post('/product/changeFavState', {
      id: product.value.id,
      name: product.value.name,
      details: product.value.details,
      price: product.value.price,
      antiRisk: product.value.antiRisk,
      flexibility: product.value.flexibility,
      returnRate: product.value.returnRate,
      state: product.value.state
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

const purchase = async () => {
  try {
    const purchaseData = {
      id: product.value.id,
      productId: product.value.id,
      price: product.value.price,
      amount: 1,
      dealTime: new Date().toISOString(),
      sold: 0
    };

    const res = await axios.post('/api/tradeRecord/purchase', purchaseData);

    if (res.data.code === 200) {
      alert('购买成功！');
    } else {
      alert(res.data.msg);
    }
  }catch (error) {
    console.error('购买出错:', error);
  }
};
  initComponent();
</script>

<template>
  <div style="margin-block:3rem">
    <van-cell title="产品名" :value="product.name" />
    <van-cell title="描述" :value="product.details" />
    <van-cell title="价格" :value="product.price" />
    <van-cell title="回报率" :value="`${product.returnRate}%`" />
    <van-cell title="灵活度" :value="`${product.flexibility}年`" />
    <van-cell title="非风险性" :value="product.antiRisk" />
    <div style="padding: 1rem">
      <van-button
          block
          color="linear-gradient(to right, #ff6034, #ee0a24)"
      >
        <template #default>
          <van-icon name="cart" />
          点击跳转购买
        </template>
      </van-button>
      <van-button
          @click="add"
          block
          color="linear-gradient(to right, #81CAFE, #0396ff)"
      >
        <template #default>
          <van-icon name="plus" />
          添加收藏
        </template>
      </van-button>
    </div>
  </div>
</template>

<style scoped>

</style>

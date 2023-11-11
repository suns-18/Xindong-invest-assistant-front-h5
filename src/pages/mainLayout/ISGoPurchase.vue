<script setup lang="ts">

import router from "../../ts/router.ts";
import {computed, ref} from "vue";
import axios from "../../ts/axios.ts"
import {showFailToast, showSuccessToast} from "vant";

const product = ref({
      "id": 0,
      "name": "string",
      "details": "string",
      "price": 0,
      "antiRisk": 0,
      "flexibility": 0,
      "returnRate": 0,
      "state": 0
    
})
const tRecord = ref({
    
  "id": 0,
  "productId": 0,
  "price": 0,
  "amount": 0,
  "dealTime": "2023-11-11T09:30:41.232Z",
  "sold": 0

})


const totalPrice = computed(() => {
    let sum = tRecord.value.price 
            * tRecord.value.amount
    return sum
})
const doPurchase = async() => {

    tRecord.value.productId = product.value.id

    let res = await axios.post(
        `/tradeRecord/purchase`,
        tRecord.value
    )

    if(!res.data["code"]){
        showFailToast(res.data["msg"])
        return
    }
    

    showSuccessToast("购买成功！")
    router.push('/investSimulation/finished')
}
const initComponent = async() => {
    let productId = router.currentRoute.value.params["productID"]
    let res = await axios.get(`/product/getById?id=${productId}`)

    if(!res.data["code"]){
        showFailToast(res.data["msg"])
        return
    }

    product.value = res.data["data"]
}

initComponent()
</script>

<template>
        <van-card
                :title="product.name"
        >
            <template #desc>
                <strong style="color: orangered">
                    ￥{{ product.price }}
                </strong>
            </template>
            <template #price>
                <van-row>
                    <van-col span="12">
                        <van-field placeholder="输入买入价"
                                   left-icon="gold-coin-o"
                                   v-model="tRecord.price"
                                   type="number"
                        ></van-field>
                    </van-col>
                    <van-col span="4"></van-col>
                    <van-col span="8" style="text-align: right;justify-content: right">
                        <van-stepper v-model="tRecord.amount"
                                     theme="round"/>
                    </van-col>
                </van-row>
            </template>
        </van-card>
    <van-submit-bar :price="totalPrice*100"
                    button-text="提交"
                    @submit="doPurchase">
    </van-submit-bar>
</template>

<style scoped>

</style>
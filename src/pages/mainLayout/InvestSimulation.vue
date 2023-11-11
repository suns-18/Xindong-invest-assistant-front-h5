<script setup lang="ts">

import router from "../../ts/router.ts";
import {computed, onMounted, ref} from "vue";
import {showFailToast, showSuccessToast} from "vant";
import axios from "../../ts/axios.ts"
import Product from "../../ts/model.ts"



const initComponent = async() => {
    getList()
}

const favList = ref([{
    "id": 0,
      "name": "string",
      "details": "string",
      "price": 0,
      "antiRisk": 0,
      "flexibility": 0,
      "returnRate": 0,
      "state": 0
}])

const goPurchase = (productId: number) => {
    router.push(`/investSimulation/goPurchase/${productId}`)
}

const cancelFav = async (item: Product)=>{
    let res = await axios.post('/product/changeFavState',
    {
       id: item.id,
       state: item.state 
    })

    if(!res.data["code"]){
        showFailToast(res.data["msg"])
        return
    }

    showSuccessToast("取消收藏成功！")

    await getList()
}

const getList = async ()=>{
    let res = await axios.get("/product/fav")

    if(!res.data["code"]){
        showFailToast(res.data["msg"])
        return
    }

    favList.value.splice(0, favList.value.length)

    favList.value = res.data["data"]
}

onMounted(() => {
    initComponent()
})

</script>

<template>
    <van-search
            placeholder="请输入搜索关键词"
            input-align="left"
    />
    <template v-for="(item, index) in favList">
        <van-row>
            <van-col span="19">
                <van-card
                        :desc="item.detail"
                        :title="item.name"
                >
                <template #price>
                    <h2 style="color:orangered">
                    ￥{{item.price}}
                </h2>
                </template>
                </van-card>
            </van-col>
            <van-col span="5">
                <van-row>
                    <van-col>
                        <van-button type="danger"
                            @click="cancelFav(item)"
                            block
                            size="large">
                    <van-icon name="cross"></van-icon> <br/>
                    取消收藏
                </van-button></van-col>
                </van-row>
                <van-row>
                    <van-col>
                        <van-button type="primary"
                            @click="goPurchase(item.id)"
                            block
                            size="large">
                    <van-icon name="cart"></van-icon> <br/>
                    点击购买
                </van-button>
                    </van-col>
                </van-row>
            </van-col>
        </van-row>
    </template>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
</template>

<style scoped>

</style>
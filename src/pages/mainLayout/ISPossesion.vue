<script setup lang="ts">

import router from "../../ts/router.ts";
import {usePurchasedStore} from "../../ts/store/purchased-store.ts";
import pinia from "../../ts/store.ts";
import {computed, reactive, ref} from "vue";
import {showFailToast, showSuccessToast} from "vant";
import axios from "../../ts/axios.ts";

/*const purchasedStore = usePurchasedStore(pinia)

const totalIncome = computed(() => {
    let sum = 0
    purchasedStore.data.forEach((item, index) => {
        sum += item.income
    })
    return sum
})

const tableData = purchasedStore.data*/

const stat = ref({
    "totalAssets": 0,
    "totalCurrentPrice": 0,
    "dailyProfit": 0,
    "list": [
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
            },
            "purchasePrice": 0,
            "amount": 0,
            "purchaseDate": "2023-11-10T08:25:33.535Z"
        }
    ]
})

const goSell = () => {
    router.push('/investSimulation/sell')
}

const getStat = async () => {
    let res = await axios.get(`/possession/stat`)

    if (!res.data["code"]) {
        showFailToast(res.data["msg"])
        return
    }

    stat.value = res.data["data"]
}

const initComponent = () => {
    getStat()
}
initComponent()


</script>

<template>
    <van-tabs>
        <van-tab title="我的持仓">
            <van-grid :column-num="3">
                <van-grid-item>
                    <template #icon>
                        <span>总资产</span>
                        <van-icon name="eye-o"/>
                    </template>
                    <template #text>
                        <span>{{ stat.totalAssets }}</span>
                    </template>
                </van-grid-item>
                <van-grid-item>
                    <template #icon>
                        <span>总市值</span>
                    </template>
                    <template #text>
                        <span>{{ stat.totalCurrentPrice }}</span>
                    </template>
                </van-grid-item>
                <van-grid-item>
                    <template #icon>
                        <span>当日参考盈亏</span>
                    </template>
                    <template #text>
                        <span>{{ stat.dailyProfit }}</span>
                    </template>
                </van-grid-item>
            </van-grid>
            <br/>
            <table>
                <thead>
                <tr>
                    <th>产品名</th>
                    <th>盈亏</th>
                    <th>持仓</th>
                    <th>成本</th>
                    <th>现价</th>
                    <th>购买时间</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in stat.list">
                    <td>{{ item.product.name }}</td>
                    <td>
                        <p>￥{{
														((item.product.price - item.purchasePrice)
															* item.amount).toFixed(2)
                            }}</p>
                        <p>{{
														((item.product.price - item.purchasePrice)
															/ item.product.price).toFixed(2)
                            }}%</p>
                    </td>
                    <td>{{ item.amount }}</td>
                    <td>{{ item.purchasePrice }}</td>
                    <td>{{ item.product.price }}</td>
                    <td>{{ item.purchaseDate }}</td>
                    <td>
                        <van-button type="danger"
                                    size="large"
                                    @click="goSell">
                            <van-icon name="bill"/>
                            卖出
                        </van-button>
                    </td>
                </tr>
                </tbody>
            </table>
        </van-tab>
        <van-tab title="买入记录">

        </van-tab>
        <van-tab title="卖出记录">

        </van-tab>
    </van-tabs>
</template>

<style scoped>
table {
    border: 1px solid;
    text-align: center;
    width: 100%;
    border-collapse: collapse;
}

table th {
    border: 1px solid;
}

table td {
    border: 1px solid;
}
</style>
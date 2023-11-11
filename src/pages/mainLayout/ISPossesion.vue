<script setup lang="ts">

import router from "../../ts/router.ts";
import {computed, reactive, ref} from "vue";
import {showFailToast, showSuccessToast} from "vant";
import axios from "../../ts/axios.ts";
import {localTime} from "../../ts/transcript.ts";

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

const tradeRecordList = ref([
    {
        "id": 1,
        "product": {
            "id": 605599,
            "name": "菜百股份",
            "details": "北京菜市口百货股份有限公司主营业务为黄金珠宝商品的原料采购、款式设计、连锁销售和品牌运营。公司主要产品包括黄金饰品、贵金属文化产品、贵金属投资产品，以及钻翠珠宝饰品。菜百股份是“全国文明单位”和“全国模范劳动关系和谐企业”，曾荣获“中国质量奖提名奖”、“企业信用评价AAA级信用单位”、“中国黄金第一家”、“中国黄金行业社会责任杰出贡献奖”、“中国改革开放40周年珠宝行业社会贡献奖”、“北京市人民政府质量奖提名奖”等诸多荣誉或称号。公司是上金所业务委员会的委员单位，是中国珠宝玉石首饰行业协会副会长单位和中国黄金协会副会长单位，是中国金币特许零售商和北京2022年冬奥会和冬残奥会组织委员会特许零售商。公司管理层作为全国珠宝玉石标准化技术委员会（TC298）委员和全国首饰标准化技术委员会（TC256）委员，参与制定、修订黄金珠宝国家标准和行业标准。2019年，公司成为“中国珠宝玉石首饰品牌集群”首批标杆品牌集群副主席成员单位，并通过“国家级商贸服务业标准化试点”验收。",
            "price": 13.51,
            "antiRisk": 0.9949,
            "flexibility": 0.0019,
            "returnRate": 0.034,
            "state": 1
        },
        "price": 1,
        "amount": 1,
        "dealTime": "2023-11-07T10:44:09.000+00:00",
        "sold": 0
    },
])

const goSell = () => {
    router.push('/investSimulation/sell')
}

const getRecord = async () => {
    let res = await axios.get(`/tradeRecord/queryList`)

    if (!res.data["code"]) {
        showFailToast(res.data["msg"])
        return
    }
    tradeRecordList.value.splice(0, tradeRecordList.value.length)
    tradeRecordList.value = res.data["data"]

}

const getStat = async () => {
    let res = await axios.get(`/possession/stat`)

    if (!res.data["code"]) {
        showFailToast(res.data["msg"])
        return
    }
    stat.value.list.splice(0, stat.value.list.length)
    stat.value = res.data["data"]
}

const initComponent = () => {
    getStat()
    getRecord()
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
                        <span>{{ stat.totalAssets.toFixed(2) }}</span>
                    </template>
                </van-grid-item>
                <van-grid-item>
                    <template #icon>
                        <span>总市值</span>
                    </template>
                    <template #text>
                        <span>{{ stat.totalCurrentPrice.toFixed(2) }}</span>
                    </template>
                </van-grid-item>
                <van-grid-item>
                    <template #icon>
                        <span>当日参考盈亏</span>
                    </template>
                    <template #text>
                        <span>{{ stat.dailyProfit.toFixed(2) }}</span>
                    </template>
                </van-grid-item>
            </van-grid>
            <br/>
            <table>
                <thead>
                <tr>
                    <th>产品名 </th>
                    <th>盈亏情况</th>
                    <th>持有数量</th>
                    <th>成本<br/>现价</th>
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
                    <td>￥{{ item.purchasePrice }}<br/>
                        ￥{{ item.product.price }}</td>
                    <td>{{ localTime(item.purchaseDate) }}</td>
                    <td>
                        <van-button type="danger"
                                    size="large"
                                    @click="goSell(item.product.id)">
                            <van-icon name="bill"/>
                            卖出
                        </van-button>
                    </td>
                </tr>
                </tbody>
            </table>
        </van-tab>
        <van-tab title="交易记录">
            <table>
                <thead>
                <tr>
                    <th>产品名<br/>代码</th>
                    <th>交易价格<br/>交易数</th>
                    <th>总计</th>
                    <th>购买时间</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in tradeRecordList">
                    <td><p>{{ item.product.name }}</p>
                        <p> {{ item.product.id }}</p>
                    </td>
                    <td><p>￥{{ item.price.toFixed(2) }}</p>

                        <p>✖{{ item.amount }}</p></td>
                    <td>￥{{ item.sold ? "" : "-" }}
                        {{ (item.amount * item.price).toFixed(2) }}
                    </td>
                    <td>{{ localTime(item.dealTime) }}</td>
                </tr>
                </tbody>
            </table>
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
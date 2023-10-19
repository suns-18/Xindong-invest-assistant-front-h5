<script setup lang="ts">

import router from "../../ts/router.ts";
import {usePurchasedStore} from "../../ts/store/purchased-store.ts";
import pinia from "../../ts/store.ts";
import {computed, reactive, ref} from "vue";
import {showSuccessToast} from "vant";

const purchasedStore = usePurchasedStore(pinia)

const totalIncome = computed(() => {
    let sum = 0
    purchasedStore.data.forEach((item, index) => {
        sum += item.income
    })
    return sum
})

const tableData = purchasedStore.data

const goSell = () => {
    router.push('/investSimulation/sell')
}


</script>

<template>
	<!--    <van-cell center>
					<template #title>
							<h3>当前总收入</h3>
					</template>
					<template #value>
							<h2 style="color: orangered">{{ totalIncome }}</h2>
					</template>
			</van-cell>
			<template v-for="(item,index) in purchasedStore.data">
					<van-card
									:desc="`模拟购买时间：`+item.purchasedTime"
									:title="item.name"
									:thumb="item.thumb"
					>
							<template #price>
									<span style="color: orangered">
											{{ item.income }}
									</span>
							</template>
					</van-card>
			</template>-->
    <van-grid :column-num="4">
        <van-grid-item>
            <template #icon>
                <span>总资产</span>
                <van-icon name="eye-o"/>
            </template>
            <template #text>
                <span>{{ totalIncome }}</span>
            </template>
        </van-grid-item>
        <van-grid-item>
            <template #icon>
                <span>总市值</span>
            </template>
            <template #text>
                <span>{{ totalIncome }}</span>
            </template>
        </van-grid-item>
        <van-grid-item>
            <template #icon>
                <span>总盈亏</span>
            </template>
            <template #text>
                <span>{{ totalIncome }}</span>
            </template>
        </van-grid-item>
        <van-grid-item>
            <template #icon>
                <span>当日参考盈亏</span>
            </template>
            <template #text>
                <span>{{ totalIncome }}</span>
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
        <tr v-for="(item,index) in purchasedStore.data">
            <td>{{ item.name }}</td>
            <td>
                <p>￥{{ ((item.income - item.cost) * item.count).toFixed(2) }}</p>
                <p>{{ ((item.income - item.cost) / item.price).toFixed(2) }}%</p>
            </td>
            <td>{{ item.count }}</td>
            <td>{{ item.income }}</td>
            <td>{{ item.cost }}</td>
            <td>{{ item.purchasedTime }}</td>
            <td>
                <van-button type="danger"
                            size="large"
                            @click="goSell">
                    <van-icon name="bill" />
                    卖出
                </van-button>
            </td>
        </tr>
        </tbody>
    </table>
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
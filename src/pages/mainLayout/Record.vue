<script setup lang="ts">
import {usePurchasedStore} from "../../ts/store/purchased-store.ts";
import pinia from "../../ts/store.ts";

const purchasedStore = usePurchasedStore(pinia)
</script>

<template>
    <van-tabs>
        <van-tab title="买入记录">
            <table>
                <thead>
                <tr>
                    <th>产品名</th>
                    <th>盈亏</th>
                    <th>持仓</th>
                    <th>成本</th>
                    <th>现价</th>
                    <th>购买时间</th>
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
                </tr>
                </tbody>
            </table>
        </van-tab>
        <van-tab title="卖出记录">
            <table>
                <thead>
                <tr>
                    <th>产品名</th>
                    <th>盈亏</th>
                    <th>持仓</th>
                    <th>成本</th>
                    <th>现价</th>
                    <th>卖出时间</th>
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
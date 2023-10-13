<script setup lang="ts">

import router from "../../ts/router.ts";
import {useFavStore} from "../../ts/store/fav-store.ts";
import pinia from "../../ts/store.ts";
import {computed, onMounted, ref} from "vue";
import {showFailToast} from "vant";

const favStore = useFavStore(pinia)

const select = ref<[boolean]>([])

const initComponent = () => {
    favStore.data.forEach((item) => {
        select.value.push(false)
    })
}

const isAllSelected = computed(() => {
    return (getSelectedCount() == select.value.length)
})
const isIndeterminated = computed(() => {
    let selectedCount = getSelectedCount()
    return selectedCount > 0 && selectedCount < select.value.length
})

const doSelectAll = () => {
    select.value.forEach((item) => {
        item = !item
    })
}

const goPurchase = () => {

    if (getSelectedCount() == 0) {
        showFailToast('请选择至少一个产品')
        return
    }
    router.push('/investSimulation/goPurchase')
}

const getSelectedCount = () => {
    let selectedCount = 0
    select.value.forEach((item) => {
        if (item) selectedCount++
    })
    return selectedCount
}
onMounted(() => {
    initComponent()
})

</script>

<template>
	<!--    <van-cell center
								@click="router.push('/investSimulation/purchased')">
					<template #title>
							<h2>模拟投资</h2>
					</template>
						<template #value>
											<a><h4>查看我的模拟资产</h4></a>
									</template>
			</van-cell>-->
    <van-cell>
        <template #title>
            <h3>请选择要购买的产品</h3>
        </template>
    </van-cell>
    <van-search
            placeholder="请输入搜索关键词"
            input-align="center"
    />

    <van-cell center>
        <template #title>
            <van-checkbox
                    :indeterminate="isIndeterminated"
                    v-model="isAllSelected"
                    @click="doSelectAll">全选
            </van-checkbox>
        </template>
<!--        <template #right-icon>
            <van-button
                    type="primary"
                    @click="goPurchase">
                我选好了，点击模拟购买
            </van-button>
        </template>-->
    </van-cell>
    <template v-for="(item,index) in favStore.data">
        <van-row>
            <van-col span="3">
                <van-space align="center"
                           fill
                           style="padding: 16px;background-color: #f7f8fa">
                    <van-checkbox v-model="select[index]"></van-checkbox>
                </van-space>
            </van-col>
            <van-col span="21">
                <van-card
                        @click="select[index] = !select[index]"
                        :price="item.price"
                        :desc="item.description"
                        :title="item.name"
                        :thumb="item.thumb"
                />
            </van-col>
        </van-row>
    </template>
</template>

<style scoped>

</style>
<script setup lang="ts">
import router from "../../ts/router.ts";
import axios from "../../ts/axios";
import {ref} from "vue";
import {showFailToast, showSuccessToast} from "vant";
import {Product} from "../../ts/model";

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
        if (product.value.state === 1) {
            setButtonStyle(false);
        } else {
            setButtonStyle(true);
        }
    } catch (error) {
        console.error("Error fetching product:", error);
        alert("Error!");
    }


};

const link = ref({
    "id": 0,
    "productId": 0,
    "param": "string"
});
const purchase = async (item: Product) => {
    try {

        const res = await axios.get(`/product/getParamById?id=${item.id}`);
        if (res.data.code === 200) {
            link.value = res.data["data"]
            console.log(link.value.param)
            window.open(`https://xueqiu.com${link.value.param}`)
        } else {
            alert(res.data.msg);
        }
    } catch (error) {
        console.error('购买出错:', error);
    }

};
//动态按钮设置
const ButtonColor = ref("linear-gradient(to right, #81CAFE, #0396ff)");
const ButtonText = ref('添加收藏');
const ButtonIcon = ref("")
const setButtonStyle = (sign: boolean) => {
    if (!sign) {
        ButtonColor.value = "linear-gradient(to right, #ff6034, #ee0a24)"
        ButtonText.value = "取消收藏";
        ButtonIcon.value = "cross"
    } else {
        ButtonColor.value = "linear-gradient(to right, #81CAFE, #0396ff)"
        ButtonText.value = "添加收藏";
        ButtonIcon.value = "plus"
    }
}
const setFavorite = async (item: Product) => {//添加收藏

    if (item.state === 0) {
        try {
            const res = await axios.post('/product/changeFavState', {
                id: item.id,
                state: item.state
            });
            if (res.data.code === 200) {
                showSuccessToast('收藏成功！')

                item.state = 1
                setButtonStyle(false);
            } else {
                showFailToast(res.data.msg)
            }
        } catch (error) {
            console.error('Error adding to favorites:', error);
            showFailToast('收藏失败！');
        }
    } else {
        try {
            const res = await axios.post('/product/changeFavState', {
                id: item.id,
                state: item.state
            });
            if (res.data.code === 200) {
                showSuccessToast('取消收藏成功！')

                item.state = 0
                setButtonStyle(true);
            } else {
                showFailToast(res.data.msg)
            }
        } catch (error) {
            console.error('Error adding to favorites:', error);
            showFailToast('收藏失败！');
        }
    }

}
initComponent();

</script>

<template>
    <div style="margin-block:3rem">
        <van-cell title="产品名" :value="product.name"/>
        <van-cell title="描述" :value="product.details"/>
        <van-cell title="价格" :value="product.price"/>
        <van-cell title="回报率" :value="`${product.returnRate}`"/>
        <van-cell title="灵活度" :value="`${product.flexibility}`"/>
        <van-cell title="非风险性" :value="product.antiRisk"/>
        <div style="padding: 1rem">
            <van-button
                    block
                    color="linear-gradient(to right, #ff6034, #ee0a24)"
                    @click="purchase(product)"
            >
                <template #default>
                    <van-icon name="cart"/>
                    点击跳转购买
                </template>
            </van-button>
            <div class="product-border"></div>
            <van-button
                    @click="setFavorite(product)"
                    block
                    :color='ButtonColor'
            >
                <template #default>
                    <van-icon :name="ButtonIcon"/>
                    {{ ButtonText }}
                </template>
            </van-button>
        </div>
    </div>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
</template>

<style scoped>
.product-border {
    border-bottom: 1px solid #ebedf0; /* 添加所需的边框颜色 */
    margin-bottom: 5px;
}
</style>

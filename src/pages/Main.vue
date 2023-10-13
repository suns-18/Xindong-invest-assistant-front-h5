<script setup lang="ts">
import {computed, ref} from "vue";
import router from "../ts/router.ts";
import {naviMenu} from "../ts/navi-menu.ts";

const barActivated = ref(0)

const title = computed(() => {
    let pageTitle = router.currentRoute.value.meta['title']
    return pageTitle.split(' - ')[0] == '主页' ?
      pageTitle.split(' - ')[1] :
      pageTitle.split(' - ')[0]
})
</script>

<template>
    <van-nav-bar left-text="返回"
                 left-arrow
                 @click-left="router.back()"
                 :title="title"/>

    <div style="padding-inline: 1.5rem;">
        <router-view></router-view>
    </div>

    <van-tabbar route v-model="barActivated"
                inactive-color="#000">
        <van-tabbar-item
          v-for="item in naviMenu"
          :to="item.to"
          :icon="item.icon"
        >
            {{item.title}}
        </van-tabbar-item>
    </van-tabbar>

</template>

<style scoped>

</style>
import {createRouter, createWebHistory} from "vue-router";

// @ts-ignore
const mapper = [{
    path: '/-main',
    component: () => import('../pages/Main.vue'),
    children: [{
        path: '/',
        alias: ['/index', '/home'],
        component: () => import('../pages/mainLayout/Home.vue'),
        meta: {title: '主页 - 信东智能投顾'}
    },{
        path: '/riskConfig',
        component: () => import('../pages/mainLayout/RiskConfig.vue'),
        meta: {title: '风险设定 - 信东智能投顾'}
    },{
        path: '/recommend',
        component: () => import('../pages/mainLayout/RecommendPage.vue'),
        meta: {title: '理财推荐 - 信东智能投顾'}
    },{
        path: '/investSimulation',
        component: () => import('../pages/mainLayout/InvestSimulation.vue'),
        meta: {title: '模拟投资 - 信东智能投顾'}
    },{
        path: '/recommend/detail',
        component: () => import('../pages/mainLayout/RecommendDetail.vue'),
        meta: {title: '产品1详情 - 信东智能投顾'}
    },{
        path: '/riskConfig/result',
        component: () => import('../pages/mainLayout/RiskResult.vue'),
        meta: {title: '风险评估结果 - 信东智能投顾'}
    },{
        path: '/investSimulation/purchased',
        component: () => import('../pages/mainLayout/ISPurchased.vue'),
        meta: {title: '模拟持仓 - 信东智能投顾'}
    },{
        path: '/investSimulation/goPurchase',
        component: () => import('../pages/mainLayout/ISGoPurchase.vue'),
        meta: {title: '模拟购买 - 信东智能投顾'}
    },{
        // 404 Page
        path: '/:pathMatch(.*)*',
        component: () => import('../pages/error/NotFound.vue'),
        meta: {
            title: "404错误：页面未找到 - 信东智能投顾"
        }
    }]
}]

const router = createRouter({
    history: createWebHistory(),
    routes: mapper
})

// @ts-ignore
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        // @ts-ignore
        document.title = to.meta.title
    }
    next()
})
export default router
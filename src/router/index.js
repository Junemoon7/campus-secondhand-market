import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',

    component: () => import('../view/Index.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../view/Home.vue'),
      },
      {
        path: 'productList',
        name: '商品列表',
        component: () => import('../view/ProductList.vue'),
      },
      {
        path: 'selfproductlist',
        name: '自营商品',
        component: () => import('../view/SelfProductList.vue'),
      },
      {
        path: 'class',
        name: '分类',
        component: () => import('../view/Class.vue'),
      },
      {
        path: 'report',
        name: '举报信息',
        component: () => import('../view/Report.vue'),
      },
      {
        path: 'userManager',
        name: '用户管理',
        component: () => import('../view/UserManager.vue'),
      },
      {
        path: 'requireList',
        name: '求购中心',
        component: () => import('../view/RequireList.vue'),
      },
    ],
  },
  {
    path: '/toLogin',
    name: 'toLogin',
    component: () => import('../view/Login.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router

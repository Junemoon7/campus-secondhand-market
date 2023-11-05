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
        name: 'productList',
        component: () => import('../view/ProductList.vue'),
      },
      {
        path: 'selfproductlist',
        name: 'selfProductList',
        component: () => import('../view/SelfProductList.vue'),
      },
      {
        path: 'class',
        name: 'class',
        component: () => import('../view/Class.vue'),
      },
      {
        path: 'report',
        name: 'report',
        component: () => import('../view/Report.vue'),
      },
      {
        path: 'userManager',
        name: 'userManager',
        component: () => import('../view/UserManager.vue'),
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

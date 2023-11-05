<template>
  <el-menu popper-effect="light" default-active="1" class="overflow-y-auto el-menu-vertical-demo w-fit h-screen bg-slate-50" @open="handleOpen" @close="handleClose">
    <div class="w-full flex justify-center">
      <img src="../../chu.png" class="bg-slate-50 w-5/6 pb-6 pt-6 border-y-zinc-950" />
    </div>
    <el-sub-menu index="1">
      <template #title>
        <el-icon><Goods /></el-icon>
        <!-- <el-icon><Goods /></el-icon> -->
        <span>商品管理</span>
      </template>
      <el-menu-item index="1-1"><router-link tag="span" to="/" class="block w-full">首页</router-link></el-menu-item>
      <el-menu-item index="1-2"> <router-link tag="span" to="/ProductList" class="block w-full">商品列表</router-link></el-menu-item>
      <el-menu-item index="1-3"><router-link tag="span" to="/selfproductList" class="block w-full">自营商品</router-link></el-menu-item>
      <el-menu-item index="1-4"><router-link tag="span" to="/class" class="block w-full">商品分类</router-link></el-menu-item>
      <el-menu-item index="1-5">求购中心</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="2">
      <el-icon><User /></el-icon>
      <router-link tag="span" to="/UserManager" class="block w-full">用户管理</router-link>
    </el-menu-item>
    <el-menu-item index="3">
      <el-icon><Phone /></el-icon>
      <router-link tag="span" to="/Report" class="block w-full">举报信息</router-link>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { User, Goods, Phone } from '@element-plus/icons-vue'
import { useTabStore } from '../store/tabnavigations'
import { useRouter, useRoute } from 'vue-router'
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const tabs = useTabStore()
const route = useRoute()
if (route.path !== '/') {
  tabs.add_tabs({ route: route.path, name: route.name })
  tabs.set_active_index(route.path)
} else {
  tabs.set_active_index('/')
}
</script>

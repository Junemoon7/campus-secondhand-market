<template>
  <el-tabs type="card" v-model="activeIndex" closable @tab-click="tabClick" v-if="options.length" @tab-remove="tabRemove">
    <el-tab-pane :key="item.route" v-for="(item, index) in options" :label="item.name" :name="item.route"></el-tab-pane>
  </el-tabs>

  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <component :is="Component" v-if="route.meta.keepAlive" />
      </keep-alive>
    </transition>
    <transition name="fade" mode="out-in">
      <component :is="Component" v-if="!route.meta.keepAlive" />
    </transition>
  </router-view>
</template>

<script setup>
import { computed, defineComponent, ref, watch, watchEffect } from 'vue'
import { useTabStore } from '../store/tabnavigations'
import { useRouter, useRoute } from 'vue-router'
const emits = defineEmits(['tabClick'])
const router = useRouter()
const tabs = useTabStore()
const route = useRoute()
const options = computed({
  get: () => tabs.options,
})
const activeIndex = ref('')
const tabClick = (pane) => {
  console.log(pane.paneName)
  tabs.set_active_index(pane.paneName)
  let path = tabs.activeIndex
  router.push(path)
}
const tabRemove = (targetName) => {
  // console.log(targetName)
  if (targetName == '/') {
    return
  }
  tabs.delete_tabs(targetName)
  if (tabs.options.length) {
    let path = tabs.options[tabs.options.length - 1].route
    router.push(path)
  } else {
    router.push('/')
  }
}
watch(route, () => {
  let flag = false

  for (let option of tabs.options) {
    if (option.route === route.path) {
      flag = true
      tabs.set_active_index(route.path)
      break
    }
  }
  if (!flag) {
    tabs.add_tabs({ route: route.path, name: route.name })
    tabs.set_active_index(route.path)
  }
})
</script>

<style lang="scss" scoped></style>

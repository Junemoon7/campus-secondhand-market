<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import sidebar from './components/sidebar.vue'
import ProductList from './view/ProductList.vue'
import tailwindcsstest from './components/tailwindcsstest.vue'
import { useDark, useToggle } from '@vueuse/core'
import tabs from './components/tabs.vue'
</script>

<style lang="scss" scoped></style>

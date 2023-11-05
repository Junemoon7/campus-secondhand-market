<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:py-24 lg:px-8">
    <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">数据统计</h2>
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-4 mt-4">
      <div class="bg-white overflow-hidden shadow sm:rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <dl>
            <dt class="text-sm leading-5 font-medium text-gray-500 truncate">今日发布</dt>
            <dd class="mt-1 text-3xl leading-9 font-semibold text-indigo-600">1.6M</dd>
          </dl>
        </div>
      </div>
      <div class="bg-white overflow-hidden shadow sm:rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <dl class="flex w-fit flex-wrap justify-start items-center">
            <div class="text-sm leading-5 font-medium text-gray-500 truncate">
              出售中
              <div class="mt-1 text-3xl leading-9 font-semibold text-indigo-600">19.2K</div>
            </div>
            <div class="text-sm leading-5 font-medium text-gray-500 truncate ml-16">
              下架
              <div class="mt-1 text-3xl leading-9 font-semibold text-indigo-600">19.2K</div>
            </div>
          </dl>
        </div>
      </div>
      <div class="bg-white overflow-hidden shadow sm:rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <dl class="flex w-fit flex-wrap justify-start items-center">
            <div class="text-sm leading-5 font-medium text-gray-500 truncate">
              今日求购
              <div class="mt-1 text-3xl leading-9 font-semibold text-indigo-600">2.8K</div>
            </div>
            <div class="text-sm leading-5 font-medium text-gray-500 truncate ml-16">
              所有求购
              <div class="mt-1 text-3xl leading-9 font-semibold text-indigo-600">11.2K</div>
            </div>
          </dl>
        </div>
      </div>
      <div class="bg-white overflow-hidden shadow sm:rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <dl>
            <dt class="text-sm leading-5 font-medium text-gray-500 truncate">Total users</dt>
            <dd class="mt-1 text-3xl leading-9 font-semibold text-indigo-600">166.7K</dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

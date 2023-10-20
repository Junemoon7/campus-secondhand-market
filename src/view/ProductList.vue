<!-- 交流QQ群:七5四五7377八 -->
<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6 text-gray-900">Lists</h1>
        <p class="mt-2 text-sm text-gray-700">上架商品列表</p>
      </div>

      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button
          type="button"
          class="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          <PlusIcon class="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>

    <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
      <div class="sm:col-span-1 sm:col-start-1">
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">学号</label>
        <div class="mt-2">
          <input
            v-model="inputName"
            type="email"
            name="email"
            id="email"
            class="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="请输入学生姓名"
            aria-describedby="email-description" />
        </div>
        <!-- <p class="mt-2 text-sm text-gray-500" id="email-description">请输入学号</p> -->
      </div>

      <div class="sm:col-span-1">
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">姓名</label>
        <div class="mt-2">
          <input
            type="email"
            name="email"
            id="email"
            class="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="请输入学生学号"
            aria-describedby="email-description" />
        </div>
        <!-- <p class="mt-2 text-sm text-gray-500" id="email-description">We'll only use this for spam.</p> -->
      </div>

      <div class="sm:col-span-2">
        <label for="location" class="block text-sm font-medium leading-6 text-gray-900">状态</label>
        <select
          id="location"
          name="location"
          class="mt-2 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          <option>审核中</option>
          <option selected="">已通过</option>
          <option>未通过</option>
        </select>
      </div>
    </div>

    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead class="bg-gray-100">
              <tr>
                <th scope="col" class="py-3.5 pl-8 pr-3 text-lg text-left font-semibold text-gray-500 sm:pl-8">学生</th>
                <th scope="col" class="px-3 py-3.5 text-left text-lg font-semibold text-gray-500">商品名称</th>
                <th scope="col" class="px-3 py-3.5 text-left text-lg font-semibold text-gray-500">商品状态</th>
                <th scope="col" class="px-3 py-3.5 text-left text-lg font-semibold text-gray-500">Role</th>
                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span class="sr-only">编辑</span>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="person in people" :key="person.email">
                <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                  <div class="flex items-center">
                    <div class="h-11 w-11 flex-shrink-0">
                      <img class="h-11 w-11 rounded-full" :src="person.image" alt="" />
                    </div>
                    <div class="ml-4">
                      <div class="font-medium text-gray-900">{{ person.name }}</div>
                      <div class="mt-1 text-gray-500">{{ person.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                  <div class="text-gray-900">{{ person.title }}</div>
                  <div class="mt-1 text-gray-500">{{ person.department }}</div>
                </td>

                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                  <span class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">审核中</span>
                </td>

                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{{ person.role }}</td>
                <td class="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                  <button
                    type="button"
                    class="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-3">
                    编辑
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div v-for="result in results" :key="result.item.name" py-2>
    <div flex flex-col>
      <span> {{ result.item.name }} {{ result.item }} </span>
      <span text-sm opacity-50> Score Index: {{ result.refIndex }} </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/20/solid'
import { ref } from 'vue'
import Fuse from 'fuse.js'
import { useFuse } from '@vueuse/integrations/useFuse'
const people = [
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    department: 'Optimization',
    email: 'lindsay.walton@example.com',
    role: 'Member',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Stephen Curry',
    title: 'Basketball player',
    department: 'NBA',
    email: 'NBA.walton@example.com',
    role: 'PRO',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
]
const inputName = ref('Lindsay')
const { results } = useFuse(inputName, people)

console.log(results)
</script>

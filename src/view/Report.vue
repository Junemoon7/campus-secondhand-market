<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none"></div>
    </div>
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8">商品</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">卖家</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">举报信息</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">举报人</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">举报时间</th>
                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="item in Listdata" :key="Listdata.id">
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">{{ item.commodity.title }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ item.commodity.userName }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ item.content }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ item.user.nickName }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ item.updateTime }}</td>
                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                  <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit<span class="sr-only">, </span></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
const Listdata = ref([])
const Form = new FormData()
Form.append('page', 1)
Form.append('limit', 10)
async function getReportList() {
  return await axios.post('/api/inform/informList', Form)
}
const getList = async () => {
  const res = await getReportList()
  Listdata.value = res.data.data
  console.log(Listdata.value)
}
getList()
</script>

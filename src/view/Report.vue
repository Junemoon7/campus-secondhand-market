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
              <tr v-for="item in pagination" :key="pagination.id">
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">{{ item.commodity.title }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ item.commodity.userName }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ item.content }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ item.user.nickName }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ item.updateTime }}</td>
                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                  <div href="#" class="hover:text-indigo-900">
                    <div>
                      <template v-if="item.state == 1"> 已处理 </template>

                      <template v-else>
                        <button
                          @click="handleReport(item)"
                          class="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                          查看详情
                        </button>
                      </template>
                    </div>
                    <!-- <div
                      v-html="
                        item.state == 1
                          ? '已处理'
                          : '<button @click=&quot;handleReport(item)&quot; class=&quot;rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 &quot;>查看详情</button>'
                      "></div> -->
                    <span class="sr-only">, </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <el-pagination v-model:current-page="currentpage" :page-size="10" :pager-count="11" layout="prev, pager, next" :total="Listdata.length" hide-on-single-page />
        </div>
      </div>
    </div>
    <el-dialog v-model="dialogFormEdit" title="商品详情">
      <el-form :model="form">
        <el-form-item label="商品标题" :label-width="formLabelWidth">{{ form.title }} </el-form-item>
        <el-form-item label="商品价格" :label-width="formLabelWidth">
          <td class="whitespace-nowrap px-3 text-sm text-black">
            <div class="text-gray-900">
              {{ form.price }}￥<span class="ml-5 mt-1 text-gray-500 line-through">{{ form.oldPrice }}￥</span>
            </div>
          </td>
        </el-form-item>
        <el-form-item label="发布者" label-width="140px">
          <td class="whitespace-nowrap px-3 text-sm text-black">
            <div class="text-gray-900">
              {{ form.userName }}
            </div>
          </td></el-form-item
        >
        <el-form-item label="图片" label-width="140px">
          <td class="whitespace-nowrap px-3 text-sm text-black" v-for="item in form.commodityImgList">
            <img :src="'http://210.45.92.232:8080/' + item.imgSrc" alt="" class="h-60 mt-5" /></td
        ></el-form-item>
        <el-form-item label="上传时间" label-width="140px">
          <td class="whitespace-nowrap px-3 text-sm text-black">
            <div class="text-gray-900">
              {{ form.updateTime }}
            </div>
          </td></el-form-item
        >
      </el-form>
      <template #footer>
        <span class="dialog-footer flex justify-evenly">
          <button
            type="button"
            @click="handeldiglogbutton(form)"
            v-if="form.state == '2' || form.state == '0'"
            :class="
              form.state == '2'
                ? 'inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                : 'inline-flex items-center gap-x-1.5 rounded-md bg-gray-400 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600'
            ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>

            下 架
          </button>
          <button
            @click="passReport(form)"
            class="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <CheckCircleIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
            通 过
          </button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { CheckCircleIcon } from '@heroicons/vue/20/solid'
import { ref, computed } from 'vue'
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
const formLabelWidth = '140px'
const Listdata = ref([])
const dialogFormEdit = ref(false)
const form = ref({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})
const currentpage = ref(1)
const reportid = ref('')
const Form = new FormData()
Form.append('page', currentpage.value)
Form.append('limit', 1000)
async function getReportList() {
  return await axios.post('/api/inform/informList', Form)
}
const getList = async () => {
  const res = await getReportList()
  Listdata.value = res.data.data
}
getList()
function handleReport(item) {
  dialogFormEdit.value = true
  form.value = item.commodity
  reportid.value = item.id
}
function passReport(form) {
  // console.log(form)
  const id = new FormData()
  id.append('id', reportid.value)
  axios.post('/api/inform/updateInform', id).then((res) => {
    dialogFormEdit.value = false
    getList()
    ElMessage({
      type: 'success',
      message: '处理完成',
    })
  })
}
function handeldiglogbutton(form) {}
// /inform/updateInform
const pagination = computed(() => {
  return Listdata.value.slice((currentpage.value - 1) * 10, currentpage.value * 10)
})
</script>

<template>
  <div>
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="sm:flex sm:items-center"></div>
      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div class="sm:col-span-1 sm:col-start-1">
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">搜索</label>
          <div class="mt-2">
            <input
              v-model="search"
              type="email"
              name="email"
              id="email"
              class="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="请输入参数"
              aria-describedby="email-description" />
          </div>
        </div>

        <div class="dark:(dark-300) light-700 mr-2" border="1 light-900 dark:(dark-700)" rounded relative flex items-center>
          <span class="text-sm">查询方式</span>
          <select
            v-model="filterBy"
            px-8
            bg-transparent
            class="mt-2 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            <option bg="dark:(dark-300) light-700" value="both" class="">全部</option>
            <option bg="dark:(dark-300) light-700" value="name">发布者</option>
            <option bg="dark:(dark-300) light-700" value="title">商品</option>
          </select>
        </div>

        <Listbox as="div" v-model="selected">
          <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">Assigned to</ListboxLabel>
          <div class="relative mt-2">
            <ListboxButton
              class="bg-slate-200 relative w-full cursor-default rounded-md py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
              <span class="flex items-center">
                <img src="../../filter.png" alt="" class="h-5 w-5 flex-shrink-0 rounded-full" />
                <span class="ml-3 block truncate">{{ selected }}</span>
              </span>
              <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </ListboxButton>

            <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
              <ListboxOptions class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                <ListboxOption as="template" v-for="state in storestate" :key="state.id" :value="state.state" v-slot="{ active, selected }">
                  <li :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                    <div class="flex items-center">
                      <img src="../../filter.png" alt="" class="h-5 w-5 flex-shrink-0 rounded-full" />
                      <span :class="[selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate']">{{ state.state }}</span>
                    </div>

                    <span v-if="selected" :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                      <CheckIcon class="h-5 w-5" aria-hidden="true" />
                    </span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>
        <div class="mt-4 sm:ml-16 sm:mt-8 sm:col-span-1 sm:col-start-7">
          <diglog></diglog>
        </div>
      </div>

      <div class="mt-8 flow-root h-5/6">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-100">
                <tr class="text-center">
                  <th scope="col" class="py-3.5 pl-8 pr-3 text-lg text-left font-semibold text-gray-500 sm:pl-8">商品</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-lg font-semibold text-gray-500">发布者</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-lg font-semibold text-gray-500">价格</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-lg font-semibold text-gray-500">发布时间</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-lg font-semibold text-gray-500">商品状态</th>

                  <th scope="col" class="px-3 py-3.5 text-left text-lg font-semibold text-gray-500">分类</th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span class="sr-only">编辑</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="(person, index) in pagination" :key="person.item.id">
                  <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                    <div class="flex items-center">
                      <div class="ml-8">
                        <div class="font-medium text-gray-900">{{ person.item.title }}</div>
                        <div class="mt-1 text-gray-500 overflow-hidden whitespace-normal">{{ person.item.quality }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    <div class="text-gray-900">{{ person.item.userName }}</div>
                    <div class="mt-1 text-gray-500">{{ person.item.telephoneNumber }}</div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    <div class="text-gray-900">{{ person.item.price }}￥</div>
                    <div class="mt-1 text-gray-500 line-through">{{ person.item.oldPrice }}￥</div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    <div class="text-gray-900">{{ person.item.updateTime }}</div>
                    <div class="mt-1 text-gray-500">{{ person.item.department }}</div>
                  </td>

                  <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    <span
                      class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium ring-1 ring-inset ring-green-600/20"
                      :class="
                        person.item.state == '1'
                          ? 'inline-flex items-center rounded-md bg-gray-200 px-2 py-1 text-xs font-medium  text-gray-400 ring-1 ring-inset  ring-slate-600/20'
                          : person.item.state == '0'
                          ? 'bg-green-50 text-green-700 ring-green-600/20'
                          : 'bg-red-50 text-red-700 ring-red-600/20'
                      "
                      >{{ person.item.state == '0' ? '出售中' : person.item.state == '1' ? '已下架' : '审核中' }}</span
                    >
                  </td>

                  <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    <!-- <div class="h-11 w-11 flex-shrink-0">
                    <img class="h-11 w-11 rounded-full" alt="" />
                  </div> -->
                    <div class="flex">
                      <img :src="Imageicon.find((item) => item.cateName == person.item.cateName).cateIcon" alt="" class="mt-0.5 pr-1 h-5 text-gray-500" /> <span>{{ person.item.cateName }}</span>
                    </div>
                  </td>
                  <td class="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <button
                      @click="handledialog(person.item)"
                      type="button"
                      class="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-3">
                      编辑
                    </button>

                    <button
                      v-if="person.item.state == '0' || person.item.state == '2'"
                      @click="handeldiglogbutton(person.item)"
                      type="button"
                      class="rounded-md bg-rose-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-3">
                      {{ person.item.state == '0' ? '下架' : person.item.state == '2' ? '上架' : '' }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="demo-pagination-block">
        <el-pagination v-model:current-page="currentPage1" :page-size="5" :background="true" layout="total, prev, pager, next" :total="filterState.length" />
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

            {{ form.state == '0' ? '下架' : form.state == '1' ? '' : '上架' }}
          </button>
          <button
            @click="dialogFormEdit = false"
            class="inline-flex items-center gap-x-1.5 rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <CheckCircleIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
            关闭
          </button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import diglog from '../components/diglog.vue'
import { CheckCircleIcon } from '@heroicons/vue/20/solid'
import { PlusIcon } from '@heroicons/vue/20/solid'
import { computed, ref, watch, reactive } from 'vue'
import { useFuse } from '@vueuse/integrations/useFuse'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
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
const Imageicon = ref([])
const getImage = () => {
  axios.get('api/category/getAllCategory').then((res) => {
    for (const item of res.data) {
      Imageicon.value.push(item)
    }
    console.log(Imageicon)
  })
}
getImage()
function handledialog(state) {
  form.value = state
  console.log(form.value)
  dialogFormEdit.value = true
}
const handeldiglogbutton = (form) => {
  if (form.state == '0') {
    ElMessageBox.confirm('你确定要下架该商品吗？', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(() => {
        const data = new FormData()
        data.append('commodityId', form.commodityImgList[0].commodityId)
        data.append('title', form.title)
        data.append('userId', form.userId)
        axios.post('api/commodity/delCommodity', data)
        ElMessage({
          type: 'success',
          message: '删除完成',
        })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '已取消删除',
        })
      })
  } else {
    ElMessageBox.confirm('你确定要上架该商品吗？', '警告', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    })
      .then(() => {
        const data = new FormData()
        data.append('id', form.id)
        data.append('state', 0)
        axios.post('api/commodity/updateCommodityState', data)
        ElMessage({
          type: 'success',
          message: '上架完成',
        })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '已取消上架',
        })
      })
  }
}
const formLabelWidth = '140px'

const currentPage1 = ref(1)
const Form = new FormData()
Form.append('page', currentPage1.value.toString())
Form.append('limit', '1000')
const Listdata = ref([])
async function getProductList() {
  axios
    .post('api/commodity/selfCommodityList', Form)
    .then((res) => res.data)
    .then((res) => {
      Listdata.value = res.data
    })
}
getProductList()
const storestate = [
  {
    id: -1,
    state: '全部',
  },

  {
    id: 0,
    state: '出售中',
  },
  {
    id: 1,
    state: '已下架',
  },
  {
    id: 2,
    state: '审核中',
  },
]
const selected = ref(storestate[0].state)
const search = ref('')
const filterBy = ref('both')
const keys = computed(() => {
  if (filterBy.value === 'userName') return ['userName']
  else if (filterBy.value === 'title') return ['title']
  else return ['userName', 'title']
})
const exactMatch = ref(false)
const isCaseSensitive = ref(false)
const matchAllWhenSearchEmpty = ref(true)
const options = computed(() => ({
  fuseOptions: {
    keys: keys.value,
    isCaseSensitive: isCaseSensitive.value,
    threshold: exactMatch.value ? 0 : undefined,
  },
  matchAllWhenSearchEmpty: matchAllWhenSearchEmpty.value,
}))

const { results } = useFuse(search, Listdata, options)
const filterState = computed(() => {
  let filterdata = ''

  return results.value.filter((item) => {
    if (selected.value == '全部') {
      filterdata = item.item
    } else if (selected.value == '出售中' && item.item.state == '0') {
      filterdata = item.item
    } else if (selected.value == '已下架' && item.item.state == '1') {
      filterdata = item.item
    } else if (selected.value == '审核中' && item.item.state == '2') {
      filterdata = item.item
    } else {
      filterdata = ''
    }
    return filterdata
  })
})
const pagination = computed(() => {
  return filterState.value
    .sort((a, b) => {
      if (a.item.state == 2) return -1
      else if (a.item.state == 1) return 1
      else return 0
    })
    .slice((currentPage1.value - 1) * 5, currentPage1.value * 5)
})
</script>

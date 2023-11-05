<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <!-- <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6 text-gray-900">Lists</h1>
        <p class="mt-2 text-sm text-gray-700">上架商品列表</p>
      </div> -->
    </div>

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
            placeholder="请输入学生姓名"
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
          <option bg="dark:(dark-300) light-700" value="name">商品</option>
          <option bg="dark:(dark-300) light-700" value="title">发布者</option>
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
                <th scope="col" class="px-3 py-3.5 text-left text-lg font-semibold text-gray-500">原价</th>
                <th scope="col" class="px-3 py-3.5 text-left text-lg font-semibold text-gray-500">现价</th>
                <th scope="col" class="px-3 py-3.5 text-left text-lg font-semibold text-gray-500">商品状态</th>
                <th scope="col" class="px-3 py-3.5 text-left text-lg font-semibold text-gray-500">分类</th>
                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span class="sr-only">编辑</span>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="person in pagination" :key="person.item.email">
                <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                  <div class="flex items-center">
                    <div class="h-11 w-11 flex-shrink-0">
                      <img class="h-11 w-11 rounded-full" :src="person.item.image" alt="" />
                    </div>
                    <div class="ml-4">
                      <div class="font-medium text-gray-900">{{ person.item.name }}</div>
                      <div class="mt-1 text-gray-500">{{ person.item.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                  <div class="text-gray-900">{{ person.item.title }}</div>
                  <div class="mt-1 text-gray-500">{{ person.item.department }}</div>
                </td>
                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                  <div class="text-gray-900">{{ person.item.title }}</div>
                  <div class="mt-1 text-gray-500">{{ person.item.department }}</div>
                </td>
                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                  <div class="text-gray-900">{{ person.item.title }}</div>
                  <div class="mt-1 text-gray-500">{{ person.item.department }}</div>
                </td>

                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                  <span
                    class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                    :class="
                      person.item.state == '审核中'
                        ? 'inline-flex items-center rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-green-600/20'
                        : person.item.state == '已通过'
                        ? 'bg-green-50 text-green-700 ring-green-600/20'
                        : 'bg-red-50 text-red-700 ring-red-600/20'
                    "
                    >{{ person.item.state }}</span
                  >
                </td>

                <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{{ person.item.role }}</td>
                <td class="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                  <button
                    type="button"
                    class="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-3">
                    编辑
                  </button>
                  <button
                    type="button"
                    class="rounded-md bg-rose-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-3">
                    下架
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="demo-pagination-block">
      <div class="demonstration">Total item count</div>
      <el-pagination v-model:current-page="currentPage1" :page-size="5" :background="true" layout="total, prev, pager, next" :total="filterState.length" />
    </div>
  </div>
</template>

<script setup lang="ts">
import diglog from '../components/diglog.vue'
import { PlusIcon } from '@heroicons/vue/20/solid'
import { computed, ref, watch } from 'vue'
import { useFuse } from '@vueuse/integrations/useFuse'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
const currentPage1 = ref(1)
const storestate = [
  {
    id: 1,
    state: '全部',
  },
  {
    id: 2,
    state: '审核中',
  },
  {
    id: 3,
    state: '已通过',
  },
]
const people = [
  {
    name: 'Kobe Bryant',
    title: 'Basketball player',
    department: 'NBA',
    email: 'test@example.com',
    role: 'PRO',
    oldprice: '100',
    newprice: '200',
    state: '已通过',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    department: 'Optimization',
    email: 'lindsay.walton@example.com',
    role: 'Member',
    oldprice: '100',
    newprice: '200',
    state: '审核中',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Stephen Curry',
    title: 'Basketball player',
    department: 'NBA',
    email: 'NBA.walton@example.com',
    role: 'PRO',
    state: '审核中',
    oldprice: '100',
    newprice: '200',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },

  {
    name: 'Kobe Bryant',
    title: 'Basketball player',
    department: 'NBA',
    email: 'test@example.com',
    role: 'PRO',
    state: '已通过',
    oldprice: '100',
    newprice: '200',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Kobe Bryant',
    oldprice: '100',
    newprice: '200',
    title: 'Basketball player',
    department: 'NBA',
    email: 'test@example.com',
    role: 'PRO',
    state: '已通过',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Kobe Bryant',
    oldprice: '100',
    newprice: '200',
    title: 'Basketball player',
    department: 'NBA',
    email: 'test@example.com',
    role: 'PRO',
    state: '已通过',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Kobe Bryant',
    oldprice: '100',
    newprice: '200',
    title: 'Basketball player',
    department: 'NBA',
    email: 'test@example.com',
    role: 'PRO',
    state: '已通过',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Kobe Bryant',
    oldprice: '100',
    newprice: '200',
    title: 'Basketball player',
    department: 'NBA',
    email: 'test@example.com',
    role: 'PRO',
    state: '已通过',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Kobe Bryant',
    oldprice: '100',
    newprice: '200',
    title: 'Basketball player',
    department: 'NBA',
    email: 'test@example.com',
    role: 'PRO',
    state: '已通过',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Kobe Bryant',
    oldprice: '100',
    newprice: '200',
    title: 'Basketball player',
    department: 'NBA',
    email: 'test@example.com',
    role: 'PRO',
    state: '已通过',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Kobe Bryant',
    title: 'Basketball player',
    department: 'NBA',
    oldprice: '100',
    newprice: '200',
    email: 'test@example.com',
    role: 'PRO',
    state: '已通过',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Kobe Bryant',
    oldprice: '100',
    newprice: '200',
    title: 'Basketball player',
    department: 'NBA',
    email: 'test@example.com',
    role: 'PRO',
    state: '已通过',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Kobe Bryant',
    title: 'Basketball player',
    department: 'NBA',
    email: 'test@example.com',
    role: 'PRO',
    oldprice: '100',
    newprice: '200',
    state: '已通过',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Kobe Bryant',
    title: 'Basketball player',
    oldprice: '100',
    newprice: '200',
    department: 'NBA',
    email: 'test@example.com',
    role: 'PRO',
    state: '已通过',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Kobe Bryant',
    title: 'Basketball player',
    oldprice: '100',
    newprice: '200',
    department: 'NBA',
    email: 'test@example.com',
    role: 'PRO',
    state: '已通过',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Kobe Bryant',
    title: 'Basketball player',
    oldprice: '100',
    newprice: '200',
    department: 'NBA',
    email: 'test@example.com',
    role: 'PRO',
    state: '已通过',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
]
const dialogFormVisible = ref(false)

const selected = ref(storestate[0].state)
const search = ref('')
const filterBy = ref('both')
const filterBy2 = ref('全部')
const keys = computed(() => {
  if (filterBy.value === 'name') return ['name']
  else if (filterBy.value === 'title') return ['title']
  else return ['name', 'title']
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
const { results } = useFuse(search, people, options)
const filterState = computed(() => {
  let filterdata = ''

  return results.value.filter((item) => {
    if (selected.value == '全部') {
      filterdata = item.item.state
    } else if (item.item.state == selected.value) {
      filterdata = item.item.state
    } else {
      filterdata = ''
    }
    return filterdata
  })
})

const pagination = computed(() => {
  return filterState.value.slice((currentPage1.value - 1) * 5, currentPage1.value * 5).sort((a, b) => {
    if (a.item.state === '审核中' && b.item.state === '已通过') {
      return -1
    }
    if (a.item.state === '已通过' && b.item.state === '审核中') {
      return 1
    }
    return 0
  })
})
watch(pagination, () => {
  console.log(pagination.value)
})
</script>

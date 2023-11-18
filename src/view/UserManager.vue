<template>
  <div>
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="sm:flex sm:items-center">
        <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none"></div>
      </div>
      <div class="mt-8 flow-root">
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">搜索</label>
        <div class="flex">
          <div class="mt-2">
            <input
              @keyup.enter="Searchdata"
              v-model="search"
              type="text"
              name="email"
              id="email"
              class="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="请输入参数"
              aria-describedby="email-description" />
          </div>
          <button
            @click="Searchdata"
            type="submit"
            class="rounded-md bg-indigo-600 px-2.5 ml-2 mt-2 h-8 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-3">
            查询
          </button>
          <button
            @click="getUserdata"
            type="submit"
            class="rounded-md bg-red-600 px-2.5 mt-2 h-8 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-3">
            重置
          </button>
        </div>

        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table class="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" class="px-3 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">姓名</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">创建时间</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="item in userList" :key="item.id">
                  <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                    <div class="flex items-center">
                      <div class="ml-4">
                        <div class="font-medium text-gray-900">{{ item.nickName }}</div>
                        <div class="mt-1 text-gray-500">{{ item.openid }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    <div class="text-gray-900">{{ item.createTime }}</div>
                    <div class="mt-1 text-gray-500">{{ item.department }}</div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    <span
                      class="cursor-pointer"
                      :class="
                        item.haveUserInfo
                          ? 'inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20'
                          : 'inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20'
                      "
                      >{{ item.haveUserInfo ? '信息完全' : '信息不完善' }}</span
                    >
                  </td>
                  <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{{ item.role }}</td>
                  <td class="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <button
                      @click="sendMsg(item)"
                      type="button"
                      class="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-3">
                      发消息
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <el-pagination v-if="showpagination" v-model:current-page="currentpage" :page-size="20" :pager-count="11" layout="prev, pager, next" :total="1000" @current-change="getUserdata" />
    </div>
    <el-dialog v-model="dialogFormVisible" title="" align-center width="20%">
      <el-form :model="Userform">
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-select v-model="Userform.msgType" placeholder="选择消息类型">
            <el-option label="通知" value="通知" selected />
            <el-option label="公告" value="公告" />
          </el-select>
        </el-form-item>
        <el-form-item label="内容" prop="desc" :label-width="formLabelWidth">
          <el-input v-model="Userform.content" type="textarea" :rows="5" required />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer flex justify-evenly">
          <!-- <button
            type="button"
            @click="dialogFormVisible = false"
            class="inline-flex items-center gap-x-1.5 rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            关闭
          </button> -->
          <button
            @click="SendMessage"
            class="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-10 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            发 送
          </button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
const dialogFormVisible = ref(false)
const formLabelWidth = '40px'

const Userform = ref({
  content: '',
  msgType: '',
})
function SendMessage() {
  const form = new FormData()
  console.log(Userform.value)
  form.append('userId', Userform.value.id)
  form.append('content', Userform.value.content)
  form.append('title', Userform.value.msgType)
  axios
    .post('/api/user/sendMsg', form)
    .then((res) => {
      dialogFormVisible.value = false
      ElMessage({
        type: 'success',
        message: '发送成功',
      })
    })
    .catch((err) => {
      ElMessage({
        type: 'error',
        message: '发送失败',
      })
    })
}
const currentpage = ref(1)
const form = new FormData()
const search = ref('')
const userList = ref('')
const showpagination = ref(true)
async function getUserdata() {
  form.delete('page')
  form.delete('limit')
  form.delete('openid')
  form.append('page', currentpage.value)
  form.append('limit', '10')
  axios.post('/api/user/userList', form).then((res) => (userList.value = res.data.data))
  showpagination.value = true
}
getUserdata()
// const allUsers = ref('')
// const allform = new FormData()
// allform.append('page', '1')
// allform.append('limit', 10)
// allform.append('openid', '21045051')
// axios
//   .post('/api/user/userList', allform)
//   .then((res) => (allUsers.value = res.data.data))
//   .then(() => console.log(allUsers))
// const exactMatch = ref(false)
// const isCaseSensitive = ref(false)
// const matchAllWhenSearchEmpty = ref(true)
// const options = computed(() => ({
//   fuseOptions: {
//     keys: ['nickName', 'openid'],
//     isCaseSensitive: isCaseSensitive.value,
//     threshold: exactMatch.value ? 0 : undefined,
//   },
//   matchAllWhenSearchEmpty: matchAllWhenSearchEmpty.value,
// }))
// const { results } = useFuse(search, userList, options)
// console.log(results)
function Searchdata() {
  form.delete('openid')
  form.delete('page')
  form.delete('limit')
  form.append('page', '1')
  form.append('limit', '10')
  form.append('openid', search.value)
  axios.post('/api/user/userList', form).then((res) => (userList.value = res.data.data))
  showpagination.value = false
}
function sendMsg(item) {
  console.log(item)
  dialogFormVisible.value = true
  Userform.value = item
}
</script>

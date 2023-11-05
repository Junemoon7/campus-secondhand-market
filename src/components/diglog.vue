<template>
  <button
    type="button"
    @click="dialogFormVisible = true"
    class="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
    <PlusIcon class="h-5 w-5" aria-hidden="true" />
  </button>
  <el-dialog v-model="dialogFormVisible" align-center title="添加商品" class="w-2/5">
    <el-form :model="form">
      <div>
        <div class="mb-4">
          <label for="email" class="text-sm font-medium leading-6 text-gray-900 mr-3">标题</label>
          <input
            type="email"
            name="email"
            id="email"
            class="w-8/12 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="请输入商品标题" />
        </div>
      </div>
      <div>
        <div class="mt-4 mb-4">
          <label for="email" class="text-sm font-medium leading-6 text-gray-900 mr-3">价格</label>
          <input
            type="email"
            name="email"
            id="email"
            class="w-8/12 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="请输入售价" />
        </div>
      </div>

      <div>
        <div class="mt-2 mb-4">
          <label for="email" class="text-sm font-medium leading-6 text-gray-900 mr-3">原价</label>

          <input
            type="email"
            name="email"
            id="email"
            class="w-8/12 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="买入价格" />
        </div>
      </div>

      <div>
        <div class="mt-2 mb-4">
          <label for="email" class="text-sm font-medium leading-6 text-gray-900 mr-3">品质</label>
          <input
            type="email"
            name="email"
            id="email"
            class="w-8/12 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="如：九成新，三天前买的...." />
        </div>
      </div>
      <div>
        <div class="mt-2 mb-4">
          <label for="comment" class="block text-sm font-medium leading-6 text-gray-900">描述</label>
          <textarea
            rows="4"
            name="comment"
            id="comment"
            class="block w-4/5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="在这里描述你的商品" />
        </div>
      </div>
      <div>
        <label for="location" class="block text-sm font-medium leading-6 text-gray-900">商品分类</label>
        <select
          id="location"
          name="location"
          class="mt-2 block w-full mb-8 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
          <option>全部</option>
          <option>服装</option>
          <option>食品</option>
          <option>数码</option>
          <option>书籍</option>
          <option>电器</option>
          <option>家具</option>
          <option>美妆</option>
          <option>装饰品</option>
          <option>其他</option>
        </select>
      </div>
      <el-upload class="upload-demo" drag action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple>
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
        <template #tip>
          <div class="el-upload__tip">jpg/png files with a size less than 500kb</div>
        </template>
      </el-upload>
    </el-form>
    <template #footer>
      <span class="dialog-footer flex justify-evenly">
        <button
          type="button"
          @click="dialogFormVisible = false"
          class="inline-flex items-center gap-x-1.5 rounded-md bg-gray-400 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          <CheckCircleIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
          confirm
        </button>
        <button
          type="button"
          @click="dialogFormVisible = false"
          class="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          <CheckCircleIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Cancel
        </button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import { CheckCircleIcon } from '@heroicons/vue/20/solid'
import { PlusIcon } from '@heroicons/vue/20/solid'
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})
</script>
<style scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>

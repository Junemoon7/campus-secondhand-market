<template>
  <button
    type="button"
    @click="addCommdity"
    class="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
    <PlusIcon class="h-5 w-5" aria-hidden="true" />
  </button>
  <el-dialog v-model="dialogFormVisible" align-center title="添加商品" class="w-2/5">
    <el-form>
      <div>
        <div class="mb-4">
          <label for="email" class="text-sm font-medium leading-6 text-gray-900 mr-3">标题</label>
          <input
            v-model="form.title"
            type="text"
            name="title"
            id="title"
            class="w-8/12 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="请输入商品标题" />
        </div>
      </div>
      <div>
        <div class="mt-4 mb-4">
          <label for="email" class="text-sm font-medium leading-6 text-gray-900 mr-3">价格</label>
          <input
            v-model="form.price"
            type="text"
            name="price"
            id="email"
            class="w-8/12 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="请输入售价" />
        </div>
      </div>

      <div>
        <div class="mt-2 mb-4">
          <label for="email" class="text-sm font-medium leading-6 text-gray-900 mr-3">原价</label>

          <input
            v-model="form.oldPrice"
            type="text"
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
            v-model="form.quality"
            type="text"
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
            v-model="form.description"
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
          v-model="form.categoryId"
          class="mt-2 block w-full mb-8 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
          <option v-for="item in Imageicon" :key="item.id" :value="item.id">{{ item.cateName }}</option>
        </select>
      </div>
      <el-upload
        v-model:file-list="form.commodityImgs"
        class="upload-demo"
        drag
        multiple
        ref="uploadRef"
        :http-request="uploadSumbit"
        :auto-upload="false"
        list-type="picture"
        @on-change="hangleChange">
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
          @click="uploadRef.submit()"
          class="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          <CheckCircleIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
          确认
        </button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import { CheckCircleIcon } from '@heroicons/vue/20/solid'
import { PlusIcon } from '@heroicons/vue/20/solid'
import axios from 'axios'
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const uploadRef = ref()
const uploadSumbit = () => {
  const form1 = new FormData()
  form1.append('title', form.value.title)
  form1.append('categoryId', form.value.categoryId)
  form1.append('commodityImgs', form.value.commodityImgs)
  form1.append('price', form.value.price)
  form1.append('oldPrice', form.value.oldPrice)
  form1.append('quality', form.value.quality)
  form1.append('description', form.value.description)
  console.log(form.value)
  // axios.post('api/commodity/addCommodity', form1).then((res) => {
  //   console.log(res)
  // })
  dialogFormVisible.value = false
}
const hangleChange = () => {}
function addCommdity() {
  dialogFormVisible.value = true
  form.value = {
    title: '',
    categoryId: '0',
    commodityImgs: '',
    price: '',
    oldPrice: '',
    quality: '',
    description: '',
  }
  console.log(111)
}
const Imageicon = ref([])
const getImage = () => {
  axios.get('api/category/getAllCategory').then((res) => {
    for (const item of res.data) {
      Imageicon.value.push(item)
    }
    console.log(Imageicon)
  })
}
// function handleBeforeUpload(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader()

//     reader.onload = (event) => {
//       file.base64 = event.target.result // 将Base64字符串存储在文件对象的base64属性中

//       resolve(file)
//     }

//     reader.onerror = reject

//     reader.readAsDataURL(file.raw) // 将二进制数据转换为Base64字符串
//   })
// }
const handleBeforeUpload = (file) => {
  // 拿到文件后缀名
  const fileType = file.name.substring(file.name.lastIndexOf('.') + 1)
  const isJpg = fileType === 'jpg'
  const isPng = fileType === 'png'
  const isJpeg = fileType === 'jpeg'
  // 根据后缀名判断文件类型
  if (!isJpg && !isPng && !isJpeg) {
    alert('只能上传图片和pdf格式的文件!')
    return false
  }
  const isLt1M = file.size / 1024 / 1024 < 5
  // 可以限制图片的大小
  if (!isLt1M) {
    alert('上传图片大小不能超过 5MB!')
  }
  return isJpg || isPng || isJpeg
}
const handleUploadChange = (file, fileList) => {
  form.value.commodityImgs = file
}
getImage()
const form = ref({
  title: '',
  categoryId: '',
  commodityImgs: '',
  price: '',
  oldPrice: '',
  quality: '',
  description: '',
})
watch(form.value, (val) => {
  console.log(val)
})
// /commodity/addCommodity
// title: 测试
// categoryId: 0
// commodityImgs: (binary)
// price: 999
// oldPrice: 1000
// quality: 测试用例
// description: 测试用例
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

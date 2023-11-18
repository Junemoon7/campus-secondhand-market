<template>
  <div>
    <ul role="list" class="divide-y divide-gray-100">
      <li v-for="image in Imageicon" :key="image.id" class="relative py-5 hover:bg-gray-50 cursor-pointer" @click="opendialog(image)">
        <div class="px-4 sm:px-6 lg:px-8">
          <div class="mx-auto flex max-w-4xl justify-between gap-x-6">
            <div class="flex gap-x-4">
              <img class="h-12 w-12 flex-none rounded-full bg-gray-50" :src="image.cateIcon" alt="" />
              <div class="min-w-0 flex h-full justify-center items-center">
                <p class="text-sm font-semibold leading-6 text-gray-900">
                  <span class="absolute inset-x-0 -top-px bottom-0" />
                  {{ image.cateName }}
                </p>
              </div>
            </div>
            <div class="flex items-center gap-x-4">
              <ChevronRightIcon class="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
            </div>
          </div>
        </div>
      </li>
    </ul>
    <el-dialog v-model="dialogFormVisible" title="修改商品分类">
      <el-form :model="form">
        <el-form-item label="分类名" :label-width="formLabelWidth">
          <el-input v-model="form.cateName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="分类图标" :label-width="formLabelWidth">
          <el-upload v-model:file-list="form.iconFile" class="upload-demo" drag :auto-upload="false" ref="uploadRef" :before-upload="handleBeforeUpload" :http-request="EditSumbit" list-type="picture">
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">拖拽文件 或<em> 点击上传</em></div>
            <template #tip>
              <div class="el-upload__tip text-center">jpg/png 文件且不大于5MB</div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item label="序号" :label-width="formLabelWidth">
          <el-input v-model="form.sort" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <button
            type="button"
            @click="delClass"
            class="inline-flex absolute left-5 items-center gap-x-1.5 rounded-md bg-red-700 py-1.5 px-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <CheckCircleIcon class="-ml-0.5 h-5 w-8" aria-hidden="true" />
            删除分类
          </button>
          <button
            type="button"
            @click="uploadRef.submit()"
            class="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 py-1.5 px-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <CheckCircleIcon class="-ml-0.5 h-5 w-8" aria-hidden="true" />
            确认
          </button>
        </span>
      </template>
    </el-dialog>
    <span class="mt-5 isolate inline-flex rounded-md shadow-sm text-center w-full justify-center">
      <button
        @click="dialogFormAdd = true"
        type="button"
        class="relative inline-flex items-center rounded-l-md bg-white px-6 py-4 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10">
        添 加 分 类
      </button>
    </span>
    <el-dialog v-model="dialogFormAdd" title="修改商品分类">
      <el-form :model="Addform">
        <el-form-item label="分类名" :label-width="formLabelWidth">
          <el-input v-model="Addform.cateName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="分类图标" :label-width="formLabelWidth">
          <el-upload
            v-model:file-list="Addform.iconFile"
            class="upload-demo"
            drag
            :auto-upload="false"
            ref="AddClassRef"
            :before-upload="handleBeforeUpload"
            :http-request="handleAddClass"
            list-type="picture">
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">拖拽文件 或<em> 点击上传</em></div>
            <template #tip>
              <div class="el-upload__tip text-center">jpg/png 文件且不大于5MB</div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item label="序号" :label-width="formLabelWidth">
          <el-input v-model="Addform.sort" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <button
            type="button"
            @click="dialogFormAdd = false"
            class="inline-flex absolute left-5 items-center gap-x-1.5 rounded-md bg-red-700 py-1.5 px-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <CheckCircleIcon class="-ml-0.5 h-5 w-8" aria-hidden="true" />
            取消
          </button>
          <button
            type="button"
            @click="AddClassRef.submit()"
            class="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 py-1.5 px-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <CheckCircleIcon class="-ml-0.5 h-5 w-8" aria-hidden="true" />
            确认
          </button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { Edit, Plus } from '@element-plus/icons-vue'

import { ChevronRightIcon } from '@heroicons/vue/20/solid'
import { reactive, ref } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import { CheckCircleIcon } from '@heroicons/vue/20/solid'
import { PlusIcon } from '@heroicons/vue/20/solid'
import axios from 'axios'
const dialogFormAdd = ref(false)
const dialogFormVisible = ref(false)
const uploadRef = ref()
const formLabelWidth = '140px'
const itemId = ref('')
const form = ref({
  cateName: '',
  iconFile: '',
  sort: '',
})
const Addform = ref({
  cateName: '',
  iconFile: [],
  sort: '',
})
const AddClassRef = ref()
const opendialog = (item) => {
  itemId.value = item.id
  form.value.cateName = item.cateName
  form.value.sort = item.sort
  console.log(item)
  dialogFormVisible.value = true
}
const imageUrl = ref('')
const Imageicon = ref([])
const getImage = () => {
  axios.get('api/category/getAllCategory').then((res) => {
    Imageicon.value = res.data
    console.log(Imageicon)
  })
}
getImage()
const handleAddClass = () => {
  const addForm = new FormData()
  addForm.append('cateName', Addform.value.cateName)
  addForm.append('sort', Addform.value.sort)
  addForm.append('iconFile', Addform.value.iconFile[0].raw)
  axios.post('api/category/addCategory', addForm).then((res) => {
    if (res.data.success) {
      ElMessage.success('添加成功')
      dialogFormAdd.value = false
      getImage()
    } else {
      ElMessage.error('添加失败')
    }
  })
}
const handleBeforeUpload = (file) => {
  // console.log('检查函数')
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
const delClass = () => {
  const form1 = new FormData()
  form1.append('id', itemId.value)
  axios.post('api/category/delCategory', form1).then((res) => {
    if (res.data.success) {
      ElMessage.success('删除成功')
      dialogFormVisible.value = false
      getImage()
    } else {
      ElMessage.error('删除失败')
    }
  })
}
const EditSumbit = () => {
  const form1 = new FormData()
  form1.append('id', itemId.value)
  form1.append('cateName', form.value.cateName)
  form1.append('sort', form.value.sort)
  form1.append('iconFile', form.value.iconFile[0].raw)
  axios.post('api/category/updateCategory', form1).then((res) => {
    if (res.data.success) {
      ElMessage.success('修改成功')
      dialogFormVisible.value = false
      getImage()
    } else {
      ElMessage.error('修改失败')
    }
  })
}
// https://pick-mini-applet.oss-cn-hangzhou.aliyuncs.com/admin/icons/all.png
// https://pick-mini-applet.oss-cn-hangzhou.aliyuncs.com/admin/icons/live.png
// https://pick-mini-applet.oss-cn-hangzhou.aliyuncs.com/admin/icons/fuzhuang.png
// https://pick-mini-applet.oss-cn-hangzhou.aliyuncs.com/admin/icons/food.png
// https://pick-mini-applet.oss-cn-hangzhou.aliyuncs.com/admin/icons/shuma.png
// https://pick-mini-applet.oss-cn-hangzhou.aliyuncs.com/admin/icons/shuji.png
// https://pick-mini-applet.oss-cn-hangzhou.aliyuncs.com/admin/icons/dianqi.png
// https://pick-mini-applet.oss-cn-hangzhou.aliyuncs.com/admin/icons/jiaju.png
// https://pick-mini-applet.oss-cn-hangzhou.aliyuncs.com/admin/icons/meizhuang.png
// https://pick-mini-applet.oss-cn-hangzhou.aliyuncs.com/admin/icons/zhuangshi.png
</script>
<!-- 交流QQ群:75四57三七七八 -->
<style>
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
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>

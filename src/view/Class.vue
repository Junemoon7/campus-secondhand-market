<template>
  <div>
    <ul role="list" class="divide-y divide-gray-100">
      <li v-for="person in people" :key="person.email" class="relative py-5 hover:bg-gray-50 cursor-pointer" @click="dialogFormVisible = true">
        <div class="px-4 sm:px-6 lg:px-8">
          <div class="mx-auto flex max-w-4xl justify-between gap-x-6">
            <div class="flex gap-x-4">
              <img class="h-12 w-12 flex-none rounded-full bg-gray-50" :src="person.imageUrl" alt="" />
              <div class="min-w-0 flex h-full justify-center items-center">
                <p class="text-sm font-semibold leading-6 text-gray-900">
                  <span class="absolute inset-x-0 -top-px bottom-0" />
                  {{ person.name }}
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
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="分类图标" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="序号" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <button
            type="button"
            @click="dialogFormVisible = false"
            class="inline-flex absolute left-5 items-center gap-x-1.5 rounded-md bg-red-700 py-1.5 px-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <CheckCircleIcon class="-ml-0.5 h-5 w-8" aria-hidden="true" />
            删除分类
          </button>
          <button
            type="button"
            @click="dialogFormVisible = false"
            class="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 py-1.5 px-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <CheckCircleIcon class="-ml-0.5 h-5 w-8" aria-hidden="true" />
            确认
          </button>
          <!-- <button
            type="button"
            @click="dialogFormVisible = false"
            class="inline-flex items-center gap-x-1.5 rounded-md bg-gray-400 py-1.5 px-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <CheckCircleIcon class="-ml-0.5 h-5 w-8" aria-hidden="true" />
            取消
          </button> -->
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

import type { UploadProps } from 'element-plus'
import { ChevronRightIcon } from '@heroicons/vue/20/solid'
import { reactive, ref } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import { CheckCircleIcon } from '@heroicons/vue/20/solid'
import { PlusIcon } from '@heroicons/vue/20/solid'
const dialogTableVisible = ref(false)
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
const people = [
  {
    name: '全部',
    role: 'Co-Founder / CEO',
    imageUrl: 'https://pick-mini-applet.oss-cn-hangzhou.aliyuncs.com/admin/icons/all.png',
    href: '#',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: '生活',
    email: 'michael.foster@example.com',
    role: 'Co-Founder / CTO',
    imageUrl: 'https://pick-mini-applet.oss-cn-hangzhou.aliyuncs.com/admin/icons/live.png',
    href: '#',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: '服装',
    email: 'dries.vincent@example.com',
    role: 'Business Relations',
    imageUrl: 'https://pick-mini-applet.oss-cn-hangzhou.aliyuncs.com/admin/icons/fuzhuang.png',
    href: '#',
    lastSeen: null,
  },
  {
    name: '食物',
    email: 'lindsay.walton@example.com',
    role: 'Front-end Developer',
    imageUrl: 'https://pick-mini-applet.oss-cn-hangzhou.aliyuncs.com/admin/icons/food.png',
    href: '#',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: '数码',
    email: 'courtney.henry@example.com',
    role: 'Designer',
    imageUrl: 'https://pick-mini-applet.oss-cn-hangzhou.aliyuncs.com/admin/icons/shuma.png',
    href: '#',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: '电器',
    email: 'tom.cook@example.com',
    role: 'Director of Product',
    imageUrl: 'https://pick-mini-applet.oss-cn-hangzhou.aliyuncs.com/admin/icons/dianqi.png',
    href: '#',
    lastSeen: null,
  },
]
const imageUrl = ref('')

const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
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

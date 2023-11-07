<template>
  <div>
    <main class="relative flex flex-1 flex-col overflow-hidden px-4 py-8 sm:px-6 lg:px-8 justify-center h-screen">
      <img src="	https://tailwindui.com/img/beams-cover@95.jpg" alt="" class="absolute left-1/2 top-0 -ml-[47.5rem] w-[122.5rem] max-w-none" />
      <div class="absolute inset-0 text-slate-900/[0.07] [mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)]">
        <svg class="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-bg" width="32" height="32" patternUnits="userSpaceOnUse" x="100%" patternTransform="translate(0 -1)">
              <path d="M0 32V.5H32" fill="none" stroke="currentColor"></path>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-bg)"></rect>
        </svg>
      </div>
      <div class="relative flex flex-1 flex-col items-center justify-center pb-32">
        <img src="../../public/chu.png " class="mb-6" />

        <h1 class="sr-only">Log in to your Tailwind UI account</h1>
        <form class="w-full max-w-sm">
          <div class="mb-6">
            <label for="email" class="block text-sm font-semibold leading-6 text-gray-900">用户名</label
            ><input
              type="text"
              id="username"
              class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
              v-model="username"
              required="" />
          </div>
          <div class="mb-6">
            <label for="password" class="block text-sm font-semibold leading-6 text-gray-900">密码</label
            ><input
              type="password"
              id="password"
              class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
              v-model="password"
              required="" />
          </div>
          <button @click="Login" type="submit" class="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 w-full">
            <span>登 录</span>
          </button>
        </form>
      </div>
      <footer class="relative shrink-0"></footer>
    </main>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, alertProps } from 'element-plus'
import { COOKIE_NAME_PRERENDER_BYPASS } from 'next/dist/server/api-utils'
const route = useRoute()
const router = useRouter()
const username = ref('')
const password = ref('')
function Login() {
  // axios({
  //   url: 'http://210.45.92.232:8080/login',
  //   method: 'post',
  //   data: {
  //     username: username.value,
  //     password: password.value,
  //   },
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  //   },
  // })
  //   .then(function (response) {
  //     console.log(response)
  //   })
  //   .catch(function (error) {
  //     console.log(error)
  //   })
  // axios
  //   .post('/api/login', {
  //     username: username.value,
  //     password: password.value,
  //   })
  //   .then(function (response) {
  //     console.log(response)
  //   })
  let formData = new FormData()
  formData.append('username', username.value)
  formData.append('password', password.value)
  if (username.value == '' || password.value == '') {
    ElMessage.error('用户名或密码不能为空')
    return
  }
  fetch('api/login', {
    method: 'POST',
    body: formData,
  })
    .then(async (res) => {
      return res.json()
    })
    .then((res) => {
      console.log(res)
      if (res.success) {
        router.push('/')
        //use cookie to store a token to store the username and password of the from
        document.cookie = 'username=' + username.value
        document.cookie = 'password=' + password.value
        //set a expire 7 days for the cookie
        let date = new Date()
        date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000)
        document.cookie = 'expires=' + date.toUTCString()
        ElMessage.success('登录成功')
      } else {
        ElMessage.error('用户名或密码错误')
      }
    })
    .catch((err) => {
      console.log(err)
      ElMessage.error('网络错误')
    })
}
username.value = getCookie('username')
password.value = getCookie('password')
function getCookie(name) {
  let arr,
    reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  if ((arr = document.cookie.match(reg))) return unescape(arr[2])
  else return null
}
</script>

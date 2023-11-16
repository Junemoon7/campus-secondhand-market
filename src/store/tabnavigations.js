import { defineStore, acceptHMRUpdate } from 'pinia'

export const useTabStore = defineStore({
  id: 'tab',
  state: () => ({
    options: [{ route: '/', name: '主页' }],
    activeIndex: '/',
  }),
  getters: {},
  actions: {
    add_tabs(data) {
      this.options.push(data)
    },
    // 删除tabs
    delete_tabs(route) {
      let index = 0
      for (let option of this.options) {
        if (option.route === route) {
          break
        }
        index++
      }
      this.options.splice(index, 1)
    },
    // 设置当前激活的tab
    set_active_index(index) {
      this.activeIndex = index
    },
  },
})

// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
// }

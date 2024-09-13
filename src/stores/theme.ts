import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  persist: true,
  state: () => ({
    isDark: false,
  }),
  actions: {
    toggleTheme () {
      this.isDark = !this.isDark
    },
    setDarkMode (isDark: boolean) {
      this.isDark = isDark
    },
  },
  getters: {
    themeColor1: (state) => {
      return state.isDark ? 'primary' : 'black'
    },
    themeColor2: (state) => {
      return state.isDark ? 'black' : 'white'
    },
    themeColor3: (state) => {
      return state.isDark ? 'black' : 'primary'
    },
  },
})

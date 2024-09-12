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
})

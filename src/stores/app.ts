// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    isRail: false,
  }),
  actions: {
    toggleRail() {
      this.isRail = !this.isRail
    },
  },
})

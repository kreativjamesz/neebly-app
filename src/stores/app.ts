// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    isRail: true,
  }),
  actions: {
    toggleRail() {
      this.isRail = !this.isRail
    },
  },
})

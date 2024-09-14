// stores/dialogStore.ts
import { Dialog } from '@/types/dialog'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDialogStore = defineStore('dialog', () => {
  // Store an array of dialogs
  const dialogs = ref<Dialog[]>([])
  const dialog = ref<Dialog | null>(null)

  function showDialog(data: Dialog) {
    // If dialogContent is a component, mark it as raw
    if (typeof data.dialogContent !== 'string' && data.dialogContent) {
      data.dialogContent = markRaw(data.dialogContent)
    }

    // Push the new dialog to the stack
    dialogs.value.push(data)
  }

  function closeDialog() {
    dialogs.value.pop()
  }

  const closeAllDialogs = () => {
    dialogs.value = []
  }

  return { dialogs, dialog, showDialog, closeDialog, closeAllDialogs }
})

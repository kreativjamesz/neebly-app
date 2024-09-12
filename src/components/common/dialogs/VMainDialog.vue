<template>
  <div>
    <v-dialog
      v-for="(dialog, index) in dialogs"
      :key="index"
      v-model="isOpenValue[index]"
      max-width="500px"
      persistent
    >
      <v-card>
        <v-card-title>{{ dialog.title }} {{ isOpen(index) }}</v-card-title>
        <v-card-text>
          <component
            :is="dialog.dialogContent"
            v-if="isComponent(dialog)"
            @submit="confirm(index)"
          ></component>
          <div v-else>{{ dialog.dialogContent }}</div>
        </v-card-text>
        <v-card-actions>
          <v-btn variant="flat" color="primary" @click="confirm(index)">
            {{ dialog.confirmText }}
          </v-btn>
          <v-btn variant="flat" color="error" @click="cancel(index)">{{
            dialog.cancelText
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDialogStore } from '@/stores/dialog'

const dialogStore = useDialogStore()

// Computed properties for dialog states
const dialogs = computed(() => dialogStore.dialogs)
const isOpen = (index: number) => dialogs.value.length > index
const isOpenValue = computed(() => {
  return dialogs.value.map((dialog, index) => isOpen(index))
})

// Helper function to check if dialogContent is a component
const isComponent = (dialog: any) => {
  return typeof dialog.dialogContent !== 'string'
}

// Confirm and cancel actions for each dialog
const confirm = (index: number) => {
  const confirmAction = dialogs.value[index].confirm || (() => {}) // Default to a no-op function
  confirmAction()
  dialogStore.closeDialog()
}

const cancel = (index: number) => {
  const cancelAction = dialogs.value[index].cancel || (() => {}) // Default to a no-op function
  cancelAction()
  dialogStore.closeDialog()
}
</script>

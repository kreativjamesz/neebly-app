import { Component } from 'vue'

export type DialogState = "add" | "edit" | "view" | "none"

export interface Dialog {
  state?: DialogState
  title: string
  dialogContent?: string | Component | undefined
  confirmText: string
  cancelText: string
  confirm?: () => void
  cancel?: () => void
  actionsComponent?: Component
}

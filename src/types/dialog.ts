export interface Dialog {
  title: string
  dialogContent?: string | Component
  confirmText: string
  cancelText: string
  confirm: () => void
  cancel: () => void
}
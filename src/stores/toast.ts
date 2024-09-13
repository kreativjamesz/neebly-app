import { defineStore } from "pinia";
import { ref } from "vue";

export interface Toast {
	show: boolean
	type: "success" | "alert",
	title: string,
	message: string,
	timeout?: number,
	toastContent?: string,
	closeToast: () => void
}

export const useToastStore = defineStore('toast', () => {
	const toasts = ref<Toast[]>([])
	const toast = ref<Toast | null>(null)

	function showToast(data: Toast) {
		toasts.value.push(data)
	}

	function closeToast(index: number) {
    if (index >= 0 && index < toasts.value.length) {
      toasts.value.splice(index, 1);
    }
  }

	const hideAllToasts = () => {
		toasts.value = []
	}

	return { toasts, toast, showToast, closeToast, hideAllToasts }
})
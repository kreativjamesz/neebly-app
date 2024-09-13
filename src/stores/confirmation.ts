import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Confirmation {
  show: boolean
  type: "default" | "success" | "alert" | "error"
	icon?: string
  title: string
  text: string
  confirm: () => void
  cancel: () => void
}

export const useConfirmationStore = defineStore('confirmation', () => {
  const confirmation = ref<Confirmation>({
    show: false,
    type: "default",
    icon: '',
    title: '',
    text: '',
    confirm: () => {},
    cancel: () => {},
  });

  function showConfirmation(data: Confirmation) {
    confirmation.value = { ...data, show: true };
  }

  function closeConfirmation() {
    confirmation.value.show = false;
  }

  const confirm = () => {
    if (confirmation.value && confirmation.value.confirm) {
      confirmation.value.confirm();
      // closeConfirmation(); // This is optional
    }
  }

  const cancel = () => {
    if (confirmation.value && confirmation.value.cancel) {
      confirmation.value.cancel();
      // closeConfirmation(); // This is optional
    }
  }

  return {
    confirmation,
    showConfirmation,
    closeConfirmation,
    confirm,
    cancel
  };
})

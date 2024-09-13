<template>
    <v-snackbar
      v-for="(toast, index) in toasts"
      :key="index"
      class="toast-snackbar"
      v-model="isOpen[index]"
      persistent
      location="top right"
      position="fixed"
      multi-line
      :timeout="3000"
      :color="toast.type === 'success' ? 'green' : 'red'"
      :style="toastStyle(index)"
    >
      <v-icon v-if="toast.type === 'success'">mdi-check-circle</v-icon>
      <v-icon v-if="toast.type === 'alert'">mdi-alert-circle</v-icon>
      {{ toast.message }}

      <template v-slot:actions>
        <v-btn color="white" variant="text" @click="closeToast(index)">
        <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
</template>

<script setup lang="ts">
import { computed, CSSProperties } from "vue";
import { useToastStore } from "@/stores/toast";

// State
const toastStore = useToastStore();
const toasts = computed(() => toastStore.toasts);

// Computed
const isOpen = computed(() => {
  return toasts.value.map((toast, index) => toast.show);
});

// Methods
const closeToast = (index: number) => {
  toastStore.closeToast(index);
};

// Calculate inline style to stack toasts downward based on their index
const toastHeight = 80; // Approximate height of a toast (adjust as necessary)
const toastMargin = 10; // Space between toasts

const toastStyle = (index: number): CSSProperties => {
  return {
    position: 'fixed',
    top: `${index * (toastHeight + toastMargin)}px`,
    right: '20px', // Always right-aligned
    zIndex: 1000,
  };
};

</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  display: block;
  z-index: 1000;
}

/* Toast style */
.toast-snackbar {
  position: fixed;
  top: 20px;
  min-width: 350px;
  border-radius: 8px;
  padding: 10px;
  color: white;
  font-weight: 500;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
}
</style>

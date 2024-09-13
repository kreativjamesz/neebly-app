<template>
  <div class="actions d-flex ga-4">
    <!-- <v-btn color="green" @click="showSuccessToast"> Show Toast </v-btn> -->
    <!-- <v-btn color="red" @click="showErrorToast"> Show Toast </v-btn> -->
    <!-- <v-btn color="green" @click="showSaveConfirmation"> Show Success </v-btn> -->
    <!-- <v-btn color="orange" @click="showAlertConfirmation"> Show Alert </v-btn> -->
    <!-- <v-btn color="red" @click="showDeleteConfirmation"> Show Error </v-btn> -->
    <v-btn color="primary" @click="showDialog = true"> Add product </v-btn>
  </div>
  <v-modal-dialog
    v-model="showDialog"
    title="Add Product"
    :modal-content="markRaw(VProductForm)"
    @emit-confirm="showSaveConfirmation"
    @cancel="onCancel"
    confirm-text="Save"
    cancel-text="Cancel"
  />
</template>

<script setup lang="ts">
import VProductForm from "./VProductForm.vue";
// import { useToastStore } from "@/stores/toast";
import { useProductStore } from "@/stores/products";
import { useConfirmationStore } from "@/stores/confirmation";

const productStore = useProductStore();
const confirmationStore = useConfirmationStore();
const showDialog = ref(false);

/**
 * 
 * Create Product...
 * 
 */
const onConfirm = () => {
  console.log("Confirmed!");
  productStore.createProduct();
  productStore.resetCreateProductForm();
};

const showSaveConfirmation = () => {
  confirmationStore.showConfirmation({
    show: true,
    type: "success",
    title: "Save Product",
    text: "Are you sure you want to save this product?",
    confirm: () => {
      onConfirm();
      confirmationStore.closeConfirmation();
    },
    cancel: () => {
      console.log("Cancelled!");
      confirmationStore.closeConfirmation();
    },
  });
}

/**
 * 
 * Update Product...
 * 
 */
const showAlertConfirmation = () => {
  confirmationStore.showConfirmation({
    show: true,
    type: "alert",
    title: "Are you sure?",
    text: "Are you sure you want to update this product?",
    confirm: () => {
      onConfirm();
    },
    cancel: () => {
      console.log("Cancelled!");
      confirmationStore.closeConfirmation();
    },
  });
}

/**
 * 
 * Delete Product...
 * 
 */
const showDeleteConfirmation = () => {
  confirmationStore.showConfirmation({
    show: true,
    type: "error",
    title: "Save Product",
    text: "Are you sure you want to save this product?",
    confirm: () => {
      onConfirm();
    },
    cancel: () => {
      console.log("Cancelled!");
      confirmationStore.closeConfirmation();
    },
  });
}

// const showSuccessToast = () => {
//   toastStore.showToast({
//     show: true,
//     type: "success",
//     title: "Test Toast",
//     message: "This is a test toast",
//     closeToast: () => {
//       toastStore.closeToast(0);
//     },
//   });
// };
// const showErrorToast = () => {
//   toastStore.showToast({
//     show: true,
//     type: "alert",
//     title: "Test Toast",
//     message: "This is a test toast",
//     closeToast: () => {
//       toastStore.closeToast(0);
//     },
//   });
// };

const onCancel = () => {
  productStore.resetUpdateProductForm();
};
</script>

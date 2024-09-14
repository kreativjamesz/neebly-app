<template>
  <div class="actions d-flex ga-4">
    <v-app-button @click="showDialog = true" text="+ Add product" />
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
import { useProductStore } from "@/stores/products";
import { useConfirmationStore } from "@/stores/confirmation";
import { useToastStore } from "@/stores/toast";

const productStore = useProductStore();
const confirmationStore = useConfirmationStore();
const toastStore = useToastStore();
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
      showSuccessToast();
    },
    cancel: () => {
      console.log("Cancelled!");
      confirmationStore.closeConfirmation();
    },
  });
};

const showSuccessToast = () => {
  toastStore.showToast({
    show: true,
    type: "success",
    title: "Test Toast",
    message: "Successfully created product!",
    closeToast: () => {
      toastStore.closeToast(0);
    },
  });
};
/**
 * ************************END*CREATE***********************************
 */

const onCancel = () => {
  productStore.resetUpdateProductForm();
};
</script>

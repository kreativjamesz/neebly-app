<template>
  <div class="actions d-flex ga-4">
    <v-btn color="green" @click="showSuccessToast"> Show Toast </v-btn>
    <v-btn color="red" @click="showErrorToast"> Show Toast </v-btn>
    <v-btn color="primary" @click="showDialog = true"> Add product </v-btn>
  </div>
  <v-modal-dialog
    v-model="showDialog"
    title="Add Product"
    :modal-content="markRaw(VProductForm)"
    @emit-confirm="onConfirm"
    @cancel="onCancel"
  />
</template>

<script setup lang="ts">
// import { useDialogStore } from "@/stores/dialog";
import { useToastStore } from "@/stores/toast";
import VProductForm from "./VProductForm.vue";
import { useProductStore } from "@/stores/products";

// const dialogStore = useDialogStore();
const productStore = useProductStore();
const toastStore = useToastStore();
const showDialog = ref(false);

const onConfirm = () => {
  console.log("Confirmed!");
  productStore.createProduct();
  productStore.resetCreateProductForm();
};

const showSuccessToast = () => {
  toastStore.showToast({
    type: "success",
    title: "Test Toast",
    message: "This is a test toast",
    show: true, // add this
    closeToast: () => {
      toastStore.closeToast(0);
    },
  });
};
const showErrorToast = () => {
  toastStore.showToast({
    type: "alert",
    title: "Test Toast",
    message: "This is a test toast",
    show: true, // add this
    closeToast: () => {
      toastStore.closeToast(0);
    },
  });
};

const onCancel = () => {
  productStore.resetUpdateProductForm();
};
</script>

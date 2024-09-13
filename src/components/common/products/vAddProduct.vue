<template>
  <v-btn color="primary" @click="showDialog = true"> Add product </v-btn>
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
import VProductForm from "./VProductForm.vue";
import { useProductStore } from "@/stores/products";

// const dialogStore = useDialogStore();
const productStore = useProductStore();
const showDialog = ref(false);

const onConfirm = () => {
  console.log("Confirmed!");
  productStore.createProduct();
  productStore.resetCreateProductForm();
};

const onCancel = () => {
  productStore.resetUpdateProductForm();
};
</script>

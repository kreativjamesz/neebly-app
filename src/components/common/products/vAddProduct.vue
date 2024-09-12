<template>
  <v-btn color="primary" @click="showDialog = true"> Add product </v-btn>
  <v-modal-dialog
    v-model="showDialog"
    title="Add Product"
    :modal-content="markRaw(VProductForm)"
    @emit-confirm="onConfirm"
  />
</template>

<script setup lang="ts">
import VProductForm from "./VProductForm.vue";

const showDialog = ref(false);

const onConfirm = () => {
  console.log("Confirmed!");
};

const onCancel = () => {
  console.log("Cancelled!");
};
</script>

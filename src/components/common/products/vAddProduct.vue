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
import { useDialogStore } from "@/stores/dialog";
import VProductForm from "./VProductForm.vue";

const dialogStore = useDialogStore();

const showDialog = ref(false);

const onConfirm = () => {
  console.log("Confirmed!");
  /*
  dialogStore.openDialog({
    title: 'Add Product',
    messageContent: AddProductForm, // Passing component reference
    confirmText: 'Add',
    cancelText: 'Cancel',
    confirm: () => {
      // handle confirm action
      console.log('Product added');
    },
    cancel: () => {
      // handle cancel action
      console.log('Action canceled');
    },
  });
  */
};

const onCancel = () => {
  console.log("Cancelled!");
};
</script>

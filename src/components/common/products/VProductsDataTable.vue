<template>
  <v-divider />
  <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    v-model:search="search"
    :headers="headers"
    :items="productStore.products"
    :items-length="totalItems"
    :loading="loading"
    @update:options="loadItems"
  >
    <template #item.images="{ item }">
      <img
        v-for="image in JSON.parse(item.images[0])"
        :src="image"
        width="50"
        height="50"
        style="display: flex !important"
        onerror="this.onerror = null; this.src='http://unsplash.it/g/150/150?random=' + Math.random()"
      />
    </template>
    <template #headers>
      <tr>
        <th v-for="header in headers" :key="header.value">
          {{ header.text }}
        </th>
      </tr>
    </template>
    <template #item.actions="{ item }">
      <v-icon class="me-2" size="small" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon size="small" @click="showDeleteConfirmation(item.id)"> mdi-delete </v-icon>
    </template>
  </v-data-table-server>
  <v-modal-dialog
    v-model="editDialog"
    @emit-confirm="handleConfirmEdit"
    title="Edit Product"
    :modal-content="markRaw(VProductForm)"
    :modal-content-props="{ product: selectedProduct }"
    @cancel="handleCancel"
    confirm-text="Update"
    cancel-text="Cancel"
  />
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useProductStore } from "@/stores/products";
import { useConfirmationStore } from "@/stores/confirmation";
import { InternalDataTableHeader, Product, ProductTableParams } from "@/types";
import VProductForm from "./VProductForm.vue";

// Variables
const editDialog = ref(false);
const itemsPerPage = ref(10);
const search = ref("");
const selectedProduct = ref<Product | null>(null);
const productStore = useProductStore();
const confirmationStore = useConfirmationStore();

const totalItems = computed(() => productStore.totalItems);
const loading = computed(() => productStore.loading);
const headers = ref<InternalDataTableHeader[]>([
  { text: "ID", value: "id", width: "100px" },
  { text: "Images", value: "images", width: "120px" },
  { text: "Title", value: "title" },
  { text: "Price", value: "price" },
  { text: "Actions", value: "actions" },
]);

// Load products...
function loadItems({ page, itemsPerPage }: ProductTableParams) {
  const offset = (page - 1) * itemsPerPage;
  productStore.fetchProducts({ offset, limit: itemsPerPage });
}

/**
 *
 * Delete Product...
 *
 **/
function deleteItem(id: Product["id"]) {
  console.log("Confirmed!");
  productStore.deleteProduct(id);
}
const showDeleteConfirmation = (id: Product["id"]) => {
  confirmationStore.showConfirmation({
    show: true,
    type: "error",
    title: "Delete",
    text: "Are you sure you want to delete this product?",
    confirm: () => {
      deleteItem(id);
      confirmationStore.closeConfirmation();
    },
    cancel: () => {
      console.log("Cancelled!");
      confirmationStore.closeConfirmation();
    },
  });
};

/**
 *
 * Edit product using edit dialog...
 *
 **/
function editItem(item: Product) {
  selectedProduct.value = { ...item };
  const categoryId = item.category?.id || 0;
  productStore.setUpdateProductDefaults({
    id: item.id,
    title: item.title,
    price: item.price,
    description: item.description,
    categoryId: categoryId,
  });
  editDialog.value = true;
}

// Saving and update product record...
function handleConfirmEdit() {
  editDialog.value = false;
}

function handleCancel() {
  if (
    productStore.updateProductForm.id !== 0 &&
    Object.values(productStore.updateProductForm).every((value) => value === "")
  ) {
    return;
  }
  productStore.resetUpdateProductForm();
}
</script>

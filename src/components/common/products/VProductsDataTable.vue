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
        style="display: flex !important;"
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
      <v-icon size="small" @click="deleteItem(item.id)"> mdi-delete </v-icon>
    </template>
  </v-data-table-server>
  <v-modal-dialog
    v-model="editDialog"
    @emit-confirm="handleConfirm"
    title="Edit product"
    :modal-content="markRaw(VProductForm)"
    :modal-content-props="{ product: selectedProduct }"
    @cancel="handleCancel"
  />
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useProductStore } from "@/stores/products";
import { InternalDataTableHeader, Product, ProductTableParams } from "@/types";
import VProductForm from "./VProductForm.vue";

const editDialog = ref(false);
const itemsPerPage = ref(10);
const search = ref("");
const selectedProduct = ref<Product | null>(null);
const productStore = useProductStore();

console.log("productStore", productStore.products);
const totalItems = computed(() => productStore.totalItems);
const loading = computed(() => productStore.loading);
// const isEditMode = computed(() => productStore.updateProductForm.id !== 0);

const headers = ref<InternalDataTableHeader[]>([
  { text: "Images", value: "images" },
  { text: "Title", value: "title" },
  { text: "Price", value: "price" },
  { text: "Actions", value: "actions" },
]);

// Load products...
function loadItems({ page, itemsPerPage }: ProductTableParams) {
  const offset = (page - 1) * itemsPerPage;
  productStore.fetchProducts({ offset, limit: itemsPerPage });
}

// Delete product...
function deleteItem(id: Product["id"]) {
  productStore.deleteProduct(id);
}

// Edit product using edit dialog...
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
function handleConfirm() {
  // editDialog.value = false;
}

function handleCancel() {
  editDialog.value = false;
  productStore.resetUpdateProductForm();
}
</script>

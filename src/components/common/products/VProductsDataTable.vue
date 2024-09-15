<template>
  <v-divider />
  <v-data-table-server
    hover
    class="cursor-pointer"
    v-model:items-per-page="itemsPerPage"
    v-model:search="search"
    :headers="headers"
    :items="productStore.products"
    :items-length="totalItems"
    :loading="loading"
    @update:options="loadItems"
    @click:row="handleRowClick"
  >
    <template #headers>
      <tr>
        <th v-for="header in headers" :key="header.value">
          {{ header.text }}
        </th>
      </tr>
    </template>
    <template #item.actions="{ item }">
      <v-app-button icon size="small" @click.stop="showItem(item)">
        <v-icon size="large">mdi-eye</v-icon>
      </v-app-button>
      <v-app-button icon size="small" @click.stop="editItem(item)">
        <v-icon size="large"> mdi-pencil </v-icon>
      </v-app-button>
      <v-app-button icon size="small" @click.stop="deleteConfirmation(item.id)">
        <v-icon size="large"> mdi-delete </v-icon>
      </v-app-button>
    </template>
  </v-data-table-server>
  <v-modal-dialog
    v-model="showDialog"
    :state="dialogState"
    :title="computedDialogState"
    :modal-content="computedDialogStateToComponent"
    :modal-content-props="{ product: selectedProduct }"
    :confirm-text="computedConfirmText"
    @emit-confirm="computedConfirm"
    cancel-text="Cancel"
    @cancel="handleCancel"
  />
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useProductStore } from "@/stores/products";
import { useConfirmationStore } from "@/stores/confirmation";
import { InternalDataTableHeader, Product, ProductTableParams } from "@/types";
import { useToastStore } from "@/stores/toast";
import { DialogState } from "@/types/dialog";
import VProductForm from "./VProductForm.vue";
import VProductView from "./VProductView.vue";

// Variables
const dialogState = ref("" as DialogState);
const showDialog = ref(false);
const itemsPerPage = ref(10);
const search = ref("");
const selectedProduct = ref<Product | null>(null);
const productStore = useProductStore();
const confirmationStore = useConfirmationStore();
const toastStore = useToastStore();

const totalItems = computed(() => productStore.totalItems);
const loading = computed(() => productStore.loading);
const headers = ref<InternalDataTableHeader[]>([
  { text: "ID", value: "id", width: "100px" },
  { text: "Title", value: "title" },
  { text: "Price", value: "price" },
  { text: "Actions", value: "actions" },
]);

// Computed
const computedDialogState = computed(() => {
  switch (dialogState.value) {
    case "add":
      return "Add Product";
    case "view":
      return "";
    case "edit":
      return "Edit Product";
    default:
      return "Product";
  }
});

const computedDialogStateToComponent = computed<string | Component>(() => {
  switch (dialogState.value) {
    case "add":
    case "edit":
      return markRaw(VProductForm);
    case "view":
      return markRaw(VProductView);
    default:
      return "";
  }
});

const computedConfirmText = computed(() => {
  switch (dialogState.value) {
    case "add":
      return "Add";
    case "edit":
      return "Update";
    default:
      return "Confirm";
  }
});

const computedConfirm = computed(() => {
  switch (dialogState.value) {
    case "add":
      return handleConfirmEdit;
    case "edit":
      return handleConfirmEdit;
    default:
      return handleCancel;
  }
});

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
const deleteConfirmation = (id: Product["id"]) => {
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
 ** 1. Edit product using edit dialog...
 *
 **/
function editItem(item: Product) {
  dialogState.value = "edit";
  selectedProduct.value = { ...item };
  const categoryId = item.category?.id || 0;
  productStore.setUpdateProductDefaults({
    id: item.id,
    title: item.title,
    price: item.price,
    description: item.description,
    categoryId: categoryId,
  });
  showDialog.value = true;
}

// 2. Update confirmation for edit item  */
function handleConfirmEdit() {
  confirmationStore.showConfirmation({
    show: true,
    type: "alert",
    title: "Update Product",
    text: "Are you sure you want to update this product?",
    confirm: () => {
      proceedEditItem();
      confirmationStore.closeConfirmation();
    },
    cancel: () => {
      confirmationStore.closeConfirmation();
    },
  });
}

// 3. Proceed updating product  */
function proceedEditItem() {
  productStore.updateProduct();
  productStore.resetUpdateProductForm();
  showDialog.value = false;
  showSuccessToast();
}

// 4. Show Toast on success */
function showSuccessToast() {
  toastStore.showToast({
    show: true,
    type: "success",
    title: "Test Toast",
    message: "Successfully updated product!",
    closeToast: () => {
      toastStore.closeToast(0);
    },
  });
}

/**
 ** ************************END*UPDATE**************************
 */

function handleCancel() {
  if (
    productStore.updateProductForm.id !== 0 &&
    Object.values(productStore.updateProductForm).every((value) => value === "")
  ) {
    return;
  }
  productStore.resetUpdateProductForm();
}

const showItem = (item: Product) => {
  dialogState.value = "view";
  selectedProduct.value = { ...item };
  productStore.setViewProductDetails({
    id: item.id,
    title: item.title,
    price: item.price,
    description: item.description,
    category: item.category,
    images: item.images,
  });
  showDialog.value = true;
};

const handleRowClick = (row: any) => {
  console.log(row.value);
};
</script>

<style lang="scss" scoped>
.rounded-full {
  border-radius: 9999px;
}
</style>

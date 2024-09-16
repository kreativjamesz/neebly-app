<template>
  <div class="d-flex px-2 justify-center align-center ga-5">
    <label class="tw-text-gray-400 tw-min-w-[130px] tw-text-lg" for="categoryId">
      Category ID:
    </label>
    <v-select
      v-model="categoryId"
      item-value="id"
      item-title="name"
      variant="outlined"
      density="compact"
      hide-details
      :items="categories"
    />
    <v-app-button class="mx-4 px-0" color="primary"  @click.stop="searchByCategory">
      Ok
    </v-app-button>
  </div>
</template>

<script setup lang="ts">
import { useCategoryStore } from "@/stores/category";
import { useProductStore } from "@/stores/products";
import { useDebounceFn } from "@vueuse/core";

const categoryId = ref(null);
const categoryStore = useCategoryStore();
const categories = computed(() => categoryStore.categories);
const productStore = useProductStore();

// Methods
function loadItems() {
  categoryStore.fetchCategories();
}

const searchByCategory = useDebounceFn(() => {
	productStore.searchProductsByCategory(categoryId.value || 0);
}, 500)

onMounted(() => {
  loadItems();
});
</script>

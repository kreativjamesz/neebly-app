<template>
  <div class="d-flex align-center justify-center ga-2">
    <v-text-field
      v-model="searchTitle"
      density="compact"
      label="Search"
      variant="outlined"
      color="primary"
      flat
      hide-details
      single-line
      :min-width="isTablet ? '150px' : '300px'"
      class="p-relative rounded-0 ma-0 pa-0"
      style="border: 1px solid #ffcc00 !important"
      @keyup.enter="searchProduct()"
      @input="debouncedSearch"
    >
      <template v-slot:append-inner>
        <v-btn class="rounded-0 -mr-5" color="primary" @click="searchProduct()">
          <v-icon size="large" color="black">mdi-magnify </v-icon>
        </v-btn>
      </template>
    </v-text-field>

    <v-menu
      v-model="otherFilter"
      :close-on-content-click="false"
      location="bottom"
      class="w-100 px-0"
    >
      <template v-slot:activator="{ props }">
        <div class="tw-border-2 tw-border-yellow-400">
          <v-btn color="primary" v-bind="props" class="rounded-0 px-0">
            <v-icon>mdi-filter</v-icon>
            <v-icon size="large">mdi-chevron-down</v-icon>
          </v-btn>
        </div>
      </template>
      <div class="tw-border-2 tw-border-yellow-400">
        <v-card width="550">
          <v-card-title>Filter by:</v-card-title>
          <v-card-text class="d-flex flex-column ga-5">
            <v-price-filter />
            <v-category-filter />
          </v-card-text>
        </v-card>
      </div>
    </v-menu>
  </div>
</template>

<script setup lang="ts">
import { useBreakpointsComposable } from "@/composables/useBreakpoints";
import { useProductStore } from "@/stores/products";
import { useDebounceFn } from "@vueuse/core";

const otherFilter = ref(false);
const searchTitle = ref("");
const { isTablet } = useBreakpointsComposable();
const productStore = useProductStore();

const searchProduct = useDebounceFn(() => {
  productStore.searchProductsByTitle(searchTitle.value);
}, 500);

const debouncedSearch = useDebounceFn(() => {
  productStore.searchProductsByTitle(searchTitle.value);
}, 500);


defineEmits(["searchTitle"]);
</script>

<style scoped lang="scss">
$input-padding: 10px;
</style>

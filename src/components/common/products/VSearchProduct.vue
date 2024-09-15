<template>
  <div class="d-flex align-center justify-center">
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
      class="rounded-lg p-relative"
      style="border: 1px solid #ffcc00 !important"
      @keyup.enter="searchProduct()"
      @input="debouncedSearch"
    >
      <template v-slot:append-inner>
        <v-btn>
          <v-icon
            style="position: absolute; top: 50%; transform: translateY(-50%); right: 0"
            color="primary"
            class="pa-5"
            >mdi-magnify
          </v-icon>
        </v-btn>
      </template>
    </v-text-field>

    <v-menu v-model="otherFilter" :close-on-content-click="false" location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn color="primary" size="small" icon v-bind="props">
          <v-icon>mdi-filter</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>Filters</v-card-title>
        <v-card-text>
          <v-range-slider
            v-model="searchPriceRange"
            min="0"
            max="1000"
            step="10"
            label="Price Range"
            color="primary"
            hide-details
            show-ticks="always"
            tick-size="4"
            width="200"
            @input="searchPrice"
            @change="searchPrice"
          >
          </v-range-slider>
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>

<script setup lang="ts">
import { useBreakpointsComposable } from "@/composables/useBreakpoints";
import { useProductStore } from "@/stores/products";
import { useDebounceFn } from "@vueuse/core";

const otherFilter = ref(false);
const searchTitle = ref("");
const searchPriceRange = ref([0, 1000]);
const { isTablet } = useBreakpointsComposable();
const productStore = useProductStore();

const searchProduct = useDebounceFn(() => {
  productStore.searchProductsByTitle(searchTitle.value);
}, 500);

const debouncedSearch = useDebounceFn(() => {
  productStore.searchProductsByTitle(searchTitle.value);
}, 500);

const searchPrice = useDebounceFn(() => {
  productStore.searchProductsByPrice(searchPriceRange.value);
}, 500);

defineEmits(["searchTitle"]);
</script>

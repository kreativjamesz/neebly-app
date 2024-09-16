<template>
  <div class="d-flex px-2 justify-center align-center ga-5">
    <label class="tw-text-gray-400 tw-min-w-[120px] tw-text-lg" for="price"
      >Price Range:</label
    >
    <v-range-slider
      v-model="filterPrice"
      min="1"
      max="100"
      step="5"
      color="primary"
      hide-details
      show-ticks="always"
      tick-size="4"
      width="100%"
    >
      <template v-slot:prepend>
        <v-text-field
          v-model="filterPrice[0]"
          density="compact"
          style="width: 70px"
          type="number"
          variant="outlined"
          hide-details
          single-line
        />
      </template>
      <template v-slot:append>
        <v-text-field
          class="px-0"
          v-model="filterPrice[1]"
          density="compact"
          style="width: 70px"
          type="number"
          variant="outlined"
          hide-details
          single-line
        />
        <v-app-button class="mx-4 px-0" color="primary" @click.stop="searchPrice">
          Ok
        </v-app-button>
      </template>
    </v-range-slider>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from "@/stores/products";
import { useDebounceFn } from "@vueuse/core";

const filterPrice = ref([1, 100]);
const productStore = useProductStore();
const searchPrice = useDebounceFn(() => {
  productStore.searchProductsByPrice(filterPrice.value);
}, 500);
</script>

<style scoped></style>

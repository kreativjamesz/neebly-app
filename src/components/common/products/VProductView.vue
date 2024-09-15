<template>
  <v-card-text>
    <v-row>
      <v-col cols="6">
        <v-marquee>
          <div
            v-if="ifGreaterThenOne"
            class="d-flex flex-wrap flex-row justify-space-between align-center"
          >
            <div v-for="image in product.images">
              <img
                :key="image"
                :src="image"
                width="150"
                height="150"
                aspect-ratio="1"
                contain
                class="ma-1"
                onerror="this.src='https://via.placeholder.com/150'"
              />
            </div>
          </div>
        </v-marquee>
        <div v-if="ifLessOrEqualToOne">
          <img
            :src="product.images[0]"
            width="150"
            height="150"
            aspect-ratio="1"
            contain
            onerror="this.src='https://via.placeholder.com/150'"
          />
        </div>
      </v-col>
      <v-col cols="6 d-flex justify-start align-start flex-column ga-2">
        <h2>
          <span class="title text-primary">{{ product.title }}</span>
        </h2>
        <span class="price text-black bg-primary rounded-pill px-3 py-1">
          ${{ product.price }}
        </span>
        <v-card-subtitle class="mt-1 px-0 text-primary">{{
          product.category.name
        }}</v-card-subtitle>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="pt-0">
        <p class="description">{{ product.description }}</p>
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script setup lang="ts">
// Imports
import { useProductStore } from "@/stores/products";

// Pinia
const productStore = useProductStore();

// Computed
const product = computed(() => productStore.selectedProduct);
const ifGreaterThenOne = computed(() => product.value.images.length > 1);
const ifLessOrEqualToOne = computed(() => product.value.images.length <= 1);
</script>

<style scoped lang="scss">
.price {
  font-size: 1rem;
  font-weight: 600;
}
.v-field--appended {
  padding-inline-end: 0 !important;
}
</style>

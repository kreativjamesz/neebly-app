<template>
  <v-card-text>
    <v-row>
      <v-col cols="12">
        <h2>
          <span class="title">{{ product.title }}</span>
          {{ " " }}
          <span class="price">${{ product.price }}</span>
        </h2>
        <v-card-subtitle class="mt-1 px-0">{{ product.category.name }}</v-card-subtitle>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <p class="description">{{ product.description }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        class="d-flex flex-wrap flex-row justify-space-between align-center ga-3"
      >
        <v-marquee>
          <div v-for="image in product.images">
            <img
              :key="image"
              :src="image"
              width="150"
              height="150"
              aspect-ratio="1"
              contain
              class="ma-1"
            />
          </div>
        </v-marquee>
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
</script>

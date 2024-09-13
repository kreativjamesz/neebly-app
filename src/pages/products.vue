<template>
  <div class="products pa-6">
    <v-card class="pa-3" elevation="1" max-width="100%">
      <v-card-title>
        <h2>Products</h2>
      </v-card-title>
      <v-card-text class="d-flex justify-space-between align-center py-0">
        <v-search-product />
        <v-add-product />
      </v-card-text>
      <v-card-text>
        <v-products-data-table />
      </v-card-text>
    </v-card>
  </div>
</template>
<script lang="ts" setup></script>

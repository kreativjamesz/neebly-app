<template>
  <div
    class="products pa-6"
    :class="{ 'bg-grey-darken-4': isDark, 'bg-blue-grey-lighten-5': !isDark }"
    style="min-height: calc(100vh - 128px)"
  >
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
<script lang="ts" setup>
import { useThemeStore } from "@/stores/theme";
import { storeToRefs } from "pinia";

const themeStore = useThemeStore();
const { isDark } = storeToRefs(themeStore);

const backgroundColor = computed(() => {
  return isDark.value ? "bg-blue-grey-darken-4" : "bg-blue-grey-lighten-5";
});
</script>

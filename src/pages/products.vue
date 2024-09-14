<template>
  <div
    class="products pa-6"
    :class="{ 'bg-grey-darken-4': isDark, 'bg-blue-grey-lighten-5': !isDark }"
    style="min-height: calc(100vh - 128px)"
  >
    <v-card class="pa-3" elevation="1" max-width="100%">
      <v-card-title class="d-flex justify-space-between align-center">
        <h2>Products</h2>
        <div class="d-flex align-center py-0 ga-2">
          <h5 class="">{{ labelView }}</h5>
          <v-btn-toggle v-model="isCardView" color="primary" mandatory density="comfortable" >
            <v-btn icon="mdi-view-list" value="list"></v-btn>
            <v-btn icon="mdi-view-grid" value="card"></v-btn>
          </v-btn-toggle>
        </div>
      </v-card-title>
      <v-card-text class="d-flex justify-space-between align-center py-0">
        <v-search-product />
        <v-add-product />
      </v-card-text>
      <v-card-text>
        <v-products-card-list v-if="isCardView === 'card'" />
        <v-products-data-table v-else />
      </v-card-text>
    </v-card>
  </div>
</template>
<script lang="ts" setup>
import { useThemeStore } from "@/stores/theme";
import { storeToRefs } from "pinia";

const isCardView = ref("list");
const themeStore = useThemeStore();
const { isDark } = storeToRefs(themeStore);

// Computed
const labelView = computed(() => {
  return isCardView.value === "list" ? "Table View" : "Card View";
});
</script>

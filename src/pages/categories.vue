<template>
  <div
    class="categories pa-6"
    :class="{ 'bg-grey-darken-4': isDark, 'bg-blue-grey-lighten-5': !isDark }"
    style="min-height: calc(100vh - 128px)"
  >
    <v-card class="pa-3" elevation="1" max-width="100%">
      <v-card-title class="d-flex justify-space-between align-center">
        <h2>Categories</h2>
      </v-card-title>
      <v-card-text>
        <v-categories-data-table />
      </v-card-text>
    </v-card>
  </div>
</template>
<script lang="ts" setup>
import { useThemeStore } from "@/stores/theme";
import { storeToRefs } from "pinia";
const themeStore = useThemeStore();
const { isDark } = storeToRefs(themeStore);
</script>

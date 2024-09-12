<template>
  <div>
    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="categoryStore.categories"
      :items-length="totalItems"
      :loading="loading"
      @update:options="loadItems"
    >
      <template #default>
        <div
          class="justify-center align-center; ga-4"
          style="
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            place-items: center;
          "
        >
          <v-card
            class="py-5"
            :color="isDark ? '#454545' : '#eaeaea'"
            max-width="350"
            elevation="1"
            v-for="(category, index) in categoryStore.categories"
            :key="category.id"
          >
            <v-card-text class="d-flex justify-center align-center">
              <div v-if="!category.image">
                <v-skeleton-loader
                  class="mx-auto border"
                  width="150"
                  height="150"
                  type="card-avatar, actions"
                ></v-skeleton-loader>
              </div>
              <div
                class="image-container"
                :style="{
                  width: '250px',
                  height: '150px',
                  objectFit: 'fill',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                }"
                v-else
              >
                <img
                  :src="
                    category.image
                      ? category.image
                      : 'http://unsplash.it/g/150/150?random=' + Math.random()
                  "
                  alt="Image from w3schools"
                  onerror="this.onerror = null; this.src='http://unsplash.it/g/150/150?random=' + Math.random()"
                  class="w-100 h-auto"
                />
              </div>
            </v-card-text>
            <v-card-title class="text-center capitalize">{{
              category.name
            }}</v-card-title>
          </v-card>
        </div>
      </template>
    </v-data-table-server>
  </div>
</template>

<script setup lang="ts">
import { useCategoryStore } from "@/stores/category";
import { InternalDataTableHeader } from "@/types";
import { storeToRefs } from "pinia";
import { useThemeStore } from "@/stores/theme";

// Pinia store
const themeStore = useThemeStore();
const { isDark } = storeToRefs(themeStore);

const itemsPerPage = ref(10);
const headers = ref<InternalDataTableHeader[]>([
  { text: "ID", value: "id" },
  { text: "Name", value: "name" },
  { text: "Image", value: "image" },
]);

const categoryStore = useCategoryStore();
const totalItems = computed(() => categoryStore.totalItems);
const loading = computed(() => categoryStore.loading);

// Load categories...
function loadItems() {
  categoryStore.fetchCategories();
}
</script>

<style scoped></style>

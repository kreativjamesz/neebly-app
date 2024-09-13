<template>
  <div class="d-flex align-center justify-center">
    <v-text-field
      v-model="search"
      density="compact"
      label="Search"
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      color="primary"
      flat
      hide-details
      single-line
			min-width="300"
      class="rounded-lg"
      style="border: 1px solid #ffcc00 !important;"
    ></v-text-field>
  </div>
</template>

<script setup lang="ts">
const search = ref("");
</script>

<template>
  <div class="d-flex align-center justify-center">
    <v-text-field
      v-model="search"
      density="compact"
      label="Search"
      prepend-inner-icon="mdi-magnify"
      variant="solo-filled"
      flat
      hide-details
      single-line
			min-width="300"
    ></v-text-field>
  </div>
</template>

<script setup lang="ts">
const search = ref("");
</script>

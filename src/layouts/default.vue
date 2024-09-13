<template>
  <v-app>
    <v-system-bar color="primary">
      <span class="font-weight-bold">This is a public announcement</span>
      <v-icon>mdi-close</v-icon>
    </v-system-bar>
    <v-main-navigation-drawer />
    <v-main-navigation-bar />
    <v-main>
      <router-view />
    </v-main>
    <!-- Dialog -->
    <v-main-dialog />
    <!-- Toast -->
    <v-main-toast />
    <!-- Footer -->
    <v-app-footer />
  </v-app>
</template>

<script lang="ts" setup>
//
</script>

<template>
  <v-app-bar :elevation="1" class="shadow-lg">
    <template #prepend>
      <v-app-bar-nav-icon />
    </template>
    <v-app-bar-title>NEEBLY</v-app-bar-title>
    <v-spacer />
    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-theme-toggle />
    <v-user-menu />
  </v-app-bar>
</template>
<script lang="ts" setup></script>

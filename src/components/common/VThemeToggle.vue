<template>
  <v-btn icon @click="toggleTheme">
    <v-icon>{{ isDark ? 'mdi-weather-night' : 'mdi-weather-sunny' }}</v-icon>
  </v-btn>
</template>

<script setup lang="ts">
  import { useTheme } from 'vuetify'
  import { storeToRefs } from 'pinia'
  import { useThemeStore } from '@/stores/theme'

  // Pinia store
  const themeStore = useThemeStore()
  const { isDark } = storeToRefs(themeStore)

  // Vuetify theme composable
  const theme = useTheme()

  // Sync Vuetify theme with Pinia store
  function toggleTheme () {
    themeStore.toggleTheme()
    theme.global.name.value = themeStore.isDark ? 'dark' : 'light'
  }

  // Initialize theme on mount
  themeStore.setDarkMode(theme.global.current.value.dark)
</script>

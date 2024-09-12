<template>
  <v-menu transition="slide-y-transition">
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props" />
    </template>
    <v-list>
      <v-list-item v-for="(item, index) in items" :key="index" :value="index">
        <v-list-item-title class="d-flex ga-3">
          <v-icon :color="randomHexColor">{{ item.icon }}</v-icon>
          <span> {{ randomHexColor }}</span>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts" setup>
const items = [
  {
    id: 1,
    title: 'Profile',
    icon: 'mdi-account',
  },
  {
    id: 2,
    title: 'Settings',
    icon: 'mdi-cog',
  },
  {
    id: 3,
    title: 'Notifications',
    icon: 'mdi-bell',
  },
  {
    id: 4,
    title: 'Help',
    icon: 'mdi-help',
  },
  {
    id: 5,
    title: 'About',
    icon: 'mdi-information',
  },
  {
    id: 6,
    title: 'Logout',
    icon: 'mdi-logout',
  },
]

const randomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`
}
</script>

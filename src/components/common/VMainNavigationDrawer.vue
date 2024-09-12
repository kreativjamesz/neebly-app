<template>
  <v-navigation-drawer>
    <v-list-item
      title="NEEBLY"
      subtitle="Vuetify"
      min-height="64"
      base-color="primary"
    ></v-list-item>
    <v-divider />
    <v-list density="compact">
      <v-list-subheader class="font-weight-bold">Main Menu</v-list-subheader>
      <v-list-item
        link
        v-for="(link, idx) in links"
        active-class="primary--text"
        :key="idx"
        :to="link.path"
      >
        <template #prepend>
          <v-icon>{{ link.icon }}</v-icon>
        </template>
        <v-list-item-title>{{ link.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
    <v-divider />

    <v-list density="compact">
      <v-list-subheader class="font-weight-bold">Workspace</v-list-subheader>
      <v-list-item v-for="employee in employees" :key="employee.id" link>
        <template #prepend>
          <div class="d-flex justify-center items-center ga-3 py-2">
            <v-avatar size="38">
              <v-img :src="employee.avatar" />
            </v-avatar>
            <div class="ml-3">
              <v-list-item-title>{{ employee.name }}</v-list-item-title>
              <v-list-item-subtitle v-if="employee.online" class="green--text">
                Online
              </v-list-item-subtitle>
              <v-list-item-subtitle v-else class="red--text">
                Offline
              </v-list-item-subtitle>
            </div>
          </div>
        </template>
        <template #append>
          <v-list-item-subtitle v-if="employee.online" class="green--text">
            <v-icon color="#00C853">mdi-circle</v-icon>
          </v-list-item-subtitle>
          <v-list-item-subtitle v-else class="red--text">
            <v-icon color="#D32F2F">mdi-circle</v-icon>
          </v-list-item-subtitle>
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script lang="ts" setup>
import { sidebarMainMenu, sidebarEmployees } from '@/constants'

const links = ref(sidebarMainMenu)
const employees = ref(sidebarEmployees)
</script>

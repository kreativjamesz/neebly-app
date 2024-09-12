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
      <v-list-item
        v-for="employee in employees"
        :key="employee.id"
        link
        :style="{
          background: employee.online ? 'transparent' : !isDark ? '#eaeaea' : '#343434',
        }"
      >
        <template #prepend>
          <div class="d-flex justify-center items-center ga-3 py-2">
            <v-avatar size="38">
              <v-img :src="employee.avatar" :class="{ 'opacity-50': !employee.online }" />
            </v-avatar>
            <div class="ml-3">
              <v-list-item-title>
                <span
                  v-if="employee.online"
                  :style="{ color: isDark ? 'white' : 'green', fontWeight: 'bold' }"
                >
                  {{ employee.name }}</span
                >
                <span v-else style="color: gray"> {{ employee.name }} </span>
              </v-list-item-title>
              <v-list-item-subtitle>
                <span
                  v-if="employee.online"
                  :style="{ color: isDark ? 'white' : 'black', fontWeight: 'bold' }"
                >
                  Online
                </span>
                <span v-else :style="{ color: isDark ? '#eaeaea' : '#878787' }">
                  offline
                </span>
              </v-list-item-subtitle>
            </div>
          </div>
        </template>
        <template #append>
          <v-list-item-subtitle v-if="employee.online" class="green--text">
            <v-icon color="#00C853">mdi-circle</v-icon>
          </v-list-item-subtitle>
          <v-list-item-subtitle v-else class="red--text">
            <v-icon color="red">mdi-circle</v-icon>
          </v-list-item-subtitle>
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script lang="ts" setup>
import { sidebarMainMenu, sidebarEmployees } from "@/constants";
import { storeToRefs } from "pinia";
import { useThemeStore } from "@/stores/theme";
// Pinia store7

const themeStore = useThemeStore();
const { isDark } = storeToRefs(themeStore);

const links = ref(sidebarMainMenu);
const employees = ref(sidebarEmployees);
</script>

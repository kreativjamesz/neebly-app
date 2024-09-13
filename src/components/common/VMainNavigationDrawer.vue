<template>
  <v-navigation-drawer
    :rail="appStore.isRail"
    rail-width="64"
    permanent
    expand-on-hover
    :color="isDark ? 'primary' : 'black'"
  >
    <v-list-item
      class="bg-primary px-3 py-0 text-center"
      min-height="64"
      base-color="white"
    >
      <template #title><span class="text-h2 font-weight-bold">NEEBLY</span></template>
    </v-list-item>
    <v-divider />
    <v-list density="compact" :color="themeColor3">
      <v-list-subheader class="font-weight-bold" :color="themeColor3">
        Main Menu
      </v-list-subheader>
      <v-list-item
        link
        v-for="(link, idx) in links"
        class="px-5"
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
      <v-list-subheader class="font-weight-bold" :color="themeColor3"
        >Workspace</v-list-subheader
      >
      <v-list-item
        v-for="employee in employees"
        :key="employee.id"
        link
        class="px-3"
        :style="{
          background: employee.online ? 'transparent' : !isDark ? 'black' : '#e6b800',
        }"
      >
        <template #prepend>
          <div class="d-flex justify-center items-center ga-3 py-2">
            <v-avatar size="38">
              <v-img :src="employee.avatar" :class="{ 'opacity-30': !employee.online }" />
            </v-avatar>
            <div class="ml-3">
              <v-list-item-title>
                <span
                  v-if="employee.online"
                  :style="{ color: themeColor2, fontWeight: 'bold' }"
                >
                  {{ employee.name }}</span
                >
                <span v-else style="color: grey"> {{ employee.name }} </span>
              </v-list-item-title>
              <v-list-item-subtitle>
                <span
                  v-if="employee.online"
                  :style="{ color: themeColor2, fontWeight: 'bold' }"
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
          <v-list-item-subtitle v-if="employee.online" class="primary--text">
            <v-icon color="primary">mdi-circle</v-icon>
          </v-list-item-subtitle>
          <v-list-item-subtitle v-else class="red--text">
            <v-icon color="black">mdi-circle</v-icon>
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
import { useAppStore } from "@/stores/app";

// Pinia store
const appStore = useAppStore();
const themeStore = useThemeStore();
const { isDark, themeColor2, themeColor3 } = storeToRefs(themeStore);

const links = ref(sidebarMainMenu);
const employees = ref(sidebarEmployees);
</script>

<template>
  <v-app-bar :elevation="1" class="shadow-lg">
    <template #prepend>
      <div class="pl-2">
        <v-btn icon @click="toggleRail">
          <v-app-bar-nav-icon :color="themeColor1" />
        </v-btn>
      </div>
    </template>
    <v-btn icon>
      <v-icon :color="themeColor1">mdi-magnify</v-icon>
    </v-btn>
    <v-spacer />
    <v-theme-toggle :color="themeColor1" />
    <v-user-menu :color="themeColor1" />
  </v-app-bar>
</template>
<script lang="ts" setup>
import { useAppStore } from "@/stores/app";
import { useThemeStore } from "@/stores/theme";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const themeStore = useThemeStore();
const { themeColor1 } = storeToRefs(themeStore);

// Toggle Rail
const toggleRail = () => {
  appStore.toggleRail();
};
</script>

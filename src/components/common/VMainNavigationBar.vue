<template>
  <v-app-bar :elevation="1" class="shadow-lg px-2">
    <template #prepend>
      <div>
        <v-btn icon @click.stop="toggleRail">
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
import { useBreakpointsComposable } from "@/composables/useBreakpoints";

const appStore = useAppStore();
const themeStore = useThemeStore();
const { themeColor1 } = storeToRefs(themeStore);
const { isTablet } = useBreakpointsComposable();

const toggleRail = () => {
  appStore.toggleRail();
};
const setRail = (value: any) => {
  appStore.setIsRail(value);
};

watch(isTablet, () => {
  if (isTablet.value) setRail(true);
  else setRail(false);
});

onMounted(() => {
  if (isTablet.value) setRail(true);
  else setRail(false);
})
</script>

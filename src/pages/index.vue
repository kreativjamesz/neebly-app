<template>
  <div
    class="dashboard tw-w-full pa-6"
    :class="{ 'bg-grey-darken-4': isDark, 'bg-blue-grey-lighten-5': !isDark }"
    style="min-height: calc(100vh - 128px)"
  >
    <div
      class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 xl:tw-grid-cols-3 xl:overflow-auto tw-gap-10 tw-pb-4 custom-grid-rows"
    >
      <v-sparkline-card />
      <v-heartbeat-card />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useThemeStore } from "@/stores/theme";
import { storeToRefs } from "pinia";
const themeStore = useThemeStore();
const { isDark } = storeToRefs(themeStore);
</script>

<style lang="scss" scoped>
// grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4
.custom-grid-rows {
  display: grid;
}
@media (min-width: 768px) {
  .custom-grid-rows {
    grid-template-rows: repeat(8, 20vh);
  }
}

@media (min-width: 1280px) {
  .custom-grid-rows {
    grid-template-rows: repeat(8, 7.5vh);
  }
}

</style>

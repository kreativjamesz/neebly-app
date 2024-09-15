<template>
  <div
    class="categories pa-6"
    :class="{ 'bg-grey-darken-4': isDark, 'bg-blue-grey-lighten-5': !isDark }"
    style="min-height: calc(100vh - 128px)"
  >
    <div class="custom-grid-rows">
      <v-card class="" max-width="400">
        <v-sheet
          class="v-sheet--offset mx-auto"
          color="cyan"
          elevation="12"
          max-width="calc(100% - 32px)"
          rounded="lg"
        >
          <v-sparkline
            :labels="labels"
            :model-value="value"
            color="white"
            line-width="2"
            padding="16"
          ></v-sparkline>
        </v-sheet>

        <v-card-text class="pt-0">
          <div class="text-h6 font-weight-light mb-2">User Registrations</div>
          <div class="subheading font-weight-light text-grey">
            Last Campaign Performance
          </div>
          <v-divider class="my-2"></v-divider>
          <v-icon class="me-2" size="small"> mdi-clock </v-icon>
          <span class="text-caption text-grey font-weight-light"
            >last registration 26 minutes ago</span
          >
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useThemeStore } from "@/stores/theme";
import { storeToRefs } from "pinia";
const themeStore = useThemeStore();
const { isDark } = storeToRefs(themeStore);

const labels = ref([12, 3, 6, 9, 12, 3, 6, 9]);
const value = [200, 675, 410, 390, 310, 460, 250, 240];
</script>

<style lang="scss" scoped>
// grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4
.custom-grid-rows {
  display: grid;
  grid-template-rows: 1fr;
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

.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>

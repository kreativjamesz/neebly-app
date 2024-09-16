<template>
  <v-card
    className="tw-row-span-4 xl:tw-row-span-4 tw-bg-black text-white tw-shadow-md tw-rounded-2xl tw-pb-16 tw-pt-16"
  >
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
      <div class="text-h6 font-weight-light mb-2 text-white">User Registrations</div>
      <div class="subheading font-weight-light text-white">Last Campaign Performance</div>
      <v-divider class="my-2"></v-divider>
      <div>
        <v-icon class="me-2" size="small"> mdi-clock </v-icon>
        <span class="text-caption text-white font-weight-light">
          last registration 26 minutes ago
        </span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
const labels = ref([12, 3, 6, 9, 12, 3, 6, 9]);
const value = [200, 675, 410, 390, 310, 460, 250, 240];
</script>
<style scoped>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>

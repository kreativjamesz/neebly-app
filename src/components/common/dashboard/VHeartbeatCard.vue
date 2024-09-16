<template>
  <v-card color="surface-light" class="row-span-12 xl:row-span-6 bg-white shadow-md rounded-2xl flex flex-col justify-between">
    <template v-slot:prepend>
      <v-icon
        :color="checking ? 'red lighten-2' : 'indigo-lighten-2'"
        class="me-8"
        icon="mdi-heart-pulse"
        size="64"
        @click="takePulse"
      ></v-icon>
    </template>

    <template v-slot:title>
      <div class="text-caption text-grey text-uppercase">Heart rate</div>

      <span class="text-h3 font-weight-black" v-text="avg || '—'"></span>
      <strong v-if="avg">BPM</strong>
    </template>

    <template v-slot:append>
      <v-btn
        class="align-self-start"
        icon="mdi-arrow-right-thick"
        size="34"
        variant="text"
      ></v-btn>
    </template>

    <v-sheet color="transparent">
      <v-sparkline
        :key="String(avg)"
        :gradient="['#f72047', '#ffd200', '#1feaea']"
        :line-width="3"
        :model-value="heartbeats"
        :smooth="true"
        stroke-linecap="round"
        auto-draw
      ></v-sparkline>
    </v-sheet>
  </v-card>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

// Helper function to simulate a delay
const exhale = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Reactive variables
const checking = ref(false);
const heartbeats = ref<number[]>([]);

// Computed property for calculating the average
const avg = computed(() => {
  const sum = heartbeats.value.reduce((acc, cur) => acc + cur, 0);
  const length = heartbeats.value.length;

  if (!sum && !length) return 0;

  return Math.ceil(sum / length);
});

// Function to simulate a heartbeat between 80 and 120
const heartbeat = () => Math.ceil(Math.random() * (120 - 80) + 80);

// Method to take pulse and populate the heartbeats array
const takePulse = async (inhale = true) => {
  checking.value = true;

  if (inhale) await exhale(1000);

  heartbeats.value = Array.from({ length: 20 }, heartbeat);

  checking.value = false;
};

// Call the takePulse method on component mount
onMounted(() => {
  takePulse(false);
});
</script>

<style scoped></style>

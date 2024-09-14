<template>
  <v-btn
    v-bind="attrs"
    variant="flat"
    color="primary"
    class="text-capitalize font-weight-bold"
  >
    <template v-if="text">{{ text }}</template>
    <slot v-else></slot>
  </v-btn>
</template>

<script setup lang="ts">
import { useAttrs } from "vue";

const attrs = useAttrs();

defineProps<{
  text?: string;
}>();

defineOptions({
  inheritAttrs: true,
});
</script>

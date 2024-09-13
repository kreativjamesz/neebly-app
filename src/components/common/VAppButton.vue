<template>
  <v-btn
    v-bind="attrs"
    variant="flat"
    color="primary"
    text="attrs.text"
    class="text-capitalize font-weight-bold"
  />
</template>

<script setup lang="ts">
const attrs = useAttrs();
</script>

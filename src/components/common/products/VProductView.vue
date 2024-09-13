<template>
	<div>
	</div>
</template>

<script setup lang="ts">
// Imports
import { useProductStore } from '@/stores/products';

// Props
const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    title: string;
    modalContent: Component | string;
    modalContentProps?: Record<string, any>;
    confirmText?: string;
    cancelText?: string;
  }>(),
  {
    title: "Default Title", // Default title
    modalContentProps: () => ({}),
    confirmText: "Confirm",
    cancelText: "Cancel",
  }
);

// Pinia
const productStore = useProductStore();


</script>

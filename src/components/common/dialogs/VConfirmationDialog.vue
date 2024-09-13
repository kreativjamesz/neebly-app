<template>
  <v-dialog max-width="340">
    <template #activator="{ props: activatorProps }">
        <v-btn color="orange" v-bind="activatorProps" :prepend-icon="activatorIcon">
          {{ activatorText }}
        </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card
        prepend-icon="mdi-package"
        text="When using the activator slot, you must bind the slot props to the activator element."
        title="Slot Activator"
      >
        <template v-slot:actions>
          <v-btn class="ml-auto" text="Close" @click="isActive.value = false"></v-btn>
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts" setup>
import { computed, defineEmits, defineProps } from "vue";

const props = defineProps<{
  activatorIcon: string;
  activatorText: string;
  modelValue: boolean;
  message: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "confirm"): void;
  (e: "cancel"): void;
}>();

const isVisible = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit("update:modelValue", value),
});

const handleConfirm = () => {
  emit("confirm");
  isVisible.value = false;
};

const handleCancel = () => {
  emit("cancel");
  isVisible.value = false;
};
</script>

<style scoped>
/* Add your custom styles here */
</style>

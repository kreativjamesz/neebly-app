<template>
  <v-dialog max-width="340">
    <template #activator="{ props: activatorProps }">
      <v-btn color="orange" v-bind="activatorProps" :prepend-icon="activatorIcon">
        {{ activatorText }}
      </v-btn>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-title>{{ title }} </v-card-title>
        <v-card-text>
          <component
            :is="modalContent"
            v-if="isComponent(modalContent)"
            @submit="handleConfirm"
          ></component>
          <div v-else>{{ modalContent }}</div>
        </v-card-text>
        <v-divider />
        <v-card-actions class="pa-6">
          <v-btn variant="flat" color="primary" @click="handleConfirm">
            {{ confirmText }}
          </v-btn>
          <v-btn variant="flat" @click="handleCancel">
            {{ cancelText }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts" setup>
const props = defineProps<{
  title: string;
  activatorIcon: string;
  activatorText: string;
  modelValue: boolean;
  confirmText: string;
  cancelText: string;
  modalContent: Component | string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "confirm"): void;
  (e: "cancel"): void;
}>();

// Helper function to check if dialogContent is a component
const isComponent = (content: any) => {
  return typeof content !== "string";
};

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

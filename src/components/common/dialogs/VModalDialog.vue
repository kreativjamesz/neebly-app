<template>
  <v-dialog
    width="auto"
    v-model="dialog"
    class="v-modal-dialog"
    @update:model-value="dialog = $event"
  >
    <v-card width="500">
      <template v-slot:default>
        <v-card-title>{{ title }} </v-card-title>
        <v-card-text>
          <component
            :is="modalContent"
            v-if="isComponent(modalContent)"
            v-bind="modalContentProps"
            @submit="emitConfirm"
            ref="modalContentRef"
          ></component>
          <div v-else>{{ modalContent }}</div>
        </v-card-text>
        <v-divider />
        <v-card-actions class="pa-6">
          <v-app-button @click="submitForm" :text="confirmText" />
          <v-app-button @click="cancelForm" :text="cancelText" color="black" />
        </v-card-actions>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
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
    title: "Default Title",
    modalContentProps: () => ({}),
    confirmText: "Confirm",
    cancelText: "Cancel",
  }
);

const isComponent = (content: any) => {
  return typeof content !== "string";
};
// How set default title?
const emit = defineEmits(["update:modelValue", "emit-confirm", "cancel"]);

const modalContentRef = ref();

const submitForm = () => {
  // Call the submitForm method from the form component
  if (modalContentRef.value?.submitForm) {
    modalContentRef.value.submitForm();
  }
};

const cancelForm = () => {
  emit("cancel");
  dialog.value = false;
};

const emitConfirm = () => {
  emit("emit-confirm");
};

const dialog = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit("update:modelValue", value),
});
</script>

<style scoped></style>

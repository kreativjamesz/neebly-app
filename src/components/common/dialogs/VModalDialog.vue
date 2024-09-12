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
          ></component>
          <div v-else>{{ modalContent }}</div>
        </v-card-text>
        <v-divider />
        <v-card-actions class="pa-6">
          <v-btn
            variant="flat"
            color="primary"
            class="text-capitalize"
            @click="emitConfirm"
            >{{ "Okay" }}</v-btn
          >
          <v-btn
            variant="flat"
            color="orange"
            class="text-capitalize"
            @click="dialog = false"
            >{{ "Cancel" }}</v-btn
          >
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
    modalContentProps?: Record<string, any>; // Optional prop
  }>(),
  {
    title: "Default Title", // Default title
    modalContentProps: () => ({}),
  }
);

const isComponent = (content: any) => {
  return typeof content !== "string";
};
// How set default title?
const emit = defineEmits(["update:modelValue", "emit-confirm"]);

const emitConfirm = () => {
  emit("emit-confirm");
};

const dialog = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit("update:modelValue", value),
});
</script>

<style scoped></style>

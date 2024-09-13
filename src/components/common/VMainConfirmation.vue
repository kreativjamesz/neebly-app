<template>
  <v-dialog v-model="confirmation.show" max-width="340" persistent>
    <v-card variant="elevated" :style="{ borderWidth: '4px', borderColor: cardColor }">
      <v-card-title>
        <v-icon v-if="confirmation.icon">{{ confirmation.icon }} </v-icon>
        <span>
          {{ confirmation.title }}
        </span>
      </v-card-title>
      <v-card-text>
        {{ confirmation.text }}
      </v-card-text>
      <template v-slot:actions>
        <div class="d-flex justify-end align-center ga-4 pa-4">
          <v-btn variant="flat" :color="buttonColor" @click="handleConfirm">Yes</v-btn>
          <v-btn variant="flat" color="black" @click="handleCancel">No</v-btn>
        </div>
      </template>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { useConfirmationStore } from "@/stores/confirmation";

// Consts
const confirmationStore = useConfirmationStore();
const confirmation = computed(() => confirmationStore.confirmation);

// computed
const buttonColor = computed(() => {
  switch (confirmation.value.type) {
    case "success":
      return "green";
    case "alert":
      return "orange";
    case "error":
      return "red";
    default:
      return "black";
  }
});
const cardColor = computed(() => {
  switch (confirmation.value.type) {
    case "success":
      return "green";
    case "alert":
      return "orange";
    case "error":
      return "red";
    default:
      return "black";
  }
});

// Emits
const emit = defineEmits(["confirm", "cancel"]);

// Methods
const handleConfirm = () => {
  confirmationStore.confirm();
};
const handleCancel = () => {
  emit("cancel");
  confirmationStore.closeConfirmation();
};
</script>

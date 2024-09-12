<template>
  <form @submit.prevent="submit">
    <v-text-field
      v-model="form.title"
      :counter="10"
      :error-messages="name.errorMessage.value"
      label="Name"
    ></v-text-field>

    <v-text-field
      v-model="form.price"
      :counter="7"
      :error-messages="price.errorMessage.value"
      label="Price"
    ></v-text-field>

    <v-textarea
      v-model="form.description"
      :error-messages="description.errorMessage.value"
      label="Description"
    ></v-textarea>

    <v-select
      v-model="form.category"
      :error-messages="selectCategory.errorMessage.value"
      :items="items"
      label="Category"
    ></v-select>
    {{ props.product.category }}
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useField, useForm } from "vee-validate";
import { useDialogStore } from "@/stores/dialog";
import { validationSchema } from "@/lib/validation";

const emit = defineEmits(["submit"]);

const props = defineProps({
  product: {
    type: Object,
    default: () => ({
      title: "",
      price: 0,
      description: "",
      category: "",
    }),
  },
})

const form = ref({
  title: props.product.title || "",
  price: props.product.price || 0,
  description: props.product.description || "",
  category: props.product.category.id || "",
});

const dialogStore = useDialogStore();

const { handleSubmit, handleReset } = useForm({
  validationSchema,
});
const name = useField("name");
const price = useField("price");
const description = useField("description");
const selectCategory = useField("selectCategory");

const items = ref(["Item 1", "Item 2", "Item 3", "Item 4"]);

const submit = () => {
  emit("submit", {
    name: name.value.value,
    price: price.value.value,
    description: description.value.value,
    category: selectCategory.value.value,
  });
};
</script>

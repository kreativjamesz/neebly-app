<template>
  <form @submit.prevent="submitForm">
    <v-text-field
      v-model="form.title"
      :error-messages="name.errorMessage.value"
      label="Name"
    ></v-text-field>

    <v-text-field
      v-model="form.price"
      :counter="7"
      :error-messages="price.errorMessage.value"
      label="Price"
      type="number"
    ></v-text-field>

    <v-textarea
      v-model="form.description"
      :error-messages="description.errorMessage.value"
      label="Description"
    ></v-textarea>

    <v-select
      v-model="form.categoryId"
      :error-messages="selectCategory.errorMessage.value"
      :items="categoryItems"
      item-value="id"
      item-title="name"
      label="Category"
      mandatory
    ></v-select>
    <pre>{{ form }}</pre>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useField, useForm } from "vee-validate";
import { useDialogStore } from "@/stores/dialog";
import { validationSchema } from "@/lib/validation";
import { useProductStore } from "@/stores/products";
import { useCategoryStore } from "@/stores/category";

// Pinia Store
const dialogStore = useDialogStore();
const productStore = useProductStore();
const categoryStore = useCategoryStore();
const categories = computed(() => categoryStore.categories);

const categoryItems = computed(() =>
  categories.value.map((category) => ({
    id: category.id,
    name: category.name,
  }))
);

const emit = defineEmits(["submit"]);

// Define Form
const { handleSubmit, handleReset } = useForm({
  validationSchema,
});

// Define Fields
const name = useField("name");
const price = useField("price");
const description = useField("description");
const selectCategory = useField("selectCategory");

function loadItems() {
  categoryStore.fetchCategories();
}

// Determine if we are in "edit" mode based on the presence of an ID
const isEditMode = computed(() => productStore.updateProductForm.id !== 0);

// Initialize form with store values
// Reactive form for create/update
const form = computed(() => {
  // If in edit mode, use updateProductForm, otherwise use createProductForm
  return isEditMode.value
    ? productStore.updateProductForm
    : productStore.createProductForm;
});

onMounted(() => {
  loadItems();
  console.log("form", form.value);
});

const submitForm = () => {
  emit("submit", {
    ...form.value,
  });
};

const exposedConst = {
  submitForm,
  handleReset,
  form,
};

defineExpose(exposedConst);

// /* Old setup for reference */
// const emit = defineEmits(["submit"]);
// const props = defineProps({
//   product: {
//     type: Object,
//     default: () => ({
//       title: "",
//       price: 0,
//       description: "",
//       category: {
//         id: null,
//         name: "",
//       },
//     }),
//   },
// });
// const form = ref({
//   title: props.product.title || "",
//   price: props.product.price || 0,
//   description: props.product.description || "",
//   category: props.product.category || null,
// });
</script>

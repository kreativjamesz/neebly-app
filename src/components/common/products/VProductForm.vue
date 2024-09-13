<template>
  <v-form
    ref="productFormRef"
    @submit.prevent="submitForm"
    class="d-flex flex-column ga-5"
  >
    <v-text-field
      label="Name"
      v-model="form.title"
      variant="outlined"
      :rules="nameRules"
    />

    <v-text-field
      v-model="form.price"
      label="Price"
      type="number"
      variant="outlined"
      :counter="7"
      :rules="priceRules"
    />

    <v-textarea
      v-model="form.description"
      label="Description"
      variant="outlined"
      :rules="descRules"
    />

    <v-select
      v-model="form.categoryId"
      item-value="id"
      item-title="name"
      label="Category"
      variant="outlined"
      mandatory
      :items="categoryItems"
      :rules="categoryIdRules"
    />
  </v-form>
</template>

<script setup>
import { ref } from "vue";
import { useField, useForm } from "vee-validate";
import { useDialogStore } from "@/stores/dialog";
import { validationSchema } from "@/lib/validation";
import { useProductStore } from "@/stores/products";
import { useCategoryStore } from "@/stores/category";

// State
const validation = validationSchema;
const productFormRef = ref();
const nameRules = [validation.required, validation.name];
const priceRules = [validation.required, validation.price];
const descRules = [validation.required, validation.description];
const categoryIdRules = [validation.required, validation.categoryId];

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

// Emits
const emit = defineEmits(["submit"]);

// Computed
const isEditMode = computed(() => productStore.updateProductForm.id !== 0);
const form = computed(() => {
  return isEditMode.value
    ? productStore.updateProductForm
    : productStore.createProductForm;
});


// Hooks
onMounted(() => {
  loadItems();
  console.log("form", form.value);
});

// Methods
function loadItems() {
  categoryStore.fetchCategories();
}

const submitForm = () => {
  productFormRef.value?.validate().then(({ valid: isValid }) => {
    if (!isValid) return;
    emit("submit", form.value);
  });
};

// Exposed Constants
const exposedConst = {
  submitForm,
  form,
};

defineExpose(exposedConst);
</script>

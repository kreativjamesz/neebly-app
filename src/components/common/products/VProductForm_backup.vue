<template>
  <v-form
    ref="productFormRef"
    @submit.prevent="submitForm"
    class="d-flex flex-column ga-5"
    fast-fail
  >
    <v-text-field
      label="Name"
      v-model="form.title"
      variant="outlined"
      :error-messages="name.errorMessage.value"
    />

    <v-text-field
      v-model="form.price"
      label="Price"
      type="number"
      variant="outlined"
      :counter="7"
      :error-messages="price.errorMessage.value"
    />

    <v-textarea
      v-model="form.description"
      label="Description"
      variant="outlined"
      :error-messages="description.errorMessage.value"
    />

    <v-select
      v-model="form.categoryId"
      item-value="id"
      item-title="name"
      label="Category"
      variant="outlined"
      mandatory
      :error-messages="categoryId.errorMessage.value"
      :items="categoryItems"
    />
    <pre>{{ form }}</pre>
  </v-form>
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

// From Validation using Vee-Validate
const { handleSubmit, handleReset } = useForm({
  validationSchema,
});
const name = useField("name");
const price = useField("price");
const description = useField("description");
const categoryId = useField("categoryId");

// Computed
const isEditMode = computed(() => productStore.updateProductForm.id !== 0);
const form = computed(() => {
  return isEditMode.value
    ? productStore.updateProductForm
    : productStore.createProductForm;
});

// OnMounted Lifecycle Hook
onMounted(() => {
  loadItems();
  console.log("form", form.value);
});

// Methods
function loadItems() {
  categoryStore.fetchCategories();
}
const validate = async () => {
  const { valid } = await this.$refs.productFormRef.validate();
  return valid;
};
const reset = () => {
  this.$refs.productFormRef.reset();
};
const submit = handleSubmit((values) => {
  if (isEditMode.value) {
    productStore.updateProduct(values);
  } else {
    productStore.createProduct(values);
  }
  emit("submit", values);
  handleReset();
  dialogStore.closeDialog();
});

const submitForm = () => {
  submit();
  // this.validate();
  // emit("submit", {
  //   ...form.value,
  // });
};

// Exposed Constants
const exposedConst = {
  validate,
  submitForm,
  handleReset,
  form,
};

defineExpose(exposedConst);
</script>

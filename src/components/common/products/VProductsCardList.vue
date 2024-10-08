<template>
  <v-row>
    <v-col
      cols="4"
      lg="3"
      md="4"
      sm="6"
      v-for="product in products"
      :key="product.id"
      class="tw-w-full"
    >
      <v-card
        color="grey-lighten-4"
        class="product-card rounded-0"
        :class="{ 'bg-grey-darken-4': isDark, 'bg-blue-grey-lighten-5': !isDark }"
      >
        <div class="is-new-banner" v-if="isNew(product.creationAt || '')">New</div>
        <div class="product-img">
          <img
            :src="product.images[0]"
            height="auto"
            width="100%"
            contain
            :alt="product.title"
            onerror="this.onerror=null;this.src='http://unsplash.it/g/150/150?random=' + Math.random();"
          />
        </div>
        <div>
          <v-card-title class="contain">{{ product?.title }}</v-card-title>
          <v-card-subtitle class="contain">{{ product?.category?.name }}</v-card-subtitle>
          <v-card-text class="contain">
            <p>
              {{ truncatedText(product.description) }}
              <span v-if="isExpanded">{{ remainingText(product.description) }}</span>
              <a
                class="text-primary hover:underline focus:outline-none"
                @click="toggleText"
              >
                {{ isExpanded ? "Read Less" : "Read More" }}
              </a>
            </p>
            <p class="text-h6 text-primary">$ {{ product.price }}</p>
          </v-card-text>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useProductStore } from "@/stores/products";
import { useThemeStore } from "@/stores/theme";
import { storeToRefs } from "pinia";
const themeStore = useThemeStore();
const productStore = useProductStore();
const { isDark } = storeToRefs(themeStore);
const isExpanded = ref(false);
const limit = ref(100);

// Computed
const products = computed(() => productStore.products);

// Methods
const toggleText = () => {
  isExpanded.value = !isExpanded.value;
};

const truncatedText = (text: string) => {
  return text.length > limit.value ? text.slice(0, limit.value) : text;
};

const remainingText = (text: string) => {
  return text.length > limit.value ? text.slice(limit.value) : "";
};

const isNew = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 7;
};
const truncateText = (text: string, length: number) => {
  if (text.length > length) {
    return text.slice(0, length) + "...";
  } else {
    return text;
  }
};
</script>

<style scoped lang="scss">
.overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  background: #000000;
  opacity: 0.5;
  z-index: 9;
}
.contain {
  z-index: 999;
}
.product-img {
  object-fit: contain;
  object-position: center;
  margin: 2px 2px 0 2px;
  width: 100%;
  height: auto;

  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}
.product-card:hover {
  cursor: pointer;
  transition: transform 0.2s;
  transform: scale(1.05);
}
.is-new-banner {
  // Create a Banner that position on top right of the product card. and rotate 45 degree
  height: 0px;
  width: 70px;
  background-color: #ffcc00;
  color: black;
  position: absolute;
  top: 15px;
  right: -25px;
  text-align: center;
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  white-space: nowrap;
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);

  z-index: 9;
}

.is-new-banner:before {
  box-sizing: border-box;
  border-style: solid;
  border-color: transparent;
  border-width: 25px;
  border-left-width: 25px;
  border-right-width: 25px;
  content: "";
  display: block;
  left: -10px;
  position: absolute;
  width: 120%;
  border-top-width: 0px;
  border-bottom-color: #ffcc00;
  color: black;
  top: -2px;
  z-index: -1;
}
</style>

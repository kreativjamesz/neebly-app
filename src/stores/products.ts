import { defineStore } from 'pinia'
import ApiService from '@/services/api'
import { InputCreateProduct, InputUpdateProduct, Product, ProductStoreState } from '@/types'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [] as Product[],
    totalItems: 0,
    loading: false,
    error: null,
    offset: 0,
    limit: 10, // Default limit
    createProductForm: {
      title: '',
      price: 0,
      description: '',
      categoryId: 0
    } as InputCreateProduct,
    updateProductForm: {
      id: 0,
      title: '',
      price: 0,
      description: '',
      categoryId: 0
    } as InputUpdateProduct,
  }),

  actions: {
    async fetchProducts(
      this: ProductStoreState,
      {
        offset = this.offset,
        limit = this.limit,
      }: { offset?: number; limit?: number },
    ) {
      this.loading = true
      this.error = null

      try {
        // API call with pagination (offset and limit)
        const response: any = await ApiService.get(
          `/products?offset=${offset}&limit=${limit}`,
        )

        // Replace or append products based on the offset
        if (offset === 0) {
          this.products = response.data
        } else {
          this.products = [...this.products, ...response.data]
        }

        // Update totalItems if the API provides a total count (if not, manually handle it)
        // Count the response or set int o100
        this.totalItems = response.total || 100 // Example fallback

        // Update offset for next pagination
        this.offset = offset + limit
      } catch (error) {
        this.error = 'Failed to fetch products'
      } finally {
        this.loading = false
      }
    },
    resetPagination() {
      this.offset = 0
      this.products = []
    },
    /** Products Form */
    setCreateProductDefaults(defaults: InputCreateProduct) {
      this.createProductForm = defaults;
    },
    setUpdateProductDefaults(defaults: InputUpdateProduct) {
      this.updateProductForm = defaults;
    },
    resetCreateProductForm() {
      this.createProductForm = {
        title: '',
        price: 0,
        description: '',
        categoryId: 0
      };
    },
    resetUpdateProductForm() {
      this.updateProductForm = {
        id: 0,
        title: '',
        price: 0,
        description: '',
        categoryId: 0
      };
    }
  },
})

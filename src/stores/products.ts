import { defineStore } from 'pinia'
import ApiService from '@/services/api'
import { Product, ProductStoreState } from '@/types'
import { AxiosResponse } from 'axios';

interface CustomAxiosResponse<T = any> extends AxiosResponse<T> {
  total: number;
}

export const useProductStore = defineStore('products', {
  state: (): ProductStoreState => ({
    products: [] as Product[],
    totalItems: 0,
    loading: false,
    error: null,
    offset: 0,
    limit: 10, // Default limit
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
        // Count the reponse or set int o100
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
    deleteProduct(id: Product['id']) {
      this.products = this.products.filter((product) => product.id !== id)
    },
    addProduct(product: Product) {
      this.products.push(product)
    },
    updateProduct(product: Product) {
      const index = this.products.findIndex((p) => p.id === product.id)
      if (index !== -1) {
        this.products[index] = product
      }
    },
  },
})

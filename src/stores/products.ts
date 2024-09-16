import { defineStore } from 'pinia'
import ApiService from '@/services/api'
import { InputCreateProduct, InputUpdateProduct, Product, ProductStoreState } from '@/types'

export const useProductStore = defineStore('products', {
  state: () => ({
    allProducts: [] as Product[],
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
      categoryId: null
    } as InputCreateProduct,
    updateProductForm: {
      id: 0,
      title: '',
      price: 0,
      description: '',
      categoryId: 0
    } as InputUpdateProduct,
    selectedProduct: {} as Product
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
        const response: any = await ApiService.get(
          `/products?offset=${offset}&limit=${limit}`,
        )
        if (offset === 0) {
          this.allProducts = response.data
          this.products = response.data
        } else {
          this.allProducts = [...this.allProducts, ...response.data]
          this.products = [...this.products, ...response.data]
        }
        this.totalItems = response.total || 100
        this.offset = offset + limit
      } catch (error) {
        this.error = 'Failed to fetch products'
      } finally {
        this.loading = false
      }
    },
    // Server-side filtering by title
    async searchProductsByTitle(this: ProductStoreState, query: string) {
      this.loading = true
      this.error = null
      try {
        const response: any = await ApiService.get(`/products/?title=${query}`)
        this.products = response.data
      } catch (error) {
        this.error = 'Failed to fetch products'
      } finally {
        this.loading = false
      }
    },

     // Client-side filtering by title
     filterProductsByTitle(this: ProductStoreState, query: string) {
      this.products = this.allProducts.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      )
    },
    async searchProductsByPrice(this: ProductStoreState, query: number[]) {
      this.loading = true
      this.error = null
      try {
        // ?price_min=900&price_max=1000
        const response: any = await ApiService.get(`/products/?price_min=${query[0]}&price_max=${query[1]}`)
        this.products = response.data
      } catch (error) {
        this.error = 'Failed to fetch products'
      } finally {
        this.loading = false
      }
    },
    async searchProductsByCategory(this: ProductStoreState, query: number) {
      this.loading = true
      this.error = null
      try {
        const response: any = await ApiService.get(`/products/?categoryId=${query}`)
        this.products = response.data
      } catch (error) {
        this.error = 'Failed to fetch products'
      } finally {
        this.loading = false
      }
    },
    
    async createProduct(this: ProductStoreState) {
      this.loading = true
      this.error = null
      const form = {...this.createProductForm, images: ['http://unsplash.it/g/150/150?random']}
      try {
        const response = await ApiService.post('/products', form)
        this.products = [...this.products, response.data]
      } catch (error) {
        this.error = 'Failed to create product'
      } finally {
        this.loading = false
      }
    },
    async updateProduct(this: ProductStoreState) {
      this.loading = true
      this.error = null
      try {
        const response = await ApiService.put(`/products/${this.updateProductForm.id}`, this.updateProductForm)
        const index = this.products.findIndex((product) => product.id === response.data.id)
        if (index !== -1) {
          this.products[index] = response.data
        }
      } catch (error) {
        this.error = 'Failed to update product'
      } finally {
        this.loading = false
        this.resetUpdateProductForm()
      }
    },
    async deleteProduct(this: ProductStoreState, id: number) {
      this.loading = true
      this.error = null
      try {
        await ApiService.delete(`/products/${id}`)
        this.products = this.products.filter((product) => product.id !== id)
      } catch (error) {
        this.error = 'Failed to delete product'
      } finally {
        this.loading = false
      }
    },
    resetPagination() {
      this.offset = 0
      this.products = []
    },
    setCreateProductDefaults(defaults: InputCreateProduct) {
      this.createProductForm = defaults;
    },
    setUpdateProductDefaults(defaults: InputUpdateProduct) {
      this.updateProductForm = defaults;
    },
    setViewProductDetails(details: Product) {
      this.selectedProduct = details
    },
    resetCreateProductForm() {
      this.createProductForm = {
        title: '',
        price: 0,
        description: '',
        categoryId: 0,
        images: []
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
    },
    resetViewProductDetails() {
      this.selectedProduct = {} as Product
    }
  },
})

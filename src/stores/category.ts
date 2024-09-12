import { defineStore } from 'pinia'
import ApiService from '@/services/api'
import { Category, CategoryStoreState } from '@/types'
import { AxiosResponse } from 'axios';

export const useCategoryStore = defineStore('categories', {
	state: (): CategoryStoreState => ({
		categories: [] as Category[],
		totalItems: 0,
		loading: false,
		error: null,
		offset: 0,
		limit: 10, // Default limit
	}),
	actions: {
		async fetchCategories() {
			try {
				const response: AxiosResponse<Category[]> = await ApiService.get('/categories')
				this.categories = response.data
			} catch (error) {
				this.error = 'Failed to fetch categories'
			} finally {
				this.loading = false
			}
		}
	}
})
import { Category } from "./categories"

export interface ProductTableParams {
  page: number
  itemsPerPage: number
  search: string
}

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: Category
  images: string[]
  creationAt?: string
  updatedAt?: string
}

export interface ProductStoreState {
  allProducts: Product[]
  products: Product[]
  totalItems: number
  loading: boolean
  error: string | null
  offset: number
  limit: number
  createProductForm: InputCreateProduct,
  updateProductForm: InputUpdateProduct,
  resetCreateProductForm: () => void,
  resetUpdateProductForm: () => void,
}

export type InputCreateProduct = {
  title: string
  price: number
  description: string
  categoryId?: number | null
  images?: string[]
}

export type InputUpdateProduct = {
  id: number
  title?: string
  description?: string
  price?: number
  categoryId?: number
}

export type DefaultViewProduct = {
  id: number
  title: string
  price: number
  description: string
  category: Category
  images: string[]
}

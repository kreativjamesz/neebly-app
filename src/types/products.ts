export interface ProductTableParams {
  page: number
  itemsPerPage: number
}

export interface Category {
  id: number
  name: string
  image: string
}

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: Category
  images: string[]
}

export interface ProductStoreState {
  products: Product[]
  totalItems: number
  loading: boolean
  error: string | null
  offset: number
  limit: number
}

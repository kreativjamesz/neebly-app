export interface CategoryTableparams {
	page: number
	itemsPerPage: number
}

export type Category = {
	id: number
	name: string
	image: string
}

export type CategoryStoreState = {
	categories: Category[]
	totalItems: number
	loading: boolean
	error: string | null
	offset: number
	limit: number
}
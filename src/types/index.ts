export * from './products'
export * from './categories'

export interface InternalDataTableHeader {
	text: string
	value: string
	width?: string
	align?: 'start' | 'center' | 'end'
	sortable?: boolean
}
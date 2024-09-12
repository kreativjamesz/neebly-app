export * from './products'
export * from './categories'

export interface InternalDataTableHeader {
	text: string
	value: string
	align?: 'start' | 'center' | 'end'
	sortable?: boolean
}
export * from './products'
export * from './categories'

export interface InternalDataTableHeader {
	text: string
	value: string
	width?: string
	minWidth?: string
	maxWidth?: string
	align?: 'start' | 'center' | 'end'
	sortable?: boolean
}
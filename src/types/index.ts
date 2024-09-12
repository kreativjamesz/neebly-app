export * from './products'

export interface InternalDataTableHeader {
	text: string
	value: string
	align?: 'start' | 'center' | 'end'
	sortable?: boolean
}
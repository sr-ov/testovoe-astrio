export interface IProduct {
	type: 'simple' | 'configurable'
	id: number
	sku: string
	title: string
	regular_price: {
		currency: 'USD'
		value: number
	}
	image: string
	brand: number
}

import axios from 'axios'
import { URL } from '@/constants'
import type { IBrand } from '@/types/IBrand'
import type { IProduct } from '@/types/IProduct'
import type { IProductConf } from '@/types/IProductConf'

const api = axios.create({
	baseURL: URL,
})

export const getBrands = async () => {
	const { data } = await api.get<IBrand[]>('brands.json')

	return data
}

export const getProducts = async () => {
	const { data } = await api.get<(IProduct | IProductConf)[]>(
		'level3/products.json'
	)

	return data
}

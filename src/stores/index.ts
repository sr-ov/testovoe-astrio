import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import type { IBrand } from '@/types/IBrand'
import type { IProduct } from '@/types/IProduct'
import type { IProductConf } from '@/types/IProductConf'
import { getBrands, getProducts } from '@/api'
import { INACTIVE_VALUE } from '@/constants'

type CountCartProduct = number

export const useStore = defineStore('store', () => {
	const state = reactive({
		brands: [] as IBrand[],
		products: [] as (IProduct | IProductConf)[],
		cartProducts: new Map<IProduct, CountCartProduct>(),
		filterByBrandId: INACTIVE_VALUE,
	})

	/* GETTERS */
	const filteredProducts = computed(() => {
		return state.filterByBrandId === INACTIVE_VALUE
			? state.products
			: state.products.filter(
					(product) => product.brand === state.filterByBrandId
			  )
	})

	const countCartProducts = computed(() => {
		return [...state.cartProducts]
			.map(([product, count]) => count)
			.reduce((acc, el) => acc + el, 0)
	})

	const totalPrice = computed(() => {
		return [...state.cartProducts]
			.map(([product, count]) => count * product.regular_price.value)
			.reduce((acc, el) => acc + el, 0)
	})
	/* /GETTERS */

	/* ACTIONS */
	const setProducts = async () => {
		state.products = await getProducts()
	}

	const setBrands = async () => {
		state.brands = await getBrands()
	}

	const addToCart = (product: IProduct) => {
		const isFound = state.cartProducts.has(product)

		if (isFound) {
			plus(product)
		} else {
			state.cartProducts.set(product, 1)
		}
	}

	const plus = (product: IProduct) => {
		const count = state.cartProducts.get(product)
		count && state.cartProducts.set(product, count + 1)
	}

	const minus = (product: IProduct) => {
		const count = state.cartProducts.get(product)
		count && state.cartProducts.set(product, count - 1)
	}

	const removeFromCart = (product: IProduct) => {
		state.cartProducts.delete(product)
	}
	/* /ACTIONS */

	return {
		state,
		getters: {
			filteredProducts,
			countCartProducts,
			totalPrice,
		},
		actions: {
			setProducts,
			setBrands,
			addToCart,
			plus,
			minus,
			removeFromCart,
		},
	}
})

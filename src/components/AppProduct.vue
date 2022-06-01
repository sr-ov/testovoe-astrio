<script setup lang="ts">
import { useStore } from '@/stores'
import type { IProduct } from '@/types/IProduct'
import { URL } from '@/constants'

interface Props {
	product: IProduct
}

defineProps<Props>()

const { actions } = useStore()
</script>

<template>
	<a class="card block h-full" href="#" @click.prevent>
		<div class="mb-4 rounded overflow-hidden">
			<img
				class="card__img w-full h-full object-cover min-h-[200px] transition"
				:src="`${URL}${product.image}`"
				alt="Картинка товара"
			/>
		</div>

		<div>
			<div class="text-xl mb-2">{{ product.title }}</div>
			<div class="">brand {{ product.brand }}</div>
			<div class="flex items-center">
				<div class="grow">${{ product.regular_price.value }}</div>

				<button
					class="w-10 h-10 flex justify-center items-center bg-slate-100 hover:bg-slate-200 transition rounded"
					@click.prevent="actions.addToCart(product)"
				>
					<img
						src="@/assets/images/svg/add-to-cart.svg"
						alt=""
						height="32"
						width="32"
						aria-hidden="true"
					/>
				</button>
			</div>

			<slot></slot>
		</div>
	</a>
</template>

<style scoped>
.card:hover .card__img {
	transform: scale(1.03);
}
</style>

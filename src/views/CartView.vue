<script setup lang="ts">
import { CartProduct } from '@/components'
import { useStore } from '@/stores'

const { state, getters } = useStore()
</script>

<template>
	<main class="pb-10">
		<div class="container">
			<h1 class="text-4xl mb-10">Cart</h1>

			<template v-if="state.cartProducts.size > 0">
				<ul
					class="space-y-4 mb-20"
					v-for="[product, count] in state.cartProducts"
					:key="product.id"
				>
					<li>
						<cart-product
							:product="product"
							:count="count"
						></cart-product>
					</li>
				</ul>
			</template>

			<div class="text-6xl mb-10" v-else>Пусто</div>

			<div class="">
				<div class="mb-4 text-3xl font-medium">
					Total price: ${{ getters.totalPrice.toFixed(2) }}
				</div>
				<button
					class="px-4 py-2 rounded bg-slate-100 hover:bg-slate-200 transition"
					type="submit"
				>
					Checkout
				</button>
			</div>
		</div>
	</main>
</template>

<style scoped></style>

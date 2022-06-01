<script setup lang="ts">
import { PlusMinusCounter } from '@/components'
import type { IProduct } from '@/types/IProduct'
import type { IProductConf } from '@/types/IProductConf'
import { useStore } from '@/stores'
import { URL } from '@/constants'

interface Props {
	product: IProduct | IProductConf
	count: number
}

const { actions } = useStore()

defineProps<Props>()
</script>

<template>
	<div class="flex flex-col sm:flex-row gap-3">
		<div class="flex gap-3 grow">
			<div>
				<img
					:src="`${URL}${product.image}`"
					alt="Картинка товара"
					width="100"
					height="150"
				/>
			</div>
			<div>
				<div class="text-lg">{{ product.title }}</div>
				<div class="text-sm">brand: {{ product.brand }}</div>
				<div class="text-sm" v-if="(product as IProductConf).color">
					color: {{ (product as IProductConf).color }}
				</div>
				<div class="text-sm" v-if="(product as IProductConf).size">
					size: {{ (product as IProductConf).size }}
				</div>
			</div>
		</div>
		<div
			class="grid grid-cols-[auto_minmax(60px,1fr)_40px] gap-6 items-start justify-items-end"
		>
			<plus-minus-counter
				:count="count"
				@plus="actions.plus(product)"
				@minus="actions.minus(product)"
			></plus-minus-counter>

			<div class="">
				{{ (product.regular_price.value * count).toFixed(2) }}
			</div>

			<button
				class="w-10 h-10 flex items-center justify-center"
				@click="actions.removeFromCart(product)"
			>
				<img
					src="@/assets/images/svg/trash.svg"
					alt=""
					aria-hidden="true"
					width="32"
					height="32"
				/>
			</button>
		</div>
	</div>
</template>

<style scoped></style>

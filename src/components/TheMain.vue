<script setup lang="ts">
import { useStore } from '@/stores'
import { AppProduct } from '@/components'
import { AppProductConf } from '@/components'
import type { IProductConf } from '@/types/IProductConf'

const { getters } = useStore()
</script>

<template>
	<main class="pb-10">
		<h1 class="mb-5 text-4xl">Catalog</h1>

		<ul class="list grid gap-6">
			<li v-for="product in getters.filteredProducts" :key="product.id">
				<app-product
					v-if="product.type === 'simple'"
					:product="product"
				></app-product>

				<app-product-conf
					v-if="product.type === 'configurable'"
					:product="(product as IProductConf)"
				></app-product-conf>
			</li>
		</ul>
	</main>
</template>

<style scoped>
@media (min-width: 480px) {
	.list {
		grid-template-columns: repeat(2, 1fr);
	}
}
@media (min-width: 640px) {
	.list {
		grid-template-columns: repeat(3, 1fr);
	}
}
@media (min-width: 1280px) {
	.list {
		grid-template-columns: repeat(4, 1fr);
	}
}
</style>

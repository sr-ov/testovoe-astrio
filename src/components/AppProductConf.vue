<script setup lang="ts">
import { computed, reactive } from 'vue'
import { AppProduct, OptionButton } from '@/components'
import { INACTIVE_VALUE } from '@/constants'
import type {
	IConfigurableOptionColor,
	IConfigurableOptionSize,
	IProductConf,
	Code,
} from '@/types/IProductConf'
import { useStore } from '@/stores'
import { replaceImage, generateProductKey } from '@/utils'

type VarsOptions = Record<string, number[]>

interface Props {
	product: IProductConf
}

const props = defineProps<Props>()

const products = new Map<string, IProductConf>()

const [colors, sizes] = props.product.configurable_options.map(({ values }) =>
	values.reduce(
		(acc, el) => ((acc[el.value_index] = el), acc),
		{} as Record<string, IConfigurableOptionColor | IConfigurableOptionSize>
	)
)

const variantsColors: VarsOptions = {}
const variantsSizes: VarsOptions = {}

const setVariants = (vars: VarsOptions, keyId: number, valueId: number) => {
	vars[keyId] =
		vars[keyId]?.length > 0 ? vars[keyId].concat(valueId) : [valueId]
}

for (const { product, attributes } of props.product.variants) {
	const [color, size] = attributes
	const colorId = color.value_index
	const sizeId = size.value_index
	setVariants(variantsSizes, colorId, sizeId)
	setVariants(variantsColors, sizeId, colorId)

	for (const key of [
		[colorId, INACTIVE_VALUE],
		[INACTIVE_VALUE, sizeId],
		[colorId, sizeId],
	]) {
		products.set(generateProductKey(key), {
			...props.product,
			...product,
			image: replaceImage(product.image),
		})
	}
}

const selectedOptions = reactive({
	color: { value: INACTIVE_VALUE, label: '' },
	size: { value: INACTIVE_VALUE, label: '' },
})

const colorDisabled = computed(
	() => (id: number) =>
		selectedOptions.size.value !== INACTIVE_VALUE &&
		!variantsColors[selectedOptions.size.value].includes(id)
)
const sizeDisabled = computed(
	() => (id: number) =>
		selectedOptions.color.value !== INACTIVE_VALUE &&
		!variantsSizes[selectedOptions.color.value].includes(id)
)

const selectOption = (option: Code, nextValue: number, label: string) => {
	const prevValue = selectedOptions[option].value

	if (prevValue === nextValue) {
		selectedOptions[option].value = INACTIVE_VALUE
		selectedOptions[option].label = ''
	} else {
		selectedOptions[option].value = nextValue
		selectedOptions[option].label = label
	}
}

const currentProduct = computed(
	() =>
		products.get(
			generateProductKey([
				selectedOptions.color.value,
				selectedOptions.size.value,
			])
		) || props.product
)

const { actions } = useStore()

const addToCart = () => {
	actions.addToCart({
		...currentProduct.value,
		color: colors[selectedOptions.color.value]?.label,
		size: sizes[selectedOptions.size.value]?.label,
	})
}
</script>

<template>
	<app-product :product="currentProduct" @add-to-cart="addToCart">
		<div class="space-y-3">
			<div class="flex gap-3">
				<option-button
					v-for="color in colors"
					:key="color.value_index"
					:active="selectedOptions.color.value === color.value_index"
					:disabled="colorDisabled(color.value_index)"
					:style="{ 'background-color': color.value as string }"
					@click.prevent="
						selectOption('color', color.value_index, color.label)
					"
				></option-button>
			</div>

			<div class="flex gap-3">
				<option-button
					class="border"
					v-for="size in sizes"
					:key="size.value_index"
					:active="selectedOptions.size.value === size.value_index"
					:disabled="sizeDisabled(size.value_index)"
					@click.prevent="
						selectOption('size', size.value_index, size.label)
					"
				>
					{{ size.label }}
				</option-button>
			</div>
		</div>
	</app-product>
</template>

<style scoped></style>

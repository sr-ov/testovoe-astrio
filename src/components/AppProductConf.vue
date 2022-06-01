<script setup lang="ts">
import { computed, reactive } from 'vue'
import prop from 'lodash.property'
import { AppProduct, OptionButton } from '@/components'
import { INACTIVE_VALUE } from '@/constants'
import type {
	IConfigurableOptionColor,
	IConfigurableOptionSize,
	IProductConf,
	Code,
} from '@/types/IProductConf'

type NormVariants = Record<string, number[]>
type Attrs = { color: number; size: number }

interface Props {
	product: IProductConf
}

const props = defineProps<Props>()

const colors = props.product.configurable_options.filter(
	(el) => el.attribute_code === 'color'
)[0].values as IConfigurableOptionColor[]

const sizes = props.product.configurable_options.filter(
	(el) => el.attribute_code === 'size'
)[0].values as IConfigurableOptionSize[]

const attrs = props.product.variants.map(({ product, attributes }) => ({
	...attributes.reduce<Attrs>(
		(acc, el) => ((acc[el.code] = el.value_index), acc),
		{} as Attrs
	),
	product,
}))

const variantsSizes = colors.reduce<NormVariants>((acc, color) => {
	acc[color.value_index] = attrs
		.filter((el) => el.color === color.value_index)
		.map(prop('size'))
	return acc
}, {})
const variantsColors = sizes.reduce<NormVariants>((acc, size) => {
	acc[size.value_index] = attrs
		.filter((el) => el.size === size.value_index)
		.map(prop('color'))
	return acc
}, {})

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

const replaceImage = (imageUrl: string) => imageUrl.replace('image', 'images')

const curProduct = computed(() => {
	if (
		selectedOptions.color.value !== INACTIVE_VALUE &&
		selectedOptions.size.value !== INACTIVE_VALUE
	) {
		const { product } = attrs.filter(
			({ color, size }) =>
				color === selectedOptions.color.value &&
				size === selectedOptions.size.value
		)[0]

		return {
			...product,
			image: replaceImage(product.image),
			color: selectedOptions.color.label,
			size: selectedOptions.size.label,
		}
	}

	if (selectedOptions.color.value !== INACTIVE_VALUE) {
		const { product } = attrs.filter(
			({ color }) => color === selectedOptions.color.value
		)[0]

		return {
			...product,
			image: replaceImage(product.image),
			color: selectedOptions.color.label,
		}
	}

	return props.product
})
</script>

<template>
	<app-product
		:product="{
			...product,
			...curProduct,
		}"
	>
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

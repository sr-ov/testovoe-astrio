<script setup lang="ts">
import { computed } from 'vue'

interface Props {
	count: number
	min?: number
}
const props = withDefaults(defineProps<Props>(), { min: 1 })
const emit = defineEmits(['plus', 'minus'])

const isDisabled = computed(() => props.count === props.min)
</script>

<template>
	<div class="plus-minus">
		<button
			class="plus-minus__btn plus-minus__btn--minus"
			:disabled="isDisabled"
			@click="emit('minus')"
		>
			-
		</button>
		<div class="plus-minus__count">{{ count }}</div>
		<button
			class="plus-minus__btn plus-minus__btn--plus"
			@click="emit('plus')"
		>
			+
		</button>
	</div>
</template>

<style scoped>
.plus-minus {
	display: flex;
	background-color: #f2f2f2;
}
.plus-minus__btn,
.plus-minus__count {
	width: 44px;
	height: 44px;
}
.plus-minus__count {
	display: flex;
	align-items: center;
	justify-content: center;
}
.plus-minus__btn--minus:disabled {
	opacity: 0.5;
}
</style>

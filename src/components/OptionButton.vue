<script setup lang="ts">
interface Props {
	active: boolean
	disabled: boolean
}
defineProps<Props>()
</script>

<template>
	<button
		class="option w-7 h-5 rounded text-[10px]"
		:class="{ 'ring-2': active }"
		:disabled="disabled"
	>
		<slot></slot>
	</button>
</template>

<style scoped>
.option:disabled {
	opacity: 0.1;
}
</style>

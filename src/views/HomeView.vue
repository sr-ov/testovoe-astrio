<script setup lang="ts">
import { TheSidebar, TheMain } from '@/components'
import { useStore } from '@/stores'
import { useAsync } from '@/composables/useAsync'

const { actions } = useStore()
const { execute } = useAsync(async () => {
	await Promise.all([actions.setBrands(), actions.setProducts()])
})
await execute()
</script>

<template>
	<div
		class="container grid lg:grid-cols-[250px_1fr] gap-5 min-h-[var(--content-height)]"
	>
		<the-sidebar></the-sidebar>
		<the-main></the-main>
	</div>
</template>

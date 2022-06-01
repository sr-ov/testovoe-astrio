<script setup lang="ts">
import { RouterView } from 'vue-router'
import { TheHeader, AppSpinner } from '@/components'
import { onErrorCaptured, ref } from 'vue'

const err = ref<Error | null>(null)

onErrorCaptured((error) => {
	console.error(error)
	err.value = error
	return true
})
</script>

<template>
	<div v-if="err">
		{{ err }}
		<br />
		ERROR
	</div>

	<template v-else>
		<the-header></the-header>

		<router-view v-slot="{ Component }">
			<template v-if="Component">
				<suspense>
					<component :is="Component"></component>

					<template #fallback>
						<app-spinner height="50" width="50"></app-spinner>
					</template>
				</suspense>
			</template>
		</router-view>
	</template>
</template>

<style>
:root {
	--header-height: 100px;
	--content-height: calc(100vh - var(--header-height));
}

.container {
	max-width: 1920px;
	margin: 0 auto;
	padding: 0 15px;
}

.visually-hidden {
	position: fixed;
	transform: scale(0);
}
</style>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStore } from '@/stores'
import { INACTIVE_VALUE } from '@/constants'

const elRef = ref<HTMLDivElement | null>(null)
const offset = ref<string | undefined>('')
const isActiveSidebar = ref(false)
const { state } = useStore()

onMounted(() => {
	offset.value = elRef.value?.getBoundingClientRect().top + 'px'
})
</script>

<template>
	<aside
		class="sidebar fixed left-0 z-10 min-w-[250px] border-r-2 transition bg-white px-2 lg:static"
		:class="{ active: isActiveSidebar }"
	>
		<div
			class="sticky h-full lg:h-auto z-10 top-[var(--header-height)] left-0"
		>
			<div class="overflow-auto wrapper grid" ref="elRef">
				<ul class="space-y-1">
					<li>
						<button
							class="py-1 px-4 w-full rounded text-left hover:bg-slate-200 duration-200"
							:class="{
								'bg-slate-200':
									state.filterByBrandId === INACTIVE_VALUE,
							}"
							@click="state.filterByBrandId = INACTIVE_VALUE"
						>
							All Brands
						</button>
					</li>
					<li v-for="{ id, title } in state.brands" :key="id">
						<button
							class="py-1 px-4 w-full rounded text-left hover:bg-slate-200 duration-200"
							:class="{
								'bg-slate-200': id === state.filterByBrandId,
							}"
							@click="state.filterByBrandId = id"
						>
							{{ title }}
						</button>
					</li>
				</ul>
			</div>
		</div>

		<button
			class="filters flex lg:hidden justify-center items-center bg-slate-200 w-10 h-10 rounded absolute z-30"
			@click="isActiveSidebar = !isActiveSidebar"
		>
			<img src="@/assets/images/svg/filters.svg" alt="" aria-hidden="true" />
		</button>
	</aside>
</template>

<style scoped>
.sidebar {
	transform: translateX(-100%);
	height: 100%;
}
.sidebar.active {
	transform: translateX(0);
}
@media (min-width: 1024px) {
	.sidebar {
		transform: translateX(0);
	}
}

.wrapper {
	max-height: calc(100vh - v-bind(offset));
}
.filters {
	right: 0;
	bottom: 50%;
	transform: translate(100%, -50%);
}
</style>

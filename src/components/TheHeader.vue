<script setup lang="ts">
import { useStore } from '@/stores'

const { getters } = useStore()
</script>

<template>
	<header class="sticky z-20 top-0 left-0 w-full bg-white">
		<div class="container">
			<div class="flex items-center gap-3 min-h-[var(--header-height)]">
				<div class="grow flex">
					<router-link class="py-3" to="/">
						<img src="@/assets/images/logo.png" alt="логотип сайта" />
					</router-link>
				</div>

				<div class="shrink-0">
					<router-link
						class="h-full w-[50px] relative"
						to="/cart"
						v-if="$route.name !== 'cart'"
					>
						<img
							src="@/assets/images/svg/cart.svg"
							alt=""
							aria-hidden="true"
							height="50"
							width="50"
						/>
						<span
							class="count text-center"
							v-if="getters.countCartProducts"
						>
							{{ getters.countCartProducts }}
						</span>
					</router-link>
				</div>
			</div>
		</div>
	</header>
</template>

<style scoped>
.count {
	position: absolute;
	top: 0;
	right: -10px;
	z-index: 111;
	background-color: rgb(128, 128, 128);
	border-radius: 50%;
	min-width: 20px;
	line-height: 1.4;
	color: #fff;
}
</style>

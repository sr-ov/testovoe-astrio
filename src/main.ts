import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import App from './App.vue'
import router from './router'
import './index.css'

const app = createApp(App)

app.use(Toast, {
	position: POSITION.TOP_CENTER,
})
app.use(createPinia())
app.use(router)

app.mount('#app')

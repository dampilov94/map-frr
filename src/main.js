import { createApp } from 'vue'
import App from './App.vue'
import { createStore } from './store'

// Заменю в конце

// import VueHtmlJs from 'vue-html-js'

const app = createApp(App)
const store = createStore()

app.config.productionTip = false

// app.use(VueHtmlJs)
app.use(store)

app.mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import { createStore } from './store'

// Заменю в конце
import VueHtmlJs from 'vue-html-js'
import { Icon } from 'leaflet'

delete Icon.Default.prototype._getIconUrl

Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})

const app = createApp(App)

const store = createStore()

app.config.productionTip = false

app.use(VueHtmlJs)
app.use(store)

app.mount('#app')

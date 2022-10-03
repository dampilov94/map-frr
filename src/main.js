import { createApp } from 'vue'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import VueSlider from 'vue-slider-component'
import { createStore } from './store'
import VueHtmlJs from 'vue-html-js'

import 'vue-slider-component/theme/default.css'

// Vue.component('VueSlider', VueSlider)

import App from './App.vue'

import { Icon } from 'leaflet'

delete Icon.Default.prototype._getIconUrl
Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})

const store = createStore()

const app = createApp({
    ...App,
})

app.config.productionTip = false

// Make BootstrapVue available throughout your project
app.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
app.use(IconsPlugin)

app.use(VueHtmlJs)

app.use(store)

app.mount('#app')

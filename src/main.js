import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueSlider from 'vue-slider-component'
import store from './store'
import VueHtmlJs from 'vue-html-js'

import 'vue-slider-component/theme/default.css'
Vue.component('VueSlider', VueSlider)

import App from './App.vue'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(VueHtmlJs)

import { Icon } from 'leaflet'

delete Icon.Default.prototype._getIconUrl
Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})

Vue.config.productionTip = false

new Vue({
    store,
    render: (h) => h(App),
}).$mount('#app')

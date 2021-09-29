import Vue from 'vue'
import Vuex from 'vuex'

import districts from './modules/districts'
import landCategories from './modules/land-categories'
import typeOfOwnership from './modules/type-of-ownership'
import objects from './modules/objects'
import categoryGroup from './modules/category-group'

Vue.use(Vuex)

export default new Vuex.Store({
    actions: {},
    mutations: {},
    state: {},
    getters: {},
    modules: {
        districts,
        landCategories,
        typeOfOwnership,
        objects,
        categoryGroup,
    },
})

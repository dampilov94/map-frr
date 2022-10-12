import { createStore, createLogger } from 'vuex'

import districts from './modules/districts'
import landCategories from './modules/land-categories'
import typeOfOwnership from './modules/type-of-ownership'
import objects from './modules/objects'
import categoryGroup from './modules/category-group'

const plugins = []

if (process.env.NODE_ENV === 'development') {
    plugins.push(createLogger())
}

export default createStore({
    state: {},
    mutations: {},
    actions: {},
    getters: {},
    modules: {
        districts,
        landCategories,
        typeOfOwnership,
        objects,
        categoryGroup,
    },
})

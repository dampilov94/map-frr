import { createStore, createLogger } from 'vuex'

import districts from './modules/districts'
import messages from './modules/messages'
import landCategories from './modules/land-categories'
import typeOfOwnership from './modules/type-of-ownership'
import objects from './modules/objects'
import categoryGroup from './modules/category-group'
import map from './modules/map'

const plugins = []

if (process.env.NODE_ENV === 'development') {
    plugins.push(createLogger())
}

export default createStore({
    plugins,
    state: {},
    mutations: {},
    actions: {},
    getters: {},
    modules: {
        map,
        messages,
        districts,
        landCategories,
        typeOfOwnership,
        objects,
        categoryGroup,
    },
})

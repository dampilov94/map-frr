export default {
    actions: {
        async fetchCategoryGroup(ctx) {
            const res = await fetch('http://new.invest-buryatia.ru/map/category-group.php')
            const category_group = await res.json()

            ctx.commit('updateCategoryGroup', category_group)
        },
    },
    mutations: {
        updateCategoryGroup(state, category_group) {
            state.category_group = category_group
        },
    },
    state: {
        category_group: [],
    },
    getters: {
        allCategoryGroup(state) {
            return state.category_group
        },
    },
}

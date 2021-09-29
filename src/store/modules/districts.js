export default {
    actions: {
        async fetchDistricts(ctx) {
            const res = await fetch('./districts.json')
            const districts = (await res.json()).features

            ctx.commit('updateDistricts', districts)
        },
    },
    mutations: {
        updateDistricts(state, districts) {
            state.districts = districts
        },
    },
    state: {
        districts: [],
    },
    getters: {
        allDistricts(state) {
            return state.districts
        },
    },
}

export default {
    actions: {
        async fetchObjects(ctx) {
            // const res = await fetch('./objects2.json')
            const res = await fetch('https://invest-buryatia.ru/map/objects.php')
            const objects = (await res.json()).items

            ctx.commit('updateObjects', objects)
        },
    },
    mutations: {
        updateObjects(state, objects) {
            state.objects = objects
        },
    },
    state: {
        objects: [],
        areaMax: 0,
    },
    getters: {
        allObjects(state) {
            return state.objects
        },
    },
}

const layers = [
    {
        name: 'Схема',
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        subdomains: ['a', 'b', 'c'],
    },
    // {
    //     name: 'Схема',
    //     url: 'https://api.mapbox.com/styles/v1/investmapbur/ckrbvfgm10xfu17o58y6iv5vn/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaW52ZXN0bWFwYnVyIiwiYSI6ImNrcmJ1MXhyMjBlZm0zMHBlY3dxZ2N0cm0ifQ.zHcxNLF7KSfDvDCtM963Iw',
    //     subdomains: [],
    // },
    {
        name: 'Спутник',
        url: 'https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    },
    {
        name: 'Гибрид',
        url: 'https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    },
]

export default {
    state() {
        return {
            activeLayer: layers[0],
            layers: layers,
        }
    },
    getters: {
        activeLayer(state) {
            return state.activeLayer
        },
        layers(state) {
            return state.layers
        },
    },
    actions: {
        setActiveLayer({ commit }, layer) {
            commit('setActiveLayer', layer)
        },
    },

    mutations: {
        setActiveLayer(state, layer) {
            state.activeLayer = layer
        },
    },
}

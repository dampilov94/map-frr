<template>
    <div>
        <!-- <l-map
            v-if="false"
            style="height: 100%; width: 100%"
            :zoom="zoom"
            :center="center"
            @update:zoom="zoomUpdated"
            @update:center="centerUpdated"
            @click="handleMapClick"
            :noBlockingAnimations="true"
            :options="{ zoomControl: false }"
        >
            <l-tile-layer
                v-if="activeTileLayer"
                :url="activeTileLayer.url"
                :subdomains="activeTileLayer.subdomains"
            ></l-tile-layer>
            <l-control-zoom position="topright"></l-control-zoom>

            <marker-cluster>
            <div v-if="false">
                <div v-for="item in findObjects" :key="item.id">
                    <div v-if="Array.isArray(item.coords[0])">
                        <l-polygon
                            :lat-lngs="poligonReqFormat(item['coords'])"
                            :fillOpacity="0.2"
                            :weight="3"
                            color="#29d321"
                            fillColor="#29d321"
                            :visible="item == activeObject ? true : false"
                        >
                            <l-popup :content="item['title']" />
                        </l-polygon>
                        <l-marker :lat-lng="polygonCenter(item['coords'])" @click="showObjectInfo(item)">
                            <l-icon :icon-size="iconSize" class-name="icon-base">
                                <img
                                    :src="
                                        item['category']['img']
                                            ? 'https://invest-buryatia.ru' + item['category']['img']
                                            : getIcon(item['category']['type'])
                                    "
                                />
                            </l-icon>
                        </l-marker>
                    </div>
                    <div v-else>
                        <l-marker
                            v-if="item['coords'].length == 2"
                            :lat-lng="item['coords']"
                            @click="showObjectInfo(item)"
                        >
                            <l-icon :icon-size="iconSize" class-name="icon-base">
                                <img
                                    :src="
                                        item['category']['img']
                                            ? 'https://invest-buryatia.ru/' + item['category']['img']
                                            : getIcon(item['category']['type'])
                                    "
                                />
                            </l-icon>
                        </l-marker>
                    </div>
                </div>
            </div>
            </marker-cluster>

            <div v-if="showDistricts">
                <l-polygon
                    v-for="item in allDistricts"
                    :key="item.id"
                    :lat-lngs="item['geometry']['coordinates']"
                    :fillOpacity="0"
                    @click="focusedDistrict = item.id"
                    :weight="item.id == focusedDistrict ? 3 : 1"
                >
                    <l-popup :content="item.name" />
                </l-polygon>
            </div>
        </l-map> -->
    </div>
</template>
<script>
export default {
    name: 'tmp-compontent',
}
</script>

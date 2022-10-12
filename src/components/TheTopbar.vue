<template>
    <div class="top-panel">
        <div class="top-panel-item" title="Инвестиционный портал">
            <a href="https://invest-buryatia.ru/" class="top-panel__btn show-site" target="_blank"></a>
        </div>
        <div class="top-panel-item" title="К Республике Бурятия">
            <button class="top-panel__btn show-bur" @click="$emit('mapToBuryatia')"></button>
        </div>
        <div class="top-panel-item" title="Поделиться">
            <button class="top-panel__btn show-share" @click="$emit('shareModal')"></button>
        </div>
        <div class="top-panel-item" title="Выбрать карту">
            <button
                class="top-panel__btn show-layers"
                data-bs-toggle="collapse"
                data-bs-target="#top-panel-collapse"
            ></button>

            <div class="top-panel-item__content">
                <div class="collapse" id="top-panel-collapse">
                    <ul class="panel-list">
                        <li
                            class="panel-list-item"
                            @click="$emit('update:activeLayer', item)"
                            v-for="item in layers"
                            :key="item"
                            :class="[activeLayer.name == item.name ? 'active' : '']"
                        >
                            {{ item.name }}
                        </li>
                        <li
                            class="panel-list-item"
                            :class="{ active: districts }"
                            @click="$emit('update:districts', !districts)"
                        >
                            Районы
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    emits: ['mapToBuryatia', 'shareModal', 'update:activeLayer', 'update:districts'],
    props: {
        title: {
            type: String,
        },
        layers: {
            type: Array,
        },
        activeLayer: {
            type: Object,
            default() {
                return {
                    name: '',
                }
            },
        },
        districts: Boolean,
    },
}
</script>

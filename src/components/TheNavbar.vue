<template>
    <div class="nav-desktop" v-show="!showFilterPanel">
        <div class="nav-desktop__logo">
            <img src="./../assets/img/logo-mini.png" class="img-fluid" alt="" />
        </div>
        <div class="nav-desktop__item" @click="$emit('update:showFilterPanel', true)">
            <i class="fa fa-search" aria-hidden="true"></i>
        </div>
        <div class="nav-desktop__item" @click="$emit('update:showFilterPanel', true)">
            <i class="fa fa-sliders" aria-hidden="true"></i>
        </div>
        <div class="nav-desktop__toggler" @click="$emit('update:showFilterPanel', true)">
            <i class="fa fa-chevron-right" aria-hidden="true"></i>
        </div>
    </div>

    <div class="nav-mobile" v-show="!showFilterPanel && !showSearchPanel">
        <nav class="navbar navbar-light bg-light navbar-expand">
            <div class="navbar-nav w-100 justify-content-between">
                <li class="nav-item">
                    <a class="nav-link" @click.prevent="$emit('update:showFilterPanel', true)">
                        <i class="fa fa-sliders" aria-hidden="true"></i>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" @click.prevent="$emit('update:showSearchPanel', true)">
                        <i class="fa fa-search" aria-hidden="true"></i>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" @click.prevent="$emit('shareModal')" target="_self"
                        ><i class="fa fa-share" aria-hidden="true"></i
                    ></a>
                </li>
                <li class="nav-item dropdown dropup">
                    <a
                        class="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <i class="fa fa-list" aria-hidden="true"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li>
                            <a class="dropdown-item" href="https://invest-buryatia.ru/" target="_blank"
                                >Инвестиционный портал
                            </a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#" @click.prevent="$emit('mapToBuryatia')"
                                >К республике Бурятия
                            </a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#" @click.prevent="$emit('selectMapModal')">Выбрать карту</a>
                        </li>
                    </ul>
                </li>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    emits: ['mapToBuryatia', 'shareModal', 'selectMapModal', 'update:showFilterPanel', 'update:showSearchPanel'],
    props: {
        showFilterPanel: Boolean,
        showSearchPanel: Boolean,
    },
}
</script>

<template>
<div style="text-align:center">
    <b-sidebar id="sidebar-1" visible no-header noCloseOnRouteChange class="sidebarcls">
        <b-list-group class="mt-5">
            <div>
                <b-list-group-item v-for="(x, index) in sidebar" v-tippy="{ placement : 'right', theme : 'custom', arrow : true, arrowType : 'round', animation : 'fade'}" :content="x.name" :key="index" v-bind:class="{ 'active' : x.selected }" v-on:click="setactive(index)" :title="x.name" :disabled="getroute_status(index)">
                    <img :src="x.img" v-if="!x.selected && x.img" class="d-inline-block align-top" alt="lefticon" :class="this.$commonstore.getStore().below960 ? 'alignicon' : ''">
                    <img :src="x.img_active" v-if="x.selected" class="d-inline-block align-top" alt="lefticon" :class="this.$commonstore.getStore().below960 ? 'alignicon' : ''">
                </b-list-group-item>
            </div>
        </b-list-group>
    </b-sidebar>
</div>
</template>

<script>
import {
    directive
} from 'vue-tippy'
export default {
    directives: {
        tippy: directive,
    },
    name: "SideBarPage",
    data() {
        return {
            sidebar: []
        }
    },
    methods: {
        isSelected(i) {
            return i === this.selected
        },
        setactive(i) {
            if (i != this.$commonstore.getStore().sidemenu) {
                this.$commonstore.setStore('right_sidemenu', 0);
            }
            this.$commonstore.setStore('sidemenu', i);
            this.sidebar.map(function (val) {
                val.selected = false;
            })
            this.sidebar[i].selected = true;
        },
        getPic() {
            return '@/assets/img/User_Analysis_outline.svg';
        },
        getroute_status(i) {
            if (this.sidebar[i].route != '') {
                return false;
            } else {
                return true;
            }
        },
        callsidebar() {
            this.setactive(this.$commonstore.getStore().sidemenu);
        },
        sidebar_data() {
            this.sidebar = [
                // {
                //     img: 'svg/Trend_Analysis_Outline.svg',
                //     img_active: 'svg/Trend_Analysis_Filled.svg',
                //     selected: false,
                //     name: 'Trend Analysis',
                //     route: 'trends'
                // },
                {
                    img: 'svg/Tender_Analysis_outline.svg',
                    img_active: 'svg/Tender_Analysis_Filled.svg',
                    selected: false,
                    name: 'Platform Usage Report',
                    route: 'ProcuringEntityOnboarding'
                },
                {
                    img: 'svg/Trend_Analysis_Outline.svg',
                    img_active: 'svg/Trend_Analysis_Filled.svg',
                    selected: false,
                    name: 'Tender Progress Report',
                    route: 'tenderCreation'
                },
                {
                    img: 'svg/Department_Analysis_Outline.svg',
                    img_active: 'svg/Department_Analysis_FIlled.svg',
                    selected: false,
                    name: 'Tender Robustness Report',
                    route: 'tenderRobustnessScore'
                },
                {
                    img: 'svg/Bid_Analysis_outline.svg',
                    img_active: 'svg/Bid_Analysis_Filled.svg',
                    selected: false,
                    name: 'Tender Outlier Report',
                    route: 'tenderOutlierReport'
                },
                {
                    img: 'svg/User_Analysis_outline.svg',
                    img_active: 'svg/User_Analysis_Filled.svg',
                    selected: false,
                    name: 'Data Search',
                    route: 'dataSearch'
                }
            ]
        }
    },
    mounted() {
        this.sidebar_data();
        this.setactive(this.$commonstore.getStore().sidemenu);
    }
};
</script>

<style lang="scss">
.b-sidebar {
    top: 70px !important;
    width: 5% !important;
    position: inherit !important;
    float: left !important;
    height: 100vh !important;
}

#sidebar-1 {
    width: 5% !important;
    background: var(--primary-main) !important;
}

.sidebarcls {

    .list-group-item {
        padding-top: 25px;
        padding-bottom: 25px;
        border-top: none !important;
        border-bottom: none !important;
        cursor: pointer;
        position: relative;
        transition: all .2s ease-in-out;
        background: transparent !important;
    }

    .list-group-item {
        border: none !important;

    }

    .list-group-item:hover {
        transform: scale(1.1);
    }

    .list-group-item.active {
        border: none !important;

    }

    .list-group-item.active:after {
        content: " ";
        position: absolute;
        border-left: 3px #f29079 solid;
        top: 28%;
        right: 0;
        height: 48%;
        margin-top: auto;
        margin-bottom: auto;
    }

    .list-group-item.active:before {
        content: " ";
        position: absolute;
        top: 24%;
        left: 0;
        height: 48%;
        margin-top: auto;
        margin-bottom: auto;
        width: 85%;
        height: 40px;
        background: #c0c6ce;
        z-index: -1;
        border-radius: 0 12px 12px 0;
    }

    .b-sidebar-body {
        overflow: hidden !important;
    }
}

@media only screen and (max-width: 1024px) {
    #sidebar-1 {
        width: 6% !important;
    }
}

.alignicon {
    position: relative;
    right: 10px !important;
}
</style>

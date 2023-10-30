<template>
<div>
    <div class="py-3 pl-3" style="width: 300px; position: fixed; transition: all 0.5s ease 0s" :style="[ !$commonstore.getStore().isActive ? { right: '-230px' } : { right: '0' }]" v-if=" windowWidth > 990">
        <div class="rightmenu">
            <b-list-group>
                <b-list-group-item v-for="(menu, index) in get_clicked_menu()" :key="index" v-on:click="setactive(index)" :disabled="getroute_status(index)">
                    <img src="svg/Trend_Analysis_Outline.svg" v-if="!menu.selected" alt="righticons" />
                    <img src="svg/Trend_Analysis_Filled.svg" v-if="menu.selected" alt="righticons" />
                    <span :class="menu.selected ? 'txt-clr' : 'disabletext'"> {{ menu["name"] }}</span>
                </b-list-group-item>
                <div class="curvecss" @click="toggleclose()" :class="{ rotateiconleft: $commonstore.getStore().isActive, rotateiconright: !$commonstore.getStore().isActive }">
                    <i class="fa fa-chevron-right curPnt"></i>
                </div>
            </b-list-group>
        </div>
    </div>

    <div class="py-3 pl-3" style="width: 300px; position: fixed; transition: all 0.5s ease 0s;right:-246px;top:16%" v-if=" windowWidth < 990">
        <div class="rightmenu">
            <div class="curvecss2" @click="iconclose()" :class="{ rotateiconleft: iconActive, rotateiconright: !iconActive }">
                <svg class="ham hamRotate ham8" viewBox="0 0 100 100" width="100" onclick="this.classList.toggle('active')">
                    <path class="line top" d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20" />
                    <path class="line middle" d="m 30,50 h 40" />
                    <path class="line bottom" d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20" />
                </svg>
            </div>
        </div>
    </div>

    <transition :duration="{ enter: 500, leave: 800 }" name="nested">
        <div v-show=" windowWidth < 990 && iconActive" class="rightmenu" style="position: fixed;right: 32px;top:80px;">
            <b-list-group style="border-radius: 20px;">
                <b-list-group-item v-for="(menu, index) in get_clicked_menu()" :key="index" v-on:click="setactive(index)" :disabled="getroute_status(index)">
                    <img src="svg/Trend_Analysis_Outline.svg" v-if="!menu.selected" alt="righticons" />
                    <img src="svg/Trend_Analysis_Filled.svg" v-if="menu.selected" alt="righticons" />
                    <span :class="menu.selected ? 'txt-clr' : 'disabletext'"> {{ menu["name"] }}</span>
                </b-list-group-item>
            </b-list-group>
        </div>
    </transition>

</div>
</template>

<script>
export default {
    name: "RightSideMenu",
    data() {
        return {
            windowHeight: window.innerHeight,
            windowWidth: window.innerWidth,
            isActive: true,
            iconActive: false,
            right_sidemenu: [
                // [
                // {
                //     name: "Value of Awarded Tenders",
                //     selected: false,
                //     route: "trends"
                // },
                // {
                //     name: "Tenders Creation",
                //     selected: false,
                //     route: ""
                // },
                // {
                //     name: "e-Procurement:Budget",
                //     selected: false,
                //     route: ""
                // },
                // {
                //     name: "Average Tender Premium",
                //     selected: false,
                //     route: ""
                // },
                // {
                //     name: "Average Bids Per Tender",
                //     selected: false,
                //     route: ""
                // },
                // {
                //     name: "%Tendering within Timelines",
                //     selected: false,
                //     route: ""
                // },
                // {
                //     name: "Tender Volume : Dept Users",
                //     selected: false,
                //     route: ""
                // },
                // {
                //     name: "Count Of Registered Vendors",
                //     selected: false,
                //     route: ""
                // },
                // {
                //     name: "% Of MSME Bidders",
                //     selected: false,
                //     route: ""
                // }
                // ],
                [{
                        name: "Procuring Entity Onboarding",
                        selected: false,
                        route: "ProcuringEntityOnboarding"
                    },
                    {
                        name: "Department User Onboarding",
                        selected: false,
                        route: "DepartmentUserOnboarding"
                    },
                    {
                        name: "Vendor Onboarding",
                        selected: false,
                        route: "VendorOnboarding"
                    },
                    // {
                    //     name: "Module Wise Feedback",
                    //     selected: false,
                    //     route: "ModuleWiseFeedback"
                    // },
                    // {
                    //     name: "Portal Availability",
                    //     selected: false,
                    //     route: "PortalAvailability"
                    // }
                ],
                [{
                        name: "Tender Creation Report",
                        selected: false,
                        route: "tenderCreation"
                    },
                    {
                        name: "Tender Stage Analysis",
                        selected: false,
                        route: "tenderstageAnalysis"
                    },
                    {
                        name: "Delay Analysis",
                        selected: false,
                        route: "delayAnalysis"
                    }
                ],
                [
                    // {
                    //     name: "Tender Robustness Score",
                    //     selected: false,
                    //     route: "tenderRobustnessScore"
                    // },
                    // {
                    //     name: "Price Comparison Report",
                    //     selected: false,
                    //     route: "priceComparisonReport"
                    // },
                    {
                        name: "Bids Per Tender",
                        selected: false,
                        route: "bidsPerTender"
                    },
                    {
                        name: "Supplier Concentration",
                        selected: false,
                        route: "supplierConcentration"
                    },
                    {
                        name: "Technical Disqualification",
                        selected: false,
                        route: "technicalDisqualification"
                    },
                    {
                        name: "Bidder Flagging Report",
                        selected: false,
                        route: "bidderFlaggingReport"
                    },
                    {
                        name: "Negotiation Report",
                        selected: false,
                        route: "negotiationReport"
                    }
                ],
                [{
                        name: "Tender Outliers",
                        selected: false,
                        route: "tenderOutlierReport"
                    },
                    {
                        name: "Procuring Entity Outliers",
                        selected: false,
                        route: "procuringEntityOutliers"
                    },
                    {
                        name: "Bidder Outliers",
                        selected: false,
                        route: "bidderOutlierTab"
                    }
                ],
                [{
                    name: "Bidder Data Search",
                    selected: false,
                    route: "dataSearch"
                },
                {
                    name: "Event Diary Report",
                    selected: false,
                    route: "eventDiaryReport"
                }],
            ],
        };
    },
    computed: {
        getsidemenu() {
            return this.setactive(this.$commonstore.getStore().right_sidemenu);
        }
    },
    methods: {
        toggleclose() {
            if (this.$commonstore.getStore().isActive)
                this.$commonstore.setStore('isActive', false)
            else
                this.$commonstore.setStore('isActive', true)
        },

        iconclose() {
            this.iconActive = !this.iconActive
        },
        setactive(i) {
            this.$commonstore.setStore('right_sidemenu', i)

            this.right_sidemenu[this.$commonstore.getStore().sidemenu].map(function (val) {
                val.selected = false;
            });
            this.right_sidemenu[this.$commonstore.getStore().sidemenu][i].selected = true;
            this.$router.push(this.right_sidemenu[this.$commonstore.getStore().sidemenu][i].route);
        },
        get_clicked_menu() {
            return this.right_sidemenu[this.$commonstore.getStore().sidemenu];
        },
        getroute_status(i) {
            if (this.right_sidemenu[this.$commonstore.getStore().sidemenu][i].route != '') {
                return false;
            } else {
                return true;
            }
        },
        onResize() {
            this.windowHeight = window.innerHeight;
            this.windowWidth = window.innerWidth;
            this.$commonstore.setStore('windowWidth', this.windowWidth);
        }
    },
    mounted() {
        this.windowWidth = window.innerWidth;
        this.$commonstore.setStore('windowWidth', this.windowWidth);
        this.$store.$subscribe(() => {
            if (this.$store.Commondata != "") {
                this.setactive(this.$commonstore.getStore().right_sidemenu);
            }
        })
        this.$nextTick(() => {
            window.addEventListener('resize', this.onResize);
        })
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.onResize);
    }
};
</script>

<style lang="scss" scoped>
.rightmenu {
    position: relative;
    caret-color: transparent;

    .list-group {
        // border-radius: 12px !important;
        border: 1px solid var(--primary-border) !important;
        border-radius: 20px 0 0px 20px;
        overflow-x: hidden;
        // background-color: #fff !important;
    }

    .list-group-item {
        cursor: pointer;
        display: flex;
        align-items: flex-start;
        border: none !important;
        padding: 15px 20px !important;
        font-weight: 600;
        font-size: 14px;
        transition: all .2s ease-in-out;
        background: var(--primary-main);

        img {
            padding-right: 10px !important;
        }

    }

    .list-group-item span:hover {
        transform: scale(1.1);
    }

    .activetext {
        color: #000;
    }

    .disabletext {
        color: #9e9e9ed1;
    }

    .curvecss {
        position: absolute;
        width: 25px;
        left: -5px;
        height: 50px;
        background: var(--primary-bg);
        cursor: pointer;
        text-align: center;
        display: flex;
        justify-content: flex-end;
        padding-right: 8px;
        align-items: center;
        border-radius: 0 50px 50px 0;
        z-index: 99999;
        border-right: 1px solid rgba(189, 181, 255, 0.3882352941) !important;
        top: calc(50% - 25px);

        i {
            color: var(--primary-text);
        }
    }

    .curvecss2 {
        position: absolute;
        width: 45px;
        left: 6px;
        height: 45px;
        background: #5046af;
        cursor: pointer;
        text-align: center;
        display: flex;
        justify-content: flex-end;
        padding-right: 8px;
        align-items: center;
        border-radius: 50px 0px 0px 50px;
        z-index: 99999;
        border-right: 1px solid rgba(189, 181, 255, 0.3882352941) !important;
        top: calc(50% - -2px);

        i {
            color: #fff;
        }
    }

    .curvecsse::after {
        border: none;
        color: green !important;
    }

    .rotateiconright .fa-chevron-right {
        transform: rotate(-180deg);
        transition: all 0.5s ease;
    }

    .rotateiconleft .fa-chevron-right {
        transform: rotate(-360deg);
        transition: all 0.5s ease;
    }
}

.ham {
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition: transform 400ms;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.hamRotate.active {
    transform: rotate(45deg);
}

.hamRotate180.active {
    transform: rotate(180deg);
}

.line {
    fill: none;
    transition: stroke-dasharray 400ms, stroke-dashoffset 400ms;
    stroke: #fff;
    stroke-width: 5.5;
    stroke-linecap: round;
}

.ham8 .top {
    stroke-dasharray: 40 160;
}

.ham8 .middle {
    stroke-dasharray: 40 142;
    transform-origin: 50%;
    transition: transform 400ms;
}

.ham8 .bottom {
    stroke-dasharray: 40 85;
    transform-origin: 50%;
    transition: transform 400ms, stroke-dashoffset 400ms;
}

.ham8.active .top {
    stroke-dashoffset: -64px;
}

.ham8.active .middle {
    //stroke-dashoffset: -20px;
    transform: rotate(90deg);
}

.ham8.active .bottom {
    stroke-dashoffset: -64px;
}

.nested-enter-active,
.nested-leave-active {
    transition: all 0.3s ease-in-out;
}

/* delay leave of parent element */
.nested-leave-active {
    transition-delay: 0.25s;
}

.nested-enter-from,
.nested-leave-to {
    transform: translateX(30px);
    opacity: 0;
}
</style>

<template>
<div class="footers">
    <b-row v-if="!isLoginPage" class="align-items-end py-1 loginPage m-0">
        <b-col xl="4" lg="4" md="4" class="text-left">
            <p class="mb-0 f-12 pl-3 txt-clr">{{bestSiteView}}</p>
        </b-col>
        <b-col xl="4" lg="4" md="4" class="text-center">
            <p class="mb-0 f-12 pl-3 txt-clr">{{version}}</p>
        </b-col>
        <b-col xl="4" lg="4" md="4" class="text-right">
            <p class="mb-0 f-13 pr-2 txt-clr">Developed & Maintained by</p>
            <img src="@/assets/images/niclogo.svg">
        </b-col>
    </b-row>
    <b-row v-else class="align-items-end pt-2 pb-1 pl-2 pr-0 m-0 welcomePage">
        <b-col xl="5" lg="5" md="5" class="text-left d-flex px-0">
            <p class="mb-0 f-13 pr-2 txt-clr">Developed & <br> Maintained by</p>
            <img src="@/assets/images/niclogo.svg">
        </b-col>
        <b-col xl="7" lg="7" md="7" class="text-left">
            <p class="mb-0 f-12 pl-3 txt-clr">{{version}}</p>
        </b-col>
    </b-row>
</div>
</template>

<script>
import axios from "axios";
import {
    $global
} from '@/main.js'
export default {
    name: 'FooterLogo',
    props: {
        isLoginPage: {}
    },
    data() {
        return {
            bestSiteView: '',
            version: ''
        }
    },
    methods: {
        portalTitle() {
            axios.get($global.$getApplicationHeadersAndBestView).then(res => {
                if (res.data) {
                    this.$commonstore.setStore('portalName', res.data.objectOne);
                    this.$commonstore.setStore('portalSubName', res.data.objectTwo);
                    this.$commonstore.setStore('bestSiteView', res.data.objectThree);
                    this.$commonstore.setStore('version', res.data.objectFour);
                    this.bestSiteView = this.$commonstore.getStore().bestSiteView;
                    this.version = this.$commonstore.getStore().version;
                    this.$emit('portalTitle', res.data)
                }
            })
        }
    },
    mounted() {
        this.portalTitle();
    }
}
</script>

<style lang="scss">
.footers {

    .welcomePage {
        background: var(--primary-degree);

        img {
            height: auto;
            width: 112px;
            padding-right: 1rem !important;
        }

        p {
            font-weight: bold;
            font-size: 12px !important;
            line-height: 1.15;
        }
    }

    .loginPage {
        background: #fff !important;

        img {
            padding: 5px 0px;
            height: auto;
            width: 163px;
            padding-right: 1rem !important;
        }

        p {
            color: #242526;
            font-weight: bold;
            font-size: 14px;
        }
    }
}
</style>

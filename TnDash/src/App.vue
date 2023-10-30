<template>
<div id="app">
    <div>
        <router-view />
        <PageLoader v-if="getloadeddatas"></PageLoader>
    </div>
</div>
</template>

<script>
import PageLoader from '@/components/common/PageLoader';
import {
    useCommonStore
} from '@/stores/store';
import {
    getCurrentInstance
} from 'vue'

export default {

    name: 'App',
    components: {
        PageLoader
    },
    data() {
        return {
            showPageLoader: false,
        };
    },
    computed: {
        getloadeddatas() {
            return this.$commonstore.getStore().pageloading
        }
    },
    methods: {
        assignCommonStore() {
            const $global = getCurrentInstance().appContext.config.globalProperties;
            $global.$store = useCommonStore();
            $global.$commonstore = this.service;
        },
    

    },
    created() {

        this.assignCommonStore()
        this.service.intercept();
      
    },
}
</script>

<style>
@import '../node_modules/@fontsource/roboto/index.css';

#app {
    font-family: 'Roboto' !important;
    max-width: 1920px;
    margin: 0 auto;
}
</style>

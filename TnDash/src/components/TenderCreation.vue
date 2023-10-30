<template>
<div class="chartFilters">
    <ContentHeader ref="contentHeader" @landingYearChangeParent="landingYearChange" @landingMonthChangeParent='landingMonthChange' :isFinanceYearRange='true' @selectedYearParent="selectedYear" title='Tender Creation Report' :isCumOrgToggle='false' :isYearWiseFilter='true' :isFromYear='tabIndex == 0 ? true : false' :isMonthWiseFilter="tabIndex == 1 ? true : false"> </ContentHeader>
    <div class="mx-4 maintabs">
        <b-tabs v-model="tabIndex" active-nav-item-class="font-weight-bold text-uppercase text-danger" active-tab-class="font-weight-bold" content-class="mt-3">
            <b-tab title="Trends" active>
                <TenderCumulative v-if="isTenderCreationPage" ref="tenderCreationPage" />
            </b-tab>
            <b-tab title="Tender Creation Summary">
                <SummaryTabs v-if="summaryTabsRefs" ref="summaryTabsRefs" />
            </b-tab>
            <b-tab title="Departments">
                <div class="row m-0 w-100 mb-4">
                    <TenderDepartment v-if="isTenderDeptPage" :toYear='toYear' ref="isTenderDeptPage" />
                </div>
            </b-tab>
        </b-tabs>
    </div>

</div>
</template>

<script>
import ContentHeader from "./common/ContentHeader";
import SummaryTabs from "./TenderCreationSummary";
import TenderCumulative from "./TenderCumulative";
import TenderDepartment from "./TenderDepartment";
import CommonJS from "@/assets/js/common.js";

export default {
    name: "TenderCreation",
    components: {
        ContentHeader,
        TenderCumulative,
        TenderDepartment,
        SummaryTabs
    },
    mixins: [CommonJS],

    data() {
        return {
            CumulativeFlag: true,
            orgWiseFlag: '',
            fromYear: '',
            toYear: '',
            cardArrary: [],
            isTenderCreationPage: true,
            isTenderDeptPage: true,
            summaryTabsRefs: true,
            tabIndex: null,
            selectedYearMonth: '',
        };
    },
    watch: {
        tabIndex(newValue, oldValue) {
            if(newValue == 0 && oldValue != null){
                this.$root.$emit("setinitialPage",'tabchange');
            }
        }
    },
    methods: {
        landingYearChange(fromYear, toYear, month, monthdata) {
            this.fromYear = fromYear;
            this.toYear = toYear;
            this.month = month;
            this.$nextTick(() => {
                let self = this
                self.$refs.summaryTabsRefs.changeChart(toYear, toYear, month, monthdata); //first
                self.$refs.tenderCreationPage.changeChart(fromYear, toYear + 1); //second
                self.$refs.isTenderDeptPage.changeChart(toYear + 1); //third
            });
        },
        landingMonthChange(fromYear, toYear, month, monthdata) {
            this.$nextTick(() => {
                let self = this
                self.$refs.summaryTabsRefs.changeChart(fromYear, toYear, month, monthdata);
                self.$refs.tenderCreationPage.changeChart(fromYear, toYear+1); //second
                self.$refs.isTenderDeptPage.changeChart(toYear+1); //third
            });
        }
    },
    created() {
    }
};
</script>

<style lang="scss" scoped>

</style>

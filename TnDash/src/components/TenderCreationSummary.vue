<template>
<div class="row m-0 w-100 mb-4">
    <BoxCard chartTitle="Tender Creation Summary" @popupModalOpenParent="chartmodalPopup('TenderCreationSummary', 'Tender Creation Summary')" :financialYear="true" :selectedYearMonth='selectedYearMonth' :isFromYear='false' :isMoreInsight='true'>
        <template v-slot:chartContent>
            <b-row class="m-0" style="padding-top:15px">
                <b-col v-for="(x, index) in cardArrary" :key="index" xl="6" lg="6" md="12" sm="12" class="mb-3">
                    <b-card no-body class="overflow-hidden m-auto w-75 h-auto modal-content" style="border-radius: 22px;" :style="(x.secondLong < 0) ? 'border: 1px solid #ff6464' : 'border: 1px solid rgb(41, 203, 151)'">
                        <b-row no-gutters>
                            <b-col lg="12" md="12" sm="12" class="text-center m-auto">
                                <b-card-body class="text-center p-3">
                                    <h3 class="mb-2" :style="(x.secondLong < 0) ? 'color:#ff6464' : 'color:rgb(41, 203, 151)'">{{x.secondLong}}%
                                        <sup><i class="fa" :class="(x.secondLong < 0) ? 'fa-arrow-down' : 'fa-arrow-up'" style="font-size:16px; color:#ff6464" :style="(x.secondLong < 0) ? 'color:#ff6464' : 'color:rgb(41, 203, 151)'" aria-hidden="true"></i></sup>
                                    </h3>
                                    <p class="txt-clr f-17 mb-0">{{x.firstString}}</p>
                                </b-card-body>
                            </b-col>
                        </b-row>
                    </b-card>
                </b-col>
            </b-row>
            <b-row class="m-0" style="padding-top:15px">
                <b-col v-for="(x, index) in cardArrary2" :key="index" xl="6" lg="6" md="12" sm="12" class="mb-3">
                    <b-card no-body class="overflow-hidden m-auto w-75 h-auto modal-content" style="border-radius: 22px; border: 1px solid rgb(255, 100, 100)">
                        <b-row no-gutters>
                            <b-col lg="12" md="12" sm="12" class="text-center m-auto">
                                <b-card-body class="text-center p-3">
                                    <h3 class="mb-2" style="color:rgb(255, 100, 100)">{{x.secondLong}}%
                                    </h3>
                                    <p class="txt-clr f-17 mb-0">{{x.firstString}}</p>
                                </b-card-body>
                            </b-col>
                        </b-row>
                    </b-card>
                </b-col>
            </b-row>
            <div class="notes">
                <p :style="this.$commonstore.getStore().themetype ? 'color:#5046af' : 'color:#fff'">Notes: NA indidcates 0 tenders were recorded in the baseline period</p>
            </div>
        </template>
    </BoxCard>
</div>

<b-modal id="modal-xl" size="xl" ref="modal-xl" no-close-on-backdrop hide-footer hide-header>
    <ChartsModel ref="chartsModel" :chartModalPopupTitle='chartModalPopupTitle' isYQMBtn='Month' :isYMQtoggel='false' :isMonthArrayList='true' @modelButtonChange="modelButtonChange" @modelYearChangeParent="modelYearChange" @applyfilter_data="getfilterdata" @popupModalCloseParent="popupModalClose" :isFinanceYearRange='true' :selectedYearMonth='modalSelectedYearMonth' pageName="TenderCreationSummary">
        <template v-slot:chartContent>
            <div>
                <b-row class="m-0" style="padding-top:15px">
                    <b-col v-for="(x, index) in modalCardArrary" :key="index" xl="6" lg="6" md="6" sm="6" class="mb-3">
                        <b-card no-body class="overflow-hidden m-auto w-75 h-auto modal-content" style="border-radius: 22px;" :style="(x.secondLong < 0) ? 'border: 1px solid #ff6464' : 'border: 1px solid rgb(41, 203, 151)'">
                            <b-row no-gutters>
                                <b-col lg="12" md="12" sm="12" class="text-center m-auto">
                                    <b-card-body class="text-center p-3">
                                        <h3 class="mb-2" :style="(x.secondLong < 0) ? 'color:#ff6464' : 'color:rgb(41, 203, 151)'">{{x.secondLong}}%
                                            <sup><i class="fa" :class="(x.secondLong < 0) ? 'fa-arrow-down' : 'fa-arrow-up'" style="font-size:16px; color:#ff6464" :style="(x.secondLong < 0) ? 'color:#ff6464' : 'color:rgb(41, 203, 151)'" aria-hidden="true"></i></sup>
                                        </h3>
                                        <p class="txt-clr f-15 mb-0">{{x.firstString}}</p>
                                    </b-card-body>
                                </b-col>
                            </b-row>
                        </b-card>
                    </b-col>
                </b-row>
                <b-row class="m-0" style="padding-top:15px">
                    <b-col v-for="(x, index) in modalCardArrary2" :key="index" xl="6" lg="6" md="6" sm="6" class="mb-3">
                        <b-card no-body class="overflow-hidden m-auto w-75 h-auto modal-content" style="border-radius: 22px; border: 1px solid rgb(80, 70, 175)">
                            <b-row no-gutters>
                                <b-col lg="12" md="12" sm="12" class="text-center m-auto">
                                    <b-card-body class="text-center p-3">
                                        <h3 class="mb-2" style="color:rgb(80, 70, 175)">{{x.secondLong}}%
                                        </h3>
                                        <p class="txt-clr f-15 mb-0">{{x.firstString}}</p>
                                    </b-card-body>
                                </b-col>
                            </b-row>
                        </b-card>
                    </b-col>
                </b-row>
            </div>
            <div v-if="!tableList" class="commontable mt-3">
                <b-table-simple bordered="true" small caption-top responsive table-class="mb-2">
                    <b-thead>
                        <b-tr>
                            <b-th v-for="(subdata,si) in subHead" :key="si">{{subdata}}</b-th>
                        </b-tr>
                    </b-thead>
                    <b-tbody>
                        <b-tr v-if="tdListModelLen">
                            <b-td class='text-center' colspan="12"> No Records Found</b-td>
                        </b-tr>
                        <b-tr v-else v-for="(orgValue, orgName, index) in tdListModel" :key="index">
                            <b-td class='text-center'> {{index + 1}}</b-td>
                            <b-td class='text-left'>{{orgName}}</b-td>
                            <template v-for="(data,index1) in orgValue" :key="index1">
                                <b-td class='text-right'>
                                    {{data.thirdLong}}
                                </b-td>
                            </template>
                        </b-tr>
                    </b-tbody>
                </b-table-simple>
            </div>
        </template>
    </ChartsModel>
</b-modal>
</template>

<script>
import BoxCard from "./common/BoxCard";
import ChartsModel from "./common/ChartsModel";
import CommonJS from "@/assets/js/common.js";
export default {
    name: "SnapshotTrends",
    components: {
        BoxCard,
        ChartsModel
    },
    props: [],
    mixins: [CommonJS],
    data() {
        return {
            buttonLineFlag: 'true',
            modelfinyearSelect: [],
            modelcolumnLineChartKey: 1,
            modelfromYear: '',
            modeltoYear: '',
            barChartKey: 1,
            fromYear: '',
            toYear: '',
            finyearSelect: [],
            tBtn: "1",
            selectedYearMonth: '',
            modalSelectedYearMonth: '',
            filter_formYear: '',
            filter_toYear: '',
            filter_highValueTender: 'false',
            filter_orgList: [],
            filter_tenderType: '',
            filter_type: '',
            filter_monthInt: '',
            chartmodalPopupName: '',
            chartModalPopupTitle: '',
            cardArrary: [],
            cardArrary2: [],
            modalCardArrary: [],
            modalCardArrary2: [],
            month: '1',
            modalMonth: '4',
            tdListModel: [],
            subHead: [],
            tdListModelLen: false,
            tableList: false
          
        };
    },
    methods: {
        financeYear_select(yearNO) {
            var today = new Date();
            var cur_yr = today.getFullYear();
            var mm = today.getMonth() + 1;
            var fin_yr = (mm < 4) ? cur_yr - 1 : cur_yr;
            for (var i = yearNO; i > 0; i--) {
                var year = (fin_yr + 1 - i).toString().substr(-2);
                var obj = {
                    text: fin_yr - i + '-' + (year),
                    value: fin_yr - i
                }
                this.finyearSelect.push(obj)
            }
            this.fromYear = this.finyearSelect[0].value
            this.toYear = this.finyearSelect[this.finyearSelect.length - 1].value
        },
        modelfinanceYear_select(yearNO) {
            this.modelfinyearSelect = [];
            var today = new Date();
            var cur_yr = today.getFullYear();
            var mm = today.getMonth() + 1;
            var fin_yr = (mm < 4) ? cur_yr : cur_yr + 1;
            for (var i = yearNO; i > 0; i--) {
                var year = (fin_yr + 1 - i).toString().substr(-2);
                var obj = {
                    text: fin_yr - i + '-' + (year),
                    value: fin_yr - i
                }
                this.modelfinyearSelect.push(obj)
            }
            this.modelfromYear = this.modelfinyearSelect[0].value
            this.modeltoYear = this.modelfinyearSelect[this.modelfinyearSelect.length - 1].value - 1;
        },
        getfilterdata(data) {
            this.filter_formYear = data.fromYear;
            this.filter_toYear = data.secondLong;
            this.filter_highValueTender = data.high_val_tender;
            this.filter_orgList = data.procuringList;
            this.filter_tenderType = data.tender_type;
            this.filter_type = data.type;
            this.filter_monthInt = data.thirdLong;
            this.modalTenderCreationSummary(this.filter_formYear, this.filter_toYear, this.filter_monthInt);
        },
        chartmodalPopup(chartName, chartTitle) {
            this.chartmodalPopupName = chartName;
            this.chartModalPopupTitle = chartTitle;
            // this.modelfinanceYear_select(10);
            this.reset_data();
            this.resetfilterData();
            this.$refs['modal-xl'].show();
            // this.modalTenderCreationSummary();
        },
        popupModalClose() {
            this.reset_data();
            this.resetfilterData();
            this.$refs['modal-xl'].hide();
            this.$refs.chartsModel.resetfilter();
            this.modalSelectedYearMonth = '';
        },
        reset_data() {},
        resetfilterData() {
            this.filter_formYear = '',
                this.filter_toYear = '',
                this.filter_highValueTender = 'false',
                this.filter_orgList = [],
                this.filter_tenderType = '',
                this.filter_type = '',
                this.filter_monthInt = ''
        },
        changeChart(fromYear, toYear, month,monthdata) {
            this.tenderCreationSummary(fromYear, toYear, month,monthdata);
        },
        tenderCreationSummary(fromYear, toYear, month,monthdata) {
            if (fromYear || toYear) {
                this.fromYear = fromYear;
                this.toYear = toYear;
            }
            if (month) {
                this.month = month;
            }
            let montharr = [1, 2, 3];
            let secondLong = '';
            if (montharr.includes(month)) {
                secondLong = this.toYear + 1;
            } else {
                secondLong = this.toYear;
            }
            var formData = { //this.$commonstore.userId,
                firstLong: this.$commonstore.getStore().userId,
                secondLong: secondLong,//this.toYear,
                thirdLong: this.month,
                firstList: this.$commonstore.getStore().orgList
            };
            this.selectedYearMonth = monthdata;
            // this.selectedYearMonth = (('Year : ' + (this.monthArray.find(y => y.value == this.month).text)) + ' - ' + (this.toYear - 1) + ' & ' + ((this.monthArray.find(y => y.value == this.month).text) + ' - ' + (this.toYear)));
            this.$commonstore.setStore('pageloading', true);
            this.service.post(this.$tenderCreationSummary, formData).then(res => {
                if (res.objectOne) {
                    var obj = res.objectOne
                    var obj2 = res.objectTwo
                    this.cardArrary = obj;
                    this.cardArrary2 = obj2;
                    this.$commonstore.setStore('pageloading', false);
                }
            })
        },
        modalTenderCreationSummary(fromYear, toYear, month) {
            if (fromYear || toYear) {
                this.modelfromYear = fromYear;
                this.modeltoYear = toYear;
            }
            if (month) {
                this.modalMonth = month;
            }
            var formData = {
                firstLong: this.$commonstore.getStore().userId,
                secondLong: this.modeltoYear,
                thirdLong: this.modalMonth,
                firstString: null,
                secondString: this.filter_tenderType,
                firstList: this.$commonstore.getStore().selectAllOrgList ? this.filter_orgList : this.$commonstore.getStore().orgList,
                firstBooleanValue: this.filter_highValueTender
            };
            // this.modalSelectedYearMonth = ((this.monthArray.find(y => y.value == this.modalMonth).text) + ' - ' + (this.modeltoYear - 1) + ' & ' + ((this.monthArray.find(y => y.value == this.modalMonth).text) + ' - ' + (this.modeltoYear)));
            this.modalSelectedYearMonth = ( '('+(this.modeltoYear - 1) +'-'+ (this.modeltoYear.toString().substr(-2))+')'+' & ' + '('+(this.modeltoYear)+' -'+(this.modeltoYear+1).toString().substr(-2))+ ')';
            this.$commonstore.setStore('pageloading', true);
            this.service.post(this.$tenderCreationSummaryMore, formData).then(res => {
                var obj = res.objectOne
                var obj2 = res.objectTwo
                var obj3 = res.objectThree;
                this.modalCardArrary = obj;
                this.modalCardArrary2 = obj2;
                this.tableList = (Object.keys(formData.firstList).length == 0);
                this.tdListModel = obj3;
                this.tdListModelLen = (Object.keys(this.tdListModel).length == 0);
                this.subHead = ['S.No', 'Organization List', 'Year on Year increase in Published Tender Count for the Month', 'Year on year increase in published tender value for the month', 'Tenders with date corrigendum created in the month', 'Tenders Retendered or Cancelled in the month']
                // this.$refs['modal-xl'].show();
                this.$commonstore.setStore('pageloading', false);
            })
        },
        loadMonthList() {
            this.monthArray = [{
                value: 4,
                text: 'APR'
            }, {
                value: 5,
                text: 'MAY'
            }, {
                value: 6,
                text: 'JUN'
            }, {
                value: 7,
                text: 'JUL'
            }, {
                value: 8,
                text: 'AUG'
            }, {
                value: 9,
                text: 'SEP'
            }, {
                value: 10,
                text: 'OCT'
            }, {
                value: 11,
                text: 'NOV'
            }, {
                value: 12,
                text: 'DEC'
            }, {
                value: 1,
                text: 'JAN'
            }, {
                value: 2,
                text: 'FEB'
            }, {
                value: 3,
                text: 'MAR'
            }]
        
            this.month = this.monthArray[0].value;
            this.monthTxt = this.monthArray[0].text;
        },
    },
    created() {
       // this.financeYear_select(5);
        this.loadMonthList();
       // this.tenderCreationSummary()
    }
};
</script>

<style lang="scss" scoped>
select {
    border: none;
}

select:focus-visible {
    outline: none !important;
}
</style>

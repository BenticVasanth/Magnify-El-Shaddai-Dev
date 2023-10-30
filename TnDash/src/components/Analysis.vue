<template>
<BoxCard :cardxl='12' @popupModalOpenParent="chartmodalPopup" class="mb-4" :chartTitle="chart_title" :financialYear="true" :isFinanceYearRange='false' :selectedYearMonth="selectedYearMonth" :isMoreInsight='true' :csvbutton='true' @downloadcsvparent="XLExport_custom('table1',chart_title)" notes='For the time period selected, this report shows those tenders that were published and whose bid validity has expired'>
    <template v-slot:chartContent>
        <div class="commontable commontable_total">
            <b-table-simple bordered="true" hover caption-top responsive ref="myTable" id="table1" table-class="mb-2">
                <b-thead>
                    <b-tr>
                        <b-th>S.No</b-th>
                        <b-th>Tender Flow</b-th>
                        <b-th>Tenders Count</b-th>
                        <b-th>Tenders Estimate Value (₹ lakhs)</b-th>
                    </b-tr>
                </b-thead>
                <b-tbody>
                    <b-tr v-for="(tdData,index) in tdList" :key="index">
                        <b-td class='text-center' v-if="index != 0"> {{index}}</b-td>
                        <b-td v-if="index == 0" colspan="2" class='text-center'>{{tdData.title}}</b-td>
                        <b-td v-if="index != 0">{{tdData.title}}</b-td>
                        <b-td class='text-right'>{{tdData.q1}}</b-td>
                        <b-td class='text-right'>{{tdData.q2}}</b-td>
                    </b-tr>
                </b-tbody>
            </b-table-simple>
        </div>
    </template>
</BoxCard>

<b-modal id="modal-xl" size="xl" ref="modal-xl" hide-footer hide-header no-close-on-backdrop>
    <ChartsModel ref="chartsModel" @modelButtonChange="modelButtonChange" @modelYearChangeParent="modelYearChange" @applyfilter_data="getfilterdata" @popupModalCloseParent="popupModalClose" chartModalPopupTitle="" isMonthArrayList="true" isQuarterArrayList="true" iscontractList="true" isFinanceYearRange="true" :highValueTender='true'>
        <template v-slot:chartContent>
            <div class="d-flex justify-content-between">
                <p :class="this.$commonstore.getStore().themetype ? 'primary-clr' : 'txt-clr'" class="card_title">{{chart_modal_title[0]}}</p>
                <span class="toggleBtn f-10 ml-1 curPnt csvbtn" v-if="tdListModel.length != 0" style="align-self: baseline;
" @click="XLExport_custom('table2modal',chart_modal_title[0])"  title="Export Excel"> <span>Excel<i class="fa fa-file-excel-o pl-2" aria-hidden="true"></i></span>
                </span>

            </div>

            <!-- Modat table 1-->
            <div class="commontable commontable_total">
                <b-table-simple bordered="true" hover small caption-top responsive id="table2modal" table-class="mb-2">

                    <b-thead>
                        <b-tr>
                            <b-th rowspan="2" colspan="1">S.No</b-th>
                            <b-th rowspan="2" colspan="1">Name</b-th>
                            <b-th :colspan="orgnamecount.length">Value Wise</b-th>
                            <b-th :colspan="orgnamecount.length">Count Wise</b-th>

                        </b-tr>
                        <b-tr v-if="tdListModel.length != 0">
                            <b-th v-for="(subdata,si) in subHead" :key="si">{{subdata}}</b-th>
                        </b-tr>
                    </b-thead>

                    <b-tbody>

                        <b-tr v-for="(tdData,index) in tdListModel" :key="index">

                            <b-td class='text-center' v-if="index != 0 "> {{index}}</b-td>
                            <template v-for="(data,index1) in tdData" :key="index1">
                                <b-td class='text-center' v-if="index1 == 0 && data.stringValue == 'Total Tenders'" colspan="2">Total Unique Tenders</b-td>
                                <b-td class='text-left' v-if="index1 == 0 && data.stringValue != 'Total Tenders'">{{data.stringValue }}</b-td>
                                <b-td class='text-right table-bg2'>{{priceFormat(data.firstDoubleValue)}}<br>{{show_formatted_values(data,data.firstDoubleValue,'firstDoubleValue')}}</b-td>
                            </template>

                            <template v-for="(data,index1) in tdData" :key="index1">
                                <b-td class='text-right table-bg1'>{{priceFormat(data.secondLongValue)}}<br>{{show_formatted_values(data,data.secondLongValue,'secondLongValue')}}</b-td>
                            </template>
                        </b-tr>

                        <b-tr v-if="tdListModel.length == 0">
                            <b-td class='text-center txt-clr' colspan="12" v-if="modaltable1">Loading</b-td>
                            <b-td class='text-center txt-clr' colspan="12" v-if="!modaltable1">No Records Found</b-td>
                        </b-tr>
                    </b-tbody>
                </b-table-simple>
            </div>
            <div class="commontable commontable_total">

                <b-row>
                    <b-col xl="6" lg="6" md="6">
                        <p :class="this.$commonstore.getStore().themetype ? 'primary-clr' : 'txt-clr'" class="card_title">{{chart_modal_title[1]}}</p>
                        <!-- Modat table 2-->
                        <b-table-simple bordered="true" hover small caption-top responsive table-class="mb-2">
                            <b-thead>
                                <b-tr>
                                    <b-th>S.No</b-th>
                                    <b-th>Name</b-th>
                                    <b-th>Count</b-th>
                                    <b-th>Tender Value (₹ lakhs)</b-th>
                                </b-tr>
                            </b-thead>
                            <b-tbody>
                                <b-tr v-for="(tdData,index) in reasonCancel" :key="index">
                                    <b-td class='text-center' v-if="index != 0"> {{index}}</b-td>
                                    <b-td v-if="index == 0" colspan="2" class='text-center'>{{tdData.stringValue}}</b-td>
                                    <b-td v-if="index != 0">{{tdData.stringValue}}</b-td>
                                    <b-td class='text-right'>{{tdData.doubleValue}}<span v-if="index != 0">%</span></b-td>
                                    <b-td class='text-right'>{{tdData.anotherDoubleValue}}<span v-if="index != 0">%</span></b-td>
                                </b-tr>
                                <b-tr v-if="reasonCancel.length == 0">
                                    <b-td class='text-center txt-clr' colspan="12" v-if="modaltable2">Loading</b-td>
                                    <b-td class='text-center txt-clr' colspan="12" v-if="!modaltable2">No Records Found</b-td>
                                </b-tr>
                            </b-tbody>

                        </b-table-simple>
                    </b-col>
                    <b-col xl="6" lg="6" md="6">
                        <p :class="this.$commonstore.getStore().themetype ? 'primary-clr' : 'txt-clr'" class="card_title">{{chart_modal_title[2]}}</p>
                        <!-- Modat table 3-->
                        <b-table-simple bordered="true" hover small caption-top responsive table-class="mb-2">
                            <b-thead>
                                <b-tr>
                                    <b-th>S.No</b-th>
                                    <b-th>Name</b-th>
                                    <b-th>Count</b-th>
                                    <b-th>Tender Value (₹ lakhs)</b-th>
                                </b-tr>
                            </b-thead>
                            <b-tbody>
                                <b-tr v-for="(tdData,index) in reasonRetender" :key="index">
                                    <b-td class='text-center' v-if="index != 0"> {{index}}</b-td>
                                    <b-td v-if="index == 0" colspan="2" class='text-center'>{{tdData.stringValue}}</b-td>
                                    <b-td v-if="index != 0">{{tdData.stringValue}}</b-td>
                                    <b-td class='text-right'>{{tdData.doubleValue}}<span v-if="index != 0">%</span></b-td>
                                    <b-td class='text-right'>{{tdData.anotherDoubleValue}}<span v-if="index != 0">%</span></b-td>
                                </b-tr>
                                <b-tr v-if="reasonRetender.length == 0">
                                    <b-td class='text-center txt-clr' colspan="12" v-if="modaltable3">Loading</b-td>
                                    <b-td class='text-center txt-clr' colspan="12" v-if="!modaltable3">No Records Found</b-td>
                                </b-tr>
                            </b-tbody>
                        </b-table-simple>
                    </b-col>
                </b-row>
            </div>
        </template>
    </ChartsModel>
</b-modal>
</template>

<script>
import BoxCard from "./common/BoxCard";
import CommonJS from "@/assets/js/common.js";
import ChartsModel from "./common/ChartsModel";
export default {
    name: "TenderstageAnalysis",
    components: {
        BoxCard,
        ChartsModel
    },
    mixins: [CommonJS],
    data() {
        return {
            modelcolumnLineFinyearList: [],
            modelfromYear: '',
            modeltoYear: '',
            finyearSelect: [],
            tBtn: "1",
            noValueBtn: '1',
            yQMBtn: '',
            tenderAnalysisStageList: [],
            tenderCategoryList: [],
            tenderCountList: [],
            tenderValueList: [],
            CumulativeFlag: true,
            orgWiseFlag: '',
            fromYear: '',
            toYear: '',
            thList: [],
            tdList: [],
            thListModel: [],
            tdListModel: [],
            chart_title: '',
            subHead: [],
            isCloseModal: false,
            // filterselected_data: {},
            reasonCancel: [],
            reasonRetender: [],
            type: 'YEARWISE',
            tender_type: '',
            highValue_Tender: false,
            contract_type: '',
            chart_modal_title: ['Comparison across procuring entities with respective of tenders value', 'Reasons for Cancellation of tenders', 'Reasons for Retendering'],
            modaltable1: false,
            modaltable2: false,
            modaltable3: false,
            procuringList: [],
            orgnamecount: [],
            selectedYearMonth: '',
        };
    },
    watch: {
        noValueBtn(value) {
            this.focusMyElement(value)
        }
        // yQMBtn() {
        //     if (!this.isCloseModal)
        //         this.modelchangeChart()

        // }
    },
    methods: {

        modelButtonChange(value) {
            this.yQMBtn = value;
            // this.$refs.chartsModel.resetfilter();
        },
        changeChart(fromYear, toYear) {
            this.tenderProgres(fromYear, toYear);
        },
        modelchangeChart() {
            var optionsValue = this.yQMBtn == 'Year' ? 'YEARWISE' : '';
            optionsValue = this.yQMBtn == 'Month' ? 'MONTHWISE' : optionsValue;
            optionsValue = this.yQMBtn == 'Quarter' ? 'QUARTERWISE' : optionsValue;
            this.type = optionsValue;
            this.tender_type = '';
            this.highValue_Tender = false;
            this.contract_type = '';
            this.procuringList = [];
            if (optionsValue == 'YEARWISE') {
                this.modelfromYear = this.modelfinyearSelect[0].value;
                this.modeltoYear = this.modelfinyearSelect[this.modelfinyearSelect.length - 1].value;
            } else if (optionsValue == 'MONTHWISE') {
                this.modelfromYear = this.modelfinyearSelect[this.modelfinyearSelect.length - 1].value - 1;
                this.modeltoYear = 4;
            } else if (optionsValue == 'QUARTERWISE') {
                this.modelfromYear = this.modelfinyearSelect[this.modelfinyearSelect.length - 1].value - 1;
                this.modeltoYear = 4;
            }
            this.tenderProgresModel(this.modelfromYear, this.modeltoYear)
            this.tenderProgresReasonModel(this.modelfromYear, this.modeltoYear)
        },
        popupModalClose() {
            this.isCloseModal = true
            this.yQMBtn = '';
            this.$refs['modal-xl'].hide()
        },
        chartmodalPopup() {
            this.isCloseModal = false
            this.yQMBtn == '' ? this.yQMBtn = 'Year' : '';
            this.$refs['modal-xl'].show();
            //  this.modelcolumnLineFinyearList = [];
            // this.modelcolumnLineAwardedList = [];
            // this.modelcolumnLinePublishedList = [];
            // this.modelfinanceYear_select(10);
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
            this.modeltoYear = this.modelfinyearSelect[this.modelfinyearSelect.length - 1].value
        },
        get_percentage(totalvalue, value) {
            let percentage_val;
            percentage_val = ((value * 100) / totalvalue).toFixed(2);
            if (isNaN(percentage_val)) {
                return 0
            } else {
                return percentage_val

            }
        },
        show_formatted_values(data, value, type) {
            var totaltender_Count = this.tdListModel[0].find(e => e.anotherStringValue == data.anotherStringValue);
            if (type == 'secondLongValue') {
                return data.stringValue == 'Total Tenders' ? '' : '(' + this.get_percentage(totaltender_Count.secondLongValue, value) + '%)';
            } else if (type == 'firstDoubleValue') {
                return data.stringValue == 'Total Tenders' ? '' : '(' + this.get_percentage(totaltender_Count.firstDoubleValue, value) + '%)';

            }
        },
        tenderProgres(fromYear = '', toYear = '') {
            if (toYear) {
                this.fromYear = fromYear;
                this.toYear = toYear;
            }
            this.selectedYearMonth = 'Year : ' + (this.fromYear) + ' - ' + (this.toYear);
            let formData = {
                firstLong: this.$commonstore.getStore().userId,
                secondLong: this.fromYear,
                thirdLong: this.toYear,
                firstList: this.$commonstore.getStore().orgList
            };
            this.chart_title = `Tender Progress Funnel `

            this.atl1 = [];
            this.$commonstore.setStore('pageloading', true);
            this.service.post(this.$tenderStageAnalysis, formData).then(res => {
                if (res.objectOne) {
                    let list = res.objectOne;
                    this.atl = [];
                    let serialNum = 0;
                    list.filter((row) => {
                        if (row.tenderCategory == 'Total Tenders') {
                            this.totaltenderCount = row.tenderCount;
                            this.totaltenderValue = row.tenderValue;
                        }
                        let obj = {
                            serialNo: serialNum ? serialNum : '',
                            title: row.tenderCategory == 'Total Tenders' ? 'Total Unique Tenders' : row.tenderCategory,
                            q1: row.tenderCategory == 'Total Tenders' ? this.priceFormat(row.tenderCount) : this.priceFormat(row.tenderCount) + '  (' + this.get_percentage(this.totaltenderCount, row.tenderCount) + '%)',
                            q2: row.tenderCategory == 'Total Tenders' ? this.priceFormat(row.tenderValue) : this.priceFormat(row.tenderValue) + '  (' + this.get_percentage(this.totaltenderValue, row.tenderValue) + '%)'
                        }
                        this.atl.push(obj)
                        serialNum++;
                    })
                    this.tenderAnalysisStageList = this.atl;
                    this.tdList = this.atl;
                    this.thList = [{
                            key: 'index',
                            label: 'S.No',
                            class: 'text-center'
                        },
                        {
                            key: '',
                            sortable: false
                        },
                        {
                            key: '',
                            sortable: false
                        },
                        {
                            key: 'title',
                            label: '',
                            sortable: false,
                            class: 'text-left'

                        },
                        {
                            key: 'q1',
                            label: 'Tenders Count',
                            sortable: false,
                            class: 'text-right'

                        },
                        {
                            key: 'q2',
                            label: 'Tenders Estimate Value (₹ crore)',
                            sortable: false,
                            class: 'text-right'

                        }
                    ]
                    this.$commonstore.setStore('pageloading', false);
                }
            })
        },
        tenderProgresModel(fromYear = '', toYear = '') {
            let formData = {
                firstLong: this.$commonstore.getStore().userId,
                secondLong: fromYear,
                thirdLong: toYear,
                firstString: this.type,
                secondString: this.tender_type, //Goods/Services/Works
                thirdString: this.contract_type,
                firstList: this.$commonstore.getStore().selectAllOrgList ? this.procuringList : this.$commonstore.getStore().orgList,
                firstBooleanValue: this.highValue_Tender
            };
            this.atl1 = [];
            this.modaltable1 = true;
            this.$commonstore.setStore('pageloading', true);
            this.service.post(this.$tenderStageAnalysisMore, formData).then(res => {
                if (res.objectOne) {
                    const orgName = [...new Set(res.objectOne.map(item => item.anotherStringValue))];
                    this.orgnamecount = orgName;
                    this.subHead = orgName.concat(orgName);

                    let list = res.objectOne;
                    var obj = list.reduce(function (rv, x) {
                        (rv[x['stringValue']] = rv[x['stringValue']] || []).push(x);
                        return rv;
                    }, {});

                    this.tdListModel = Object.keys(obj).map(i => obj[i]);
                    this.modaltable1 = false;

                } else {
                    this.tdListModel = [];
                    this.modaltable1 = false;

                }
                if (this.procuringList.length == 0 && this.tdListModel[0]) {
                    this.chart_modal_title[0] = `Comparison across top ${this.tdListModel[0].length} procuring entities with respective of tenders value`
                } else {
                    this.chart_modal_title[0] = `Comparison across  procuring entities with respective of tenders value`
                }
                this.$commonstore.setStore('pageloading', false);
            })
            this.$refs['modal-xl'].show();
        },
        getfilterdata(datas) {
            this.type = datas.typewise;
            this.tender_type = datas.tender_type;
            this.contract_type = datas.contract_type;
            this.modelfromYear = datas.fromYear;
            this.modeltoYear = datas.toYear;
            this.procuringList = datas.procuringList;
            this.highValue_Tender = datas.high_val_tender;
            this.tenderProgresModel(datas.secondLong, datas.thirdLong);
            this.tenderProgresReasonModel(datas.secondLong, datas.thirdLong);
        },
        tenderProgresReasonModel(fromYear = '', toYear = '') {

            let formData = {
                firstLong: this.$commonstore.getStore().userId,
                secondLong: fromYear,
                thirdLong: toYear,
                firstString: this.type,
                secondString: this.tender_type,
                firstList: this.$commonstore.getStore().selectAllOrgList ? this.procuringList : this.$commonstore.getStore().orgList,
                firstBooleanValue: this.highValue_Tender
            };
            this.modaltable2, this.modaltable3 = true;
            this.$commonstore.setStore('pageloading', true);
            this.service.post(this.$reasonWiseAnalysis, formData).then(res => {
                this.reasonCancel = res.objectOne ? res.objectOne : []
                this.reasonRetender = res.objectTwo ? res.objectTwo : []
                this.modaltable2, this.modaltable3 = false;
            })
            this.$refs['modal-xl'].show();
            // this.$commonstore.setStore('pageloading', false);
        },
        XLExport_custom(tableId, filename = '') {
                var tab_text = "<table border='2px'><tr>";
            var j = 0;
            let tab = document.getElementById(tableId);
            for (j = 0; j < tab.rows.length; j++) {
                tab_text = tab_text + tab.rows[j].innerHTML + "</tr>";
            }
            tab_text=tab_text.replace('(₹ lakhs)', "(Lakhs in Rupees)");
            filename = filename ? filename + '.xls' : 'excel_data.xls';
            tab_text = tab_text + "</table>";

            var a = document.createElement('a');
            var data_type = 'data:application/vnd.ms-excel';
            "data:text/csv;charset=utf-8,"
            a.href = data_type + ', ' + encodeURIComponent(tab_text);
            a.download = filename;
            a.click();
           
        }
    },
    created() {
        // this.tenderProgres(this.fromYear, this.toYear);
        this.chart_title = `Tender Progress Funnel `
    }
};
</script>

<style lang="scss">

</style>

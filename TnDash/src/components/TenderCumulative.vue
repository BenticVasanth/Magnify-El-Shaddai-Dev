<template>
<div class="row m-0 w-100 mb-4">
    <BoxCard class="mb-4" ref="publishedTendersCountValue" :cardxl='6' @popupModalOpenParent="chartmodalPopup('ModalPublishedTenders', 'Published Tenders')" :financialYear="true" :fromYear="fromYear" :toYear="toYear" :isFinanceYearRange='false' chartTitle="Published Tenders" chartType='barPublishedTenders' :buttonLineFlag='buttonLineFlag' @focusMyElementParent="focusMyElement" :selectedYearMonth="selectedYearMonth" :isMoreInsight='true'>
        <template v-slot:chartContent>
            <Bar :singleColumn='false' :valueOrCount='publishedTendersValueOrCount' :barFinyearList='bar_data.barFinyearList' :map_series="bar_series" :colors="['#29cb97']" :height="250" :key="barChartKey1" :title="{'xAxis':'','yAxis':yAxistitle}"></Bar>
        </template>
    </BoxCard>
    <BoxCard class="mb-4" ref="dateCorrigendumCountValue" :cardxl='6' @popupModalOpenParent="chartmodalPopup('ModalDateCorrigendumTenders', 'Date Corrigendum Tenders')" chartTitle="Date Corrigendum Tenders" :financialYear="true" :fromYear="fromYear" :toYear="toYear" :isFinanceYearRange='false' chartType='barDateCorrigendum' :buttonLineFlag='buttonLineFlag' :selectedYearMonth="selectedYearMonth" :isMoreInsight='true' @focusMyElementParent="focusMyElement">
        <template v-slot:chartContent>
            <Bar :singleColumn='false' :valueOrCount='dateCorrigendumValueOrCount' :barFinyearList='bar_data.barDateCorrigendumYearList' :map_series="dateCorrigendum_bar_series" :colors="['#fad126']" :height="250" :key="barChartKey2" :title="{'xAxis':'','yAxis': yAxistitle}"></Bar>
        </template>
    </BoxCard>
</div>

<div class="row m-0 w-100 mb-4">
    <BoxCard class="mb-4" ref="cancelledRetenderCountValue" :cardxl='12' @popupModalOpenParent="chartmodalPopup('ModalCancelledRetender', 'Cancelled and Retendered')" chartTitle="Cancelled and Retendered" :financialYear="true" :fromYear="fromYear" :toYear="toYear" :isFinanceYearRange='false' chartType='CancelledRetender' :buttonLineFlag='buttonLineFlag' @focusMyElementParent="focusMyElement" :selectedYearMonth="selectedYearMonth" :isMoreInsight='true'>
        <template v-slot:chartContent>
            <Bar :singleColumn='false' :barFinyearList='bar_data.barYearList' :valueOrCount='cancelledRetenderValueOrCount' :map_series="cancelledRetender_bar_series" :colors="['#29cb97','#fad126']" :height="350" :key="barChartKey3" :title="{'xAxis':'','yAxis':yAxistitle}"></Bar>
        </template>
    </BoxCard>
</div>

<b-modal id="modal-xl" size="xl" ref="modal-xl" no-close-on-backdrop hide-footer hide-header>
    <ChartsModel ref="chartsModel" :chartModalPopupTitle='chartModalPopupTitle' :isFinanceYearRange='true' :isCountValueWiseBtn='true' @modelButtonChange="modelButtonChange" @applyfilter_data="getfilterdata" @popupModalCloseParent="popupModalClose" @CountValueBtnParent='CountValueBtn' :highValueTender="chartmodalPopupName == 'ModalDateCorrigendumTenders' ? false : true">
        <template v-slot:chartContent>
            <Bar v-if="chartmodalPopupName == 'ModalPublishedTenders'" :singleColumn='false' :barFinyearList='modalBar_data.modalBarFinyearList' :valueOrCount='modalPublishedTendersValueOrCount' :map_series="modalPublished_Bar_series" :colors="['#29cb97','#fad126']" :height="350" :key="barChartKey4" :title="{'xAxis':'','yAxis':modalYAxistitle}"></Bar>

            <Bar v-if="chartmodalPopupName == 'ModalDateCorrigendumTenders'" :singleColumn='false' :barFinyearList='modalBar_data.modalBarFinyearList' :map_series="modalDateCorrigendum_Bar_series" :valueOrCount='modalDateCorrigendumValueOrCount' :colors="['#29cb97','#fad126']" :height="350" :key="barChartKey4" :title="{'xAxis':'','yAxis':modalYAxistitle}"></Bar>

            <Bar v-if="chartmodalPopupName == 'ModalCancelledRetender'" :singleColumn='false' :barFinyearList='modalBar_data.modalBarFinyearList' :valueOrCount='modalCancelledRetenderValueOrCount' :map_series="modalCancelledRetendered_Bar_series" :colors="['#29cb97','#fad126']" :height="350" :key="barChartKey4" :title="{'xAxis':'','yAxis':modalYAxistitle}"></Bar>
        </template>
    </ChartsModel>
</b-modal>
</template>

<script>
/* eslint-disable */
import Bar from "./common/charts/bar";
import BoxCard from "./common/BoxCard";
import ChartsModel from "./common/ChartsModel";
import CommonJS from "@/assets/js/common.js";
export default {
    name: "SnapshotTrends",
    components: {
        BoxCard,
        Bar,
        ChartsModel
    },
    props: ['selectedFromYear', 'selectedToYear'],
    mixins: [CommonJS],
    data() {
        return {
            buttonLineFlag: 'true',
            modelbarChartHeight: '50%',
            modelbarChartColumn: '50%',
            modelbarFinyearList: [],
            modelbarPublishedList: [],
            modelbarAwardedList: [],
            modelbarChartKey: 1,
            modelcolumnLineChartHeight: '50%',
            modelcolumnLineChartColumn: '50%',
            modalXl: false,
            modelfinyearSelect: [],
            modelcolumnLineChartKey: 1,
            modelfromYear: '',
            modeltoYear: '',
            barChartKey1: 1,
            barChartKey2: 1,
            barChartKey3: 1,
            barChartKey4: 1,
            lineChartKey: 1,
            fromYear: '',
            toYear: '',
            finyearSelect: [],
            tBtn: "1",
            noValueBtn: 'countWise',
            yQMBtn: '',
            line_chartoptions_data: {},
            bar_chartoptions_data: {},
            bar_series: [],
            publishedTenders_bar_series: [],
            dateCorrigendum_bar_series: [],
            cancelledRetender_bar_series: [],
            modalPublished_Bar_series: [],
            modalDateCorrigendum_Bar_series: [],
            modalCancelledRetendered_Bar_series: [],
            yAxistitle: '',
            selectedYearMonth: '',
            valueOrCount: '',
            filter_formYear: '',
            filter_toYear: '',
            filter_highValueTender: false,
            filter_orgList: [],
            filter_tenderType: '',
            filter_type: '',
            chartmodalPopupName: '',
            chartModalPopupTitle: '',
            modalPublishedTendersValueOrCount: 'countWise',
            modalCancelledRetenderValueOrCount: 'countWise',
            modalDateCorrigendumValueOrCount: 'countWise',
            modalYAxistitle: '',
            bar_data: {
                barCancelledCount: [],
                barCancelledValue: [],
                barRetenderCount: [],
                barRetenderValue: [],
                barYearList: [],
                barFinyearList: [],
                barPublishedCount: [],
                barPublishedValue: [],
                barDateCorrigendumCount: [],
                barDateCorrigendumValue: [],
                barDateCorrigendumYearList: []
            }
        };
    },
    watch: {
        noValueBtn(value) {
            this.focusMyElement(value)
        }
    },
    methods: {
        modelButtonChange(value) {
            this.yQMBtn = value;
            this.$refs.chartsModel.resetfilter();
            this.resetfilterData();
        },

        //LineChart Button Change 
        focusMyElement(value, chartType) {
            this.valueOrCount = '';
            if (chartType == 'CancelledRetender') {
                this.bar_data['barCancelledlist'] = (value == 'countWise') ? this.bar_data.barCancelledCount : this.bar_data.barCancelledValue;
                this.bar_data['barRetenderlist'] = (value == 'countWise') ? this.bar_data.barRetenderCount : this.bar_data.barRetenderValue;
                this.yAxistitle = (value == 'countWise') ? 'No. of Tenders' : 'Value of Tenders (₹ lakhs)';
                this.cancelledRetenderValueOrCount = value;
                this.cancelledRetender_bar_series = [{
                        name: 'Cancelled',
                        data: this.bar_data.barCancelledlist
                    },
                    {
                        name: 'Retender',
                        data: this.bar_data.barRetenderlist
                    }
                ];
                this.barChartKey3 = this.barChartKey3 + 1;
            }
            if (chartType == 'barPublishedTenders') {
                this.bar_data['barPublishedTendersList'] = (value == 'countWise') ? this.bar_data.barPublishedCount : this.bar_data.barPublishedValue;
                this.yAxistitle = (value == 'countWise') ? 'No. of Tenders' : 'Value of Tenders (₹ lakhs)';
                this.publishedTendersValueOrCount = value;
                this.bar_series = [{
                    name: (value == 'countWise') ? 'Published Count' : 'Published Value',
                    data: this.bar_data.barPublishedTendersList
                }];
                this.barChartKey1 = this.barChartKey1 + 1;
            }
            if (chartType == 'barDateCorrigendum') {
                this.bar_data['barDateCorrigendumList'] = (value == 'countWise') ? this.bar_data.barDateCorrigendumCount : this.bar_data.barDateCorrigendumValue;
                this.yAxistitle = (value == 'countWise') ? 'No. of Tenders' : 'Value of Tenders (₹ lakhs)';
                this.dateCorrigendumValueOrCount = value;
                this.dateCorrigendum_bar_series = [{
                    name: (value == 'countWise') ? 'Date Corrigendum Count' : 'Date Corrigendum Value',
                    data: this.bar_data.barDateCorrigendumList
                }];
                this.barChartKey2 = this.barChartKey2 + 1;
            }

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
        changeChart(fromYear, toYear) {
            // this.reset_data('All');
            this.bar_data = {
                barCancelledCount: [],
                barCancelledValue: [],
                barRetenderCount: [],
                barRetenderValue: [],
                barYearList: [],
                barFinyearList: [],
                barPublishedCount: [],
                barPublishedValue: [],
                barDateCorrigendumCount: [],
                barDateCorrigendumValue: [],
                barDateCorrigendumYearList: []
            }
            this.cancelledRetenderDetails(fromYear, toYear);
            this.publishedTenders(fromYear, toYear);
            this.dateCorrigendumTenders(fromYear, toYear);
            this.$nextTick(() => {
                let self = this
                self.$refs.publishedTendersCountValue.countWiseValueWiseBtn('countWise');
                self.$refs.dateCorrigendumCountValue.countWiseValueWiseBtn('countWise');
                self.$refs.cancelledRetenderCountValue.countWiseValueWiseBtn('countWise');
            });
        },
        cancelledRetenderDetails(fromYear = '', toYear = '') {
            if (fromYear || toYear) {
                this.fromYear = fromYear;
                this.toYear = toYear;
            }
            var formData = {
                firstLong: this.$commonstore.getStore().userId,
                secondLong: this.fromYear,
                thirdLong: this.toYear,
                firstList: this.$commonstore.getStore().orgList
            };
            this.selectedYearMonth = 'Year : ' + (this.fromYear) + ' - ' + this.toYear;
            this.reset_data('cancelledRetenderDetails');
            this.$commonstore.setStore('pageloading', true);
            this.bar_data.barCancelledCount = [];
            this.bar_data.barCancelledValue = [];
            this.bar_data.barRetenderCount = [];
            this.bar_data.barRetenderValue = [];
            this.service.post(this.$cancelledRetenderDetails, formData).then(res => {
                if (res.id != 0) {
                    var obj = res.objectOne
                    let dList = Object.keys(obj).map(i => obj[i])
                    dList.filter((x) => {
                        x.filter((y) => {
                            if (y.tenderCategory == 'Cancelled') {
                                this.bar_data.barCancelledCount.push(y.tenderCount);
                                this.bar_data.barCancelledValue.push(y.tenderValue.toFixed(2));
                            } else if (y.tenderCategory == 'Retender') {
                                this.bar_data.barRetenderCount.push(y.tenderCount);
                                this.bar_data.barRetenderValue.push(y.tenderValue.toFixed(2));
                            }
                        })
                    })
                    this.bar_data['barYearList'] = Object.keys(obj);
                    this.focusMyElement(this.noValueBtn, 'CancelledRetender');
                } else {
                    this.reset_data('cancelledRetenderDetails');
                    this.barChartKey3 = this.barChartKey3 + 1;

                }
            })
        },
        publishedTenders(fromYear = '', toYear = '') {
            if (fromYear || toYear) {
                this.fromYear = fromYear;
                this.toYear = toYear;
            }
            var formData = {
                firstLong: this.$commonstore.getStore().userId,
                secondLong: this.fromYear,
                thirdLong: this.toYear,
                firstList: this.$commonstore.getStore().orgList
            };
            this.reset_data('publishedTenders');
            this.$commonstore.setStore('pageloading', true);
            this.bar_data.barFinyearList = [];
            this.bar_data.barPublishedCount = [];
            this.bar_data.barPublishedValue = [];
            this.service.post(this.$publishedTenders, formData).then(res => {
                if (res.id != 0) {
                    var obj = res.objectOne;
                    obj.filter((y) => {
                        this.bar_data.barFinyearList.push(y.financialYear);
                        this.bar_data.barPublishedCount.push(y.tenderCount);
                        this.bar_data.barPublishedValue.push(y.tenderValue.toFixed(2));
                    })
                    this.focusMyElement(this.noValueBtn, 'barPublishedTenders');
                } else {
                    this.reset_data('publishedTenders');
                    this.barChartKey1 = this.barChartKey1 + 1;
                }
            })
        },
        dateCorrigendumTenders(fromYear = '', toYear = '') {
            if (fromYear || toYear) {
                this.fromYear = fromYear;
                this.toYear = toYear;
            }
            var formData = {
                firstLong: this.$commonstore.getStore().userId,
                secondLong: this.fromYear,
                thirdLong: this.toYear,
                firstList: this.$commonstore.getStore().orgList
            };
            this.reset_data('dateCorrigendumTenders');
            this.$commonstore.setStore('pageloading', true);
            this.bar_data.barDateCorrigendumYearList = [];
            this.bar_data.barDateCorrigendumCount = [];
            this.bar_data.barDateCorrigendumValue = [];
            this.service.post(this.$dateCorrigendumTenders, formData).then(res => {
                if (res.id != 0) {
                    var obj = res.objectOne;
                    obj.filter((y) => {
                        this.bar_data.barDateCorrigendumYearList.push(y.financialYear);
                        this.bar_data.barDateCorrigendumCount.push(y.tenderCount);
                        this.bar_data.barDateCorrigendumValue.push(y.tenderValue.toFixed(2));
                    })
                    this.focusMyElement(this.noValueBtn, 'barDateCorrigendum');
                } else {
                    this.reset_data('dateCorrigendumTenders');
                    this.barChartKey2 = this.barChartKey2 + 1;
                }
            })
        },
        modelchangeChart(modelfromYear = '', modeltoYear = '') {
            // this.modelfromYear = modelfromYear ? modelfromYear : this.modelfinyearSelect[0].value;
            // this.modeltoYear = modeltoYear ? modeltoYear : this.modelfinyearSelect[this.modelfinyearSelect.length - 1].value;
            switch (this.chartmodalPopupName) {
                case 'ModalPublishedTenders':
                    this.modelPublishedTenders(modelfromYear, modeltoYear)
                    break;
                case 'ModalDateCorrigendumTenders':
                    this.modelDateCorrigendumTenders(modelfromYear, modeltoYear)
                    break;
                case 'ModalCancelledRetender':
                    this.modelCancelledRetendered(modelfromYear, modeltoYear)
                    break;
            }
        },
        /* eslint-disable */
        modelPublishedTenders(modelfromYear = '', modeltoYear = '') {
            if (this.yQMBtn) {
                var optionsValue = this.yQMBtn == 'Year' ? 'YEARWISE' : '';
                optionsValue = this.yQMBtn == 'Month' ? 'MONTHWISE' : optionsValue;
                optionsValue = this.yQMBtn == 'Quarter' ? 'QUARTERWISE' : optionsValue;
                modelfromYear = this.yQMBtn == 'Year' ? modelfromYear : modeltoYear - 1;
                modeltoYear = modeltoYear;
                var formData = {
                    firstLong: this.$commonstore.getStore().userId,
                    secondLong: modelfromYear,
                    thirdLong: modeltoYear,
                    firstString: optionsValue,
                    secondString: this.filter_tenderType,
                    firstList: this.$commonstore.getStore().selectAllOrgList ? this.filter_orgList : this.$commonstore.getStore().orgList,
                    firstBooleanValue: this.filter_highValueTender
                };
                this.modalPublished_Bar_series = []
                this.modalBar_data = {
                    modalBarFinyearList: [],
                    modalBarPublishedCount: [],
                    modalBarPublishedValue: [],
                }
                this.$commonstore.setStore('pageloading', true);
                this.service.post(this.$publishedTendersMore, formData).then(res => {
                    if (res.id != 0) {
                        var obj = res.objectOne
                        let monthList = [];
                        let QuarterMonth;
                        if (this.yQMBtn == 'Quarter') {
                            obj.filter((y) => {
                                switch (y.quarterYear) {
                                    case 1:
                                        QuarterMonth = 'APR - JUN (Q1)'
                                        break;
                                    case 2:
                                        QuarterMonth = 'JUL - SEP (Q2)'
                                        break;
                                    case 3:
                                        QuarterMonth = 'OCT - DEC (Q3)'
                                        break;
                                    case 4:
                                        QuarterMonth = 'JAN - MAR (Q4)'
                                        break;
                                }
                                monthList.push(QuarterMonth)
                                this.modalBar_data.modalBarPublishedCount.push(y.tenderCount);
                                this.modalBar_data.modalBarPublishedValue.push(y.tenderValue.toFixed(2));
                            })
                            this.modalBar_data['modalBarFinyearList'] = monthList;
                        } else if (this.yQMBtn == 'Month') {
                            let monthArray = [];
                            obj.filter((y) => {
                                monthArray.push(y.monthString)
                                this.modalBar_data.modalBarPublishedCount.push(y.tenderCount);
                                this.modalBar_data.modalBarPublishedValue.push(y.tenderValue.toFixed(2));
                            })
                            this.modalBar_data.modalBarFinyearList = monthArray;
                        } else if (this.yQMBtn == 'Year') {
                            obj.filter((y) => {
                                this.modalBar_data.modalBarFinyearList.push(y.financialYear);
                                this.modalBar_data.modalBarPublishedCount.push(y.tenderCount);
                                this.modalBar_data.modalBarPublishedValue.push(y.tenderValue.toFixed(2));
                            })
                        }
                        this.modalPublished_Bar_series = [{
                            name: (this.modalPublishedTendersValueOrCount == 'countWise') ? 'Published Count' : 'Published Value',
                            data: (this.modalPublishedTendersValueOrCount == 'countWise') ? this.modalBar_data.modalBarPublishedCount : this.modalBar_data.modalBarPublishedValue
                        }];
                        this.barChartKey4 = this.barChartKey4 + 1;
                    } else {
                        this.modalPublished_Bar_series = []
                        this.modalBar_data = {
                            modalBarFinyearList: [],
                            modalBarPublishedCount: [],
                            modalBarPublishedValue: [],
                        }
                    }
                    this.$commonstore.setStore('pageloading', false);
                })
                this.$refs['modal-xl'].show();
                this.modalYAxistitle = 'No. of Tenders';
            }
        },

        modelDateCorrigendumTenders(modelfromYear = '', modeltoYear = '') {
            if (this.yQMBtn) {
                var optionsValue = this.yQMBtn == 'Year' ? 'YEARWISE' : '';
                optionsValue = this.yQMBtn == 'Month' ? 'MONTHWISE' : optionsValue;
                optionsValue = this.yQMBtn == 'Quarter' ? 'QUARTERWISE' : optionsValue;
                modelfromYear = this.yQMBtn == 'Year' ? modelfromYear : modeltoYear - 1;
                modeltoYear = modeltoYear;
                var formData = {
                    firstLong: this.$commonstore.getStore().userId,
                    secondLong: modelfromYear,
                    thirdLong: modeltoYear,
                    firstString: optionsValue,
                    secondString: this.filter_tenderType,
                    firstList: this.$commonstore.getStore().selectAllOrgList ? this.filter_orgList : this.$commonstore.getStore().orgList
                };
                this.modalDateCorrigendum_Bar_series = []
                this.modalBar_data = {
                    modalBarFinyearList: [],
                    modalBarDateCorrigendumCount: [],
                    modalBarDateCorrigendumValue: [],
                }
                this.$commonstore.setStore('pageloading', true);
                this.service.post(this.$dateCorrigendumTendersMore, formData).then(res => {
                    if (res.id != 0) {
                        var obj = res.objectOne
                        let monthList = [];
                        let QuarterMonth;
                        if (this.yQMBtn == 'Quarter') {
                            obj.filter((y) => {
                                switch (y.quarterYear) {
                                    case 1:
                                        QuarterMonth = 'APR - JUN (Q1)'
                                        break;
                                    case 2:
                                        QuarterMonth = 'JUL - SEP (Q2)'
                                        break;
                                    case 3:
                                        QuarterMonth = 'OCT - DEC (Q3)'
                                        break;
                                    case 4:
                                        QuarterMonth = 'JAN - MAR (Q4)'
                                        break;
                                }
                                monthList.push(QuarterMonth)
                                this.modalBar_data.modalBarDateCorrigendumCount.push(y.tenderCount);
                                this.modalBar_data.modalBarDateCorrigendumValue.push(y.tenderValue);
                            })
                            this.modalBar_data['modalBarFinyearList'] = monthList;
                        } else if (this.yQMBtn == 'Month') {
                            let monthArray = [];
                            obj.filter((y) => {
                                monthArray.push(y.monthString)
                                this.modalBar_data.modalBarDateCorrigendumCount.push(y.tenderCount);
                                this.modalBar_data.modalBarDateCorrigendumValue.push(y.tenderValue);
                            })
                            this.modalBar_data.modalBarFinyearList = monthArray;
                        } else if (this.yQMBtn == 'Year') {
                            obj.filter((y) => {
                                this.modalBar_data.modalBarFinyearList.push(y.financialYear);
                                this.modalBar_data.modalBarDateCorrigendumCount.push(y.tenderCount);
                                this.modalBar_data.modalBarDateCorrigendumValue.push(y.tenderValue);
                            })
                        }
                        this.modalDateCorrigendum_Bar_series = [{
                            name: 'Date Corrigendum Count',
                            data: this.modalBar_data.modalBarDateCorrigendumCount
                        }];
                        this.modalDateCorrigendum_Bar_series = [{
                            name: (this.modalDateCorrigendumValueOrCount == 'countWise') ? 'Date Corrigendum Count' : 'Date Corrigendum Value',
                            data: (this.modalDateCorrigendumValueOrCount == 'countWise') ? this.modalBar_data.modalBarDateCorrigendumCount : this.modalBar_data.modalBarDateCorrigendumValue
                        }];
                        this.barChartKey4 = this.barChartKey4 + 1;
                    } else {
                        this.modalDateCorrigendum_Bar_series = []
                        this.modalBar_data = {
                            modalBarFinyearList: [],
                            modalBarDateCorrigendumCount: [],
                            modalBarDateCorrigendumValue: [],
                        }
                    }
                    this.$commonstore.setStore('pageloading', false);

                })
                this.$refs['modal-xl'].show();
                this.modalYAxistitle = 'No. of Tenders';
            }
        },

        modelCancelledRetendered(modelfromYear = '', modeltoYear = '') {
            if (this.yQMBtn) {
                var optionsValue = this.yQMBtn == 'Year' ? 'YEARWISE' : '';
                optionsValue = this.yQMBtn == 'Month' ? 'MONTHWISE' : optionsValue;
                optionsValue = this.yQMBtn == 'Quarter' ? 'QUARTERWISE' : optionsValue;
                modelfromYear = this.yQMBtn == 'Year' ? modelfromYear : modeltoYear - 1;
                modeltoYear = modeltoYear;
                var formData = {
                    firstLong: this.$commonstore.getStore().userId,
                    secondLong: modelfromYear,
                    thirdLong: modeltoYear,
                    firstString: optionsValue,
                    secondString: this.filter_tenderType,
                    firstList: this.$commonstore.getStore().selectAllOrgList ? this.filter_orgList : this.$commonstore.getStore().orgList,
                    firstBooleanValue: this.filter_highValueTender
                };
                this.modalCancelledRetendered_Bar_series = []
                this.modalBar_data = {
                    modalBarFinyearList: [],
                    modalBarCancelledCount: [],
                    modalBarCancelledValue: [],
                    modalBarRetenderedCount: [],
                    modalBarRetenderedValue: [],
                    modalBarCancelledList: [],
                    modalBarRetenderedList: []
                }
                this.$commonstore.setStore('pageloading', true);
                this.service.post(this.$cancelledRetenderDetailsMore, formData).then(res => {
                    if (res.id != 0) {
                        var obj = res.objectOne
                        let dList = Object.keys(obj).map(i => obj[i])
                        let monthList = [];
                        let QuarterMonth;
                        if (this.yQMBtn == 'Quarter') {
                            dList.filter((x) => {
                                x.filter((y) => {
                                    switch (y.quarterYear) {
                                        case 1:
                                            QuarterMonth = 'APR - JUN (Q1)'
                                            break;
                                        case 2:
                                            QuarterMonth = 'JUL - SEP (Q2)'
                                            break;
                                        case 3:
                                            QuarterMonth = 'OCT - DEC (Q3)'
                                            break;
                                        case 4:
                                            QuarterMonth = 'JAN - MAR (Q4)'
                                            break;
                                    }
                                    monthList.push(QuarterMonth)
                                    if (y.tenderCategory == 'Cancelled') {
                                        this.modalBar_data.modalBarCancelledCount.push(y.tenderCount);
                                        this.modalBar_data.modalBarCancelledValue.push(y.tenderValue.toFixed(2));
                                    } else if (y.tenderCategory == 'Retender') {
                                        this.modalBar_data.modalBarRetenderedCount.push(y.tenderCount);
                                        this.modalBar_data.modalBarRetenderedValue.push(y.tenderValue.toFixed(2));
                                    }
                                })
                            })
                            this.modalBar_data['modalBarFinyearList'] = [...new Set(monthList)];
                        } else if (this.yQMBtn == 'Month') {
                            let monthArray = [];
                            dList.filter((x) => {
                                x.filter((y) => {
                                    monthArray.push(y.monthString)
                                    if (y.tenderCategory == 'Cancelled') {
                                        this.modalBar_data.modalBarCancelledCount.push(y.tenderCount);
                                        this.modalBar_data.modalBarCancelledValue.push(y.tenderValue.toFixed(2));
                                    } else if (y.tenderCategory == 'Retender') {
                                        this.modalBar_data.modalBarRetenderedCount.push(y.tenderCount);
                                        this.modalBar_data.modalBarRetenderedValue.push(y.tenderValue.toFixed(2));
                                    }
                                })
                            })
                            this.modalBar_data.modalBarFinyearList = [...new Set(monthArray)];
                        } else if (this.yQMBtn == 'Year') {
                            dList.filter((x) => {
                                x.filter((y) => {
                                    if (y.tenderCategory == 'Cancelled') {
                                        this.modalBar_data.modalBarCancelledCount.push(y.tenderCount);
                                        this.modalBar_data.modalBarCancelledValue.push(y.tenderValue.toFixed(2));
                                    } else if (y.tenderCategory == 'Retender') {
                                        this.modalBar_data.modalBarRetenderedCount.push(y.tenderCount);
                                        this.modalBar_data.modalBarRetenderedValue.push(y.tenderValue.toFixed(2));
                                    }
                                    this.modalBar_data.modalBarFinyearList.push(y.financialYear);
                                })
                            })
                            this.modalBar_data.modalBarFinyearList = [...new Set(this.modalBar_data.modalBarFinyearList)]
                        }
                        this.modalCancelledRetendered_Bar_series = [{
                            name: (this.modalCancelledRetenderValueOrCount == 'countWise') ? 'Cancelled Count' : 'Cancelled Value',
                            data: (this.modalCancelledRetenderValueOrCount == 'countWise') ? this.modalBar_data.modalBarCancelledCount : this.modalBar_data.modalBarCancelledValue
                        }, {
                            name: (this.modalCancelledRetenderValueOrCount == 'countWise') ? 'Retender Count' : 'Retender Value',
                            data: (this.modalCancelledRetenderValueOrCount == 'countWise') ? this.modalBar_data.modalBarRetenderedCount : this.modalBar_data.modalBarRetenderedValue
                        }];
                        this.barChartKey4 = this.barChartKey4 + 1;
                    } else {
                        this.modalCancelledRetendered_Bar_series = []
                        this.modalBar_data = {
                            modalBarFinyearList: [],
                            modalBarCancelledCount: [],
                            modalBarCancelledValue: [],
                            modalBarRetenderedCount: [],
                            modalBarRetenderedValue: [],
                            modalBarCancelledList: [],
                            modalBarRetenderedList: []
                        }
                    }
                    this.$commonstore.setStore('pageloading', false);
                })
                this.$refs['modal-xl'].show();
                this.modalYAxistitle = 'No. of Tenders';
            }
        },
        async getfilterdata(data) {
            this.filter_formYear = data.fromYear;
            this.filter_toYear = data.toYear;
            this.filter_highValueTender = data.high_val_tender;
            this.filter_orgList = data.procuringList;
            this.filter_tenderType = data.tender_type;
            this.filter_type = data.type;
            await this.modelchangeChart(this.filter_formYear, this.filter_toYear);
        },
        chartmodalPopup(chartName, chartTitle, monthArrayList, quarterArrayList) {
            this.chartmodalPopupName = chartName;
            this.chartModalPopupTitle = chartTitle;
            this.isMonthArrayList = monthArrayList;
            this.isQuarterArrayList = quarterArrayList;
            this.yQMBtn == '' ? this.yQMBtn = 'Year' : '';
            this.$refs['modal-xl'].show();
            // this.modelfinanceYear_select(10);
            this.reset_data_modal();
            this.modalPublishedTendersValueOrCount = 'countWise';
            this.modalCancelledRetenderValueOrCount = 'countWise';
            this.modalDateCorrigendumValueOrCount = 'countWise';
        },
        CountValueBtn(toggleBtnName) {
            this.valueOrCount = '';
            if (this.chartmodalPopupName == 'ModalPublishedTenders') {
                this.modalPublished_Bar_series = [];
                this.modalBar_data.modalBarPublishedTendersList = (toggleBtnName == 'countWise') ? this.modalBar_data.modalBarPublishedCount : this.modalBar_data.modalBarPublishedValue;
                this.modalYAxistitle = (toggleBtnName == 'countWise') ? 'No. of Tenders' : 'Value of Tenders (₹ lakhs)';
                this.modalPublishedTendersValueOrCount = toggleBtnName;
                this.modalPublished_Bar_series = [{
                    name: (toggleBtnName == 'countWise') ? 'Published Count' : 'Published Value',
                    data: this.modalBar_data.modalBarPublishedTendersList
                }];
                this.barChartKey4 = this.barChartKey4 + 1;
            } else if (this.chartmodalPopupName == 'ModalCancelledRetender') {
                this.modalCancelledRetendered_Bar_series = [];
                this.modalBar_data.modalBarCancelledList = (toggleBtnName == 'countWise') ? this.modalBar_data.modalBarCancelledCount : this.modalBar_data.modalBarCancelledValue;
                this.modalBar_data.modalBarRetenderedList = (toggleBtnName == 'countWise') ? this.modalBar_data.modalBarRetenderedCount : this.modalBar_data.modalBarRetenderedValue;
                this.modalYAxistitle = (toggleBtnName == 'countWise') ? 'No. of Tenders' : 'Value of Tenders (₹ lakhs)';
                this.modalCancelledRetenderValueOrCount = toggleBtnName;
                this.modalCancelledRetendered_Bar_series = [{
                    name: (toggleBtnName == 'countWise') ? 'Cancelled Count' : 'Cancelled Value',
                    data: this.modalBar_data.modalBarCancelledList
                }, {
                    name: (toggleBtnName == 'countWise') ? 'Retender Count' : 'Retender Value',
                    data: this.modalBar_data.modalBarRetenderedList
                }];
                this.barChartKey4 = this.barChartKey4 + 1;
            } else if (this.chartmodalPopupName == 'ModalDateCorrigendumTenders') {
                this.modalDateCorrigendum_Bar_series = [];
                this.modalBar_data.modalDateCorrigendumList = (toggleBtnName == 'countWise') ? this.modalBar_data.modalBarDateCorrigendumCount : this.modalBar_data.modalBarDateCorrigendumValue;
                this.modalYAxistitle = (toggleBtnName == 'countWise') ? 'No. of Tenders' : 'Value of Tenders (₹ lakhs)';
                this.modalDateCorrigendumValueOrCount = toggleBtnName;
                this.modalDateCorrigendum_Bar_series = [{
                    name: (toggleBtnName == 'countWise') ? 'Date Corrigendum Count' : 'Date Corrigendum Value',
                    data: this.modalBar_data.modalDateCorrigendumList
                }];
                this.barChartKey4 = this.barChartKey4 + 1;
            }
        },
        popupModalClose() {
            this.yQMBtn = '';
            this.$refs['modal-xl'].hide()
        },
        reset_data(chartType) {
            if (chartType == 'publishedTenders') {
                this.bar_series = [];
                this.bar_data['barFinyearList'] = [];
                this.bar_data['barPublishedCount'] = [];
                this.bar_data['barPublishedValue'] = [];
            } else if (chartType == 'dateCorrigendumTenders') {
                this.dateCorrigendum_bar_series = [];
                this.bar_data['barDateCorrigendumYearList'] = [];
                this.bar_data['barDateCorrigendumCount'] = [];
                this.bar_data['barDateCorrigendumValue'] = [];
            } else if (chartType == 'cancelledRetenderDetails') {
                this.cancelledRetender_bar_series = [];
                this.bar_data['barYearList'] = [];
                this.bar_data['barCancelledCount'] = [];
                this.bar_data['barCancelledValue'] = [];
                this.bar_data['barRetenderCount'] = [];
                this.bar_data['barRetenderValue'] = [];
            } else if (chartType == 'All') {
                this.bar_series = [];
                this.bar_data['barFinyearList'] = [];
                this.bar_data['barPublishedCount'] = [];
                this.bar_data['barPublishedValue'] = [];
                this.dateCorrigendum_bar_series = [];
                this.bar_data['barDateCorrigendumYearList'] = [];
                this.bar_data['barDateCorrigendumCount'] = [];
                this.bar_data['barDateCorrigendumValue'] = [];
                this.cancelledRetender_bar_series = [];
                this.bar_data['barYearList'] = [];
                this.bar_data['barCancelledCount'] = [];
                this.bar_data['barCancelledValue'] = [];
                this.bar_data['barRetenderCount'] = [];
            }
        },
        reset_data_modal() {
            this.modalBar_data = {
                modalBarFinyearList: [],
                modalBarPublishedCount: [],
                modalBarPublishedValue: [],
                modalBarDateCorrigendumCount: [],
                modalBarDateCorrigendumValue: [],
            }
            this.modalPublished_Bar_series = []
            this.modalDateCorrigendum_Bar_series = []
            this.modalCancelledRetendered_Bar_series = []
        },

        resetfilterData() {
            this.filter_formYear = '',
                this.filter_toYear = '',
                this.filter_highValueTender = false,
                this.filter_orgList = [],
                this.filter_tenderType = '',
                this.filter_type = ''
        }
    },
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

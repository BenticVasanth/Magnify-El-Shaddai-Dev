<template>
<div class="row m-0 w-100 mb-4">
    <BoxCard :cardxl="6" @popupModalOpenParent="chartmodalPopup('publishedVsAwarded', 'Published vs Awarded')" chartTitle="Published vs Awarded" :isMoreInsight='true' :selectedYearMonth="selectedYearMonth" :financialYear="true" :fromYear="fromYear" :toYear="toYear">
        <template v-slot:chartContent>
            <ColumnLine :columnLineChartColumn="columnLineChartColumn" :columnLineChartHeight="columnLineChartHeight" :columnLinestacked="true" :colors="['#26c1c9', '#faca00', '#ab7df6']" :height="250" :columnLineFinyearList="columnLineFinyearList" :columnLinePublishedList="columnLinePublishedList" :columnLineAwardedList="columnLineAwardedList" :key="barChartKey" />
        </template>
    </BoxCard>
    <BoxCard :cardxl="6" @popupModalOpenParent="chartmodalPopup('tenderCategory', 'Tender Category')" chartTitle="Tender Category" :isMoreInsight='true' :selectedYearMonth="selectedYearMonth" :financialYear="true" :fromYear="fromYear" :toYear="toYear">
        <template v-slot:chartContent>
            <Pie :pieLabelsList="pieLabelsList" :pieCountList="pieCountList" :key="barChartKey" :totalTenderCount="totalTenderCount" :totalTenderValue="totalTenderValue" :fromYear="fromYear" :toYear="toYear"></Pie>
        </template>
    </BoxCard>
</div>
<div class="row m-0 w-100 mb-4">
    <BoxCard @popupModalOpenParent="chartmodalPopup('userEnrollement', 'User Enrollement')" class="mb-4" :cardxl="6" chartTitle="User Enrollement" :isMoreInsight='true' :financialYear="true" :fromYear="fromYear" :toYear="toYear" :selectedYearMonth="selectedYearMonth">
        <template v-slot:chartContent>
            <LineChart :chartoptions_data="line_chart_options" :map_series="line_map_series_data" :key="line_Chart_Key"></LineChart>
        </template>
    </BoxCard>
    <BoxCard @popupModalOpenParent="chartmodalPopup('accountOnboarding', 'Account Onboarding')" :cardxl="6" chartTitle="Account Onboarding" :isMoreInsight='true' :financialYear="true" :fromYear="fromYear" :toYear="toYear" :selectedYearMonth="selectedYearMonth">
        <template v-slot:chartContent>
            <Bar :singleColumn="true" :barRangeValue="accountOnboardingYear" :barRangeData="accountOnboardingValue" :colors="['#aa8ebd']" :height="300" :barChartColumn="modelbarChartColumn" :barChartHeight="modelbarChartHeight" :key="accountOnboardingChart"></Bar>
        </template>
    </BoxCard>
</div>
<div class="row m-0 w-100 mb-4">
    <TenderDepartment v-if="isTenderDeptPage" :toYear='toYear' ref="isTenderDeptPage" />
</div>
<div class="row m-0 w-100 mb-4">
    <BoxCard :cardxl="12" @popupModalOpenParent="chartmodalPopup('tenderPublished', 'Tender Published')" :buttonLineFlag="buttonLineFlag" @focusMyElementParent="focusMyElement" chartType="LineChart" chartTitle="Tender Published" :financialYear="true" :fromYear="fromYear" :toYear="toYear" :isMoreInsight='true' :selectedYearMonth="selectedYearMonth">
        <template v-slot:chartContent>
            <Line :chartoptions_data="line_chartoptions_data" :map_series="line_map_series" :key="lineChartKey"></Line>
        </template>
    </BoxCard>
</div>
<!-- <div class="row m-0 w-100 mb-4">
    <BoxCard :cardxl="6" chartTitle="Turnaround Time" :financialYear="true" :fromYear="fromYear" :toYear="toYear">
        <template v-slot:chartContent>
            <Bar :singleColumn="true" :barRangeValue="turnAroundRange" :barRangeData="turnAroundArray" :colors="['#aa8ebd']" :height="250" :barChartColumn="modelbarChartColumn" :barChartHeight="modelbarChartHeight" :title="{ xAxis: 'Days', yAxis: 'No. of Tenders' }" :key="barChartKey"></Bar>
        </template>
    </BoxCard>
    <BoxCard :cardxl="6" chartTitle="Tender Value Wise" :financialYear="true" :fromYear="fromYear" :toYear="toYear">
        <template v-slot:chartContent>
            <Bar :singleColumn="true" :barRangeValue="tenderValueWiseRange" :barRangeData="tenderValueWiseArray" :colors="['#29cb97']" :height="250" :barChartColumn="modelbarChartColumn" :barChartHeight="modelbarChartHeight" :title="{ xAxis: 'lac', yAxis: 'No. of Tenders' }" :key="barChartKey"></Bar>
        </template>
    </BoxCard>
</div> -->
<b-modal id="modal-xl" size="xl" ref="modal-xl" no-close-on-backdrop hide-footer hide-header>
    <ChartsModel @modelButtonChange="modelButtonChange" @modelYearChangeParent="modelYearChange" @popupModalCloseParent="popupModalClose" :chartModalPopupTitle="chartModalPopupTitle" @applyfilter_data="getfilterdata" :isFinanceYearRange='true' :isTenderList="false" :isCountValueWiseBtn="(chartmodalPopupName == 'tenderPublished') ? true : false" @CountValueBtnParent='CountValueBtn' :isOrgList="(chartmodalPopupName == 'userEnrollement') ? false : true">
        <template v-slot:chartContent>
            <ColumnLine v-if="chartmodalPopupName == 'publishedVsAwarded'" :columnLineChartColumn="modelcolumnLineChartColumn" :columnLineChartHeight="modelcolumnLineChartHeight" :columnLinestacked="false" :colors="['#26c1c9', '#faca00', '#ab7df6']" :height="450" :columnLineFinyearList="modelcolumnLineFinyearList" :columnLinePublishedList="modelcolumnLinePublishedList" :columnLineAwardedList="modelcolumnLineAwardedList" :key="modelcolumnLineChartKey"></ColumnLine>

            <b-row v-if="chartmodalPopupName == 'tenderCategory' && yQMBtn == 'Year'">
                <b-col md="6" class="m-auto">
                    <Pie :pieLabelsList="modalPieLabelsList" :pieCountList="modalPieCountList" :key="modalBarChartKey" :fromYear="fromYear" :toYear="toYear"></Pie>
                </b-col>
                <b-col md="6" class="m-auto">
                    <div class="commontable">
                        <b-table-simple bordered="true" caption-top responsive table-class="mb-2">
                            <b-thead>
                                <b-tr>
                                    <b-th>{{modalPieLabelsList[0]}}</b-th>
                                    <b-th>{{modalPieLabelsList[1]}}</b-th>
                                    <b-th>{{modalPieLabelsList[2]}}</b-th>
                                </b-tr>
                            </b-thead>
                            <b-tbody>
                                <b-tr>
                                    <b-td class="text-right">{{priceFormat(modalPieCountList[0])}}</b-td>
                                    <b-td class="text-right">{{priceFormat(modalPieCountList[1])}}</b-td>
                                    <b-td class="text-right">{{priceFormat(modalPieCountList[2])}}</b-td>
                                </b-tr>
                            </b-tbody>
                        </b-table-simple>
                    </div>
                </b-col>
            </b-row>

            <LineChart v-if="chartmodalPopupName == 'tenderCategory' && yQMBtn != 'Year'" :chartoptions_data="modal_line_chartoptions_data" :map_series="modal_line_map_series" :key="modalLineChartKey"></LineChart>

            <LineChart v-if="chartmodalPopupName == 'userEnrollement'" :chartoptions_data="modal_line_chartoptions_data" :map_series="modal_line_map_series" :key="modalLineChartKey"></LineChart>

            <Bar v-if="chartmodalPopupName == 'accountOnboarding'" :singleColumn="true" :barRangeValue="modalaccountOnboardingYear" :barRangeData="modalaccountOnboardingValue" :colors="['#aa8ebd']" :height="300" :barChartColumn="modelbarChartColumn" :barChartHeight="modelbarChartHeight" :key="modalAccountOnboardingChart"></Bar>

            <LineChart v-if="chartmodalPopupName == 'tenderPublished'" :chartoptions_data="modal_line_chartoptions_data" :map_series="modal_line_map_series" :key="modalLineChartKey"></LineChart>
        </template>
    </ChartsModel>
</b-modal>
</template>

<script>
/* eslint-disable */
import ColumnLine from "./common/charts/columnLine";
import Bar from "./common/charts/bar";
import Pie from "./common/charts/pie";
import Line from "./common/charts/line2";
import LineChart from "./common/charts/line";
import BoxCard from "./common/BoxCard";
import ChartsModel from "./common/ChartsModel";
import CommonJS from "@/assets/js/common.js";
import TenderDepartment from "./TenderDepartment";

export default {
    name: "SnapshotTrends",
    components: {
        ColumnLine,
        Pie,
        Line,
        LineChart,
        Bar,
        BoxCard,
        ChartsModel,
        TenderDepartment
    },
    mixins: [CommonJS],
    data() {
        return {
            buttonLineFlag: "true",
            modelbarChartHeight: "50%",
            modelbarChartColumn: "50%",
            barChartHeight: "20%",
            barChartColumn: "20%",
            modelbarFinyearList: [],
            modelbarPublishedList: [],
            modelbarAwardedList: [],
            modelbarChartKey: 1,
            barstacked: "",
            barFinyearList: [],
            barPublishedList: [],
            barAwardedList: [],
            columnLineChartHeight: "30%",
            columnLineChartColumn: "30%",
            modelcolumnLineChartHeight: "50%",
            modelcolumnLineChartColumn: "50%",
            modalXl: false,
            modelfinyearSelect: [],
            modelcolumnLineFinyearList: [],
            modelcolumnLinePublishedList: [],
            modelcolumnLineAwardedList: [],
            modelcolumnLineChartKey: 1,
            modelfromYear: "",
            modeltoYear: "",
            columnLinestacked: "",
            barChartKey: 1,
            lineChartKey: 1,
            fromYear: "",
            toYear: "",
            finyearSelect: [],
            columnLineFinyearList: [],
            columnLinePublishedList: [],
            columnLineAwardedList: [],
            pieLabelsList: [],
            pieCountList: [],
            tBtn: "1",
            noValueBtn: "countWise",
            yQMBtn: "",
            turnAroundArray: [],
            turnAroundRange: [],
            tenderValueWiseArray: [],
            tenderValueWiseRange: [],
            totalTenderCount: "",
            totalTenderValue: "",
            tenderCountTotal: "",
            tenderValueTotal: "",
            line_chartoptions_data: {},
            line_data: {},
            bar_data: {},
            line_map_series: [],
            noRecord: '',
            isTenderDeptPage: true,
            line_chart_options: {},
            line_map_series_data: [],
            line_Chart_Key: 1,
            accountOnboardingYear: [],
            accountOnboardingValue: [],
            modalaccountOnboardingYear: [],
            modalaccountOnboardingValue: [],
            accountOnboardingChart: 1,
            filter_formYear: '',
            filter_toYear: '',
            filter_highValueTender: false,
            filter_orgList: [],
            filter_tenderType: '',
            filter_type: '',
            modal_line_chartoptions_data: {},
            modal_line_map_series: [],
            modalLineChartKey: 1,
            modalBarChartKey: 1,
            monthArray: [],
            modalPieLabelsList: [],
            modalPieCountList: [],
            chartmodalPopupName: '',
            chartModalPopupTitle: '',
            selectedYearMonth: '',
            yearWiseTenderCount: [],
            yearWiseTenderValue: [],
            monthWiseTenderCount: [],
            monthWiseTenderValue: [],
            quarterWiseTenderCount: [],
            quarterWiseTenderValue: [],
            yearYaxisObjCount: [],
            yearYaxisObjValue: [],
            monthYaxisObjCount: [],
            monthYaxisObjValue: [],
            quarterYaxisObjCount: [],
            quarterYaxisObjValue: []
        };
    },
    watch: {
        noValueBtn(value) {
            this.focusMyElement(value);
        },
        yQMBtn() {
            this.modelchangeChart();
        },
    },
    methods: {
        modelButtonChange(value) {
            this.yQMBtn = value;
            this.resetfilterData();
        },
        focusMyElement(value, chartType) {
            if (chartType == "LineChart") {
                this.line_data["lineGoodsList"] =
                    value == "countWise" ?
                    this.line_data.lineGoodsCount :
                    this.line_data.lineGoodsValue;
                this.line_data["lineServicesList"] =
                    value == "countWise" ?
                    this.line_data.lineServicesCount :
                    this.line_data.lineServicesValue;
                this.line_data["lineWorksList"] =
                    value == "countWise" ?
                    this.line_data.lineWorksCount :
                    this.line_data.lineWorksValue;
                this.line_data["lineTotalTenders"] =
                    value == "countWise" ?
                    this.line_data.lineTotalCount :
                    this.line_data.lineTotalValue;
                this.lineChartKey = this.lineChartKey + 1;

                // this.line_chartoptions_data["title_text"] = "Tender Status";
                this.line_chartoptions_data["categories"] =
                    this.line_data["lineFinyearList"];
                this.line_chartoptions_data["lineHeight"] = "500";

                // this.line_chartoptions_data["subtitle_text"] =
                // "₹ " + this.priceFormat(this.line_data.tenderValueTotal.toFixed(2));
                this.line_chartoptions_data["xaxis_title_text"] = "Years";
                this.line_chartoptions_data["grid_show"] = true;
                this.line_chartoptions_data["xaxis_show"] = true;
                this.line_chartoptions_data["yaxis_show"] = true;
                this.line_chartoptions_data["legend_show"] = true;

                this.line_map_series = [{
                        name: "Total tenders",
                        data: this.line_data.lineTotalTenders,
                    },
                    {
                        name: "Works",
                        data: this.line_data.lineWorksList,
                    },
                    {
                        name: "Service",
                        data: this.line_data.lineServicesList,
                    },
                    {
                        name: "Goods",
                        data: this.line_data.lineGoodsList,
                    },
                ];
                this.lineChartKey = this.lineChartKey + 1;
            }
        },
        financeYear_select(yearNO) {
            let today = new Date();
            let cur_yr = today.getFullYear();
            let mm = today.getMonth() + 1;
            let fin_yr = mm < 4 ? cur_yr - 1 : cur_yr;
            for (let i = yearNO; i > 0; i--) {
                let year = (fin_yr + 1 - i).toString().substr(-2);
                let obj = {
                    text: fin_yr - i + "-" + year,
                    value: fin_yr - i,
                };
                this.finyearSelect.push(obj);
            }
            this.fromYear = this.finyearSelect[0].value;
            this.toYear = this.finyearSelect[this.finyearSelect.length - 1].value;
        },
        modelfinanceYear_select(yearNO) {
            this.modelfinyearSelect = [];
            let today = new Date();
            let cur_yr = today.getFullYear();
            let mm = today.getMonth() + 1;
           var fin_yr = (mm < 4) ? cur_yr : cur_yr + 1;
            for (let i = yearNO; i > 0; i--) {
                let year = (fin_yr + 1 - i).toString().substr(-2);
                let obj = {
                    text: fin_yr - i + "-" + year,
                    value: fin_yr - i,
                };
                this.modelfinyearSelect.push(obj);
            }
            this.modelfromYear = this.modelfinyearSelect[0].value;
            this.modeltoYear = this.modelfinyearSelect[this.modelfinyearSelect.length - 1].value;
        },
        changeChart(fromYear, toYear) {
            this.landingPageChart(fromYear, toYear);
            this.userEnroll(fromYear, toYear);
            this.accountOnboarding(fromYear, toYear, 'landing');
            // this.trunArroundValue(fromYear, toYear);
            this.$nextTick(() => {
                let self = this
                self.$refs.isTenderDeptPage.changeChart(toYear);
            });
        },
        landingPageChart(fromYear = "", toYear = "") {
            if (fromYear || toYear) {
                this.fromYear = fromYear;
                this.toYear = toYear;
            }
            let formData = {
                firstLong: this.$commonstore.getStore().userId,
                secondLong: this.fromYear,
                thirdLong: this.toYear,
            };
            this.columnLineFinyearList = [];
            this.columnLineAwardedList = [];
            this.columnLinePublishedList = [];
            this.pieLabelsList = [];
            this.pieCountList = [];
            this.reset_data();
            this.$commonstore.setStore('pageloading', true);
            this.selectedYearMonth = 'Year : ' + this.fromYear + ' - ' + this.toYear;
            this.service.post(this.$tenderDetailTrends, formData).then((res) => {
                //ColumnLine
                let obj = res.objectOne;
                let dList = Object.keys(obj).map((i) => obj[i]);
                dList.filter((x) => {
                    x.filter((y) => {
                        if (y.tenderCategory == "Awarded") {
                            this.columnLineAwardedList.push(y.tenderCount);
                        } else if (y.tenderCategory == "Published") {
                            this.columnLinePublishedList.push(y.tenderCount);
                            this.columnLineFinyearList.push(y.financialYear);
                        }
                    });
                });
                //PieChart
                let obj2 = res.objectTwo;
                obj2.map((x) => {
                    if (x.tenderCategory != "TotalTenders") {
                        this.pieLabelsList.push(x.tenderCategory);
                        this.pieCountList.push(x.tenderCount);
                    } else if (x.tenderCategory == "TotalTenders") {
                        this.totalTenderCount = x.tenderCount;
                        this.totalTenderValue = x.tenderValue;
                    }
                });
                //LineChart
                let obj3 = res.objectThree;
                let dList3 = Object.keys(obj3).map((i) => obj3[i]);
                dList3.filter((x) => {
                    x.filter((y) => {
                        if (y.tenderCategory == "Goods") {
                            this.line_data["lineGoodsCount"].push(y.tenderCount);
                            this.line_data["lineGoodsValue"].push(y.tenderValue.toFixed(2));
                        } else if (y.tenderCategory == "Services") {
                            this.line_data["lineServicesCount"].push(y.tenderCount);
                            this.line_data["lineServicesValue"].push(y.tenderValue.toFixed(2));
                        } else if (y.tenderCategory == "Works") {
                            this.line_data["lineWorksCount"].push(y.tenderCount);
                            this.line_data["lineWorksValue"].push(y.tenderValue.toFixed(2));
                        } else if (y.tenderCategory == "TotalTenders") {
                            this.line_data["lineTotalCount"].push(y.tenderCount);
                            this.line_data["lineTotalValue"].push(y.tenderValue.toFixed(2));
                            this.line_data["lineFinyearList"].push(y.financialYear);
                        } else if (y.tenderCategory == "OverAllCount") {
                            this.line_data["tenderCountTotal"] = y.tenderCount;
                            this.line_data["tenderValueTotal"] = y.tenderValue.toFixed(2);
                        }
                    });
                });
                this.focusMyElement(this.noValueBtn, "LineChart");
                this.barChartKey = this.barChartKey + 1;
                this.$commonstore.setStore('pageloading', false);
            });
        },

        // trunArroundValue(fromYear = "", toYear = "") {
        //     let formData = {
        //         firstLong: this.$commonstore.getStore().userId,
        //         secondLong: fromYear,
        //         thirdLong: toYear,
        //         stringValue: "YEARWISE",
        //         firstList: this.$commonstore.getStore().orgList
        //     };
        //     this.$commonstore.setStore('pageloading', true);
        //     this.service
        //         .post(this.$turnAroundAndValueWiseTenderCount, formData)
        //         .then((res) => {
        //             let turnAround = res.objectOne;
        //             let tenderValueWise = res.objectTwo;
        //             let x1 = 11;
        //             let x2 = 20;
        //             let y1 = 0;
        //             this.turnAroundArray = [];
        //             this.turnAroundRange = [];
        //             this.tenderValueWiseArray = [];
        //             this.tenderValueWiseRange = [];

        //             let lastTurnAroundValue = Object.values(turnAround).slice(-1)[0];
        //             let lastTenderValueWise = Object.values(tenderValueWise).slice(-1)[0];
        //             Object.keys(turnAround).map((i) => {
        //                 if (turnAround[i] != null) {
        //                     let x = ((x1 += 10) == 21 ? 0 : (x1 += 0)) + "-" + (x2 += 10);
        //                     let a =
        //                         turnAround[i] == lastTurnAroundValue ? x1 - 1 + "-Above" : x;
        //                     this.turnAroundArray.push(turnAround[i]);
        //                     this.turnAroundRange.push(a);
        //                 }
        //             });
        //             Object.keys(tenderValueWise).map((i) => {
        //                 if (tenderValueWise[i] != null) {
        //                     let y = (y1 + 1 == 1 ? 0 : y1 + 1) + "-" + (y1 += 25);
        //                     let a =
        //                         tenderValueWise[i] == lastTenderValueWise ?
        //                         y1 - 25 + "-Above" :
        //                         y;
        //                     this.tenderValueWiseArray.push(tenderValueWise[i]);
        //                     this.tenderValueWiseRange.push(a);
        //                 }
        //             });
        //             this.barChartKey = this.barChartKey + 1;
        //             this.$commonstore.setStore('pageloading', false);
        //         });
        // },
        userEnroll(fromYear = "", toYear = "") {
            if (fromYear || toYear) {
                this.fromYear = fromYear;
                this.toYear = toYear;
            }
            let formData = {
                firstLong: this.$commonstore.getStore().userId,
                secondLong: this.fromYear,
                thirdLong: this.toYear,
                stringValue: ""
            };
            this.line_map_series_data = [];
            this.line_chart_options = {};
            this.service
                .post(this.$userEnrollement, formData)
                .then((res) => {
                    let id = res.id;
                    if (id != 0) {
                        let obj = res.objectOne;
                        let xAxisData = [];
                        let obj2 = obj.reduce(function (rv, x) {
                            (rv[x['stringValue']] = rv[x['stringValue']] || []).push(x);
                            return rv;
                        }, {});
                        Object.values(obj2).filter((x, i) => {
                            let lineData = [];
                            x.filter((y) => {
                                lineData.push(y.thirdLong);
                                xAxisData.push(y.secondLong)
                            })
                            this.line_map_series_data.push({
                                name: Object.keys(obj2)[i],
                                data: lineData
                            })
                        })
                        this.line_chart_options["categories"] = xAxisData;
                        this.line_chart_options["lineHeight"] = "300";
                        this.line_chart_options["xaxis_title_text"] = "Years";
                        this.line_chart_options["grid_show"] = true;
                        this.line_chart_options["xaxis_show"] = true;
                        this.line_chart_options["yaxis_show"] = true;
                        this.line_chart_options["legend_show"] = true;
                        this.line_Chart_Key = this.line_Chart_Key + 1;
                    } else {
                        this.line_map_series_data = [];
                        this.line_chart_options = {};
                    }
                })
        },
        modalUserEnroll(modelfromYear = '', modeltoYear = '') {
            if (this.yQMBtn) {
                let optionsValue = this.yQMBtn == 'Year' ? 'YEARWISE' : '';
                optionsValue = this.yQMBtn == 'Month' ? 'MONTHWISE' : optionsValue;
                optionsValue = this.yQMBtn == 'Quarter' ? 'QUARTERWISE' : optionsValue;
                modelfromYear = this.yQMBtn == 'Year' ? modelfromYear : modeltoYear - 1;
                modeltoYear = modeltoYear;
                let formData = {
                    firstLong: this.$commonstore.getStore().userId,
                    secondLong: modelfromYear,
                    thirdLong: modeltoYear,
                    stringValue: optionsValue
                };
                this.modal_line_map_series = [];
                this.modal_line_chartoptions_data = {};
                this.$commonstore.setStore('pageloading', true);
                this.service.post(this.$userEnrollement, formData).then((res) => {
                    if (res.id != 0) {
                        let obj = res.objectOne;
                        let xAxisData = [];
                        if (Object.keys(obj).length != 0) {
                            if (this.yQMBtn == 'Year') {
                                let obj2 = obj.reduce(function (rv, x) {
                                    (rv[x['stringValue']] = rv[x['stringValue']] || []).push(x);
                                    return rv;
                                }, {});
                                this.modal_line_map_series = [];
                                Object.values(obj2).filter((x, i) => {
                                    let lineData = [];
                                    x.filter((y) => {
                                        lineData.push(y.thirdLong);
                                        xAxisData.push(y.secondLong)
                                    })
                                    this.modal_line_map_series.push({
                                        name: Object.keys(obj2)[i],
                                        data: lineData
                                    })
                                })
                                this.modalBarChartKey = this.modalBarChartKey + 1;
                            } else if (this.yQMBtn == 'Month') {
                                let obj2 = obj.reduce(function (rv, x) {
                                    (rv[x['anotherStringValue']] = rv[x['anotherStringValue']] || []).push(x);
                                    return rv;
                                }, {});
                                this.modal_line_map_series = [];
                                Object.values(obj2).filter((x, i) => {
                                    let mlist = [];
                                    x.filter((y, index) => {
                                        mlist.push(y)
                                    })
                                    this.monthArray.map((z) => {
                                        let obj = mlist.find(y => y.secondLongValue == z.value)
                                        if (!obj) {
                                            let o = {
                                                anotherStringValue: Object.keys(obj2)[i],
                                                firstBooleanValue: null,
                                                id: i + 1,
                                                longValue: '',
                                                secondLongValue: z.value,
                                                stringValue: z.text,
                                                thirdLongValue: 0
                                            }
                                            mlist.push(o)
                                        }
                                    });
                                    mlist.sort((a, b) => a.secondLongValue - b.secondLongValue);
                                    let mAryList = [];
                                    mlist.map((z) => {
                                        mAryList.push(z.thirdLongValue);
                                        xAxisData.push(z.stringValue);
                                    })
                                    this.modal_line_map_series.push({
                                        name: Object.keys(obj2)[i],
                                        data: mAryList
                                    })
                                })
                            } else if (this.yQMBtn == 'Quarter') {
                                obj.filter((y, index) => {
                                    let mAryList = [];
                                    let mValueAryList = [];
                                    this.modal_line_map_series = [];
                                    mValueAryList.push(y.stringValue)
                                    mAryList.push(y.secondLong, y.thirdLong, y.fourthLong, y.fifthLong);
                                    this.modal_line_map_series.push({
                                        name: mValueAryList,
                                        data: mAryList
                                    })
                                })
                                xAxisData = ['APR - JUN', 'JUL - SEP', 'OCT - DEC', 'JAN - MAR'];
                            }
                            this.modal_line_chartoptions_data["categories"] = xAxisData;
                            this.modal_line_chartoptions_data["lineHeight"] = "300";
                            this.modal_line_chartoptions_data["xaxis_title_text"] = "Years";
                            this.modal_line_chartoptions_data["grid_show"] = true;
                            this.modal_line_chartoptions_data["xaxis_show"] = true;
                            this.modal_line_chartoptions_data["yaxis_show"] = true;
                            this.modal_line_chartoptions_data["legend_show"] = true;
                            this.modalLineChartKey = this.modalLineChartKey + 1;
                        }
                        this.$refs['modal-xl'].show();
                    } else {
                        this.modalPieLabelsList = [];
                        this.modalPieCountList = [];
                        this.modal_line_map_series = [];
                        this.modal_line_chartoptions_data = {};
                    }
                    this.$commonstore.setStore('pageloading', false);
                });
            }
        },
        accountOnboarding(fromYear = "", toYear = "", type) {
            let formData;
            if (this.yQMBtn && type == 'modal') {
                let optionsValue = this.yQMBtn == "Year" ? "YEARWISE" : "";
                optionsValue = this.yQMBtn == "Month" ? "MONTHWISE" : optionsValue;
                optionsValue = this.yQMBtn == "Quarter" ? "QUARTERWISE" : optionsValue;
                fromYear = this.yQMBtn == "Year" ? fromYear : toYear - 1;
                toYear = toYear;
                formData = {
                    firstLong: this.$commonstore.getStore().userId,
                    secondLong: fromYear,
                    thirdLong: toYear,
                    stringValue: optionsValue,
                    firstList: this.$commonstore.getStore().selectAllOrgList ? this.filter_orgList : this.$commonstore.getStore().orgList
                };
                this.modalaccountOnboardingYear = [];
                this.modalaccountOnboardingValue = [];
            } else {
                if (fromYear || toYear) {
                    this.fromYear = fromYear;
                    this.toYear = toYear;
                }
                formData = {
                    firstLong: this.$commonstore.getStore().userId,
                    secondLong: this.fromYear,
                    thirdLong: this.toYear,
                    stringValue: "",
                    firstList: this.$commonstore.getStore().orgList
                };
                this.accountOnboardingYear = [];
                this.accountOnboardingValue = [];
            }
            this.service
                .post(this.$accountOnboarding, formData)
                .then((res) => {
                    let id = res.id;
                    if (id != 0) {
                        let obj = res.objectOne;
                        if (this.yQMBtn && type == 'modal') {
                            if (this.yQMBtn == "Year") {
                                obj.map((x) => {
                                    this.modalaccountOnboardingYear.push(x.firstLong);
                                    this.modalaccountOnboardingValue.push(x.secondLong);
                                })
                            } else if (this.yQMBtn == "Month") {
                                obj.map((x) => {
                                    this.modalaccountOnboardingYear.push(x.stringValue);
                                    this.modalaccountOnboardingValue.push(x.thirdLong);
                                })
                            } else if (this.yQMBtn == "Quarter") {
                                obj.map((x) => {
                                    this.modalaccountOnboardingValue.push(x.secondLong, x.thirdLong, x.fourthLong, x.fifthLong);
                                })
                                this.modalaccountOnboardingYear = ['APR - JUN', 'JUL - SEP', 'OCT - DEC', 'JAN - MAR'];
                            }
                            this.modalAccountOnboardingChart = this.modalAccountOnboardingChart + 1;
                            this.$refs["modal-xl"].show();
                        } else {
                            obj.map((x) => {
                                this.accountOnboardingYear.push(x.firstLong);
                                this.accountOnboardingValue.push(x.secondLong);
                            })
                            this.accountOnboardingChart = this.accountOnboardingChart + 1;
                        }
                    } else {
                        if (type == 'modal') {
                            this.modalaccountOnboardingYear = [];
                            this.modalaccountOnboardingValue = [];
                            this.modalAccountOnboardingChart = this.modalAccountOnboardingChart + 1;
                            this.$refs["modal-xl"].show();
                        } else {
                            this.accountOnboardingYear = [];
                            this.accountOnboardingValue = [];
                            this.accountOnboardingChart = this.accountOnboardingChart + 1;
                        }
                    }
                })
        },
        modelchangeChart(modelfromYear = '', modeltoYear = '') {
            this.modelfromYear = modelfromYear ? modelfromYear : this.modelfinyearSelect[0].value;
            this.modeltoYear = modeltoYear ? modeltoYear : this.modelfinyearSelect[this.modelfinyearSelect.length - 1].value;
            switch (this.chartmodalPopupName) {
                case 'accountOnboarding':
                    this.accountOnboarding(this.modelfromYear, this.modeltoYear, 'modal');
                    break;
                case 'publishedVsAwarded':
                    this.modelcolumnLineChart(this.modelfromYear, this.modeltoYear);
                    break;
                case 'tenderCategory':
                    this.modalTenderCategory(this.modelfromYear, this.modeltoYear);
                    break;
                case 'userEnrollement':
                    this.modalUserEnroll(this.modelfromYear, this.modeltoYear);
                    break;
                case 'tenderPublished':
                    this.modalTenderPublished(this.modelfromYear, this.modeltoYear);
                    break;
            }
        },
        modelcolumnLineChart(modelfromYear = "", modeltoYear = "") {
            if (this.yQMBtn) {
                let optionsValue = this.yQMBtn == 'Year' ? 'YEARWISE' : '';
                optionsValue = this.yQMBtn == 'Month' ? 'MONTHWISE' : optionsValue;
                optionsValue = this.yQMBtn == 'Quarter' ? 'QUARTERWISE' : optionsValue;
                modelfromYear = this.yQMBtn == 'Year' ? modelfromYear : modeltoYear - 1;
                modeltoYear = modeltoYear;
                let formData = {
                    firstLong: this.$commonstore.getStore().userId,
                    secondLong: modelfromYear,
                    thirdLong: modeltoYear,
                    stringValue: optionsValue,
                    firstList: this.$commonstore.getStore().selectAllOrgList ? this.filter_orgList : this.$commonstore.getStore().orgList
                };
                this.modelcolumnLineFinyearList = [];
                this.modelcolumnLineAwardedList = [];
                this.modelcolumnLinePublishedList = [];
                this.$commonstore.setStore('pageloading', true);
                this.service.post(this.$publishedVsAwarded, formData).then((res) => {
                    let id = res.id;
                    if (id != 0) {
                        let obj = res.objectOne;
                        let dList = Object.keys(obj).map((i) => obj[i]);
                        dList.filter((x) => {
                            x.filter((y) => {
                                if (y.tenderCategory == "Awarded") {
                                    this.modelcolumnLineAwardedList.push(y.tenderCount);
                                    if (x.length == 1) {
                                        this.modelcolumnLinePublishedList.push(0);
                                    }
                                }
                                if (y.tenderCategory == "Published") {
                                    this.modelcolumnLinePublishedList.push(y.tenderCount);
                                    if (this.yQMBtn == "Quarter") {
                                        let QuarterMonth;
                                        switch (y.quarterYear) {
                                            case 1:
                                                QuarterMonth = "APR - JUN (Q1)";
                                                break;
                                            case 2:
                                                QuarterMonth = "JUL - SEP (Q2)";
                                                break;
                                            case 3:
                                                QuarterMonth = "OCT - DEC (Q3)";
                                                break;
                                            case 4:
                                                QuarterMonth = "JAN - MAR (Q4)";
                                                break;
                                        }
                                        this.modelcolumnLineFinyearList.push(QuarterMonth);
                                    } else {
                                        let yearMonth =
                                            this.yQMBtn == "Month" ? y.monthString : y.financialYear;
                                        this.modelcolumnLineFinyearList.push(yearMonth);
                                    }
                                    if (x.length == 1) {
                                        this.modelcolumnLineAwardedList.push(0);
                                    }
                                }
                            });
                        });
                        this.modelcolumnLineChartKey = this.modelcolumnLineChartKey + 1;
                    } else {
                        this.modelcolumnLineFinyearList = [];
                        this.modelcolumnLinePublishedList = [];
                        this.modelcolumnLineAwardedList = [];
                        this.modelcolumnLineChartKey = this.modelcolumnLineChartKey + 1;
                    }
                    this.$commonstore.setStore('pageloading', false);
                });
                this.$refs["modal-xl"].show();
            }
        },
        modalTenderCategory(modelfromYear = '', modeltoYear = '') {
            if (this.yQMBtn) {
                let optionsValue = this.yQMBtn == 'Year' ? 'YEARWISE' : '';
                optionsValue = this.yQMBtn == 'Month' ? 'MONTHWISE' : optionsValue;
                optionsValue = this.yQMBtn == 'Quarter' ? 'QUARTERWISE' : optionsValue;
                modelfromYear = this.yQMBtn == 'Year' ? modelfromYear : modeltoYear - 1;
                modeltoYear = modeltoYear;
                let formData = {
                    firstLong: this.$commonstore.getStore().userId,
                    secondLong: modelfromYear,
                    thirdLong: modeltoYear,
                    stringValue: optionsValue,
                    firstList: this.$commonstore.getStore().selectAllOrgList ? this.filter_orgList : this.$commonstore.getStore().orgList
                };
                this.modalPieLabelsList = [];
                this.modalPieCountList = [];
                this.modal_line_map_series = [];
                this.modal_line_chartoptions_data = {};
                this.$commonstore.setStore('pageloading', true);
                this.service.post(this.$categoryWiseTenderDetails, formData).then((res) => {
                    if (res.id != 0) {
                        let obj = res.objectOne;
                        let xAxisData = [];
                        if (Object.keys(obj).length != 0) {
                            if (this.yQMBtn == 'Year') {
                                obj.map((x) => {
                                    if (x.tenderCategory != "TotalTenders") {
                                        this.modalPieLabelsList.push(x.tenderCategory);
                                        this.modalPieCountList.push(x.tenderCount);
                                    }
                                    // else if (x.tenderCategory == "TotalTenders") {
                                    //     this.totalTenderCount = x.tenderCount;
                                    //     this.totalTenderValue = x.tenderValue;
                                    // }
                                });
                                this.modalBarChartKey = this.modalBarChartKey + 1;
                            } else if (this.yQMBtn != 'Year') {
                                if (this.yQMBtn == 'Month') {
                                    let obj2 = obj.reduce(function (rv, x) {
                                        (rv[x['tenderCategory']] = rv[x['tenderCategory']] || []).push(x);
                                        return rv;
                                    }, {});
                                    this.modal_line_map_series = [];
                                    Object.values(obj2).filter((x, i) => {
                                        let mlist = [];
                                        x.filter((y, index) => {
                                            mlist.push(y)
                                        })
                                        this.monthArray.map((z) => {
                                            let obj = mlist.find(y => y.financialMonth == z.value)
                                            if (!obj) {
                                                let o = {
                                                    financialMonth: z.value,
                                                    id: i + 1,
                                                    monthString: z.text,
                                                    tenderCategory: Object.keys(obj2)[i],
                                                    tenderCount: 0,
                                                    tenderValue: 0,
                                                }
                                                mlist.push(o)
                                            }
                                        });
                                        mlist.sort((a, b) => a.financialMonth - b.financialMonth);
                                        let mAryList = [];
                                        mlist.map((z) => {
                                            mAryList.push(z.tenderCount);
                                            xAxisData.push(z.monthString);
                                        })
                                        this.modal_line_map_series.push({
                                            name: Object.keys(obj2)[i],
                                            data: mAryList
                                        })
                                    })
                                } else if (this.yQMBtn == 'Quarter') {
                                    let obj2 = obj.reduce(function (rv, x) {
                                        (rv[x['tenderCategory']] = rv[x['tenderCategory']] || []).push(x);
                                        return rv;
                                    }, {});
                                    this.modal_line_map_series = [];
                                    Object.values(obj2).filter((x, i) => {
                                        let mAryList = [];
                                        x.filter((y, index) => {
                                            mAryList.push(y.tenderCount);
                                        })
                                        this.modal_line_map_series.push({
                                            name: Object.keys(obj2)[i],
                                            data: mAryList
                                        })
                                    })
                                    xAxisData = ['APR - JUN', 'JUL - SEP', 'OCT - DEC', 'JAN - MAR'];
                                }
                            }
                            this.modal_line_chartoptions_data["categories"] = xAxisData;
                            this.modal_line_chartoptions_data["lineHeight"] = "300";
                            this.modal_line_chartoptions_data["xaxis_title_text"] = "Years";
                            this.modal_line_chartoptions_data["grid_show"] = true;
                            this.modal_line_chartoptions_data["xaxis_show"] = true;
                            this.modal_line_chartoptions_data["yaxis_show"] = true;
                            this.modal_line_chartoptions_data["legend_show"] = true;
                            this.modalLineChartKey = this.modalLineChartKey + 1;
                        }
                        this.$refs['modal-xl'].show();
                    } else {
                        this.modalPieLabelsList = [];
                        this.modalPieCountList = [];
                        this.modal_line_map_series = [];
                        this.modal_line_chartoptions_data = {};
                    }
                    this.$commonstore.setStore('pageloading', false);
                });
            }
        },
        modalTenderPublished(modelfromYear = '', modeltoYear = '') {
            if (this.yQMBtn) {
                let optionsValue = this.yQMBtn == 'Year' ? 'YEARWISE' : '';
                optionsValue = this.yQMBtn == 'Month' ? 'MONTHWISE' : optionsValue;
                optionsValue = this.yQMBtn == 'Quarter' ? 'QUARTERWISE' : optionsValue;
                modelfromYear = this.yQMBtn == 'Year' ? modelfromYear : modeltoYear - 1;
                modeltoYear = modeltoYear;
                let formData = {
                    firstLong: this.$commonstore.getStore().userId,
                    secondLong: modelfromYear,
                    thirdLong: modeltoYear,
                    stringValue: optionsValue,
                    firstList: this.$commonstore.getStore().selectAllOrgList ? this.filter_orgList : this.$commonstore.getStore().orgList
                };
                this.modal_line_map_series = [];
                this.modal_line_chartoptions_data = {};
                this.yearWiseTenderCount = [];
                this.yearWiseTenderValue = [];
                this.monthWiseTenderCount = [];
                this.monthWiseTenderValue = [];
                this.quarterWiseTenderCount = [];
                this.quarterWiseTenderValue = [];
                this.$commonstore.setStore('pageloading', true);
                this.service.post(this.$publishedTenderStatus, formData).then((res) => {
                    if (res.id != 0) {
                        let obj = res.objectOne;
                        let xAxisData = [];
                        if (Object.keys(obj).length != 0) {
                            if (this.yQMBtn == 'Year') {
                                let obj2 = obj.reduce(function (rv, x) {
                                    (rv[x['tenderCategory']] = rv[x['tenderCategory']] || []).push(x);
                                    return rv;
                                }, {});
                                this.yearYaxisObjCount = [];
                                this.yearYaxisObjValue = [];
                                Object.values(obj2).filter((x, i, val) => {
                                    this.yearWiseTenderCount = [];
                                    this.yearWiseTenderValue = [];
                                    let objYaxisValue = {}
                                    let objYaxisCount = {}
                                    x.filter((y) => {
                                        this.yearWiseTenderCount.push(y.tenderCount);
                                        this.yearWiseTenderValue.push(y.tenderValue.toFixed(2));
                                        i == 0 ? xAxisData.push(y.financialYear) : '';
                                        objYaxisValue.name = y.tenderCategory
                                        objYaxisCount.name = y.tenderCategory
                                    })
                                    objYaxisValue.data = this.yearWiseTenderValue;
                                    objYaxisCount.data = this.yearWiseTenderCount;
                                    this.yearYaxisObjCount.push(objYaxisCount)
                                    this.yearYaxisObjValue.push(objYaxisValue)
                                })
                                this.modal_line_map_series = this.yearYaxisObjCount;
                                this.modalBarChartKey = this.modalBarChartKey + 1;
                            } else if (this.yQMBtn == 'Month') {
                                let obj2 = obj.reduce(function (rv, x) {
                                    (rv[x['tenderCategory']] = rv[x['tenderCategory']] || []).push(x);
                                    return rv;
                                }, {});
                                this.monthYaxisObjCount = [];
                                this.monthYaxisObjValue = [];
                                Object.values(obj2).filter((x, i, val) => {
                                    let mlist = [];
                                    x.filter((y, index) => {
                                        mlist.push(y)
                                    })
                                    this.monthArray.map((x) => {
                                        let obj = mlist.find(y => y.financialMonth == x.value)
                                        if (!obj) {
                                            let o = {
                                                financialMonth: x.value,
                                                id: null,
                                                monthString: x.text,
                                                tenderCategory: Object.keys(obj2)[i],
                                                tenderCount: 0,
                                                tenderValue: 0
                                            }
                                            mlist.push(o)
                                        }
                                    });
                                    mlist.sort((a, b) => a.financialMonth - b.financialMonth);
                                    this.monthWiseTenderCount = [];
                                    this.monthWiseTenderValue = [];
                                    let objYaxisValue = {}
                                    let objYaxisCount = {}
                                    mlist.map((z) => {
                                        this.monthWiseTenderCount.push(z.tenderCount);
                                        this.monthWiseTenderValue.push(z.tenderValue.toFixed(2));
                                        i == 0 ? xAxisData.push(z.monthString) : '';
                                        objYaxisValue.name = z.tenderCategory
                                        objYaxisCount.name = z.tenderCategory
                                    })
                                    objYaxisValue.data = this.monthWiseTenderValue;
                                    objYaxisCount.data = this.monthWiseTenderCount;
                                    this.monthYaxisObjCount.push(objYaxisCount)
                                    this.monthYaxisObjValue.push(objYaxisValue)
                                })
                                this.modal_line_map_series = this.monthYaxisObjCount;
                            } else if (this.yQMBtn == 'Quarter') {
                                let obj2 = obj.reduce(function (rv, x) {
                                    (rv[x['tenderCategory']] = rv[x['tenderCategory']] || []).push(x);
                                    return rv;
                                }, {});
                                this.quarterYaxisObjCount = [];
                                this.quarterYaxisObjValue = [];
                                Object.values(obj2).filter((x, i) => {
                                    this.quarterWiseTenderCount = [];
                                    this.quarterWiseTenderValue = [];
                                    let objYaxisValue = {}
                                    let objYaxisCount = {}
                                    x.filter((y, index) => {
                                        this.quarterWiseTenderCount.push(y.tenderCount);
                                        this.quarterWiseTenderValue.push(y.tenderValue.toFixed(2));
                                        objYaxisValue.name = y.tenderCategory
                                        objYaxisCount.name = y.tenderCategory
                                    })
                                    objYaxisValue.data = this.quarterWiseTenderValue;
                                    objYaxisCount.data = this.quarterWiseTenderCount;
                                    this.quarterYaxisObjCount.push(objYaxisCount)
                                    this.quarterYaxisObjValue.push(objYaxisValue)
                                })
                                this.modal_line_map_series = this.quarterYaxisObjCount;
                                xAxisData = ['APR - JUN', 'JUL - SEP', 'OCT - DEC', 'JAN - MAR'];
                            }
                            this.modal_line_chartoptions_data["categories"] = xAxisData;
                            this.modal_line_chartoptions_data["lineHeight"] = "300";
                            this.modal_line_chartoptions_data["xaxis_title_text"] = "Years";
                            this.modal_line_chartoptions_data["grid_show"] = true;
                            this.modal_line_chartoptions_data["xaxis_show"] = true;
                            this.modal_line_chartoptions_data["yaxis_show"] = true;
                            this.modal_line_chartoptions_data["legend_show"] = true;
                            this.modalLineChartKey = this.modalLineChartKey + 1;
                        }
                        this.$refs['modal-xl'].show();
                    } else {
                        this.modalPieLabelsList = [];
                        this.modalPieCountList = [];
                        this.modal_line_map_series = [];
                        this.modal_line_chartoptions_data = {};
                        this.yearWiseTenderCount = [];
                        this.yearWiseTenderValue = [];
                        this.monthWiseTenderCount = [];
                        this.monthWiseTenderValue = [];
                        this.quarterWiseTenderCount = [];
                        this.quarterWiseTenderValue = [];
                    }
                    this.$commonstore.setStore('pageloading', false);
                });
            }
        },
        CountValueBtn(toggleBtnName) {
            this.modal_line_map_series = "";
            if (toggleBtnName == 'countWise') {
                let data1 = '';
                data1 = (this.yQMBtn == 'Year') ? this.yearYaxisObjCount : ((this.yQMBtn == 'Month') ? this.monthYaxisObjCount : this.quarterYaxisObjCount)
                this.modal_line_map_series = data1;
            } else if (toggleBtnName == 'valueWise') {
                let data2 = '';
                data2 = (this.yQMBtn == 'Year') ? this.yearYaxisObjValue : ((this.yQMBtn == 'Month') ? this.monthYaxisObjValue : this.quarterYaxisObjValue)
                this.modal_line_map_series = data2;
            }
            this.modalLineChartKey = this.modalLineChartKey + 1;
        },
        chartmodalPopup(chartName, chartTitle) {
            this.chartmodalPopupName = chartName;
            this.chartModalPopupTitle = chartTitle;
            this.yQMBtn == "" ? (this.yQMBtn = "Year") : "";
            this.modelfinanceYear_select(10);
        },
        popupModalClose() {
            this.yQMBtn = "";
            this.$refs["modal-xl"].hide();
        },
        getfilterdata(data) {
            this.filter_formYear = data.fromYear;
            this.filter_toYear = data.toYear;
            this.filter_highValueTender = data.high_val_tender;
            this.filter_orgList = data.procuringList;
            this.filter_tenderType = data.tender_type;
            this.filter_type = data.type;
            this.modelchangeChart(this.filter_formYear, this.filter_toYear)
        },
        resetfilterData() {
            this.filter_formYear = '',
                this.filter_toYear = '',
                this.filter_highValueTender = false,
                this.filter_orgList = [],
                this.filter_tenderType = '',
                this.filter_type = ''
        },
        reset_data() {
            this.line_data = {
                lineFinyearList: [],
                lineGoodsList: [],
                lineServicesList: [],
                lineWorksList: [],
                lineTotalTenders: [],
                lineGoodsCount: [],
                lineServicesCount: [],
                lineWorksCount: [],
                lineGoodsValue: [],
                lineServicesValue: [],
                lineWorksValue: [],
                lineTotalCount: [],
                lineTotalValue: [],
            };
        },
        loadMonthList() {
            this.monthArray = [{
                value: 1,
                text: 'APR'
            }, {
                value: 2,
                text: 'MAY'
            }, {
                value: 3,
                text: 'JUN'
            }, {
                value: 4,
                text: 'JUL'
            }, {
                value: 5,
                text: 'AUG'
            }, {
                value: 6,
                text: 'SEP'
            }, {
                value: 7,
                text: 'OCT'
            }, {
                value: 8,
                text: 'NOV'
            }, {
                value: 9,
                text: 'DEC'
            }, {
                value: 10,
                text: 'JAN'
            }, {
                value: 11,
                text: 'FEB'
            }, {
                value: 12,
                text: 'MAR'
            }]
        },
    },
    created() {
        this.loadMonthList();
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

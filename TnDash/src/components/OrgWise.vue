<template>
<div class="row m-2">

    <b-col lg="12" md="12" sm="12" class="text-right">
        <b-row class="justify-content-center">
            <div class="mainToggle d-flex mb-3 mr-3" :class="this.$commonstore.getStore().themetype ? 'mainToggle-light' : 'mainToggle-dark'">
                <span :class="this.tBtn == 1 ? 'toggleBtninner' : ''" @click="this.tBtn = 1">Value Wise</span>
                <span :class="this.tBtn == 2 ? 'toggleBtninner' : ''" @click="this.tBtn = 2">Number Wise</span>
            </div>

            <div class="yearFilter d-flex mb-3 mr-3 yearcss1" :class="this.$commonstore.getStore().themetype ? 'yearfilter-shadow' : ''">
                <div class="sortfilter" :class="!this.$commonstore.getStore().themetype ? 'sortshadow' : ''">
                    <span style="padding: 0 7px 0 10px"><img src="svg/Sort.svg" alt="" :class="!this.$commonstore.getStore().themetype ? 'dateicon' : ''"></span>
                    <span style="padding: 0 7px 0 0;color: var(--primary-second-button) !important;" v-if="!$commonstore.below960">Sort</span>
                </div>

                <div>
                    <span style="padding: 0 10px 0 7px">
                        <select v-model="selectedorg" @change="orgChange()">
                            <option v-for="(option, itemIndex) in orgdropdown" :value="option.value" :key="itemIndex">
                                {{ option.name }}
                            </option>
                        </select>
                    </span>
                </div>
            </div>
            <div class="mainToggle d-flex mb-3 mr-3" :class="this.$commonstore.getStore().themetype ? 'mainToggle-light' : 'mainToggle-dark'">

                <span :class="this.tBtn2 == 1 ? 'toggleBtninner' : ''" @click="this.tBtn2 = 1"><img src="@/assets/images/Grid-NotSelected.svg" class="pr-2" alt="" :class="this.$commonstore.getStore().themetype  ? '' : ''">Grid</span>

                <span :class="this.tBtn2 == 2 ? 'toggleBtninner' : ''" @click="this.tBtn2 = 2"><img src="@/assets/images/List-NotSelected.svg" class="pr-2" alt="" :class="this.$commonstore.getStore().themetype ? 'dateicon' : ''">List</span>
            </div>
        </b-row>

    </b-col>
</div>
<div class="row m-0 w-100 mb-4">
    <BoxCard :colsize='getcolumnsize()' chartType='LineChart' :buttonLineFlag='false' @focusMyElementParent="focusMyElement" chartTitle="Anna University" v-for="(option, itemIndex) in orgarray" :key="itemIndex" class="mb-4" orgcard_padding="true" >
        <template v-slot:chartContent>
            <Line :chartoptions_data="chartoptions_data" :map_series="map_series" :key="lineChartKey"></Line>
            <!-- <p>More Insights</p> -->
        </template>
    </BoxCard>
</div>
</template>

<script>
import BoxCard from "./common/BoxCard";
import Line from "./common/charts/line2";
import CommonJS from "@/assets/js/common.js";
export default {
    name: "OrgWise",
    components: {
        BoxCard,
        Line,
    },
    mixins: [CommonJS],
    data() {
        return {
            buttonLineFlag: 'false',
            modelbarChartHeight: '50%',
            modelbarChartColumn: '50%',
            barChartHeight: '20%',
            barChartColumn: '20%',
            modelbarFinyearList: [],
            modelbarPublishedList: [],
            modelbarAwardedList: [],
            modelbarChartKey: 1,
            barstacked: '',
            barFinyearList: [],
            barPublishedList: [],
            barAwardedList: [],
            columnLineChartHeight: '30%',
            columnLineChartColumn: '30%',
            modelcolumnLineChartHeight: '50%',
            modelcolumnLineChartColumn: '50%',
            modalXl: false,
            modelfinyearSelect: [],
            modelcolumnLineFinyearList: [],
            modelcolumnLinePublishedList: [],
            modelcolumnLineAwardedList: [],
            modelcolumnLineChartKey: 1,
            modelfromYear: '',
            modeltoYear: '',
            columnLinestacked: '',
            barChartKey: 1,
            lineChartKey: 1,
            fromYear: '',
            toYear: '',
            finyearSelect: [],
            columnLineFinyearList: [],
            columnLinePublishedList: [],
            columnLineAwardedList: [],
            pieLabelsList: [],
            pieCountList: [],
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
            tBtn: "1",
            tBtn2: "1",
            noValueBtn: '1',
            yQMBtn: '',
            turnAroundArray: [],
            turnAroundRange: [],
            tenderValueWiseArray: [],
            tenderValueWiseRange: [],
            treeMapChartKey: 1,
            treeMapList: [],
            treeMapValueList: [],
            treeMapCountList: [],
            selectedorg: '1',
            orgdropdown: [{
                value: '1',
                name: 'All Organisation'
            }, {
                value: '2',
                name: 'First 5 Organisation'
            }, {
                value: '3',
                name: 'First 10 Organisation'
            }],
            cardheight: '300px',
            orgarray: [1, 2, 3, 4, 5, 6, 7],
            map_series: [],
            chartoptions_data: {}
        };
    },

    methods: {

        //LineChart Button Change 
        focusMyElement(value, chartType) {
            if (chartType == 'LineChart') {
                if (value == 1) {
                    this.lineGoodsList = this.lineGoodsCount;
                    this.lineServicesList = this.lineServicesCount;
                    this.lineWorksList = this.lineWorksCount;
                    this.lineTotalTenders = this.lineTotalCount;
                } else {
                    this.lineGoodsList = this.lineGoodsValue;
                    this.lineServicesList = this.lineServicesValue;
                    this.lineWorksList = this.lineWorksValue;
                    this.lineTotalTenders = this.lineTotalValue;
                }
                // this.chartoptions_data['title_text'] = "Tender Status";
                this.chartoptions_data['categories'] = this.lineFinyearList;
                // this.chartoptions_data['subtitle_text'] = '₹ ' + this.priceFormat(this.tenderValueTotal);
                // this.chartoptions_data['xaxis_title_text'] = "Years";

                this.chartoptions_data['grid_show'] = true;
                // this.chartoptions_data['xaxis_show'] = true;
                // this.chartoptions_data['yaxis_show'] = true;
                // this.chartoptions_data['legend_show'] = true;

                this.map_series = [
                    // {
                    //     name: "Total tenders",
                    //     data: this.lineTotalTenders,
                    // },
                    {
                        name: "Works",
                        data: this.lineWorksList,
                    },
                    // {
                    //     name: "Service",
                    //     data: this.lineServicesList,
                    // },
                    // {
                    //     name: "Goods",
                    //     data: this.lineGoodsList,
                    // }
                ]

                this.lineChartKey = this.lineChartKey + 1;

            }
        },
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

        changeChart(fromYear, toYear) {
            this.landingPageChart(fromYear, toYear)
        },
        landingPageChart(fromYear = '', toYear = '') {
            var formData = { // Need to assign console
                firstLong: this.$commonstore.getStore().userId ,
                secondLong: fromYear,
                thirdLong: toYear
            };
            this.columnLineFinyearList = [];
            this.columnLineAwardedList = [];
            this.columnLinePublishedList = [];
            this.pieLabelsList = [];
            this.pieCountList = [];

            this.lineFinyearList = [];
            this.lineGoodsList = [];
            this.lineServicesList = [];
            this.lineWorksList = [];
            this.lineTotalTenders = [];

            this.lineGoodsCount = [];
            this.lineServicesCount = [];
            this.lineWorksCount = [];
            this.lineTotalCount = [];

            this.lineGoodsValue = [];
            this.lineServicesValue = [];
            this.lineWorksValue = [];
            this.lineTotalValue = [];
            this.$commonstore.setStore('pageloading', true);
            this.service.post(this.$tenderDetailTrends, formData).then(res => {

                //LineChart 
                var obj3 = res.objectThree;
                let dList3 = Object.keys(obj3).map(i => obj3[i]);
                dList3.filter((x) => {
                    x.filter((y) => {
                        if (y.tenderCategory == 'Goods') {
                            this.lineGoodsCount.push(y.tenderCount)
                            this.lineGoodsValue.push(y.tenderValue)
                        } else if (y.tenderCategory == 'Services') {
                            this.lineServicesCount.push(y.tenderCount)
                            this.lineServicesValue.push(y.tenderValue)
                        } else if (y.tenderCategory == 'Works') {
                            this.lineWorksCount.push(y.tenderCount)
                            this.lineWorksValue.push(y.tenderValue)
                        } else if (y.tenderCategory == 'TotalTenders') {
                            this.lineTotalCount.push(y.tenderCount)
                            this.lineTotalValue.push(y.tenderValue)
                            this.lineFinyearList.push(y.financialYear)
                        } else if (y.tenderCategory == "OverAllCount") {
                            this.tenderCountTotal = y.tenderCount;
                            this.tenderValueTotal = y.tenderValue;
                        }
                    })
                })

                this.focusMyElement(this.noValueBtn, 'LineChart')
                this.$commonstore.setStore('pageloading', false);
            })
        },
        orgChange() {
            // this.$emit('landingYearChangeParent', fromYear, toYear)
        },
        getcolumnsize() {
            if (window.innerWidth <= 768) {
                return '12';
            } else if (window.innerWidth <= 1024) {
                return '6';
            } else if (window.innerWidth > 1024) {
                if (!this.$commonstore.getStore().isActive) {
                    return '3'
                } else {
                    return '4'
                }
            }
        }
    },

    created() {
        this.financeYear_select(5);
        this.landingPageChart();
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

.dotactive {
    background: #FF7A59 !important;
    width: 2px !important;
    height: 2px !important;
    border-radius: 50% !important;
}
</style>

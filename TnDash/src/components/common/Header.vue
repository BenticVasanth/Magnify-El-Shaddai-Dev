<template>
<div>
    <b-navbar toggleable="lg" fixed="top" class="navbar-shadow py-1 px-1" :class="check_screen_size()">
        <b-navbar-brand href="#">
            <img src="@/assets/images/tn_Emblem.svg" alt="logo" />
        </b-navbar-brand>

        <b-navbar-nav style="display: inline-grid" right>
            <b-nav-text class="txt-clr font-weight-bolder text-left p-0" :class="this.$commonstore.getStore().windowWidth < 960 ? 'f-16 ' : 'f-21'">{{portalName}}</b-nav-text>
            <b-nav-text class="txt-clr font-weight-bolder ml-1 text-left f-12 p-0">{{portalSubName}}</b-nav-text>
        </b-navbar-nav>

        <b-navbar-nav align="center" style="margin: auto">

            <div class="container mt-1">

                <div class="filtersecondrow p-2 header_select" v-if="isProcuringEntity">
                    <div v-click-outside="hideOrgUsers">
                        <b-input-group>
                            <b-form-input id="orgUser" class="procuring_input txt-clr" style="background-color: var(--primary-cardheader) !important;" maxlength="20" v-model="searchName" @click="showOrgUsers()" type="text" placeholder="Select Organisation" autocomplete="off" @keyup="getOrgData()"></b-form-input>
                        </b-input-group>
                        <div v-if="orgUsers" class="suggestion" :style="procuringList.length < 6 ? 'height:auto' : 'height:250px'">
                            <div v-if="procuringList.length == 0">
                                <p class="m-2 noRecord">No Organisation(s) Found</p>
                            </div>
                            <div v-if="$commonstore.getStore().orgListname.length != 0">
                            <ul class="p-1">
                                <li v-for="(option, index) in procuringList" :key="index" class="d-flex align-items-center">
                                    <span v-if="this.existOrg.includes(option.id)" class="d-flex align-items-baseline">
                                        <input v-model="existOrg" :value="option.id" type="checkbox" :id="'procuring_' + index" class="align-middle mr-1" @click="existselected(option)" />
                                        <label :for="'procuring_' + index" class="mb-0 text-break" :title="option.stringValue">{{ option.stringValue }}</label>
                                    </span>
                                </li>
                            </ul>
                            <hr>
                            </div>
                            <div v-if="procuringList.length != 0">
                                <div class="buttoncss">
                                    <span class="toggleBtn f-10 mr-1 curPnt" style="padding: 0.25rem 0.5rem;background: #cf4f4f !important;" @click="resetfilter()"> CLEAR </span>
                                    <span class="toggleBtn f-10 curPnt" style="padding: 0.25rem 0.5rem; background: #5046af !important " @click="applyfilter()">Apply</span>
                                </div>
                                <ul class="p-1">
                                    <li v-for="(option, index) in procuringList" :key="index" class="d-flex align-items-center p-1">
                                        <span v-if="!this.existOrg.includes(option.id)" class="d-flex align-items-baseline" >
                                            <input v-model="selectedOrg" :value="option.id" type="checkbox" :id="'procuring_' + index" class="align-middle mr-1" @click="getselected(option)" />
                                            <label :for="'procuring_' + index" class="mb-0 text-break" :title="option.stringValue">{{ option.stringValue }}</label>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="$commonstore.getStore().orgListname.length != 0">
                    <span class="toggleBtn f-10 mr-1 curPnt" style="padding: 0.25rem 0.5rem; background: #5046af !important" @click="showselected()"> <span v-if="!this.$commonstore.getStore().below960">Show </span>
                        <i class="fa" :class="!showlist ? 'fa-chevron-up' : 'fa-chevron-down'" aria-hidden="true" :title="!showlist ? 'hide' : 'show'"></i>
                    </span>
                </div>
            </div>
        </b-navbar-nav>

        <b-navbar-nav style="display: inline-grid" right>
            <div class="container mt-2 ml-3">
                <div class="mb-2">
                    <span class="toggleBtn f-10 mr-1 curPnt" style="padding: 0.25rem 0.5rem; background: #5046af !important" :title="!showcards ? 'Hide Stats Card' : 'Show Stats Card'" @click="showcard()" v-tippy="{ placement : 'bottom',  theme : 'customs',arrow : true, arrowType : 'round', animation : 'fade'}">
                        <i class="fa" :class="!showcards ? 'fa-chevron-up' : 'fa-chevron-down'" aria-hidden="true"></i>
                    </span>
                </div>
                <div class="one-quarter pt-1 f-13 m-auto txt-clr" id="switch">
                    <input type="checkbox" class="checkbox " v-model="themetype" id="chk" @change="setcolors()">
                    <label class="label mb-2 ml-2" for="chk">
                        <img src="@/assets/images/Darkmode.svg" alt="logo" />
                        <img src="@/assets/images/Daymode.svg" alt="logo" />
                        <div class="ball"></div>
                    </label>
                </div>
            </div>
        </b-navbar-nav>

        <div class="userheader">
            <div>
                <b-dropdown size="lg" variant="link" toggle-class="text-decoration-none d-flex align-items-center justify-content-around py-0 bgbuttonclr buttonwidth">
                    <template #button-content>
                        <b-navbar-nav style="display: inline-grid" right>
                            <b-nav-text class="pb-0 pt-1 f-13 txt-clr text-left">Welcome,</b-nav-text>
                            <b-nav-text class="pb-1 pt-0 f-13 txt-clr font-weight-bold text-left txt-wrap">{{ userdata.userName }}</b-nav-text>
                        </b-navbar-nav>
                        <b-navbar-brand right>
                            <img src="@/assets/images/person.png" class="d-inline-block align-top" style="width: 38px; border-radius: 50%" alt="user" />
                        </b-navbar-brand>
                    </template>
                    <b-dropdown-item @click="modalProfileOpen"><img src="@/assets/images/My_Profile.svg" class="d-inline-block align-top" alt="logo" />
                        My Profile</b-dropdown-item>
                    <b-dropdown-item href="#" @click="changepasswd()"><img src="@/assets/images/Change_Password.svg" class="d-inline-block align-top" alt="logo">Change password
                    </b-dropdown-item>
                    <b-dropdown-item href="#" @click="changemobileNum()"><img src="@/assets/images/Change_Mobile_Number.svg" class="d-inline-block align-top" alt="logo" />Change Mobile Number</b-dropdown-item>
                    <b-dropdown-item @click="modalContactUsOpen"><img src="@/assets/images/Contact_Us.svg" class="d-inline-block align-top" alt="logo" />Contact Us</b-dropdown-item>
                </b-dropdown>
            </div>
        </div>
        <b-navbar-nav style="display: inline-grid" right>
            <div class="logoutimg d-inline-block align-top curPnt" title="Log out" @click="logout()"></div>
        </b-navbar-nav>
    </b-navbar>
    <b-modal id="changepassword" size="lg" title="" ref="changepassword" hide-footer hide-header no-close-on-backdrop>
        <profileChangePassword :portalName='portalName' :portalSubName='portalSubName' @passwordchageModal="passwordchageModal"></profileChangePassword>
    </b-modal>
    <b-modal id="changemobileNum" size="md" title="" ref="changemobileNum" hide-footer hide-header no-close-on-backdrop>
        <profileChangemobileNum :portalName='portalName' :portalSubName='portalSubName' @updatemobnum="updatemobnum"></profileChangemobileNum>
    </b-modal>
    <b-modal id="modalUserProfile" size="lg" ref="modalUserProfile" no-close-on-backdrop hide-footer hide-header>
        <MyProfile :portalName='portalName' :portalSubName='portalSubName' @modalProfileClose='modalProfileClose' @nameupdate="nameLoad"></MyProfile>
    </b-modal>
    <b-modal id="contactUs" size="md" ref="contactUs" no-close-on-backdrop hide-footer hide-header>
        <ContactUs :portalName='portalName' :portalSubName='portalSubName' @modalContactUsClose='modalContactUsClose'></ContactUs>
    </b-modal>

</div>
</template>

<script>
import axios from "axios";
import aesUtil from "@/assets/js/aesUtil.js";
import CommonJS from "@/assets/js/common.js";
import profileChangemobileNum from './MyAccount/profileChangemobileNum';
import profileChangePassword from './MyAccount/profileChangePassword';
import ContactUs from "./MyAccount/contactUs";
import MyProfile from "./MyAccount/myProfile";
export default {
    name: "HeaderPage",
    mixins: [CommonJS],
    components: {
        profileChangePassword,
        profileChangemobileNum,
        ContactUs,
        MyProfile
    },
    data() {
        return {
            tBtn: "1",
            userdata: "",
            themetype: this.$commonstore.getStore().themetype,
            dropbtnwidth: "200px",
            procuringList: this.$commonstore.getStore().organisation,
            orgUsers: false,
            isProcuringEntity: true,
            searchName: "",
            portalName: this.$commonstore.getStore().portalName,
            portalSubName: this.$commonstore.getStore().portalSubName,
            showlist: false,
            showcards: false,
            loginPasswordUniqueKey: '',
            procuringListOrg: [],
            selectedOrg: [],
            existOrg: []
        };
    },
    methods: {
        showOrgUsers() {
            this.orgUsers = true;
        },
        hideOrgUsers() {
            this.orgUsers = false;
        },
        getOrgData() {
            if (this.searchName.length > 0) {
                let orgNames = this.$commonstore.getStore().organisation;
                this.procuringList = orgNames.filter(name => {
                    return name.stringValue.toLowerCase().startsWith(this.searchName.toLowerCase())
                });
            } else {
                this.procuringList = this.$commonstore.getStore().organisation
            }

        },
        resetfilter() {
            this.selectedOrg = [];
            this.existOrg =[];
            this.searchName = "";
            this.procuringList = this.$commonstore.getStore().organisation
            this.$commonstore.setStore("selectAllOrgList", this.procuringList);
        },
        applyfilter() {
            let selected_data = [];
            let selected_name = [];
            let orgNameList = this.$commonstore.getStore().organisation
            orgNameList.filter((x) => {
                if (this.selectedOrg.includes(x.id)) {
                    selected_data.push(x.id);
                    selected_name.push(x.stringValue);
                    this.existOrg = this.selectedOrg;
                }
            });
            if (this.$commonstore.getStore().userLevel == "ORGANISATION" && selected_data.length == 0) {
                orgNameList.filter((x) => {
                    selected_data.push(x.id);
                });
            } else {
                selected_data.push();
            }
            this.searchName = '';
            this.$commonstore.setStore("orgListname", selected_name);
            this.$commonstore.setStore("orgList", selected_data);
            this.$commonstore.setStore("selectBoxOrgList", this.selectedOrg);
            this.$commonstore.setStore("selectExistorg", this.existOrg)
            this.hideOrgUsers();
            this.$commonstore.setStore("sidemenu", this.$commonstore.getStore().sidemenu);
            this.$commonstore.setStore("right_sidemenu", this.$commonstore.getStore().right_sidemenu);
            this.procuringList = this.$commonstore.getStore().organisation
            this.$root.$emit("setinitialPage");
        },
        getselected(option) {
            setTimeout(() => {
                let selected_data = [];
                selected_data = this.selectedOrg;
                if (selected_data.length == 0) {
                    this.searchName = "";
                } else {
                    if (selected_data.length > 5) {
                        const index = this.selectedOrg.indexOf(option.id);
                        this.selectedOrg.splice(index, 1)
                        this.warnAlert(
                            "Only 5 Organisation are allowed to be select",
                            "",
                            "warning"
                        ).then(
                            (isDelete) => {
                                if (isDelete) {
                                    setTimeout(() => {
                                        this.orgUsers = true;
                                    }, 0.1);
                                }
                            });

                    }
                }
            }, 0.1);
        },
        existselected(option) {
            setTimeout(() => {
                this.existOrg = this.existOrg.filter((x) => {
                    return x != option.id
                })
                this.selectedOrg = this.selectedOrg.filter((x) => {
                    return x != option.id
                })
            }, 0.1);
        },

        logout() {
            let that = this;
            this.warnAlert("Are you sure you want to Logout?", "", "confirm").then(
                (isDelete) => {
                    if (isDelete) {
                        let jsonFormdata = {
                            id: this.$commonstore.getStore().userSesId,
                            stringValue: aesUtil.methods.encrypt(
                                this.$store.secureToken + this.$store.tokenId,
                                this.$commonstore.getStore().userId.toString()
                            ),
                        };
                        this.$commonstore.setStore("pageloading", true);
                        axios
                            .post(this.$dashUserLogout, jsonFormdata, {
                                headers: {
                                    auth_token: this.$store.tokenId,
                                },
                            })
                            .then((res) => {
                                var hashBase64StringValue = aesUtil.methods.decrypt(
                                    this.$store.tokenId,
                                    atob(res.data)
                                );
                                var jsonString = JSON.parse(atob(hashBase64StringValue));
                                this.$store.tokenId = res.headers.auth_token;
                                if (jsonString.id == 0) {
                                    this.$commonstore.setStore('pageloading', false);
                                    return false;
                                } else {
                                    this.$store.$reset();
                                    that.router.push({
                                        path: "/",
                                    });
                                }
                                this.$commonstore.setStore("pageloading", false);
                            });
                        this.themetype = true;
                        this.setcolors();
                    } else {
                        return false;
                    }
                }
            );
        },
        check_screen_size() {
            if (window.innerWidth < 960) {
                this.dropbtnwidth = "135px";
                // this.$commonstore.below960 = true;
                this.$commonstore.setStore("below960", true);
                // return "px-1";
            } else {
                // this.$commonstore.below960 = false;
                this.$commonstore.setStore("below960", false);
                this.dropbtnwidth = "200px";
                // return "px-4";
            }
        },
        setcolors() {
            // this.$commonstore.themetype = this.themetype;
            this.$commonstore.setStore("themetype", this.themetype);

            let bodyStyles = document.body.style;
            if (!this.themetype) {
                bodyStyles.setProperty("--primary-main", "#2c405a");
                bodyStyles.setProperty("--primary-degree", "#2c405a");
                bodyStyles.setProperty("--primary-text", "#fff");
                bodyStyles.setProperty("--primary-text-variant", "#000");
                bodyStyles.setProperty("--primary-bg", "#243449");
                bodyStyles.setProperty("--primary-border", "#3b4f6a");
                bodyStyles.setProperty("--primary-cardheader", "#526680");
                // bodyStyles.setProperty("--primary-cardbody", "#243449");
                bodyStyles.setProperty("--primary-cardbody", "#2a405c");
                bodyStyles.setProperty("--primary-cardborder", "1px solid #526680");
                bodyStyles.setProperty("--primary-chartforeColor", "#fff");
                bodyStyles.setProperty("--primary-button", "#2c405a");
                bodyStyles.setProperty("--primary-second-button", "#fff");
                bodyStyles.setProperty("--primary-filter", "");
                bodyStyles.setProperty("--primary-multicheckbox", "#526680");
                bodyStyles.setProperty("--primary-table-header1", "#526680");
                bodyStyles.setProperty("--primary-table-header2", "#6e7e93");
                bodyStyles.setProperty("--primary-table-color1", "#696969");
                bodyStyles.setProperty("--primary-table-color2", "#5f9ea099");
                bodyStyles.setProperty("--primary-table-subheader", "#fff");
                bodyStyles.setProperty("--primary-hyperLink", "#7373ff");
                bodyStyles.setProperty("--infoIcon", "#ff7000");
                bodyStyles.setProperty("--errorMsg", "#ff5952");
                bodyStyles.setProperty("--editIcon", "#4dbbe1")
            } else {
                bodyStyles.setProperty("--primary-main", "#fff");
                bodyStyles.setProperty("--primary-degree", "#fff");
                bodyStyles.setProperty("--primary-text", "#000");
                bodyStyles.setProperty("--primary-text-variant", "#fff");
                bodyStyles.setProperty("--primary-bg", "#f7f8fa");
                bodyStyles.setProperty("--primary-border", "#bdb5ff63");
                bodyStyles.setProperty("--primary-cardheader", "#fff");
                bodyStyles.setProperty("--primary-cardbody", "#fafbfc");
                bodyStyles.setProperty("--primary-cardborder", "1px solid #c5dbea");
                bodyStyles.setProperty("--primary-chartforeColor", "#000");
                bodyStyles.setProperty("--primary-button", "#5046af");
                bodyStyles.setProperty("--primary-second-button", "#5046af");
                bodyStyles.setProperty(
                    "--primary-filter",
                    "brightness(0) saturate(100%) invert(23%) sepia(68%) saturate(1859%) hue-rotate(230deg) brightness(93%) contrast(86%)"
                );
                bodyStyles.setProperty("--primary-multicheckbox", "#000");
                bodyStyles.setProperty("--primary-table-header1", "#e7e7f5");
                bodyStyles.setProperty("--primary-table-header2", "#f4f4fb");
                bodyStyles.setProperty("--table-color1", "#6e7e93");
                bodyStyles.setProperty("--primary-table-color1", "#f5f5dc");
                bodyStyles.setProperty("--primary-table-color2", "#3e7a4040");
                bodyStyles.setProperty("--primary-table-subheader", "#5046af");
                bodyStyles.setProperty("--primary-hyperLink", "#0000ff");
                bodyStyles.setProperty("--infoIcon", "#2c73b3");
                bodyStyles.setProperty("--errorMsg", "#ff0000");
                bodyStyles.setProperty("--editIcon","#0000ff")
            }
        },
        showselected() {
            this.showlist = !this.showlist;
            this.$commonstore.setStore("showlist", this.showlist);
        },
        showcard() {
            this.showcards = !this.showcards;
            this.$commonstore.setStore("showcards", this.showcards);
        },
        changepasswd() {
            let formData = {
                "id": this.$commonstore.getStore().userId,
                "stringValue": ''
            }
            this.service.post(this.$generateHash, formData).then(response => {
                if (response.id == 1) {
                    this.loginPasswordUniqueKey = response.stringValue;
                    this.$commonstore.setStore("loginPasswordUniqueKey", this.loginPasswordUniqueKey);
                    this.$refs['changepassword'].show()
                } else if (response.id == 0) {
                    this.warnAlert(response.stringValue, '', "failure");
                }
            })

        },
        passwordchageModal() {
            this.$refs['changepassword'].hide()
        },
        updatemobnum() {
            this.$refs['changemobileNum'].hide()
        },
        changemobileNum() {
            this.$refs['changemobileNum'].show();
        },
        modalProfileOpen() {
            this.$refs['modalUserProfile'].show();
        },
        modalProfileClose() {
            this.$refs['modalUserProfile'].hide();
        },
        modalContactUsOpen() {
            this.$refs['contactUs'].show();
        },
        modalContactUsClose() {
            this.$refs['contactUs'].hide()
        },
        nameLoad() {
            let hashBase64StringValue = aesUtil.methods.decrypt(
                this.$store.secureToken,
                atob(this.$commonstore.getStore().data)
            );
            this.userdata = JSON.parse(atob(hashBase64StringValue));
        }
    },
    mounted() {
        this.nameLoad();
        this.setcolors();
        this.selectedOrg = typeof this.$commonstore.getStore().selectBoxOrgList !== "undefined" ? this.$commonstore.getStore().selectBoxOrgList : [];
        this.existOrg = typeof this.$commonstore.getStore().selectExistorg !== "undefined" ? this.$commonstore.getStore().selectExistorg : [];
        this.procuringList = this.$commonstore.getStore().organisation
        setTimeout(() => {
            this.showcards = true;
            this.$commonstore.setStore("showcards", true);
        }, 10000);
    },
    directives: {
        "click-outside": {
            bind: function (el, binding) {
                const bubble = binding.modifiers.bubble;
                const handler = (e) => {
                    if (bubble || (!el.contains(e.target) && el !== e.target)) {
                        binding.value(e);
                    }
                };
                el.__vueClickOutside__ = handler;
                // add Event Listeners
                document.addEventListener("click", handler);
            },
            unbind: function (el) {
                // Remove Event Listeners
                document.removeEventListener("click", el.__vueClickOutside__);
                el.__vueClickOutside__ = null;
            },
        },
    },
};
</script>

<style lang="scss">
.buttonwidth {
    width: 200px !important;
}

@media only screen and (min-width: 960px) {
    .navbar-shadow.px-1 {
        padding-left: 1.5rem !important;
        padding-right: 1.5rem !important;
    }

    .buttonwidth {
        width: 200px !important;
    }
}

@media only screen and (min-width: 768px) and (max-width: 960px) {
    .navbar-shadow.px-1 {
        padding-left: 0px !important;
        padding-right: 0px !important;
    }

}

@media only screen and (max-width: 960px) {
    .buttonwidth {
        width: 135px !important;
    }
}

.headersearch {
    .form-inline {
        border: 1px solid var(--primary-bg) !important;
        background: var(--primary-bg) !important;
        border-radius: 20px !important;
    }

    .input-group-prepend {
        padding: 8px;
    }

    .form-control:focus,
    .custom-select:focus {
        box-shadow: none;
    }

    .form-control {
        border: none !important;
        background: var(--primary-bg) !important;
    }

    .searchicon {
        font-size: 15px !important;
        margin-top: 5px !important;
        color: var(--primary-text) !important;
    }

    ::-webkit-input-placeholder {
        font-size: 14px;
    }
}

.barpipe {
    padding-left: 10px !important;
    color: var(--primary-text);
}

.userheader {
    background: rgb(248, 248, 252);
    border-radius: 10px;
    margin-right: 1%;
    background: #f8f8fc;

    .navbar-brand {
        margin-right: 0px !important;
    }

    button {
        outline: none !important;
        box-shadow: none !important;
    }

    .dropdown-menu {
        li {
            padding: 2px;
        }
    }

    .dropdown-toggle::after {
        font-size: 16px !important;
        color: var(--primary-text);
    }

    .dropdown-item {
        font-size: 14px;

        img {
            padding-right: 10px;
        }
    }
}

.navbar {
    height: 70px !important;
    max-height: 70px !important;
    background: var(--primary-degree);
}

.logoutimg {
    width: 50px;
    height: 50px;
    background: url("@/assets/images/Logout.svg") no-repeat;
}

.logoutimg:hover {
    background: url("@/assets/images/Logout_Mouse_over.svg") no-repeat;
}

.dot {
    height: 25px;
    width: 25px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
    margin-right: 5px !important;
    cursor: pointer;
}

.one-quarter {
    .checkbox {
        opacity: 0;
        position: absolute;
    }

    .label {
        background-color: var(--primary-bg) !important;
        border-radius: 50px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px;
        position: relative;
        height: 26px;
        width: 50px;
        transform: scale(1);
        border: 1px solid #c5dbea;
    }

    .label .ball {
        background-color: #bbb;
        border-radius: 50%;
        position: absolute;
        top: 1px;
        left: 0px;
        height: 22px;
        width: 22px;
        transform: translateX(0px);
        transition: transform 0.2s linear;
    }

    .checkbox:checked+.label .ball {
        transform: translateX(24px);
    }

    .navbar:after {
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    }
}

.bgbuttonclr {
    background: var(--primary-bg) !important;
    border-radius: 8px;
    width: 140px;
    padding: 10px 10px;
}

.txt-wrap {
    overflow: hidden;
    display: inline-block;
    text-overflow: ellipsis;
}

.filtersecondrow {

    select {
        line-height: 14px;
        border-radius: 12px;
        height: 28px !important;
        max-height: 28px !important;
        // background: var(--primary-cardheader) !important;
        color: var(--primary-text);

    }

    .form-control:focus,
    .custom-select:focus {
        box-shadow: none;
    }

    ::-webkit-input-placeholder {
        font-size: 13px;
        color: var(--primary-text);
    }

    .procuring_input {
        line-height: 28px;
        font-size: 13px;
        // max-width: 88%;
        border-radius: 12px;
        height: 36px !important;
        max-height: 36px !important;
        // background-color: var(--primary-cardheader) !important;
        // color: var(--primary-text);
        //   background: #fff url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5' viewBox='0 0 4 5'%3e%3cpath fill='black' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e") no-repeat right .75rem center/8px 10px !important;
    }
}

.suggestion,
.suggestion:focus {
    // width: -webkit-fill-available;
    width: 450px !important;
    padding: 0px 10px 5px 10px;
    z-index: 999;
    position: absolute;

    background-color: var(--primary-cardheader) !important; //#e5e2ff;
    // border-bottom-left-radius: 12px;
    // border-bottom-right-radius: 12px;
    border-radius: 12px;
    border-top: 1px solid var(--primary-cardheader);
    // box-shadow: var(--primary-multicheckbox) 0px 2px 4px;
    border: 1px solid var(--primary-border);
    // height: 250px !important;
    overflow-y: auto;

    li {
        color: var(--primary-text);

        label {
            font-size: 15px;
        }
    }

    .noRecord {
        color: var(--primary-text);
        text-align: center;
    }

    .buttoncss {
        // background: #fff;
        padding: 5px;
        position: sticky;
        top: 0px;
        // text-align: end;
        float: right;
    }
}

.tippy-box[data-theme~="customs"] {
    background-color: #ff7400;

}

.tippy-box[data-theme~="customs"][data-placement^='bottom']>.tippy-arrow::before {
    border-bottom-color: #ff7400;
}
</style>

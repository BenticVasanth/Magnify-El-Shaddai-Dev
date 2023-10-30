<template>
<div class="loginpagecss">
    <div class="login_img_head">
        <h1>Tenders Tamilnadu</h1>
        <h4>eProcurement Analysis</h4>
    </div>
    <b-card class="logincard mb-3">
        <img center src="@/assets/images/tn_Emblem.svg" rounded="circle" style="width: 18% !important;">
        <p center class="mt-3 mb-2 font-weight-bold">REGISTER</p>
        <b-form>
            <b-row>
                <b-form-group id="input-group-1" class="mr-3">
                    <label class="font-weight-bold pt-0 float-left lableTxt" for="name">Name <sup class="asterisk">*</sup></label>
                    <b-input-group>
                        <b-form-input size="lg" id="name" maxlength="20" oncopy="return false" onpaste="return false" v-model="userName" type="text" placeholder="Enter Name" required autocomplete="off" v-on:keyup.enter="saveUser"></b-form-input>
                    </b-input-group>
                    <p v-if="errors.nameError" class="beforloginerrorMsg"><i class="fa fa-exclamation-circle" aria-hidden="true"></i>{{errors.nameError}}</p>
                </b-form-group>

                <b-form-group id="input-group-2">
                    <label class="font-weight-bold pt-0 float-left lableTxt" for="mobileNo">Date of Birth <sup class="asterisk">*</sup></label>
                    <b-input-group v-on:keyup.enter="saveUser">
                        <date-picker v-model="dob" format="DD-MM-YYYY" oncopy="return false" onpaste="return false" :clearable="false" type="date" placeholder="Select Date" required autocomplete="off"></date-picker>
                    </b-input-group>
                    <p v-if="errors.dobError" class="beforloginerrorMsg"><i class="fa fa-exclamation-circle" aria-hidden="true"></i>{{errors.dobError}}</p>
                </b-form-group>
            </b-row>
            <b-row>
                <b-form-group id="input-group-3" class="mr-3">
                    <label class="font-weight-bold pt-0 float-left lableTxt" for="email">Email <sup class="asterisk">*</sup></label>
                    <b-input-group>
                        <b-form-input size="lg" id="email" v-model="userEmail" oncopy="return false" onpaste="return false" type="Email" placeholder="Enter Email" required autocomplete="off" v-on:keyup.enter="saveUser"></b-form-input>
                    </b-input-group>
                    <p v-if="errors.emailError" class="beforloginerrorMsg"><i class="fa fa-exclamation-circle" aria-hidden="true"></i>{{errors.emailError}}</p>
                </b-form-group>

                <b-form-group id="input-group-2">
                    <label class="font-weight-bold pt-0 float-left lableTxt" for="mobileNo">Mobile Number <sup class="asterisk">*</sup></label>
                    <b-input-group>
                        <template #prepend>
                            <b-input-group-text> <img center style="width: 35% !important;" src="@/assets/images/ind_Flag.svg"><span class="pl-2" style="font-size:14px !important;">+91</span></b-input-group-text>
                        </template>
                        <b-form-input size="lg" id="mobileNo" v-model="userMobileNumber" oncopy="return false" onpaste="return false" maxlength="10" type="text" placeholder="Enter Mobile Number" required class="form-floating" autocomplete="off" v-on:keypress="onlyNumeric($event)" v-on:keyup.enter="saveUser"></b-form-input>
                    </b-input-group>
                    <p v-if="errors.mobileError" class="beforloginerrorMsg"><i class="fa fa-exclamation-circle" aria-hidden="true"></i>{{errors.mobileError}}</p>
                </b-form-group>
            </b-row>
            <b-row>
                <b-form-group id="input-group-3" class="mr-3">
                    <label class="font-weight-bold pt-0 float-left lableTxt" for="designation">Designation <sup class="asterisk">*</sup></label>
                    <b-input-group>
                        <b-form-input size="lg" id="designation" v-model="designation" type="text" oncopy="return false" onpaste="return false" placeholder="Enter Designation" required autocomplete="off" v-on:keyup.enter="saveUser"></b-form-input>
                    </b-input-group>
                    <p v-if="errors.designationError" class="beforloginerrorMsg"><i class="fa fa-exclamation-circle" aria-hidden="true"></i>{{errors.designationError}}</p>
                </b-form-group>

                <b-form-group id="input-group-3">
                    <label class="font-weight-bold pt-0 float-left lableTxt" for="address">Address <sup class="asterisk">*</sup></label>
                    <b-input-group>
                        <b-form-input size="lg" id="address" v-model="address" type="text" oncopy="return false" onpaste="return false" placeholder="Enter Address" required autocomplete="off" v-on:keyup.enter="saveUser"></b-form-input>
                    </b-input-group>
                    <p v-if="errors.addressError" class="beforloginerrorMsg"><i class="fa fa-exclamation-circle" aria-hidden="true"></i>{{errors.addressError}}</p>
                </b-form-group>
            </b-row>
            <b-row>
                <b-form-group id="input-group-5" class="mr-3">
                    <label class="font-weight-bold pt-0 float-left lableTxt" for="password">Password <sup class="asterisk">*</sup>
                        <i class="fa fa-info ml-2" v-b-tooltip.right.hover.html="passwordPolicy" aria-hidden="true"></i></label>
                    <b-input-group>
                        <b-form-input size="lg" id="password" @input="getenteredpassword" oncopy="return false" onpaste="return false" v-model="password" :type="newPwd ? 'password' : 'text'" placeholder="Enter Password" required autocomplete="off" v-on:keyup.enter="saveUser"></b-form-input>
                        <div class="eyeIcon">
                            <i class="fa curPnt" :class="newPwd ? 'fa-eye-slash' : 'fa-eye'" :title="newPwd ? 'Show' : 'Hide'" @click="newPwd = !newPwd" aria-hidden="true"></i>
                        </div>
                    </b-input-group>
                    <p v-if="errors.passwordError" class="beforloginerrorMsg"><i class="fa fa-exclamation-circle" aria-hidden="true"></i>{{errors.passwordError}}</p>
                </b-form-group>
                <b-form-group id="input-group-6">
                    <label class="font-weight-bold pt-0 float-left lableTxt" for="confirmPassword">Confirm Password <sup class="asterisk">*</sup>
                        <i class="fa fa-info ml-2" v-b-tooltip.right.hover.html="passwordPolicy" aria-hidden="true"></i></label>
                    <b-input-group>
                        <b-form-input size="lg" id="confirmPassword" oncopy="return false" onpaste="return false" v-model="confirmPassword" :type="cfmPwd ? 'password' : 'text'" placeholder="Enter Confirm Password" @input="getenteredcnfpassword" required autocomplete="off" v-on:keyup.enter="saveUser"></b-form-input>
                        <div class="eyeIcon">
                            <i class="fa curPnt" :class="cfmPwd ? 'fa-eye-slash' : 'fa-eye'" :title="cfmPwd ? 'Show' : 'Hide'" @click="cfmPwd = !cfmPwd" aria-hidden="true"></i>
                        </div>
                    </b-input-group>
                    <p v-if="errors.confirmPasswordError" class="beforloginerrorMsg"><i class="fa fa-exclamation-circle" aria-hidden="true"></i>{{errors.confirmPasswordError}}</p>
                </b-form-group>
            </b-row>
            <b-row>
                <b-form-group id="input-group-4" class="mr-3">
                    <label class="font-weight-bold pt-0 float-left lableTxt" for="userRoles">User Roles <sup class="asterisk">*</sup></label>
                    <b-input-group>
                        <select class="form-control " id="userRoles" v-model="userRoles" placeholder="Select">
                            <option value="">-Select-</option>
                            <option v-for="option in userRolesList" v-bind:value="option.stringValue" v-bind:key="option.id">
                                {{option.stringValue}}
                            </option>
                        </select>
                    </b-input-group>
                    <p v-if="errors.userRoleError" class="beforloginerrorMsg"><i class="fa fa-exclamation-circle" aria-hidden="true"></i>{{errors.userRoleError}}</p>
                </b-form-group>
                <b-form-group id="input-group-7">
                    <label class="font-weight-bold pt-0 float-left lableTxt" for="captcha">Captcha <sup class="asterisk">*</sup></label>
                    <b-input-group class="capImg">
                        <CaptchaPage id="captcha" ref="captcha" @onEnterClick="onEnterClick" style="height: 35px !important;"></CaptchaPage>
                    </b-input-group>
                    <p v-if="errors.captchaError" class="beforloginerrorMsg"><i class="fa fa-exclamation-circle" aria-hidden="true"></i>{{errors.captchaError}}</p>
                </b-form-group>
            </b-row>
            <b-row v-if="userRoles == 'ORGANISATION'">
                <b-form-group id="input-group-4">
                    <label class="font-weight-bold pt-0 float-left lableTxt orgLevel curPnt" for="userRoles" @click="orgUserList()">Select Organisation & Department</label>
                    <p v-if="errors.userRoleError" class="beforloginerrorMsg"><i class="fa fa-exclamation-circle" aria-hidden="true"></i>{{errors.userRoleError}}</p>
                </b-form-group>
            </b-row>
            <p v-if="commonError" class="beforloginerrorMsg"><i class="fa fa-exclamation-circle" aria-hidden="true"></i>{{commonError}}</p>
        </b-form>

        <b-button size="lg" class="b-radius btncustom text-uppercase mb-2 mt-3" block variant="primary" :disabled='isSave' @click="saveUser()"><span>Register</span> </b-button>
        <div class="center-or">
            <h2 class="outer-h2"></h2><span class="outer-span">or</span>
            <h2 class="outer-h2"></h2>
        </div>
        <b-button size="lg" class="b-radius btncustom text-uppercase mt-2" block variant="outline-primary" @click="backToLogin()"><span>Back to Login</span></b-button>
    </b-card>
</div>
<b-modal ref="my-modal" id="my-modal" no-close-on-backdrop size="xl" hide-footer class="loginpagecss" title="Select Organisation & Departmrnt">
    <div>
        <!-- Organisation Users -->
        <b-card-group deck>
            <b-card header="Organisation" header-tag="header">
                <div v-click-outside="hideOrgUsers">
                    <b-input-group class="mt-3">
                        <b-form-input id="orgUser" maxlength="20" v-model="searchName" @click="showOrgUsers()" @keyup="getOrgData()" type="text" placeholder="Select Organisation" autocomplete="off"></b-form-input>
                        <b-input-group-append>
                            <b-button class="btn-primary btncustom" id="searchBtn" block variant="primary" @click="showOrgUsers()"><i class="fa fa-search" aria-hidden="true"></i></b-button>
                        </b-input-group-append>
                    </b-input-group>

                    <div v-if="orgUsers" class="suggestion">
                        <div class="d-flex justify-content-between mb-1" v-if="orgList.length">
                            <span class="curPnt" @click="selectOrg()"> {{orgList.length != orgName.length ? 'Select All' : 'Deselect All'}}</span>
                            <span class="curPnt" @click="apply()">Apply</span>
                        </div>
                        <div class="d-flex justify-content-between mb-1" v-else>No Record Found</div>
                        <ul>
                            <li v-for="(option,index) in orgList" :key="index">
                                <input v-model="orgName" :value="option.id" type="checkbox" :id="'orgChk_'+index" class="align-middle">
                                <label :for="'orgChk_'+index" class="pl-1 pr-3 mb-1">{{option.stringValue}}</label>
                            </li>
                        </ul>

                    </div>
                </div>

                <div class="boxborder my-2 row col-md-12 col-lg-12 orgli">
                    <ul class="viewOrgList " v-if="showSelectedOrgs">
                        <li v-for="(orgId,index) in selectedOrgList" :key="index">
                            <p>{{orgId.stringValue}}<span class="badge"><i class="fa fa-times text-red crossmark curPnt" @click="removeOrgList(orgId.id)"></i></span></p>
                        </li> <!-- -->
                    </ul>
                </div>
            </b-card>

            <!-- Department Users -->
            <b-card header="Departments of selected Organisation(s)" header-tag="header">
                <div class="boxborder my-2 row col-md-12 col-lg-12 orgli">
                    <ul class="viewDeptList viewOrgList">
                        <li v-for="(questions, propertyName, index) in selectedDeptList" :key="index" class="li">
                            <label class="orgTitle">{{propertyName}}</label><br>
                            <span v-for="(dept,dindex) in questions" :key="dindex">
                                <input class="align-middle" :value="dept" v-model="questions[dindex].checked" type="checkbox" :id="index+'deptChk_'+dindex">
                                <label :for="index+'deptChk_'+dindex" class="pl-1 pr-3 mb-1">{{dept.stringValue}}</label>
                            </span>
                            <div class="horizontalDivider"></div>
                        </li>
                    </ul>
                </div>
            </b-card>
        </b-card-group>
        <div class="d-flex col-md-6 float-right">
            <b-button size="sm" class="b-radius btncustom text-uppercase mb-2 mt-3 mr-3 pageBackbtn" block @click="clearOrg()"><span>Reset</span> </b-button>
            <b-button size="sm" class="b-radius btncustom text-uppercase mb-2 mt-3" block variant="primary" @click="continueU()"><span>Continue</span> </b-button>
        </div>
    </div>
</b-modal>
<FooterLogoPage />
</template>

<script>
import axios from "axios";
import CaptchaPage from "@/components/common/Captcha";
import CommonJS from "@/assets/js/common.js";
import ValidationsJS from "@/assets/js/validations.js";
import FooterLogoPage from "@/components/common/FooterLogo";
import aesUtil from '@/assets/js/aesUtil.js';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
var sha512 = require('js-sha512');
export default {
    data() {
        return {
            commonError: '',
            passwordError: '',
            confirmPasswordError: '',
            userName: '',
            userMobileNumber: '',
            userEmail: '',
            password: '',
            confirmPassword: '',
            dob: '',
            errors: [],
            userRolesList: [],
            orgUsersAry: [],
            deptUsersAry: [],
            selected: null,
            userRoles: '',
            orgUsers: false,
            deptUsers: false,
            orgList: [],
            orgName: [],
            searchName: '',
            selectedOrgList: [],
            showSelectedOrgs: false,
            selectedDeptList: [],
            deptName: [],
            departmentList: [],
            newPwd: true,
            cfmPwd: true,
            isSave: false
        }
    },
    mixins: [CommonJS, ValidationsJS],
    name: 'RegisterPage',
    props: {
        msg: String
    },
    components: {
        CaptchaPage,
        FooterLogoPage,
        DatePicker
    },
    methods: {
        backToLogin() {
            this.$router.push({
                path: '/'
            });
        },
        getenteredpassword() {
            this.errors = [];
            if (!this.IsValidPassword(this.password)) {
                this.errors['passwordError'] = 'Password does not meet the password policy.';
            }
        },
        getenteredcnfpassword() {
            this.errors = [];
            if (!this.IsValidPassword(this.password)) {
                this.errors['passwordError'] = 'Password does not meet the password policy.';
            }
            if (this.password != this.confirmPassword) {
                this.errors['confirmPasswordError'] = 'Password & Confirm Password does not match.';
            }
        },
        onEnterClick() {
            this.saveUser()
        },
        saveUser() {

            if (this.userRoles == 'ORGANISATION' && this.departmentList == '') {
                this.warnAlert('Please Select the Orgnisation', '', 'warning')
            } else if (this.userName && this.dob && this.designation && this.address && this.userRoles && this.userMobileNumber && this.userEmail && this.password && this.confirmPassword && this.$refs.captcha.captchaEnteredValue) {
                this.commonError = '';
                this.errors = [];
                if (!this.IsValidPassword(this.password)) {
                    this.errors['passwordError'] = 'Password does not meet the password policy.';
                }
                if (this.password != this.confirmPassword) {
                    this.errors['confirmPasswordError'] = 'Password & Confirm Password does not match.';
                }
                let fldInfoObj = [];
                let userNameFld = {
                    "id": 'name',
                    "modelVal": this.userName,
                    "validation": "genericValidation",
                    "lenVal": 3,
                    "msg": "Name ",
                    "mVal": "nameError"
                };
                let dobMinAgeCheck = {
                    "id": 'dob',
                    "modelVal": this.dob,
                    "validation": "dobMinAgeCheck",
                    "msg": "Age must be greater than 18.",
                    "mVal": "dobError"
                }
                let dobMaxAgeCheck = {
                    "id": 'dob',
                    "modelVal": this.dob,
                    "validation": "dobMaxAgeCheck",
                    "msg": "Age cannot be greater than 100.",
                    "mVal": "dobError"
                }
                let designationFld = {
                    "id": 'designation',
                    "modelVal": this.designation,
                    "validation": "genericValidation",
                    "lenVal": 3,
                    "msg": "designation ",
                    "mVal": "designationError"
                };
                let addressFld = {
                    "id": 'address',
                    "modelVal": this.address,
                    "validation": "genericValidation",
                    "lenVal": 3,
                    "msg": "address ",
                    "mVal": "addressError"
                };
                let emailFld = {
                    "id": 'email',
                    "modelVal": this.userEmail,
                    "validation": "allowEmailValidation",
                    "lenVal": 20,
                    "msg": "Please enter valid Email ",
                    "mVal": "emailError"
                };
                let userRoleFld = {
                    "id": 'role',
                    "modelVal": this.userRoles,
                    "validation": "dropDown",
                    "msg": "Please select",
                    "mVal": "userRoleError"
                };
                let mobileFld = {
                    "id": 'mobileNo',
                    "modelVal": this.userMobileNumber,
                    "validation": "mobileNumber",
                    "lenVal": 10,
                    "msg": "Please enter valid mobile number.",
                    "mVal": "mobileError"
                };
                let captchaFld = {
                    "modelVal": "",
                    "validation": "captcha",
                    "msg": "Invalid Captcha",
                    "mVal": "captchaError"
                };
                fldInfoObj.push(userNameFld);
                fldInfoObj.push(dobMinAgeCheck);
                fldInfoObj.push(dobMaxAgeCheck);
                fldInfoObj.push(designationFld);
                fldInfoObj.push(addressFld);
                fldInfoObj.push(emailFld);
                fldInfoObj.push(userRoleFld);
                fldInfoObj.push(mobileFld);
                fldInfoObj.push(captchaFld);
                let valid = this.specialValidation(fldInfoObj)
                if (Object.keys(this.errors).length == 0 && valid) {
                    let formData = {
                        id: "",
                        userName: this.userName,
                        mobileIsdCode: "91",
                        mobileNo: this.userMobileNumber,
                        emailId: this.userEmail,
                        password: sha512(this.password),
                        confirmPassword: sha512(this.confirmPassword),
                        dateOfBirth: this.changeDateFormat(this.dob),
                        designation: this.designation,
                        officeAddress: this.address,
                        userRole: this.userRoles,
                        orgChainList: this.departmentList
                    };
                    var jsonFormdata = {
                        id: "",
                        stringValue: aesUtil.methods.commonEncrypt(this.$store.tokenId, JSON.stringify(formData)),
                    };
                    this.$commonstore.setStore('pageloading', true);
                    axios.post(this.$saveDashUserCreation, jsonFormdata, {
                        headers: {
                            'auth_token': this.$store.tokenId
                        }
                    }).then((res) => {
                        this.isSave = true;
                        var hashBase64StringValue = aesUtil.methods.decrypt(this.$store.tokenId, atob(res.data));
                        var hashJsonString = JSON.parse(atob(hashBase64StringValue));
                        this.$store.tokenId = res.headers.auth_token;
                        let that = this;
                        if (hashJsonString == 'Success') {
                            this.warnAlert('User Registered Successfully', '', 'success').then(function () {
                                that.isSave = false;
                                that.router.push({
                                    path: "/"
                                });
                            });
                        } else {
                            this.warnAlert(hashJsonString, '', 'warning').then(function () {
                                that.isSave = false;
                            })
                        }
                        this.$commonstore.setStore('pageloading', false);
                    })
                }
            } else {
                this.commonError = 'Please Enter the Fields.'
                return false;
            }
        },
        deptList(nameOrg = '') {
            var token = this.$store.tokenId;
            let orgCount = nameOrg == '' ? this.orgName.length : this.selectedOrgList.length;
            if (orgCount) {
                let formData = {
                    id: '',
                    stringValue: '',
                    list: this.selectedOrgList.map(x => x.id)
                };
                var jsonFormdata = {
                    id: '',
                    stringValue: aesUtil.methods.commonEncrypt(this.$store.tokenId, JSON.stringify(formData))
                };
                this.deptName = [];
                this.$commonstore.setStore('pageloading', true);
                axios.post(this.$getDeptList, jsonFormdata, {
                    headers: {
                        'auth_token': this.$store.tokenId
                    }
                }).then(res => {
                    var hashBase64StringValue = aesUtil.methods.decrypt(token, atob(res.data));
                    var hashJsonString = JSON.parse(atob(hashBase64StringValue));
                    this.$store.tokenId = res.headers.auth_token;
                    this.selectedDeptList = hashJsonString;
                    this.selectedDeptList = this.selectedDeptList.reduce(function (rv, x) {
                        (rv[x['anotherStringValue']] = rv[x['anotherStringValue']] || []).push(x);
                        return rv;
                    }, {});
                    this.$commonstore.setStore('pageloading', false);
                })
                this.$refs['my-modal'].show()
            } else {
                if (nameOrg == '') {
                    this.warnAlert('Please select Organisation', '', 'warning')
                }
            }
        },
        showOrgUsers() {
            var selectedIds = [];
            let setUpCrudeArra = [];
            this.selectedOrgList.filter((x) => {
                selectedIds.push(x.id)
            })
            for (var i = 0; i < this.orgList.length; i++) {
                if (this.selectedOrgList.length > 0) {
                    if (!selectedIds.includes(this.orgList[i].id)) {
                        var obj = {};
                        obj['id'] = this.orgList[i].id;
                        obj['stringValue'] = this.orgList[i].stringValue;
                        setUpCrudeArra.push(obj);
                    }
                } else {
                    var obj1 = {};
                    obj1['id'] = this.orgList[i].id;
                    obj1['stringValue'] = this.orgList[i].stringValue;
                    setUpCrudeArra.push(obj1);
                }
            }
            this.orgList = setUpCrudeArra;
            this.orgUsers = true;
        },
        hideOrgUsers() {
            this.orgUsers = false;
        },
        orgUserList(nameOrg = '') {
            if (this.userRoles == 'Portal') {
                this.clearOrg();
            } else {
                var token = this.$store.tokenId;
                let formData = {
                    id: '',
                    stringValue: nameOrg
                };
                var jsonFormdata = {
                    id: '',
                    stringValue: aesUtil.methods.commonEncrypt(this.$store.tokenId, JSON.stringify(formData))
                };
                this.orgName = [];
                this.$commonstore.setStore('pageloading', true);
                axios.post(this.$getOrgList, jsonFormdata, {
                    headers: {
                        'auth_token': this.$store.tokenId
                    }
                }).then(res => {
                    var hashBase64StringValue = aesUtil.methods.decrypt(token, atob(res.data));
                    var hashJsonStr = JSON.parse(atob(hashBase64StringValue));
                    this.$store.tokenId = res.headers.auth_token;
                    var selectedIds = [];
                    let setUpCrudeArra = [];
                    this.selectedOrgList.filter((x) => {
                        selectedIds.push(x.id)
                    })
                    for (var i = 0; i < hashJsonStr.length; i++) {
                        if (this.selectedOrgList.length > 0) {
                            if (!selectedIds.includes(hashJsonStr[i].id)) {
                                var obj = {};
                                obj['id'] = hashJsonStr[i].id;
                                obj['stringValue'] = hashJsonStr[i].stringValue;
                                setUpCrudeArra.push(obj);
                            }
                        } else {
                            var obj1 = {};
                            obj1['id'] = hashJsonStr[i].id;
                            obj1['stringValue'] = hashJsonStr[i].stringValue;
                            setUpCrudeArra.push(obj1);
                        }
                    }
                    this.orgList = setUpCrudeArra;
                    this.$commonstore.setStore('pageloading', false);
                })
                this.$refs['my-modal'].show()
            }
        },
        showDeptUsers() {
            this.deptUsers = true;
        },
        hideDeptUsers() {
            this.deptUsers = false;
        },
        userRoleList() {
            let formData = {
                id: '',
                stringValue: ''
            };

            setTimeout(() => {
                var token = this.$store.tokenId;
                var jsonFormdata = {
                    id: '',
                    stringValue: aesUtil.methods.commonEncrypt(this.$store.tokenId, JSON.stringify(formData))
                };
                this.$commonstore.setStore('pageloading', true);
                axios.post(this.$dashUserGetDetails, jsonFormdata, {
                    headers: {
                        'auth_token': this.$store.tokenId
                    }
                }).then(res => {
                    var hashBase64StringValue = aesUtil.methods.decrypt(token, atob(res.data));
                    var hashJsonString = JSON.parse(atob(hashBase64StringValue));
                    this.$store.tokenId = res.headers.auth_token;
                    this.userRolesList = hashJsonString;
                    this.$commonstore.setStore('pageloading', false);
                })
            }, 1000);
        },
        selectOrg() {
            if (this.orgList.length != this.orgName.length) {
                this.orgName = [];
                let list = this.orgList.map(x => x.id)
                this.orgName = list;
            } else {
                this.orgName = [];
            }
        },
        removeOrgList(orgId) {
            this.warnAlert('Departments under the Organisation will also be removed', '', 'confirm').then((isDelete) => {
                if (isDelete) {
                    this.orgName = this.orgName.filter(x => x != orgId)
                    let removedOrg = this.selectedOrgList.find(x => x.id == orgId)
                    this.selectedOrgList = this.selectedOrgList.filter(x => x.id != orgId)
                    this.selectedDeptList = [];
                    this.orgList.push(removedOrg)
                    this.deptList('remain');
                }
            })
        },
        getOrgData() {
            if (this.searchName.length > 2) {
                this.orgUserList(this.searchName)
            } else if (this.searchName.length == 0) {
                this.orgUserList()
            }
        },
        removeDeptList(deptId = '', orgId = '') {
            this.selectedDeptList = this.selectedDeptList.filter(function (x) {
                if (!(x.id == deptId && x.secondLong == orgId)) {
                    return x
                }
            });
        },
        apply() {            
            let obj = [];
            this.orgList.filter((x) => {
                if (this.orgName.find(y => y == x.id)) {
                    obj.push(x);
                }
            })
            if (this.selectedOrgList.length) {
                this.warnAlert('If you add a new Organisation,selected Departments will be reset', '', 'confirm').then((willAdd) => {
                    if (willAdd) {
                        obj.filter((x) => {
                            let o = this.selectedOrgList.find(y => y.id == x.id)
                            if (!o) {
                                this.selectedOrgList.push(x)
                            }
                        })
                        this.deptList();
                    } else {
                        this.orgName = [];
                    }
                })
            } else {
                this.selectedOrgList = obj;
                this.deptList();
            }
            this.showSelectedOrgs = true;
            this.orgUsers = false
        },
        continueU() {
            let dList = Object.keys(this.selectedDeptList).map(i => this.selectedDeptList[i])
            let selectedDeptIds = [];
            dList.filter((x) => {
                let obj = {};
                let cnt = 0;
                let orId = ''
                let dIds = [];
                x.filter((y) => {
                    orId = y.longValue
                    if (y.checked) {
                        cnt = cnt + 1;
                        dIds.push(y.id)
                    } else {
                        dIds = dIds.filter(item => item.id !== y.id)
                    }
                })
                let cntt = (cnt == x.length) ? 0 : cnt
                obj.orgId = orId;
                obj.deptList = cntt == 0 ? [] : dIds
                selectedDeptIds.push(obj)
            })
            if (selectedDeptIds.length) {
                this.selectedOrgList.filter((x) => {
                    let isOrgId = false
                    selectedDeptIds.filter((y) => {
                        if (y.orgId == x.id) {
                            isOrgId = true
                        }
                    })
                    if (!isOrgId) {
                        selectedDeptIds.push({
                            orgId: x.id,
                            deptList: []
                        })
                    }
                })
            } else {
                selectedDeptIds = [];
                this.selectedOrgList.filter((x) => {
                    selectedDeptIds.push({
                        orgId: x.id,
                        deptList: []
                    })
                })
            }
            this.departmentList = selectedDeptIds
            this.$refs['my-modal'].hide()
        },
        clearOrg() {
            this.warnAlert('Are you sure want to reset the Organisation', '', 'confirm').then((willRemove) => {
                if (willRemove) {
                    this.selectedDeptList = [];
                    this.orgName = [];
                    this.selectedOrgList = [];
                    this.searchName = '';
                }
            })
        }
    },
    mounted() {
        this.userRoleList();
    },
    directives: {
        'click-outside': {
            bind: function (el, binding) {
                const bubble = binding.modifiers.bubble
                const handler = (e) => {
                    if (bubble || (!el.contains(e.target) && el !== e.target)) {
                        binding.value(e)
                    }
                }
                el.__vueClickOutside__ = handler;
                // add Event Listeners
                document.addEventListener('click', handler)
            },
            unbind: function (el) {
                // Remove Event Listeners
                document.removeEventListener('click', el.__vueClickOutside__)
                el.__vueClickOutside__ = null;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
#name,
#email,
#userRoles,
#designation,
#address {
    border-radius: 12px !important;
}

#password,
#confirmPassword {
    border-top-left-radius: 12px !important;
    border-bottom-left-radius: 12px !important;
}

sup {
    top: -0.25em !important;
}

.loginpagecss .btncustom {
    height: 40px !important;
}

.loginpagecss {
    .logincard {
        width: 35%;
        max-width: 35%;
    }

    .input-group input,
    .input-group select {
        height: 35px !important;
        font-size: 14px !important;
    }
}

.beforloginerrorMsg {
    font-size: 12px !important;
}

a:hover {
    text-decoration: none;
}

.orgli {
    padding: 0px;
    margin: 0px;
    max-width: 100%;
}

.viewOrgList {
    margin-bottom: 0;
    min-height: 20rem;
    max-height: 20rem;
    overflow-y: auto;
    padding: 8px 5px;
    width: 100%;
}

.viewOrgList li p {
    padding: 1px 10px;
    border-radius: 23px;
    background: #f5f5f5;
    border: 1px solid #ccc;
    color: #124384;
    font-weight: 500;
    font-size: 11px;
    letter-spacing: 0.4px;
    margin-bottom: 5px;
}

.viewOrgList li p:before {
    content: "\F105";
    color: #ee7d3f;
    font-family: "FontAwesome";
    padding-right: 5px;
    font-size: 14px;
    font-weight: bold;
}

.viewOrgList li {
    width: auto !important;
    margin: 0px !important;
    display: inline-block;
    padding: 5px;
}

.viewOrgList li.li {
    width: 100% !important;
}

.viewDeptList {
    min-height: 23rem;
    max-height: 23rem;
}

.badge {
    display: inline-block;
    padding: 0.25em 0em 0.25em 1.5em;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.25rem;
    -webkit-transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
}

.boxborder {
    border: 2px solid #e5e2ff;
    box-shadow: none;
    border-radius: 12px;
    font-size: 13px;
    box-shadow: 0 0 2px #e5e2ff;
    min-height: 20rem;
}

.crossmark {
    font-size: 13px;
}

.text-red {
    color: rgb(244, 67, 54) !important;
}

.suggestion,
.suggestion:focus {
    width: 84.8%;
    padding: 5px 10px;
    z-index: 1;
    position: absolute;
    background-color: #edecfb; //#e5e2ff;
    border-bottom-left-radius: 12px;
    border-top: 1px solid #5046af;
    box-shadow: #e5e2ff 0px 2px 4px;
    height: 250px !important;
    overflow-y: auto;
}

#orgUser {
    border-radius: none;
    background-color: #edecfb;
    border: none;
}

#searchBtn {
    border-radius: 0 12px 12px 0;
}

.form-control:focus,
.custom-select:focus {
    box-shadow: none;
}

.suggestion span,
.orgLevel {
    font-weight: 500;
    font-style: italic;
    color: #ee7d3f;
    text-decoration: underline;
}

.row {
    display: flex;
    flex-wrap: nowrap;
    margin-right: 0;
    margin-left: 0;
}

.loginpagecss .logincard .form-group {
    width: 100% !important;
}

.orgTitle {
    color: #ee7d3f;
    font-weight: 500;
    font-size: 14px;
}

.card-deck {
    height: 30rem !important;
}

.custom-control-label::after {
    content: "\F00C";
    font-family: "FontAwesome";
    color: #ffffff;
    background-image: none;
    top: 3px;
    font-size: 12px;
    left: -21px;
}

.eyeIcon {
    height: 35px !important;
    box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%)
}

.fa-eye:before,
.fa-eye-slash:before {
    vertical-align: super;
}

.suggestion ul {
    list-style-type: none;
    padding-left: 10px;
    line-height: 25px;

    li label {
        vertical-align: middle;
    }
}

@media only screen and (max-width: 2560px) {
    .loginpagecss {
        background-position: left !important;
        background-size: 100% 100% !important;

        .logincard {
            width: 32% !important;
            max-width: 32% !important;
        }
    }
}

@media only screen and (max-width: 1440px) {
    .loginpagecss {
        background-position: left !important;
        background-size: 90% !important;

        .logincard {
            width: 38% !important;
            max-width: 38% !important;
            margin-top: 3% !important;
        }
    }
}

@media only screen and (max-width: 1200px) {
    .loginpagecss {
        background-position: left !important;
        background-size: 150% 110% !important;

        .logincard {
            width: 50% !important;
            max-width: 50% !important;
            margin-top: 3% !important;
            float: unset;
        }
    }
}

@media only screen and (max-width: 1024px) {
    .loginpagecss {
        background-position: left !important;
        background-size: 160% !important;

        .logincard {
            width: 55% !important;
            max-width: 55% !important;
            margin-top: 3% !important;
        }
    }
}

@media only screen and (max-width: 768px) {
    .loginpagecss {
        background-position: left !important;
        background-size: 160% !important;

        .logincard {
            width: 55% !important;
            max-width: 55% !important;
            margin-top: 3% !important;
        }
    }
}
</style>

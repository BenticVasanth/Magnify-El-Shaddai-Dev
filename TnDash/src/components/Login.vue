<template>
<img center class="loginimg" src="@/assets/images/tn_Emblem.svg" rounded="circle" style="width: 20%;">
<p center class="mt-3 font-weight-bold" v-if="!forgotpage">LOGIN</p>
<p center class="mt-3 font-weight-bold" v-if="forgotpage">FORGOT PASSWORD</p>
<b-form>
    <b-form-group id="input-group-1">
        <label class="font-weight-bold pt-0 float-left lableTxt" for="mobileNo">Mobile Number <sup class="asterisk">*</sup></label>
        <b-input-group>
            <template #prepend>
                <b-input-group-text> <img center class="loginimg" src="@/assets/images/ind_Flag.svg"><span class="pl-2 loginimg">+91</span></b-input-group-text>
            </template>
            <b-form-input size="lg" id="mobileNo" maxlength="10" autocomplete="off" v-model="formMobile" type="text" placeholder="Enter Mobile Number" class="form-floating" v-on:keypress="onlyNumeric($event)" v-on:keyup.enter="onEnterClick"></b-form-input>
        </b-input-group>
        <p class="beforloginerrorMsg" v-if="errors.hasOwnProperty('mobileError')"><i class="fa fa-exclamation-circle" aria-hidden="true"></i>{{errors.mobileError}}</p>
    </b-form-group>
    <b-form-group v-if="passwordVisible" id="input-group-2">
        <label class="font-weight-bold mb-0 mt-2 float-left lableTxt" for="password">Password <sup class="asterisk">*</sup></label>
        <b-input-group>
            <b-form-input size="lg" id="password" maxlength="15" autocomplete="off" v-model="formPassword" :type="cfmPwd ? 'password' : 'text'" placeholder="Enter Password" v-on:keyup.enter="onEnterClick"></b-form-input>
            <div class="eyeIcon">
                <i class="fa curPnt" :class="cfmPwd ? 'fa-eye-slash' : 'fa-eye'" :title="cfmPwd ? 'Show' : 'Hide'" @click="cfmPwd = !cfmPwd" aria-hidden="true"></i>
            </div>
        </b-input-group>
        <p class="beforloginerrorMsg" v-if="errors.passwordError"><i class="fa fa-exclamation-circle" aria-hidden="true"></i>{{errors.passwordError}}</p>
    </b-form-group>
    <b-form-group id="input-group-3">
        <label class="font-weight-bold mb-0 mt-2 float-left lableTxt" for="captcha">Captcha <sup class="asterisk">*</sup></label>
        <b-input-group>
            <CaptchaPage id="captcha" ref="captcha" @onEnterClick="onEnterClick"></CaptchaPage>
        </b-input-group>
        <p class="beforloginerrorMsg" v-if="errors.hasOwnProperty('captchaError')"><i class="fa fa-exclamation-circle" aria-hidden="true"></i>{{errors.captchaError}}</p>
    </b-form-group>
    <p v-if="common_err" class="beforloginerrorMsg"><i class="fa fa-exclamation-circle" aria-hidden="true"></i>{{common_err}}</p>
    <b-button size="lg" class="b-radius btncustom mt-3" block variant="primary" @click="login1(passwordTypeTxt)"><span>{{btnPasswordTxt}}</span> </b-button>
</b-form>
<div class="center-or">
    <h2 class="outer-h2"></h2><span class="outer-span">or</span>
    <h2 class="outer-h2"></h2>
</div>
<b-button size="lg" class="b-radius btncustom mt-2" block variant="outline-primary" @click="login2(otpTypeTxt)" v-if="!forgotpage"><span>{{btnOtpTxt}}</span> </b-button>
<b-button size="lg" class="b-radius btncustom text-uppercase mt-2" block variant="outline-primary" v-if="forgotpage" @click="forgotphonepage('1')"><span>Back to Login</span> </b-button>
<div class="mt-4 d-flex justify-content-between">
    <p class="routerLink" @click="forgotphonepage('2')" v-if="!forgotpage">Forgot Password</p>
    <p class="routerLink" @click="signUp()" v-if="!forgotpage">Sign Up</p>
</div>
</template>

<script>
import axios from "axios";
import CaptchaPage from "@/components/common/Captcha.vue";
import CommonJS from "@/assets/js/common.js";
import aesUtil from '@/assets/js/aesUtil.js';
import ValidationsJS from "@/assets/js/validations.js";
var sha512 = require('js-sha512');

export default {
    data() {
        return {
            formMobile: '7373843646',
            formPassword: 'Admin123$',
            isPassword: false,
            passwordVisible: true,
            mobileNo_err: '',
            password_err: '',
            captcha_err: '',
            common_err: '',
            cfmPwd: true,
            forgotpage: false,
            errors: [],
            comefrom: 'otp'
        }
    },
    mixins: [CommonJS, ValidationsJS],
    name: 'LoginPage',
    props: {
        msg: String,
        btnOtpTxt: {},
        btnPasswordTxt: {},
        otpTypeTxt: {},
        passwordTypeTxt: {}
    },
    components: {
        CaptchaPage
    },
    methods: {
        signUp() {
            this.$router.push({
                path: '/registerPage'
            });
        },
        login1() {
            if (this.passwordTypeTxt == '2') {
                if (this.formMobile && this.formPassword && this.$refs.captcha.captchaEnteredValue) {
                    this.common_err = "";
                    this.errors = [];
                    if (this.validatefields('password')) {
                        this.generateHash('password');
                    }
                } else {
                    this.errors = [];
                    this.common_err = "Please enter all the fields.";
                }
            } else {
                if (this.formMobile && this.$refs.captcha.captchaEnteredValue) {
                    this.common_err = "";
                    this.errors = [];
                    if (this.validatefields('otp')) {
                        if (this.forgotpage) {
                            this.generateMailSmsToken();
                        } else {
                            this.generateHash('otp');
                        }
                    }
                } else {
                    this.errors = [];
                    this.common_err = "Please enter all the fields."
                }
            }
        },
        validatefields(type) {
            let captchaCheck = this.$refs.captcha.validateCaptch();
            this.captchaEnteredValue = captchaCheck[1];
            this.saltValue = captchaCheck[2];
            this.encCaptcha = captchaCheck[3];
            let fldInfoObj = [];
            let mobileFldInfo = {
                "modelVal": this.formMobile,
                "validation": "mobileNumber",
                "lenVal": 10,
                "msg": "Please enter valid mobile number.",
                "mVal": "mobileError"
            };
            fldInfoObj.push(mobileFldInfo);
            if (type == 'password') {
                let passwordFldInfo = {
                    "modelVal": this.formPassword,
                    "validation": "password",
                    "lenVal": 8,
                    "msg": "Password have minimum 8 character.",
                    "mVal": "passwordError"
                };
                fldInfoObj.push(passwordFldInfo);
            }
            let captchaFld = {
                "validation": "captcha",
                "msg": "Invalid Captcha",
                "mVal": "captchaError"
            };
            fldInfoObj.push(captchaFld);
            if (!this.specialFormValidationAllElements(fldInfoObj) && Object.keys(this.errors).length != 0) {
                this.$refs.captcha.captchaEnteredValue =''
                this.$refs.captcha.generateCaptcha();
                return false;
            } else {
                return true;
            }
        },
        login2() {
            this.clear();
            if (this.passwordTypeTxt == '1') {
                this.passwordVisible = true;
                this.$emit('passwordType', this.passwordTypeTxt)
            } else if (this.otpTypeTxt == '1') {
                this.passwordVisible = false;
                this.$emit('passwordType', this.passwordTypeTxt)
            }
        },
        clear() {
            this.mobileNo_err = '';
            this.password_err = '';
            this.captcha_err = '';
            this.common_err = '';
            this.formPassword = '';
        },
        clear_custom() {
            this.formMobile = '';
            this.$refs.captcha.captchaEnteredValue = '';
        },
        specialFormValidationAllElements(allElemObj) {
            var blValidationPassed = true;
            allElemObj.filter(x => {
                if (x["validation"] == 'mobileNumber') {
                    if (x["modelVal"].toString().length < x["lenVal"]) {
                        blValidationPassed = false;
                        this.errors[x['mVal']] = x["msg"];
                         this.formPassword = ''
                   }
                } else if (x["validation"] == 'password') {
                    if (x["modelVal"].toString().length < x["lenVal"]) {
                        blValidationPassed = false;
                        this.errors[x['mVal']] = x["msg"];
                    }
                } else if (x["validation"] == 'captcha') {
                    let captchaCheck = this.$refs.captcha.validateCaptch();
                    if (!captchaCheck[0]) {
                        blValidationPassed = false;
                        this.errors[x['mVal']] = x["msg"];
                        this.formPassword = ''
                    }
                }
            })
            return blValidationPassed;
        },
        // Password API 1 and otp API 1
        generateHash(type) {
            var formData = {
                firstString: this.formMobile,
                secondString: this.encCaptcha,
                thirdString: this.saltValue,
                fourthString: this.captchaEnteredValue
            };
            var jsonFormdata = {
                id: '',
                stringValue: aesUtil.methods.commonEncrypt(this.$store.tokenId, JSON.stringify(formData))
            };
            this.$commonstore.setStore('pageloading', true);
            axios.post(this.$generateHashDashUser, jsonFormdata, {
                headers: {
                    'auth_token': this.$store.tokenId
                }
            }).then(res => {
                var hashBase64StringValue = aesUtil.methods.decrypt(this.$store.tokenId, atob(res.data));
                var hashJsonString = JSON.parse(atob(hashBase64StringValue));
                console.log(hashJsonString);
                this.$store.tokenId = res.headers.auth_token;
                if (hashJsonString.id == 1) {
                    if (type == 'password') {
                        let hash = sha512(this.formPassword);
                        let hash1 = sha512(hash + hashJsonString.stringValue);
                        this.validateAuthUserPassword(hash, hash1);
                    } else if (type == 'otp') {
                        this.validateAuthUserOTP();
                    }
                } else {
                    this.warnAlert(hashJsonString.stringValue, '', 'failure')
                    this.formPassword = '';
                    this.$refs.captcha.generateCaptchaValue();
                }
                this.$commonstore.setStore('pageloading', false);
            })
        },
        // otp API 2
        validateAuthUserOTP() {
            var formData = {
                id: '',
                stringValue: this.formMobile
            };
            var jsonFormdata = {
                id: '',
                stringValue: aesUtil.methods.commonEncrypt(this.$store.tokenId, JSON.stringify(formData))
            };
            this.$commonstore.setStore('pageloading', true);
            axios.post(this.$authDashUserOTP, jsonFormdata, {
                headers: {
                    'auth_token': this.$store.tokenId
                }
            }).then(res => {
                var base64StringValue = aesUtil.methods.decrypt(this.$store.tokenId, atob(res.data));
                this.$store.tokenId = res.headers.auth_token;
                this.$commonstore.setStore('mailSmsToken', res.headers.mailsms_token);
                var jsonString = JSON.parse(atob(base64StringValue));
                if (jsonString.id == 0) {
                    this.warnAlert(jsonString.stringValue, '', 'failure');
                    this.$commonstore.setStore('pageloading', false);
                    return false;
                } else {
                    this.sendotp();
                }
                this.$commonstore.setStore('pageloading', false);
            })
        },
        // Password API 2
        validateAuthUserPassword(hash, hash1) {
            var formData = {
                id: '',
                firstString: this.formMobile,
                secondString: hash1,
                thirdString: 'password'
            };
            var jsonFormdata = {
                id: '',
                stringValue: aesUtil.methods.commonEncrypt(this.$store.tokenId, JSON.stringify(formData))
            };
            this.$commonstore.setStore('pageloading', true);
            axios.post(this.$authDashUser, jsonFormdata, {
                headers: {
                    'auth_token': this.$store.tokenId
                }
            }).then(res => {
                var base64StringValue = aesUtil.methods.decrypt(this.$store.tokenId, atob(res.data));
                this.$store.tokenId = res.headers.auth_token;
                if (res.headers.mailsms_token) {
                    this.$commonstore.setStore('mailSmsToken', res.headers.mailsms_token);
                }
                var jsonString = JSON.parse(atob(base64StringValue));
                if (jsonString.id == 0) {
                    this.warnAlert(jsonString.stringValue, '', 'failure');
                    this.formPassword = ''
                    this.$refs.captcha.generateCaptcha();
                    this.$commonstore.setStore('pageloading', false);
                    return false;
                } else if (jsonString.id == 1) {
                    this.warnAlert(jsonString.stringValue, '', 'failure').then(() => {
                        this.loginPwdFail();
                    })
                    return false
                }
                this.$store.secureToken = jsonString.secureToken;
                this.$commonstore.setStore('userId', jsonString.userId);
                //orgList API call
                let userdata = {
                    userId: jsonString.userId,
                    userName: jsonString.userName
                }
                let datavalues = aesUtil.methods.commonEncrypt(this.$store.secureToken, JSON.stringify(userdata));
                this.$commonstore.setStore('data', datavalues);
                this.$commonstore.setStore('userSesId', jsonString.userSesId);
                this.$commonstore.setStore('userLevel', jsonString.userLevel);
                this.$commonstore.setStore('loginID', jsonString.loginId);

                let jsonFormdata = {
                    id: this.$commonstore.getStore().userId,
                    stringValue: ''
                };
                this.service.post(this.$getUserOrgList, jsonFormdata).then(res => {
                    var data = res.objectOne;
                    this.$commonstore.setStore('organisation', data)
                    let selected_data = [];
                    if (this.$commonstore.getStore().userLevel == 'ORGANISATION') {
                        data.filter((x) => {
                            selected_data.push(x.id);
                        });
                    } else {
                        selected_data.push();
                    }
                    this.$commonstore.setStore('orgList', selected_data);
                    this.router.push({
                        path: "/welcome/ProcuringEntityOnboarding"
                    });
                }).catch(e => {

                    this.forCatch(e);
                    return [];
                })

                this.$commonstore.setStore('pageloading', false);
            })
        },
        // otp API 3
        sendotp() {
            var twoTokens = {
                headers: {
                    'auth_token': this.$store.tokenId,
                    'mailsms_token': this.$commonstore.getStore().mailSmsToken
                }
            };
            var jsonFormdata = {
                id: '',
                stringValue: aesUtil.methods.commonEncrypt(this.$store.tokenId, this.formMobile.toString())
            };
            this.$commonstore.setStore('pageloading', true);
            axios.post(this.$generateOTPForLogin, jsonFormdata, twoTokens).then(res => {
                var hashBase64StringValue = aesUtil.methods.decrypt(this.$store.tokenId, atob(res.data));
                var hashJsonString = JSON.parse(atob(hashBase64StringValue));
                this.$store.tokenId = res.headers.auth_token;
                if (hashJsonString.id == 0) {
                    this.warnAlert(hashJsonString.stringValue, '', 'failure');
                    this.$refs.captcha.generateCaptcha();
                    this.$commonstore.setStore('pageloading', false);
                    return false;
                } else {
                    this.passwordVisible = false;
                    let data = {
                        type: this.otpTypeTxt,
                        mobileNo: this.formMobile,
                        response: hashJsonString,
                        encCaptcha: this.encCaptcha,
                        saltValue: this.saltValue,
                        captchaEnteredValue: this.captchaEnteredValue,
                        loginOtpFail: false,
                        resendOtpType: 'sendLoginOtp',
                        otpBtnLabel: 'VERIFY AND LOGIN'
                    }
                    this.$emit('otpType', data)
                }
                this.$commonstore.setStore('pageloading', false);
            })

        },
        // FOrgot  API 1
        generateMailSmsToken() {
            let token = this.$store.tokenId;
            var formData = {
                firstString: this.formMobile,
                secondString: this.encCaptcha,
                thirdString: this.saltValue,
                fourthString: this.captchaEnteredValue
            };
            var jsonFormdata = {
                id: '',
                stringValue: aesUtil.methods.commonEncrypt(token, JSON.stringify(formData))
            };
            this.$commonstore.setStore('pageloading', true);
            axios.post(this.$generateMailSmsToken, jsonFormdata, {
                headers: {
                    'auth_token': this.$store.tokenId
                }
            }).then(res => {
                var Base64StringValue = aesUtil.methods.decrypt(token, atob(res.data));
                var JsonString = JSON.parse(atob(Base64StringValue));
                this.$store.tokenId = res.headers.auth_token;
                // this.$commonstore.mailSmsToken = res.headers.mailsms_token
                this.$commonstore.setStore('mailSmsToken', res.headers.mailsms_token);

                if (JsonString.id == 0) {
                    this.warnAlert(JsonString.stringValue, '', 'failure')
                    this.$refs.captcha.generateCaptcha();
                    this.$commonstore.setStore('pageloading', false);
                    return false;
                }
                this.submit_forgot();
                this.$commonstore.setStore('pageloading', false);
            })
        },
        submit_forgot() {
            var formData = {
                id: "",
                stringValue: this.formMobile
            };
            var jsonFormdata = {
                id: "",
                stringValue: aesUtil.methods.commonEncrypt(
                    this.$store.tokenId,
                    JSON.stringify(formData)
                ),
            };
            var twoTokens = {
                headers: {
                    'auth_token': this.$store.tokenId,
                    'mailsms_token': this.$commonstore.getStore().mailSmsToken
                }
            };
            this.$commonstore.setStore('pageloading', true);
            axios.post(this.$dashUserForgotPassword, jsonFormdata, twoTokens).then((res) => {
                var hashBase64StringValue = aesUtil.methods.decrypt(this.$store.tokenId, atob(res.data));
                var hashJsonString = JSON.parse(atob(hashBase64StringValue));
                this.$store.tokenId = res.headers.auth_token;
                if (hashJsonString.id == 0) {
                    this.warnAlert(hashJsonString.stringValue, '', 'failure')
                    this.$refs.captcha.generateCaptcha();
                    this.$commonstore.setStore('pageloading', false);
                    return false;
                } else {
                    this.passwordVisible = false;
                    let data = {
                        type: this.otpTypeTxt,
                        mobileNo: this.formMobile,
                        response: hashJsonString,
                        encCaptcha: this.encCaptcha,
                        saltValue: this.saltValue,
                        captchaEnteredValue: this.captchaEnteredValue,
                        loginOtpFail: false,
                        resendOtpType: 'forgotPasswordResendOtp',
                        otpBtnLabel: 'VERIFY'
                    }
                    this.$emit('otpType', data)
                }
                this.$commonstore.setStore('pageloading', false);
            });
        },
        forgotphonepage(type) {
            if (type == '1') {
                if (this.comefrom == 'password') {
                    this.passwordVisible = true;
                    this.$emit('passwordType', this.passwordTypeTxt);
                }
            } else {
                if (this.passwordVisible) {
                    this.comefrom = 'password';
                    this.passwordVisible = false;
                    this.$emit('passwordType', this.passwordTypeTxt)
                } else {
                    this.comefrom = 'otp';
                }
            }
            this.clear_custom();
            this.clear();
            this.forgotpage = !this.forgotpage;
        },
        loginPwdFail() {
            var twoTokens = {
                headers: {
                    'auth_token': this.$store.tokenId,
                    'mailsms_token': this.$commonstore.getStore().mailSmsToken
                }
            };
            var jsonFormdata = {
                id: '',
                stringValue: aesUtil.methods.commonEncrypt(this.$store.tokenId, this.formMobile.toString())
            };
            this.$commonstore.setStore('pageloading', true);
            axios.post(this.$generateOTPForLoginFailure, jsonFormdata, twoTokens).then(res => {
                var hashBase64StringValue = aesUtil.methods.decrypt(this.$store.tokenId, atob(res.data));
                var hashJsonString = JSON.parse(atob(hashBase64StringValue));
                this.$store.tokenId = res.headers.auth_token;
                // this.$commonstore.mailSmsToken = res.headers.mailsms_token
                this.$commonstore.setStore('mailSmsToken', res.headers.mailsms_token);

                if (hashJsonString.id == 0) {
                    this.warnAlert(hashJsonString.stringValue, '', 'failure');
                    this.$commonstore.setStore('pageloading', false);
                    return false;
                } else if (hashJsonString.id == 1) {
                    this.passwordVisible = false;
                    let data = {
                        type: this.otpTypeTxt,
                        mobileNo: this.formMobile,
                        response: hashJsonString,
                        encCaptcha: this.encCaptcha,
                        saltValue: this.saltValue,
                        captchaEnteredValue: this.captchaEnteredValue,
                        loginOtpFail: true,
                        resendOtpType: 'loginFailureResendOtp',
                        otpBtnLabel: 'VERIFY'
                    }
                    this.$emit('otpType', data)
                }
                this.$commonstore.setStore('pageloading', false);
            })
        },
        encryptDataValues() {
            let encrypt_common = aesUtil.methods.commonEncrypt(
                'TNDash',
                JSON.stringify(this.$store.dataValues)
            );
            this.$store.Commondata = encrypt_common
            this.$store.dataValues = null;
        },
        onEnterClick() {
            this.login1(this.otpTypeTxt);
        },
    },
    mounted() {
        this.$store.$subscribe(() => {
            if (this.$store.dataValues != null) {
                this.encryptDataValues();
            }
        })
    }
}
</script>

<style>
.loginpagecss .input-group #password {
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
}
</style>

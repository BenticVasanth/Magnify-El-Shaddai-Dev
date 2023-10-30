<template>
<img center src="@/assets/images/tn_Emblem.svg" rounded="circle" style="width: 20%" />
<h5 center class="mt-3 font-weight-bold">OTP VERIFICATION</h5>
<p center class="mt-3"> We have sent the code verification to Your Mobile Number </p>
<p center class="mt-3">+91 {{ otpData.mobileNo }}</p>
<OtpPage :digit-count="6" @update:otp="otpValue = $event" @onEnterClick="onEnterClick"></OtpPage>
<div id="timer" class="countTimer my-2 digi-label" style="font-size: 12px" v-show="inputVerify">
    <div v-if="verifyCodeExp">
        <label> You will be able to resend OTP in </label>
        <span>
            <font color="#e23030;" class="pl-1"> {{ timerValue }}</font>
        </span>
    </div>
    <div v-else>
        <label>
            <font color="#e23030;"> OTP has been expired. </font>
        </label>
    </div>
</div>
<b-button v-if="!otpData.loginOtpFail" size="lg" class="b-radius btncustom mb-2 mt-3" block variant="primary" @click="resendOTPBtn ? resendOTP(otpData.resendOtpType) : verfify('otp')"><span>{{resendOTPBtn ?'RESEND OTP' : otpData.otpBtnLabel }}</span>
</b-button>
<b-button v-else size="lg" class="b-radius btncustom mb-2 mt-3" block variant="primary" @click="resendOTPBtn ? resendOTP(otpData.resendOtpType) : otpFailPwd()"><span>{{resendOTPBtn ?'RESEND OTP' : otpData.otpBtnLabel }}</span>
</b-button>
<div class="center-or">
    <h2 class="outer-h2"></h2>
    <span class="outer-span">or</span>
    <h2 class="outer-h2"></h2>
</div>
<b-button size="lg" class="b-radius btncustom mt-2" block variant="outline-primary" @click="verfify('password')"><span> BACK TO LOGIN</span>
</b-button>
</template>

<script>
import axios from "axios";
import CommonJS from "@/assets/js/common.js";
import OtpPage from "@/components/OtpPage.vue";
import aesUtil from "@/assets/js/aesUtil.js";
var sha512 = require('js-sha512');

import {
    ref
} from "vue";
export default {
    data() {
        return {
            verifyCodeExp: true,
            inputVerify: false,
            timerValue: "",
            resendOTPBtn: false,
            resendOtpBtnCount: 0
        };
    },
    components: {
        OtpPage,
    },
    setup() {
        const otpValue = ref("");
        return {
            otpValue,
        };
    },
    mixins: [CommonJS],
    name: "OtpVerify",
    props: {
        msg: String,
        otpData: {
            type: Object,
        },
    },
    methods: {
        verfify(lpogintype = "") {
            if (lpogintype == "otp") {
                this.verifyloginIdAndOtp();
            } else if (lpogintype == "password") {
                this.$emit("passwordShow");
            }
        },
        verifyloginIdAndOtp() {
            var formData = {
                firstString: this.otpData.mobileNo,
                secondString: this.otpValue,
                thirdString: this.otpData["response"]["firstString"],
            };
            var jsonFormdata = {
                id: "",
                stringValue: aesUtil.methods.commonEncrypt(
                    this.$store.tokenId,
                    JSON.stringify(formData)
                ),
            };

            if (this.otpData["response"]["firstString"] == 'Forgot Password') {
                this.$commonstore.setStore('pageloading', true);
                axios.post(this.$verifyOtpForgotPwd, jsonFormdata, {
                    headers: {
                        'auth_token': this.$store.tokenId
                    }
                }).then((res) => {

                    var base64StringValue = aesUtil.methods.decrypt(
                        this.$store.tokenId,
                        atob(res.data)
                    );

                    this.$store.tokenId = res.headers.auth_token;
                    var jsonString = JSON.parse(atob(base64StringValue));
                    if (jsonString.id == 0) {
                        this.$commonstore.setStore('pageloading', false);
                        this.warnAlert(jsonString.stringValue, '', "failure");
                        return false;
                    } else {
                        let loginIDdata = {
                            loginID: this.otpData.mobileNo
                        }
                        let loginID = aesUtil.methods.commonEncrypt(this.$store.secureToken, JSON.stringify(loginIDdata));
                        this.$commonstore.setStore('loginID', loginID);
                        this.router.push({
                            name: "ForgotPassword"
                        });
                    }
                    this.$commonstore.setStore('pageloading', false);
                });
            } else if (this.otpData["response"]["firstString"] == 'Authentication') {
                this.$commonstore.setStore('pageloading', true);
                axios.post(this.$verifyOtpAndLogin, jsonFormdata, {
                    headers: {
                        'auth_token': this.$store.tokenId
                    }
                }).then((res) => {

                    var base64StringValue = aesUtil.methods.decrypt(
                        this.$store.tokenId,
                        atob(res.data)
                    );

                    this.$store.tokenId = res.headers.auth_token;
                    this.$commonstore.setStore('mailSmsToken', res.headers.mailsms_token);

                    var jsonString = JSON.parse(atob(base64StringValue));

                    if (jsonString.id == 0) {
                        this.$commonstore.setStore('pageloading', false);
                        this.warnAlert(jsonString.stringValue, "", "failure");
                        return false;
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
                    this.$commonstore.setStore('loginID', jsonString.loginId)

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
                });
            }
        },
        countDownTimer() {
            let countDownDate = new Date(this.currentTimerpFive).getTime();
            let now = new Date();
            let difference = countDownDate - now;
            let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((difference % (1000 * 60)) / 1000);
            this.timerValue = `${minutes} Min ${seconds} Sec`;
            if (difference <= 0) {
                clearInterval(this.timerId);
                this.timerValue = "";
                this.verifyCodeExp = false;
                this.resendOTPBtn = true;
            }
        },
        getTimer(otpValidityInSeconds) {
            this.currentTimerpFive = new Date().getTime();
            this.currentTimerpFive = this.currentTimerpFive + (otpValidityInSeconds * 1000);
            this.timerId = setInterval(() => {
                this.countDownTimer();
            }, 1000);
        },
        resendOTP(resendOtpType) {
            this.verifyCodeExp = true;
            this.inputVerify = true;
            this.resendOTPBtn = false;
            if (resendOtpType == 'sendLoginOtp') {
                this.generateHash('otp');
            } else if (resendOtpType == 'forgotPasswordResendOtp') {
                this.generateMailSmsToken('forgotPasswordResendOtp');
            } else if (resendOtpType == 'loginFailureResendOtp') {
                this.validateResendOTP('Login Attempts');
            }
        },
        generateHash(type) {
            var formData = {
                firstString: this.otpData.mobileNo,
                secondString: this.otpData.encCaptcha,
                thirdString: this.otpData.saltValue,
                fourthString: this.otpData.captchaEnteredValue
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
                this.$store.tokenId = res.headers.auth_token;
                if (hashJsonString.id == 1) {
                    if (type == 'password') {
                        let hash = sha512(this.formPassword);
                        let hash1 = sha512(hash + hashJsonString.stringValue);
                        this.validateAuthUserPassword(hash, hash1);
                    } else if (type == 'otp') {
                        this.validateResendOTP('Authentication');
                    }
                } else {
                    this.warnAlert(hashJsonString.stringValue, '', 'failure')
                    this.$refs.captcha.generateCaptchaValue();
                }
                this.$commonstore.setStore('pageloading', false);
            })
        },
        validateResendOTP(obj = '') {
            this.resendOtpBtnCount += 1;
            var formData = {
                "id": '',
                "longValue": this.resendOtpBtnCount,
                "stringValue": this.otpData.mobileNo,
                "anotherStringValue": obj
            };
            var jsonFormdata = {
                id: '',
                stringValue: aesUtil.methods.commonEncrypt(this.$store.tokenId, JSON.stringify(formData))
            };
            this.$commonstore.setStore('pageloading', true);
            axios.post(this.$resendOTP, jsonFormdata, {
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
                    this.$commonstore.setStore('pageloading', false);
                    return false;
                } else {
                    if (this.resendOtpBtnCount > 1) {
                        if (this.resendOtpBtnCount >= 4) {
                            let that = this;
                            this.warnAlert('You have reached the maximum limit to resend OTP.', '', 'warning').then(() => {
                                clearInterval(this.timerId);
                                that.$emit('passwordShow')
                            })
                        } else {
                            this.warnAlert(jsonString.stringValue, '', 'warning').then(() => {
                                if (obj == 'Authentication') {
                                    this.validateAuthUserOTP();
                                } else if (obj == 'Forgot Password') {
                                    this.submit_forgot();
                                } else if (obj == 'Login Attempts') {
                                    this.loginPwdFail();
                                }
                            })
                        }
                    } else {
                        if (obj == 'Authentication') {
                            this.validateAuthUserOTP();
                        } else if (obj == 'Forgot Password') {
                            this.submit_forgot();
                        } else if (obj == 'Login Attempts') {
                            this.loginPwdFail();
                        }
                    }
                }
                this.$commonstore.setStore('pageloading', false);
            })
        },
        validateAuthUserOTP() {
            var formData = {
                id: '',
                stringValue: this.otpData.mobileNo
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
        sendotp() {
            var twoTokens = {
                headers: {
                    'auth_token': this.$store.tokenId,
                    'mailsms_token': this.$commonstore.getStore().mailSmsToken
                }
            };
            var jsonFormdata = {
                id: '',
                stringValue: aesUtil.methods.commonEncrypt(this.$store.tokenId, this.otpData.mobileNo.toString())
            };
            this.$commonstore.setStore('pageloading', true);
            axios.post(this.$generateOTPForLogin, jsonFormdata, twoTokens).then(res => {
                var hashBase64StringValue = aesUtil.methods.decrypt(this.$store.tokenId, atob(res.data));
                var hashJsonString = JSON.parse(atob(hashBase64StringValue));
                this.$store.tokenId = res.headers.auth_token;
                if (hashJsonString.id == 0) {
                    this.$refs.captcha.generateCaptcha();
                    this.$commonstore.setStore('pageloading', false);
                    return false;
                } else {
                    this.getTimer(this.otpData["response"]["thirdString"]);
                    this.inputVerify = true;
                }
                this.$commonstore.setStore('pageloading', false);
            })
        },
        otpFailPwd() {
            var twoTokens = {
                headers: {
                    'auth_token': this.$store.tokenId,
                    'mailsms_token': this.$commonstore.getStore().mailSmsToken
                }
            };
            var formData = {
                id: '',
                stringValue: this.otpData.mobileNo,
                anotherStringValue: this.otpValue
            };
            var jsonFormdata = {
                id: "",
                stringValue: aesUtil.methods.commonEncrypt(
                    this.$store.tokenId,
                    JSON.stringify(formData)
                ),
            };
            this.$commonstore.setStore('pageloading', true);
            axios.post(this.$authDashUserLoginFailure, jsonFormdata, twoTokens).then(res => {
                var hashBase64StringValue = aesUtil.methods.decrypt(this.$store.tokenId, atob(res.data));
                var hashJsonString = JSON.parse(atob(hashBase64StringValue));
                this.$store.tokenId = res.headers.auth_token;
                if (hashJsonString.id == 0) {
                    this.warnAlert(hashJsonString.stringValue, '', 'failure');
                    this.$commonstore.setStore('pageloading', false);
                    return false;
                } else {
                    let loginIDdata = {
                        loginID: this.otpData.mobileNo
                    }
                    let loginID = aesUtil.methods.commonEncrypt(this.$store.secureToken, JSON.stringify(loginIDdata));
                    // this.$commonstore.loginID = loginID;
                    this.$commonstore.setStore('loginID', loginID);

                    this.router.push({
                        name: "ForgotPassword"
                    });
                }
                this.$commonstore.setStore('pageloading', false);
            })
        },
        // FOrgot  API 1
        generateMailSmsToken(obj = '') {
            let token = this.$store.tokenId;
            var formData = {
                firstString: this.otpData.mobileNo,
                secondString: this.otpData.encCaptcha,
                thirdString: this.otpData.saltValue,
                fourthString: this.otpData.captchaEnteredValue
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
                if (res.headers.mailsms_token) {
                    this.$commonstore.setStore('mailSmsToken', res.headers.mailsms_token);
                }
                if (JsonString.id == 0) {
                    this.warnAlert(JsonString.stringValue, '', 'failure')
                    this.$refs.captcha.generateCaptcha();
                    this.$commonstore.setStore('pageloading', false);
                    return false;
                }
                if (obj == 'forgotPasswordResendOtp') {
                    this.validateResendOTP('Forgot Password');
                } else {
                    this.submit_forgot();
                }
                this.$commonstore.setStore('pageloading', false);
            })
        },
        submit_forgot() {
            var formData = {
                id: "",
                stringValue: this.otpData.mobileNo,
            };
            var jsonFormdata = {
                id: "",
                stringValue: aesUtil.methods.commonEncrypt(this.$store.tokenId, JSON.stringify(formData)),
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
                    this.getTimer(this.otpData["response"]["thirdString"]);
                    this.inputVerify = true;
                }
                this.$commonstore.setStore('pageloading', false);
            });
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
                stringValue: aesUtil.methods.commonEncrypt(this.$store.tokenId, this.otpData.mobileNo.toString())
            };
            this.$commonstore.setStore('pageloading', true);
            axios.post(this.$generateOTPForLoginFailure, jsonFormdata, twoTokens).then(res => {
                var hashBase64StringValue = aesUtil.methods.decrypt(this.$store.tokenId, atob(res.data));
                var hashJsonString = JSON.parse(atob(hashBase64StringValue));
                this.$store.tokenId = res.headers.auth_token;
                if (res.headers.mailsms_token) {
                    this.$commonstore.setStore('mailSmsToken', res.headers.mailsms_token);
                }
                if (hashJsonString.id == 0) {
                    this.warnAlert(hashJsonString.stringValue, '', 'failure');
                    this.$commonstore.setStore('pageloading', false);
                    return false;
                } else if (hashJsonString.id == 1) {
                    this.getTimer(this.otpData["response"]["thirdString"]);
                    this.inputVerify = true;
                }
                this.$commonstore.setStore('pageloading', false);
            })
        },
        onEnterClick() {
            this.verfify('otp');
        },
    },
    mounted() {
        let obj = this.otpData["response"]["thirdString"];
        this.getTimer(obj);
        this.inputVerify = true;
    }
};
</script>

<style lang="scss" scoped>
</style>

<template>
<div class="loginpagecss">
    <div class="login_img_head">
        <h1>{{portalName}}</h1>
        <h4>{{portalSubName}}</h4>
    </div>
    <b-card class="logincard">
        <Login ref="loginPage" v-if="showLoginPage" :btnOtpTxt="btnOtpTxt" :otpTypeTxt="otpTypeTxt" :btnPasswordTxt="btnPasswordTxt" :passwordTypeTxt="passwordTypeTxt" @passwordType="passwordType" @otpType="otpType"></Login>
        <OtpVerify v-if="showOtpPage" @passwordShow="passwordShow" @verifyOtp="verifyOtp" @reloadPage="reloadPage" :otpData="otpData"></OtpVerify>
        <ForgotPassword v-if="showForgetPage" @passwordShow="passwordShow"></ForgotPassword>
    </b-card>
</div>
<FooterLogoPage @portalTitle='portalTitle' />
</template>

<script>
import CommonJS from "@/assets/js/common.js";
import Login from "@/components/Login";
import OtpVerify from "@/components/OtpVerify";
import ForgotPassword from "@/components/ForgotPassword";
import FooterLogoPage from "@/components/common/FooterLogo";
export default {
    data() {
        return {
            showLoginPage: true,
            showOtpPage: false,
            showForgetPage: false,
            btnOtpTxt: 'LOGIN WITH OTP',
            btnPasswordTxt: 'LOGIN',
            otpTypeTxt: '1',
            passwordTypeTxt: '2',
            otpData: {},
            portalName: '',
            portalSubName: ''
        }
    },
    mixins: [CommonJS],
    name: 'LoginPage',
    props: {
        msg: String
    },
    components: {
        Login,
        OtpVerify,
        ForgotPassword,
        FooterLogoPage
    },
    methods: {
        passwordType(type = '') {
            if (type == '1') {
                this.showLoginPage = true;
                this.showOtpPage = false;
                this.btnOtpTxt = 'LOGIN WITH OTP';
                this.btnPasswordTxt = 'LOGIN';
                this.passwordTypeTxt = '2';
            } else if (type == '2') {
                this.btnOtpTxt = 'LOGIN WITH PASSWORD';
                this.btnPasswordTxt = 'SEND OTP';
                this.passwordTypeTxt = '1';
            }
        },
        otpType(data) {
            if (data.type == '1') {
                this.showLoginPage = false;
                this.showOtpPage = true;
                this.otpData = data;
            }
        },
        verifyOtp() {
            this.showOtpPage = false
            this.showLoginPage = false;
            this.showForgetPage = true;
        },
        passwordShow() {
            this.btnOtpTxt = 'LOGIN WITH OTP';
            this.btnPasswordTxt = 'LOGIN';
            this.passwordTypeTxt = '2';
            this.showOtpPage = false
            this.showForgetPage = false
            this.showLoginPage = true;
        },
        portalTitle(data) {
            this.portalName = data.objectOne;
            this.portalSubName = data.objectTwo;
        }
    },
    created() {
        if (this.$store.secureToken) {
            // this.router.push({
            //     path: this.$router.options.history.state.back
            // });
            this.router.back()
        }
    }
}
</script>

<style lang="scss" scoped>
.loginpagecss .input-group #input-2 {
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
}
</style>

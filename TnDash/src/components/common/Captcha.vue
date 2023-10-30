<template>
<b-input-group-text class="pr-0">
    <img :src="captchaValue" autofocus class="loginimg" aria-describedby="basic-addon1" style="background: #fff !important;border: none;width: 68%;" id="mainCaptcha">
    <i class="fa fa-repeat fa-2x pl-2 loginimg" id="refresh" value="Refresh" :title="$refreshCaptcha" style="position: unset;font-size: 15px; cursor:pointer" v-on:click="generateCaptcha()"></i>
</b-input-group-text>
<b-form-input size="lg" id="captcha" class="pl-0" maxlength="6" oncopy="return false" onpaste="return false" v-model="captchaEnteredValue" v-on:keyup="getenterKeySubmission" placeholder="Enter Captcha" autocomplete="off" v-on:keyup.enter="onClickEnter" required></b-form-input>
</template>

<script>
/* eslint-disable */
import axios from "axios";
import Validations from '@/assets/js/validations.js';
var sha512 = require('js-sha512');
import CommonJS from "@/assets/js/common.js";
import aesUtil from '@/assets/js/aesUtil.js';

export default {
    name: 'CaptchaPage',
    mixins: [Validations, CommonJS],
    data() {
        return {
            captchaEnteredValue: '',
            captchaValue: '',
            saltValue: '',
            ip: '',
            encCaptcha: ''
        }
    },
    methods: {
        generateCaptcha() {
            var token = this.$store.tokenId;
            var jsonFormdata = {
                id: '',
                stringValue: ''
            };
            // this.$commonstore.setStore('pageloading', true);
            axios.post(this.$generateCaptcha, jsonFormdata, {
                headers: {
                    'auth_token': token
                }
            }).then(res => {
                var hashBase64StringValue = aesUtil.methods.decrypt(token, atob(res.data));
                var hashJsonString = JSON.parse(atob(hashBase64StringValue));
                this.$store.tokenId = res.headers.auth_token;
                this.captchaValue = hashJsonString.objectOne.objectOne;
                this.saltValue = hashJsonString.objectOne.objectTwo;
                this.encCaptcha = hashJsonString.objectTwo.objectOne;
                this.ip = hashJsonString.objectTwo.objectTwo;
                this.captchaEnteredValue = '';
                // this.$commonstore.setStore('pageloading', false);
            })
        },
        getvalidCaptcha() {
            return this.encCaptcha == sha512(this.saltValue + this.ip + this.captchaEnteredValue);
        },
        validateCaptch() {
            if (this.captchaEnteredValue.length != 0) {
                if (this.getvalidCaptcha()) {
                    return [true, this.captchaEnteredValue, this.saltValue, this.encCaptcha];
                } else {
                    this.captchaEnteredValue = '';
                    this.generateCaptcha();
                    return [false, ""];
                }
            } else if (this.captchaEnteredValue.length == 0) {
                this.generateCaptcha();
                return false;
            }
        },
        getenterKeySubmission() {
            this.captchaEnteredValue = this.captchaEnteredValue.toUpperCase();
        },
        generateCaptchaValue() {
            this.generateCaptcha();
        },
        onClickEnter() {
            this.$emit('onEnterClick', true);
        }
    },
    created: function () {
        this.service.checkserver().then(state => {
            this.generateCaptchaValue();
        })
    }
}
</script>

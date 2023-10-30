<template>
<b-container>
    <b-card title="Login">
        <b-form inline class="justify-content-center">
            <label class="sr-only" for="inline-form-input-name">User Name</label>
            <b-form-input v-model="userName" id="inline-form-input-name" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Enter User Name"></b-form-input>

            <label class="sr-only" for="inline-form-input-password">Password</label>
            <b-form-input v-model="password" type="password" id="inline-form-input-password" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Enter Password"></b-form-input>

            <b-button @click="login" variant="primary">Login</b-button>
        </b-form>
    </b-card>
</b-container>
</template>

<script>
/* eslint-disable */
import aesUtil from '@/assets/js/aesUtil.js';
var sha512 = require('js-sha512');
export default {
    name: "LoginPage",
    data() {
        return {
            userName: '',
            password: ''
        }
    },
    methods: {
        login() {
            console.log(this.userName, this.password);
        },
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
    },
    created(){
        this.service.checkserver();
    }

}
</script>

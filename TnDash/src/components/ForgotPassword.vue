<template>
<div class="loginpagecss">
    <div class="login_img_head">
        <h1>Tenders Tamilnadu</h1>
        <h4>eProcurement Analysis</h4>
    </div>
    <b-card class="logincard">
        <img center class="loginimg" src="@/assets/images/tn_Emblem.svg" rounded="circle" style="width: 20%;">
        <h5 center class="mt-3 font-weight-bold title text-uppercase">Forgot Password</h5>
        <div id="passwordPolicy" class="pb-4">
            <b-card class="px-2">
                <h6 class="text-left">Password Policy</h6>
                <ul class="m-0 pl-4">
                    <li><span>Minimum of 8 characters in length</span></li>
                    <li><span>At least one upper case letter</span></li>
                    <li><span>At least one lower case letter</span></li>
                    <li><span>At least one number</span></li>
                    <li><span>At least one special characters (!@#%^&*())</span></li>
                </ul>
            </b-card>
        </div>
        <b-form>
            <b-form-group id="input-group-1" label="New Password" label-size="sm" label-align-sm="left" label-class="font-weight-bold pt-0">
                <b-input-group>
                    <b-form-input size="lg" id="newPassword" maxlength="15" v-model="newPassword" :type="newPwd ? 'password' : 'text'" placeholder="Enter Password" autocomplete="off" @input="getenteredpassword" required></b-form-input>
                    <div class="eyeIcon">
                        <i class="fa curPnt" :class="newPwd ? 'fa-eye-slash' : 'fa-eye'" :title="newPwd ? 'Show' : 'Hide'" @click="newPwd = !newPwd" aria-hidden="true"></i>
                    </div>
                </b-input-group>
                <p v-if="errors.passwordError" class="beforloginerrorMsg"><i class="fa fa-exclamation-circle" aria-hidden="true"></i>{{errors.passwordError}}</p>
            </b-form-group>

            <b-form-group id="input-group-1" label="Re-Enter New Password" label-size="sm" label-align-sm="left" label-class="font-weight-bold pt-0">
                <b-input-group>
                    <b-form-input size="lg" id="confirmPassword" maxlength="15" v-model="confirmPassword" :type="cfmPwd ? 'password' : 'text'" placeholder="Enter Password" autocomplete="off" @input="getenteredcnfpassword" required></b-form-input>
                    <div class="eyeIcon">
                        <i class="fa curPnt" :class="cfmPwd ? 'fa-eye-slash' : 'fa-eye'" :title="cfmPwd ? 'Show' : 'Hide'" @click="cfmPwd = !cfmPwd" aria-hidden="true"></i>
                    </div>
                </b-input-group>
                <p v-if="errors.confirmPasswordError" class="beforloginerrorMsg"><i class="fa fa-exclamation-circle" aria-hidden="true"></i>{{errors.confirmPasswordError}}</p>
            </b-form-group>
            <p v-if="commonError" class="beforloginerrorMsg"><i class="fa fa-exclamation-circle" aria-hidden="true"></i>{{commonError}}</p>
        </b-form>
        <b-button size="lg" class="b-radius btncustom my-3 text-uppercase" block variant="primary" @click="save()"><span>Submit</span> </b-button>
        <b-button size="lg" class="b-radius btncustom text-uppercase" block variant="outline-primary" @click="backToLogin()"><span>Back to Login</span> </b-button>
    </b-card>
</div>
<FooterLogoPage />
</template>

<script>
import axios from "axios";
import CommonJS from "@/assets/js/common.js";
import FooterLogoPage from "@/components/common/FooterLogo";
import ValidationsJS from "@/assets/js/validations.js";
import aesUtil from '@/assets/js/aesUtil.js';
var sha512 = require('js-sha512');

export default {
    data() {
        return {
            newPwd: true,
            cfmPwd: true,
            newPassword: '',
            confirmPassword: '',
            commonError: '',
            errors: [],
        };
    },
    mixins: [CommonJS, ValidationsJS],
    name: "RegisterPage",
    props: {
        msg: String,
        data: Object
    },
    components: {
        FooterLogoPage
    },
    methods: {
        getenteredpassword() {
            this.errors = [];
            if (!this.IsValidPassword(this.newPassword)) {
                this.errors['passwordError'] = 'Password does not meet the password policy.';
            }
        },
        getenteredcnfpassword() {
            this.errors = [];
            if (!this.IsValidPassword(this.newPassword)) {
                this.errors['passwordError'] = 'Password does not meet the password policy.';
            }
            if (this.newPassword != this.confirmPassword) {
                this.errors['confirmPasswordError'] = 'New Password and Confirm Password does not match.';
            }
        },
        submit_change_password() {
            if (this.newPassword && this.confirmPassword) {
                this.commonError = '';
                this.getenteredcnfpassword();
                if (Object.keys(this.errors).length == 0) {
                    let loginIDdata = this.$commonstore.getStore().loginID;
                    let jsonString = aesUtil.methods.decrypt(this.$store.secureToken, atob(loginIDdata));
                    var loginID = JSON.parse(atob(jsonString));
                    let newPwd = sha512(this.newPassword);
                    let cnfPwd = sha512(this.confirmPassword);
                    let formData = {
                        id: "",
                        firstString: loginID.loginID,
                        secondString: newPwd,
                        thirdString: cnfPwd
                    };
                    var jsonFormdata = {
                        id: "",
                        stringValue: aesUtil.methods.commonEncrypt(
                            this.$store.tokenId,
                            JSON.stringify(formData)
                        ),
                    };
                    this.$commonstore.setStore('pageloading', true);
                    axios.post(this.$resetPassword, jsonFormdata, {headers: {'auth_token': this.$store.tokenId}}).then((res) => {
                        var hashBase64StringValue = aesUtil.methods.decrypt(this.$store.tokenId, atob(res.data));
                        var hashJsonString = JSON.parse(atob(hashBase64StringValue));
                        this.$store.tokenId = res.headers.auth_token;
                        if (hashJsonString.id == 0) {
                            this.warnAlert(hashJsonString.stringValue, '', 'failure');
                            this.$commonstore.setStore('pageloading', false);
                            return false;
                        } else {
                            let that = this;
                            this.warnAlert('Password Changed', hashJsonString.stringValue, 'success').then(function () {
                                that.backToLogin();
                            });
                        }
                        this.$commonstore.setStore('pageloading', false);
                    });
                }
            } else {
                this.commonError = 'Please Enter the Fields.'
                return false;
            }
        },
        validPassword: function (loginpwd) {
            var regExp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()])([a-zA-Z0-9!@#$%&*()]{8,})$/;
            return regExp.test(loginpwd);
        },
        backToLogin() {
            this.router.push({
                path: "/"
            });
        },
        save() {
            this.submit_change_password();
        }
    },
};
</script>

<style lang="scss" scoped>
#newPassword,
#confirmPassword {
    border-radius: 12px 0 0 12px;
    font-size: 14px;
}

.loginpagecss {
    .logincard {
        margin-top: 5% !important;
    }
}
</style>

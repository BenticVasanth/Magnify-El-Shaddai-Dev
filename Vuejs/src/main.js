import { createApp } from 'vue';
import App from './App.vue';
import Store from './store';
import Axios from 'axios';
import VueAxios from 'vue-axios';
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import services from "@/services/service";

const app = createApp(App)
let $global = app.config.globalProperties;
$global.service = services;
$global.$ipAddress = "localhost:8081"
// $global.$warName = "tndash";
export { $global }

let endPointObj = require("./services/commonEndPoint.json");
var protocol = "https:" == document.location.protocol ? "https://" : "http://";
$global.$urlLink = protocol + $global.$ipAddress + "/";
// $global.$urlLink = protocol + $global.$ipAddress + "/" + $global.$warName;
endPointObj.map((obj) => createUrl(obj));

function createUrl(obj) {
    let key = Object.keys(obj);
    $global["$" + key] = $global.$urlLink + obj[key];
}

app.use(Store)
    .use(BootstrapVue)
    .use(VueAxios, Axios)
    .mount('#app');
//end

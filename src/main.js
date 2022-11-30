import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import CoreuiVue from "@coreui/vue";
import CIcon from "@coreui/icons-vue";
import { iconsSet as icons } from "./assets/icons";
import "aos/dist/aos.css";
import AOS from "aos";
import { VueReCaptcha } from "vue-recaptcha-v3";
import { ApmVuePlugin } from "@elastic/apm-rum-vue";

let app = createApp(App);

app.config.globalProperties.$apiKey = process.env.VUE_APP_API_NEVA_KEY;
app.config.globalProperties.$formatterMoney = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
});
/*
app.use(function (req, res, next) {
  res.setHeader(
    'Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self'; font-src 'self'; img-src 'self'; frame-src 'self'"
  );
  
  next();
});*/

app
  .use(store)
  .use(router)
  .use(CoreuiVue)
  .use(VueReCaptcha, {
    siteKey: process.env.VUE_APP_RECAPTCHA_KEY,
    loaderOptions: {
      useRecaptchaNet: true,
    },
  })
  .provide("icons", icons)
  .component("CIcon", CIcon)
  .mount("#app");

if (process.env.VUE_APP_ELASTIC_IS_ACTIVE !== "false") {
  app.use(ApmVuePlugin, {
    router,
    config: {
      serviceName: process.env.VUE_APP_ELASTIC_SERVICE_NAME,
      serverUrl: process.env.VUE_APP_ELASTIC_SERVER_HOST,
      logLevel: process.env.VUE_APP_ELASTIC_LOG_LEVEL,
      secretToken: process.env.VUE_APP_ELASTIC_TOKEN,
      environment: process.env.VUE_APP_ELASTIC_ENVIROMENT,
    },
  });
}

AOS.init();

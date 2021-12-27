import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import store from "./store";
import { createPinia } from "pinia";
import "./index.css";

createApp(App).use(createPinia()).use(router).mount("#app");

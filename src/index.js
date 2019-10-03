import Vue from 'vue';
import App from './App.vue';
import Router from './router';
import Home from "./views/Home";
import ContentDetail from "./views/ContentDetail";
import AppHeader from "./components/layout/AppHeader";
import AppSelect from "./components/AppSelect";
import AppButton from "./components/AppButton";
import ContentBox from "./components/ContentBox";
require('./style/main.scss');

Vue.component('app-header', AppHeader);
Vue.component('app-select', AppSelect);
Vue.component('app-button', AppButton);
Vue.component('content-box', ContentBox);

new Vue({
    el: '#imdb-app',
    components: {
        AppHeader,
        AppSelect,
        AppButton,
        App,
        Home,
        ContentDetail,
        ContentBox
    },
    router: Router,
    template: '<App/>'
});
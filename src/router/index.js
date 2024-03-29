import Vue from 'vue';
import Router from 'vue-router';
import Home from './../views/Home.vue';
import ContentDetail from './../views/ContentDetail.vue';

Vue.use(Router)

export default new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/content/:id',
            name: 'contentDetail',
            component: ContentDetail
        }
    ]
})
import Vue from 'vue';
import App from './App.vue';

/**
 * Initializes the main Vue instance on #app element
 */
new Vue({
    el: '#app',
    render: h => h(App)
})
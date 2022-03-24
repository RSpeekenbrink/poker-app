/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
import Vue from 'vue';
import {createInertiaApp} from '@inertiajs/inertia-vue';
import {InertiaProgress} from '@inertiajs/progress'

require('./bootstrap');

InertiaProgress.init();

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

createInertiaApp({
  resolve: name => import(`./Pages/${name}`),
  setup({el, App, props, plugin}) {
    Vue.use(plugin)
    Vue.mixin({ methods: { route }})

    new Vue({
      render: h => h(App, props),
    }).$mount(el)
  },
})

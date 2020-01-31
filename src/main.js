	
	import Vue from 'vue'
	import App from './App.vue'

	import PortalVue from 'portal-vue'
    Vue.use(PortalVue)

	window.Event = new Vue(  );

	window.Main = new Vue( {
		el: '#app',

		render: h => h(App),
	} );

	

	
	import Vue from 'vue'
	import App from './App.vue'

	import PortalVue from 'portal-vue'
    Vue.use(PortalVue)

	


	// firebase.database().ref('scores/score_' + put_the_id_here ).set({
	// 		name: 'miro',
	// 		time: 123
	// });

	window.Event = new Vue(  );

	window.Main = new Vue( {
		el: '#app',

		render: h => h(App)
	} )

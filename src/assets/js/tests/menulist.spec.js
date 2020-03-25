
	import { mount } from '@vue/test-utils'
	import Component from '@/vue-components/Menulist.vue'

	describe( 'Menulist Component', () => {
		const wrapper = mount( Component, {
			propsData: {
				menu_items: [
					{
                        'id' : 6,
                        'name' : 'Radio',
                        'description' : 'Tune into The MZA and the E Masta Flash',
                        'is_closeable' : true,
                        'is_open' : false,
                        'is_focused' : false
                    }
				]
			}
		} );

		test('is a Vue instance', () => {
			expect( wrapper.isVueInstance() ).toBeTruthy()
		} );

		test( 'Opens nothing when input incorrectly', () => {
			wrapper.vm.potential_selection = 'Hello there';

			wrapper.vm.handle_menu_selection();

			for ( let i = 0; i < wrapper.props().menu_items.length; i ++ ) {
				expect( wrapper.props().menu_items[ i ].is_open ).toBe( false );
			}
		} );

		test( 'Opens targetted window when input correctly', () => {
			wrapper.vm.potential_selection = wrapper.props().menu_items[ 0 ].name;

			wrapper.vm.handle_menu_selection();

			expect( wrapper.props().menu_items[ 0 ].is_open ).toBe( true );
		} );
	} );

	import { mount } from '@vue/test-utils'
	import Component from '@/vue-components/Minesweeper.vue'

	describe( 'Minesweeper Component', () => {
		const wrapper = mount( Component );

		test('is a Vue instance', () => {
			expect( wrapper.isVueInstance() ).toBeTruthy()
		} );

		test( 'Bomb positions length is equal to set bomb amount', () => {
			expect( wrapper.vm.bombs_coordinates.length ).toBe( wrapper.vm.minesweeper_config.bomb_count );
		} );

		test( 'Will detect when a tile left click is not a bomb', () => {
			wrapper.vm.bombs_coordinates = [];
			wrapper.vm.place_bomb_at( 1 );

			expect( wrapper.vm.check_if_bomb( 2 ) ).toBe( false );
		} );

		test( 'Will detect when a left click is a bomb', () => {
			wrapper.vm.bombs_coordinates = [];
			wrapper.vm.place_bomb_at( 1 );

			expect( wrapper.vm.check_if_bomb( 1 ) ).toBe( true );
		} );

		test( 'Will place flag at correct tile', () => {
			wrapper.vm.handle_tile_right_click( 1 );

			expect( wrapper.vm.placed_flags.length ).toBe( 1 );
			expect( wrapper.vm.placed_flags[ 0 ] ).toBe( 1 );
		} );

		test( 'Clicking reset will reset game properly', () => {
			wrapper.vm.bombs_coordinates = [];
			
			wrapper.vm.place_bomb_at( 1 );
			wrapper.vm.handle_tile_right_click( 1 );
			wrapper.vm.handle_tile_left_click( 2 );
			wrapper.vm.reset();

			expect( wrapper.vm.current_time ).toBe( 0 );
			expect( wrapper.vm.placed_flags.length ).toBe( 0 );
			expect( wrapper.vm.clicked_tiles.length ).toBe( 0 );
			expect( wrapper.vm.bombs_coordinates.length ).toBe( wrapper.vm.minesweeper_config.bomb_count );
		} );

		test( 'Will get correct amount of surrounding bombs', () => {
			wrapper.vm.bombs_coordinates = [];

			expect( wrapper.vm.get_surrounding_bomb_count( wrapper.vm.minesweeper_config.width + 2 ) ).toBe( 0 );

			for ( let i = 1; i <= 9; i ++ ) {
				if ( i === 5 ) continue;

				wrapper.vm.place_bomb_at( i + ( ( wrapper.vm.minesweeper_config.width * ~~( ( i - 1 ) / 3 ) ) - ( ~~( ( i - 1 ) / 3 ) * 3 ) ) );
				expect( wrapper.vm.get_surrounding_bomb_count( wrapper.vm.minesweeper_config.width + 2 ) ).toBe( i > 5 ? i - 1 : i );
			}
		} );

		test( 'Clicking a bomb will trigger game over', () => {
			wrapper.vm.bombs_coordinates = [];
			wrapper.vm.place_bomb_at( 1 );
			wrapper.vm.handle_tile_left_click( 1 );

			expect( wrapper.vm.game_over ).toBe( true );
		} );

		test( 'Flagging all bombs will trigger winner', () => {
			wrapper.vm.bombs_coordinates = [];
			wrapper.vm.place_bomb_at( 1 );
			wrapper.vm.handle_tile_right_click( 1 );

			expect( wrapper.vm.winner ).toBe( true );
			expect( wrapper.vm.can_submit_score ).toBe( true );
		} );
	} );
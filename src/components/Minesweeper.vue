<template>
    <div class="minesweeper">
    	<div class="minesweeper__header">
    		<span>header</span>
    	</div>
    	<ul class="minesweeper__grid" :class="{ 'game-over' : this.game_over }">
    		<li class="minesweeper__tile" v-for="index in this.tile_count" v-on:contextmenu.prevent="handle_tile_right_click( index )" @click.left="handle_tile_left_click( index )" :id="`ms-tile-${index}`"></li>
    	</ul>
    </div>
</template>

<script>
    export default {
        name: 'minesweeper',

        data () {
        	return {
        		minesweeper_config : {
					width : 12,
					height: 16,
//					bomb_count : Math.floor( Math.random() * 45 ) + 15,
					bomb_count : 40,
				},
				bombs_coordinates : [],
                placed_flags : [],
				game_over : false,
        	}
        },

        computed: {
        	tile_count () {
        		return this.minesweeper_config.width * this.minesweeper_config.height;
        	}
        },

        mounted () {
        	this.populate_grid_with_bombs();
        },

        methods: {
        	handle_tile_left_click ( index ) {
        		if ( this.check_if_bomb( index ) ) {
        			this.game_over = true;
        			this.show_all_bombs();
        		} else {
        			this.reveal_tile( index );
        		}
        	},
                
            handle_tile_right_click ( index ) {
        		debugger;
        	},

        	show_all_bombs () {
        		this.bombs_coordinates.forEach( function ( bomb_coord ) {
                    const bomb_tile = document.querySelector(`#ms-tile-${ bomb_coord }`);
                    
        			bomb_tile.classList.add('bomb');	
        		} );
        	},

        	reveal_tile ( index ) {
        		const surrounding_bomb_count = this.get_surrounding_bomb_count( index );
        		document.querySelector(`#ms-tile-${ index }`).classList.add(`touching-${ surrounding_bomb_count }`, 'clicked');
                
                if ( surrounding_bomb_count === 0 ) {
                    this.cascade( index );
                }
        	},
                
            cascade ( index ) {
                const   bomb_coords = this.get_bomb_coords_from_index( index ),
                        bomb_bound_data = this.check_if_bomb_is_at_bounds( bomb_coords );
                    
                for ( let i = 0; i < 8; i ++ ) {
                    const   y_index_offset = ( i < 3 ? -1 : i < 5 ? 0 : 1 ) * this.minesweeper_config.width,
                            x_index_offset = ( ( i + ( i > 3 ? 1 : 0 ) ) % 3 ) - 1,
                            to_check_index = index + y_index_offset + x_index_offset;
                    
                    if (
                        ( bomb_bound_data.left && ( i === 0 || i === 3 || i === 5 ) ) ||
                        ( bomb_bound_data.right && ( i === 2 || i === 4 || i === 7 ) ) ||
                        ( bomb_bound_data.top && ( i === 0 || i === 1 || i === 2 ) ) ||
                        ( bomb_bound_data.bottom && ( i === 5 || i === 6 || i === 7 ) )
                    ) continue; // there must be a better way to do this // checking boundaries
                    
                    if ( !document.querySelector(`#ms-tile-${to_check_index}`).classList.contains('clicked') ) this.reveal_tile( to_check_index );
                }

            },

        	get_surrounding_bomb_count ( index ) {
        		let surrounding_bomb_count = 0,
                    bomb_coords = this.get_bomb_coords_from_index( index ),
                    bomb_bound_data = this.check_if_bomb_is_at_bounds( bomb_coords );
                    
                for ( let i = 0; i < 8; i ++ ) {
                    const   y_index_offset = ( i < 3 ? -1 : i < 5 ? 0 : 1 ) * this.minesweeper_config.width,
                            x_index_offset = ( ( i + ( i > 3 ? 1 : 0 ) ) % 3 ) - 1,
                            to_check_index = index + y_index_offset + x_index_offset;
                    
                    if (
                        ( bomb_bound_data.left && ( i === 0 || i === 3 || i === 5 ) ) ||
                        ( bomb_bound_data.right && ( i === 2 || i === 4 || i === 7 ) ) ||
                        ( bomb_bound_data.top && ( i === 0 || i === 1 || i === 2 ) ) ||
                        ( bomb_bound_data.bottom && ( i === 5 || i === 6 || i === 7 ) )
                    ) continue; // there must be a better way to do this // checking boundaries
                    
                    if ( this.bombs_coordinates.indexOf( to_check_index ) !== -1 ) {
                        surrounding_bomb_count++;
                    }
                }

        		return surrounding_bomb_count;
        	},
                
            check_if_bomb_is_at_bounds ( bomb_coords ) {
                return {
                    left : bomb_coords.x === 1,
                    right : bomb_coords.x === this.minesweeper_config.width,
                    top : bomb_coords.y === 1,
                    bottom : bomb_coords.y === this.minesweeper_config.height,
                }
            },
                
            get_bomb_coords_from_index ( index ) {
                const coord_x = index % this.minesweeper_config.width === 0 ? this.minesweeper_config.width : index % this.minesweeper_config.width,
                      coord_y = ~~( index / this.minesweeper_config.width ) + ( coord_x === this.minesweeper_config.width ? 0 : 1 );
                
                return { x : coord_x, y : coord_y };
            },

        	check_if_bomb ( bomb_index ) {
        		return this.bombs_coordinates.indexOf( bomb_index ) !== -1;
        	},

        	populate_grid_with_bombs () {
        		let i = 0;

        		while( i < this.minesweeper_config.bomb_count ) {
        			const 	new_bomb_index = Math.ceil( Math.random() * ( this.minesweeper_config.width * this.minesweeper_config.height ) );

        			if ( this.bombs_coordinates.indexOf( new_bomb_index ) === -1 ) {
        				this.bombs_coordinates.push( new_bomb_index );
        				i++;
        			}
        		}
        	}
        }
    };
</script>

<style lang="scss">
	.minesweeper {
		padding: .4rem;
		background-color: #C3C6CB;
		font-size: .6rem;

		&__header {
			padding: .4rem;
			margin-bottom: .4rem;
			border-top: 1px solid darken( #C3C6CB, 10% );
            border-right: 1px solid darken( #C3C6CB, 20% );
            border-bottom: 1px solid darken( #C3C6CB, 10% );
            border-left: 1px solid darken( #C3C6CB, 20% );
		}

		&__grid {
			list-style-type: none;
			display: flex;
			flex-wrap: wrap;
			width: 24rem;
			position: relative;
			z-index: 2;
                                             
           &:before {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 3;
                color: #f00;
                font-size: 2rem;
                font-weight: 900;
            }

			&.game-over {
				pointer-events: none;
				position: relative;

				&:before {
					content: "GAME OVER";
				}
			}
                                             
            &.winner {
				pointer-events: none;
				position: relative;

				&:before {
					content: "WINNER";
                    color: #0f0;
				}
			}
		}

		&__tile {
			width: 2rem;
			height: 2rem;
			border-left: 3px solid lighten( #C3C6CB, 30% );
            border-top: 3px solid lighten( #C3C6CB, 20% );
            border-right: 3px solid darken( #C3C6CB, 30% );
            border-bottom: 3px solid darken( #C3C6CB, 20% );
            background-size: 100% 100%;
            position: relative;
            
            &:not( .clicked ) {
                background-color: darken( #C3C6CB, 10% );
            }
            
            @for $i from 0 through 8 {
                &.touching-#{$i} {
                    &:after {
                        content: "#{$i}";
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        font-size: 1rem;
                        color: #000;
                    }
                }
            }
                                         
            &.bomb {
            	background-image: url('../assets/images/minesweeper/bomb.png')
            }
		}
	}
</style>

<template>
    <div class="minesweeper">
    	<div class="minesweeper__header">
    		<span>header</span>
    	</div>
    	<ul class="minesweeper__grid" :class="{ 'game-over' : this.game_over }">
    		<li class="minesweeper__tile" v-for="index in this.tile_count" @click.left="handle_tile_left_click( index )" :id="`ms-tile-${index}`"></li>
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
            this.show_all_bombs();
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

        	show_all_bombs () {
        		this.bombs_coordinates.forEach( function ( bomb_coord ) {
        			document.querySelector(`#ms-tile-${ bomb_coord }`).classList.add('bomb');	
        		} );
        	},

        	reveal_tile ( index ) {
        		const surrounding_bomb_count = this.check_for_surrounding_bombs( index );
        		document.querySelector(`#ms-tile-${ index }`).classList.add(`touching-${ surrounding_bomb_count }`, 'clicked');
        	},

        	check_for_surrounding_bombs ( index ) {
        		let surrounding_bomb_count = 0;
                
                for ( let i = 0; i < 8; i ++ ) {
                    let y_index_offset = ( i < 3 ? -1 : i < 5 ? 0 : 1 ) * this.minesweeper_config.width,
                        x_index_offset = ( ( i + ( i > 3 ? 1 : 0 ) ) % 3 ) - 1,
                        to_check_index = index + y_index_offset + x_index_offset;
                    
                    if ( this.bombs_coordinates.indexOf( to_check_index ) !== -1 ) surrounding_bomb_count++;
                }

        		return surrounding_bomb_count;
        	},

        	check_if_bomb ( bomb_index ) {
        		return this.bombs_coordinates.indexOf( bomb_index ) === -1 ? false : true;
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
			border-top: 1px solid darken( #C3C6CB, 20% );
            border-right: 1px solid darken( #C3C6CB, 20% );
            border-bottom: 1px solid darken( #C3C6CB, 10% );
            border-left: 1px solid darken( #C3C6CB, 10% );
		}

		&__grid {
			list-style-type: none;
			display: flex;
			flex-wrap: wrap;
			width: calc(24rem);
			position: relative;
			z-index: 2;

			&:after {
				content: "";
				position: absolute;
				top: -1px;
				left: -1px;
				width: calc(100% + 2px);
				height: calc(100% + 2px);
				border-top: 2px solid darken( #C3C6CB, 20% );
	            border-left: 2px solid darken( #C3C6CB, 10% );
	            z-index: -1;
			}

			&.game-over {
				pointer-events: none;
				position: relative;

				&:before {
					content: "GAME OVER";
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
			}
		}

		&__tile {
			width: 2rem;
			height: 2rem;
			border-right: 2px solid darken( #C3C6CB, 20% );
            border-bottom: 2px solid darken( #C3C6CB, 10% );
            background-size: 100% 100%;
            position: relative;

            &.bomb {
            	background-image: url('../assets/images/minesweeper/bomb.png')
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
		}
	}
</style>

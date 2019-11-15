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
					bomb_count : Math.floor( Math.random() * 45 ) + 15,
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
        },

        methods: {
        	handle_tile_left_click ( index ) {
        		const index_coords = { x : index % this.minesweeper_config.width === 0 ? this.minesweeper_config.width : index % this.minesweeper_config.width , y : Math.ceil( index / this.minesweeper_config.width ) }

        		if ( this.check_if_bomb( index_coords ) ) {
        			this.game_over = true;
        			this.show_all_bombs();
        		} else {
        			this.reveal_tile( index_coords, index );

        		}
        	},

        	show_all_bombs () {
        		this.bombs_coordinates.forEach( function ( bomb_coord ) {
        			const bomb_split_coords = bomb_coord.split(',');

        			document.querySelector(`#ms-tile-${( bomb_split_coords[0] * 12 ) + ( bomb_split_coords[1] % 12 )}`).classList.add('bomb');	
        		} );
        	},

        	reveal_tile ( coords, index ) {
        		const surrounding_bomb_count = this.check_for_surrounding_bombs( coords );
        		document.querySelector(`#ms-tile-${index}`).classList.add(`touching-${surrounding_bomb_count}`, 'clicked');
        	},

        	check_for_surrounding_bombs ( coords ) {
        		let surrounding_bomb_count = 0;

        		for ( let i = 0; i < 8; i ++ ) {
        			let y_coords_offset = i < 3 ? -1 : i < 5 ? 0 : 1,
        				x_coords_offset = ( ( i + ( i > 3 ? 1 : 0 ) ) % 3 ) - 1,
        				to_check_coords = ( coords.x + x_coords_offset ).toString() + ',' + ( coords.y + y_coords_offset ).toString();

        			if ( this.bombs_coordinates.indexOf( to_check_coords ) !== -1 ) surrounding_bomb_count++;
        		}

        		return surrounding_bomb_count;
        	},

        	check_if_bomb ( coords ) {
        		return this.bombs_coordinates.indexOf( coords.x + ',' + coords.y ) === -1 ? false : true;
        	},

        	populate_grid_with_bombs () {
        		let i = 0;

        		while( i < this.minesweeper_config.bomb_count ) {
        			const 	new_bomb_coords = ( Math.floor( Math.random( this.minesweeper_config.width ) * this.minesweeper_config.width ) + 1 ).toString() + ',' + ( Math.floor( Math.random( this.minesweeper_config.height ) * this.minesweeper_config.height ) + 1 ).toString();

        			if ( this.bombs_coordinates.indexOf( new_bomb_coords ) === -1 ) {
        				this.bombs_coordinates.push( new_bomb_coords );
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

            &.bomb {
            	background-image: url('../assets/images/minesweeper/bomb.png')
            }
		}
	}
</style>

<template>
    <div class="minesweeper">
    	<div class="minesweeper__header">
    		<span>header</span>
            <span @click="reset">reset</span>
            <span>{{ this.current_time }}</span>
    	</div>
        <div v-show="!this.showing_leaderboard">
        	<ul class="minesweeper__grid" :class="{ 'game-over' : this.game_over, 'winner' : this.winner }">
        		<li class="minesweeper__tile js-tile" v-for="index in this.tile_count" @contextmenu.prevent="handle_tile_right_click( index )" @click.left="handle_tile_left_click( index )" :id="`ms-tile-${index}`"></li>
        	</ul>
            <div class="minesweeper__winner-form" v-if="this.winner">
                <input placeholder="---" type="text" v-model="new_name">
                <button @click="submit_score">Submit</button>
                <p>View Leaderboard</p>
            </div>
        </div>
        <div v-show="this.showing_leaderboard">
            <h3>Leaderboard</h3>
            <ul>
                <li>
                    <span>Name</span>
                    <span>Time</span>
                </li>
                <li v-for="score in this.scores">
                    <span>{{ score.name }}</span>
                    <span>{{ score.time }}</span>
                </li>
            </ul>
        </div>
        <span @click="toggle_leaderboard()">show/hide leaderboard</span>
    </div>
</template>

<script>
    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyCqKaMx2MaOHKrSm2V2HmzCR60fhwtdcfg",
        authDomain: "waves-69ff1.firebaseapp.com",
        databaseURL: "https://waves-69ff1.firebaseio.com",
        projectId: "waves-69ff1",
        storageBucket: "waves-69ff1.appspot.com",
        messagingSenderId: "907904080763",
        appId: "1:907904080763:web:d203596597245efa1fbbde",
        measurementId: "G-GP9YVN20M8"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    // firebase.analytics();

    export default {
        name: 'minesweeper',

        data () {
        	return {
        		minesweeper_config : {
					width : 12,
					height: 16,
					// bomb_count : Math.floor( Math.random() * 45 ) + 15,
					bomb_count : 10,
				},
				bombs_coordinates : [],
                placed_flags : [],
				game_over : false,
                winner : false,
                tiles : null,
                current_time : 0,
                scores: this.get_scores(),
                showing_leaderboard: false,
                new_name: '',
        	}
        },

        computed: {
        	tile_count () {
        		return this.minesweeper_config.width * this.minesweeper_config.height;
        	}
        },

        mounted () {
        	this.populate_grid_with_bombs();
            // this.show_all_bombs();
            this.tiles = document.querySelectorAll('.js-tile');
        },

        methods: {
            submit_score () {
                if ( this.scores[ this.scores.length - 1 ].time === '---' || this.current_time < this.scores[ this.scores.length - 1 ].time ) {
                    for ( let i = 0; i < this.scores.length; i ++ ) {
                        if ( this.current_time < this.scores[i].time || this.scores[i].time === '---' ) {
                            const new_highscore = {
                                name: this.new_name,
                                time: this.current_time
                            }
                            this.scores.splice( i, 0, new_highscore );
                            this.scores.pop();
                            break;
                        }
                    }

                    this.write_new_scores_to_db();
                }
            },

            write_new_scores_to_db () {
                for ( let i = 0; i < 10; i ++ ) {
                    firebase.database().ref( 'scores/score_' + i ).set( this.scores[i] );
                }
            },

            toggle_leaderboard () {
                this.showing_leaderboard = !this.showing_leaderboard;
            },

            get_scores () {
                const database = firebase.database();

                let score_array = [];
                
                for ( let i = 0; i < 10; i ++ ) {
                    const new_item = {
                        name: null,
                        time: null
                    };

                    firebase.database().ref( 'scores/score_' + i ).once( 'value' ).then( function( snapshot ) {
                        new_item.name = ( snapshot.val() && snapshot.val().name ) || '---';
                        new_item.time = ( snapshot.val() && snapshot.val().time ) || '---';
                    } );

                    score_array.push( new_item );
                } 

                return score_array;
            },

            reset () {
                this.game_over = this.winner = false;
                this.placed_flags = [];
                this.populate_grid_with_bombs();
                this.tiles.forEach( function ( tile ) {
                    tile.classList = 'minesweeper__tile'
                } );
                this.reset_timer();
            },

            timer () {
                const self = this;
                setTimeout( function () {
                    if ( !self.game_over && !self.winner ) {
                        self.current_time ++;
                        // console.log( this.current_time );
                        self.timer();
                    }
                }, 1000 );
            },

            reset_timer () {
                this.current_time = 0;
                this.timer();
            },
            
        	handle_tile_left_click ( index ) {
        		if ( this.check_if_bomb( index ) ) {
        			this.game_over = true;
        			this.show_all_bombs();
        		} else {
        			this.reveal_tile( index );
        		}
        	},
                
            handle_tile_right_click ( index ) {
        		this.toggle_flag_at_index( index );
        	},

            toggle_flag_at_index ( index ) {
                const clicked_tile = document.querySelector(`#ms-tile-${ index }`);

                if ( !clicked_tile.classList.contains( 'clicked' ) ) {
                    if ( clicked_tile.classList.contains( 'flag' ) ) {
                        clicked_tile.classList.remove( 'flag' );
                        this.placed_flags.splice( this.placed_flags.indexOf( index ), 1 );
                    } else {
                        clicked_tile.classList.add( 'flag' );
                        this.placed_flags.push( index );

                        this.placed_flags.sort( function ( a, b ) {
                            return a > b ? 1 : a < b ? -1 : 0;
                        } );

                        if ( this.placed_flags.toString() === this.bombs_coordinates.toString() ) this.winner = true;
                    }
                }
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
                
                if ( surrounding_bomb_count === 0 ) this.cascade( index );
        	},
                
            cascade ( index ) {
                const   bomb_coords = this.get_bomb_coords_from_index( index ),
                        bomb_bound_data = this.check_if_bomb_is_at_bounds( bomb_coords );
                    
                for ( let i = 0; i < 8; i ++ ) {
                    if ( this.check_if_position_is_offscreen( bomb_bound_data, i ) ) continue;

                    const to_check_index = this.get_current_surrounding_position( i, index );

                    if ( !document.querySelector(`#ms-tile-${to_check_index}`).classList.contains('clicked') ) this.reveal_tile( to_check_index );
                }
            },

        	get_surrounding_bomb_count ( index ) {
        		let surrounding_bomb_count = 0,
                    bomb_coords = this.get_bomb_coords_from_index( index ),
                    bomb_bound_data = this.check_if_bomb_is_at_bounds( bomb_coords );
                    
                for ( let i = 0; i < 8; i ++ ) {
                    if ( this.check_if_position_is_offscreen( bomb_bound_data, i ) ) continue; 
                    if ( this.bombs_coordinates.indexOf( this.get_current_surrounding_position( i, index ) ) !== -1 ) surrounding_bomb_count++;
                }

        		return surrounding_bomb_count;
        	},

            get_current_surrounding_position ( i, index ) {
                const   y_index_offset = ( i < 3 ? -1 : i < 5 ? 0 : 1 ) * this.minesweeper_config.width,
                        x_index_offset = ( ( i + ( i > 3 ? 1 : 0 ) ) % 3 ) - 1,
                        to_check_index = index + y_index_offset + x_index_offset;

                return to_check_index;
            },

            check_if_position_is_offscreen ( bomb_bound_data, i ) {
                if (
                    ( bomb_bound_data.left && ( i === 0 || i === 3 || i === 5 ) ) ||
                    ( bomb_bound_data.right && ( i === 2 || i === 4 || i === 7 ) ) ||
                    ( bomb_bound_data.top && ( i === 0 || i === 1 || i === 2 ) ) ||
                    ( bomb_bound_data.bottom && ( i === 5 || i === 6 || i === 7 ) )
                ) return true;
                return false;
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
                this.bombs_coordinates = [];
                
        		let i = 0;

        		while ( i < this.minesweeper_config.bomb_count ) {
        			const 	new_bomb_index = Math.ceil( Math.random() * ( this.minesweeper_config.width * this.minesweeper_config.height ) );

        			if ( this.bombs_coordinates.indexOf( new_bomb_index ) === -1 ) {
        				this.bombs_coordinates.push( new_bomb_index );
        				i++;
        			}
        		}

                this.bombs_coordinates.sort( function ( a, b ) {
                    return a > b ? 1 : a < b ? -1 : 0;
                } );
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
            display: flex;
            justify-content: space-between;
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

            $colours: #00f, #009c03, #f00, #8c00ff, #00ffd5, #ffff00, #ff00f2, #ff8000;
            @each $colour in $colours  {
                $i: index($colours, $colour);
                &.touching-#{$i} {
                    &:after {
                        @if $i == 0 {
                            content: "";
                        } @else {
                            content: "#{$i}";
                        }
                        color: #{$colour};
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        font-size: 1rem;
                        display: flex;
                        justify-content: center;
                        font-weight: 900;
                    }
                }
            }

            &.flag {
                background-image: url('../assets/images/minesweeper/flag.png')
            }
                                         
            &.bomb {
            	background-image: url('../assets/images/minesweeper/bomb.png')
            }
		}
	}
</style>

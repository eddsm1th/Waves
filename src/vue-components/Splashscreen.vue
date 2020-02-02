<template>
    <section class="splash-screen" v-if="!this.fully_loaded">
        <div class="splash-screen__content">
            <div v-if="this.loaded" class="splash-screen__loaded">
                <span class="splash-screen__title" :class="{ 'fade_out' : this.title_fade_out }">
                    &nbsp;&nbsp;&nbsp;&nbsp;______&nbsp;&nbsp;&nbsp;&nbsp;__&nbsp;&nbsp;&nbsp;&nbsp;_______&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_&nbsp;__&nbsp;&nbsp;__<br>
                    &nbsp;&nbsp;&nbsp;/&nbsp;____/___/&nbsp;/___/&nbsp;/&nbsp;___/____&nbsp;___&nbsp;&nbsp;(_)&nbsp;/_/&nbsp;/_&nbsp;&nbsp;&nbsp;_________&nbsp;&nbsp;____&nbsp;___<br>
                    &nbsp;&nbsp;/&nbsp;__/&nbsp;/&nbsp;__&nbsp;&nbsp;/&nbsp;__&nbsp;&nbsp;/\__&nbsp;\/&nbsp;__&nbsp;`__&nbsp;\/&nbsp;/&nbsp;__/&nbsp;__&nbsp;\&nbsp;/&nbsp;___/&nbsp;__&nbsp;\/&nbsp;__&nbsp;`__&nbsp;\<br>
                    &nbsp;/&nbsp;/___/&nbsp;/_/&nbsp;/&nbsp;/_/&nbsp;/___/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/_/&nbsp;/&nbsp;/&nbsp;//&nbsp;/__/&nbsp;/_/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/<br>
                    /_____/\__,_/\__,_//____/_/&nbsp;/_/&nbsp;/_/_/\__/_/&nbsp;/_(_)___/\____/_/&nbsp;/_/&nbsp;/_/&nbsp;<br>
                </span>
            </div>
            <div class="splash-screen__loading" v-if="!this.loaded">
                <!-- <span>Loading...</span> -->
                <div :class="{ 'blip_blip' : this.blip_blip }">
                    [<i class="splash-screen__char" v-for="index in this.ticks" v-html="check_if_tick_should_show( index ) ? '#' : '-'"></i>]
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'splashscreen',

        data () {
        	return {
                loaded: false,
                ticks: 12,
                current_tick: 1,
                complete_tick_time: 1000,
                blip_blip: false,
                title_fade_out: false,
                fully_loaded: false,
                sub_headings: [
                    'This is a subheading',
                    'This is another sunheading',
                    'This is a final one just for the fun of it'
                ],
            }
        },

        mounted () {
            
            this.uptick();
        },

        computed: {
            time_per_tick () {
                return this.complete_tick_time / this.ticks;
            } 
        },

        methods: {
            uptick () {
                if ( this.current_tick < this.ticks ) {
                    setTimeout( function () {
                        this.current_tick ++;
                        this.uptick();
                    }.bind( this ), this.time_per_tick );
                } else if ( this.current_tick === this.ticks ) {
                    this.blip_blip_trigger();
                }
            },

            blip_blip_trigger () {
                this.blip_blip = true;

                setTimeout( function () {
                    this.loaded = true;
                    this.fade_out_title();
                }.bind( this ), 900 );
            },

            fade_out_title () {
                setTimeout( function () {
                    this.title_fade_out = true;
                    
                    setTimeout( function () {
                        this.fully_loaded = true;
                    }.bind( this ), 400 )
                }.bind( this ), 800 );
            },

            check_if_tick_should_show ( index ) {
                return index <= this.current_tick;
            }
        },
    };
</script>

<style lang="scss">
    $base_colour: #FFBDAB;
    .splash-screen {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #000;
        z-index: 2;
        color: $base_colour;
        line-height: 1;
        font-family: monospace;
        font-size: .6rem;

        &.loaded {
            animation: .3s linear forwards loaded;
            
            @keyframes fully_loaded {
                0% {
                    opacity: 1;
                    transform: translateY( 0 );
                }
                100% {
                    opacity: 0;
                    transform: translateY( 1rem );
                }
            }
        }

        &__loading, &__loaded {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        &__title {
            display: block;

            &.fade_out {
                animation: .3s ease-out forwards title__fade_out;
            }

            @keyframes title__fade_out {
                0% {
                    opacity: 1;
                    transform: translateY( 0 );
                }
                100% {
                    opacity: 0;
                    transform: translateY( 1rem );
                }
            }
        }

        &__loading {
            font-size: 1rem;
            display: flex;
            align-items: flex-end;
            text-transform: uppercase;
        }

        &__char {
            &:not( :last-child ) {
                margin-right: .1rem;
            }
        }

        .blip_blip {
            animation: .3s linear blip_blip, .3s ease-out .4s forwards blip_blip__fade_out;

            @keyframes blip_blip {
                0% {
                    visibility: visible;
                }
                10% {
                    visibility: hidden;
                }
                30% {
                    visibility: hidden;
                }
                40% {
                    visibility: visible;
                }
                50% {
                    visibility: visible;
                }
                60% {
                    visibility: hidden;
                }
                80% {
                    visibility: hidden;
                }
                100% {
                    visibility: visible;
                }
            }
            @keyframes blip_blip__fade_out {
                0% {
                    opacity: 1;
                    transform: translateY( 0 );
                }
                100% {
                    opacity: 0;
                    transform: translateY( 1rem );
                }
            }
        }
    }
</style>

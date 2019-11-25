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
                <span class="splash-screen__title">
                    
                </span>
            </div>
            <div class="splash-screen__loading" v-if="!this.loaded">
                <!-- <span>Loading...</span> -->
                <div class="splash-screen__loader" :class="{ 'blip_blip' : this.blip_blip }">
                    <i class="splash-screen__tick" v-for="index in this.ticks" :class="{ 'showing' : check_if_tick_should_show( index ) }"></i>
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
                time_per_tick: null,
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
            this.time_per_tick = this.complete_tick_time / this.ticks;
            this.uptick();
        },

        methods: {
            uptick () {
                if ( this.current_tick < this.ticks ) {
                    const self = this;
                    setTimeout( function () {
                        self.current_tick ++;
                        self.uptick();
                    }, this.time_per_tick );
                } else if ( this.current_tick === this.ticks ) {
                    this.blip_blip_trigger();
                }
            },

            blip_blip_trigger () {
                this.blip_blip = true;

                const self = this;
                setTimeout( function () {
                    self.loaded = true;
                    self.fade_out_title();
                }, 900 );
            },

            fade_out_title () {
                const self = this;
                setTimeout( function () {
                    self.title_fade_out = true;
                    
                    setTimeout( function () {
                        self.fully_loaded = true;
                    }, 400 )
                }, 800 );
            },

            check_if_tick_should_show ( index ) {
                if ( index <= this.current_tick ) return true;
                return false;
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

        &__loader {
            position: relative;
            display: flex;
            padding: .2rem;

            &:after, &:before {
                content: "";
                position: absolute;
                top: 50%;
                left: 50%;
                width: 100%;
                height: 100%;
                transform: translate(-50%, -50%);
            }

            &:after {
                width: calc( 100% + .2rem );
                border-left: .1rem solid $base_colour;
                border-right: .1rem solid $base_colour;
            }

            &:before {
                height: calc( 100% + .2rem );
                border-top: .1rem solid $base_colour;
                border-bottom: .1rem solid $base_colour;
            }

            &.blip_blip {
                animation: .3s linear blip_blip, .3s ease-out .4s forwards blip_blip__fade_out;
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
        }

        &__tick {
            width: .6rem;
            height: 1.2rem;
            display: inline-block;
            background-color: $base_colour;
            opacity: 0;

            &:not( :last-child ) {
                margin-right: .2rem;
            }

            &.showing {
                opacity: 1;
            }
        }
    }
</style>

<template>
    <main>
        <!-- <splashscreen></splashscreen> -->

        <section class="window window--fill" >
            <div class="window__header">
                <h1 class="window__title">$://EddSmith.com/Desktop</h1>
            </div>
            <div class="window__main js-background-image-element" style="background-image: url('https://www.betaarchive.com/imageupload/1304990899.or.90622.png'); height: 100%;">
                <section class="window active window--menu js-draggable" @click="focus_selector();">
                    <div class="window__header js-draggable-trigger">
                        <h1 class="window__title">$://EddSmith.com/Menu</h1>
                    </div>
                    <div class="window__main">
                        <div class="menu">
                            <p>Congratulations; you've reached the</p>
                            <p>
                                &nbsp;&nbsp;&nbsp;&nbsp;__&nbsp;&nbsp;___<br>
                                &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;|/&nbsp;&nbsp;/__&nbsp;&nbsp;____&nbsp;&nbsp;__&nbsp;&nbsp;__<br>
                                &nbsp;&nbsp;/&nbsp;/|_/&nbsp;/&nbsp;_&nbsp;\/&nbsp;__&nbsp;\/&nbsp;/&nbsp;/&nbsp;/<br>
                                &nbsp;/&nbsp;/&nbsp;&nbsp;/&nbsp;/&nbsp;&nbsp;__/&nbsp;/&nbsp;/&nbsp;/&nbsp;/_/&nbsp;/<br>
                                /_/&nbsp;&nbsp;/_/\___/_/&nbsp;/_/\__,_/<br>
                            </p>
                            <p>Let's see if you can select an option...</p>
                            <ul class="menu__list">
                                <li class="menu__item" v-for="menu_item in menu_items">
                                    '{{ menu_item.name }}'
                                    <template v-for="index in menu_item_spacing_amount( menu_item.name.length )">-</template>
                                    '{{ menu_item.description }}'
                                </li>
                            </ul>
                            <p>To select an option, type the name then hit [RETURN].</p>
                            <form @submit="handle_menu_selection( $event );">
                                $://Input:
                                <input class="menu__selector js-menu-selector" type="text" name="" v-model="potential_selection">
                            </form>
                        </div>
                    </div>
                </section>
                <window v-for="menu_item in menu_items" :menu_item_data="menu_item" :menu_items="menu_items"></window>

                <!-- Single blog post -->
                <portal-target name="single-blog-post"></portal-target>
                
            </div>
        </section>
    </main>
</template>

<script>
    import Window from './components/Window.vue';
    import Splashscreen from './components/Splashscreen.vue';

    export default {
        name: 'app',

        components: { 
            Window,
            Splashscreen,
        },

        methods: {
            menu_item_spacing_amount ( current_word_length ) {
                return Math.ceil( this.max_menu_item_length / 4 ) * 4 + 4 - parseInt( current_word_length );
            },

            focus_selector () {
                this.menu_selector.focus();
            },

            handle_menu_selection ( event ) {
                event.preventDefault();

                // if ( this.potential_selection = "404" ) 

                if ( this.selected_menu_item ) this.selected_menu_item.is_open = true;
                this.potential_selection = "";
            }
        },

        computed: {
            max_menu_item_length () {
                return Math.max.apply( Math, this.menu_items.map( function ( value ) { return value.name.length } ) );
            },

            selected_menu_item () {
                return this.menu_items.filter( menu_item => menu_item.name.toLowerCase() === this.potential_selection.toLowerCase() )[0];
            }
        },

        mounted () {
            this.menu_selector = document.querySelector('.js-menu-selector');
        },

        data () {
            return {
                menu_items: [
                    {
                        'name' : 'About',
                        'description' : 'Who da fuck is dat guy',
                        'is_closeable' : true,
                        'is_open' : false,
                        'is_focused' : false
                    },
                    {
                        'name' : 'Contact',
                        'description' : 'Slide into the DMs',
                        'is_closeable' : true,
                        'is_open' : false,
                        'is_focused' : false
                    },
                    {
                        'name' : 'Settings',
                        'description' : 'You like jazz?',
                        'is_closeable' : true,
                        'is_open' : false,
                        'is_focused' : false
                    },
                    {
                        'name' : 'Blog',
                        'description' : "I ain't no Dickins",
                        'is_closeable' : true,
                        'is_open' : false,
                        'is_focused' : false
                    },
                    {
                        'name' : 'Minesweeper',
                        'description' : 'Kaboom',
                        'is_closeable' : true,
                        'is_open' : false,
                        'is_focused' : false
                    },
                    {
                        'name' : 'Radio',
                        'description' : 'Tune into The MZA and the E Masta Flash',
                        'is_closeable' : true,
                        'is_open' : false,
                        'is_focused' : false
                    },
                ],
                potential_selection: '',
                menu_selector: null,
            }
        },
    };
</script>

<style lang="scss">
    $base_line_height: 1.4;
    $base_font_size: 20px;

    *, *:after, *:before {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html {
        font-size: $base_font_size;
        line-height: $base_line_height;
        font-family: calibri;

        &.fs-Small {
            font-size: $base_font_size * .8;
        }

        &.fs-Large {
            font-size: $base_font_size * 1.2;
        }
    }

    body {
        background-color: #000;
        height: 100vh;
        width: 100vw;
        overflow: hidden;
    }

    .menu {
        font-family: monospace;
        font-weight: 400;
        font-size: .6rem;
        padding: .4rem;
        background: #000;
        color: #FFBDAB;

        > * {
            &:not( :last-child ) {
                margin-bottom: calc( .6rem * #{$base_line_height} );
            } 
        }

        &__list {
            list-style-type: none;
            padding: calc( .6rem * #{$base_line_height} );
        }

        &__item {
            &:not( :last-child ) {
                margin-bottom: .6rem;
            }    
        }

        &__selector {
            background-color: transparent;
            border: none;
            color: #FFBDAB;
            font-family: monospace;
            font-weight: 400;
            font-size: .6rem;

            &:focus {
                outline: none;
            }
        }
    }
</style>

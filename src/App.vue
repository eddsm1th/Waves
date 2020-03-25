<template>
    <main>
        <!-- <splashscreen></splashscreen> -->

        <section class="window window--fill">
            <div class="window__header js-draggable-header-offset">
                <h1 class="window__title">$://EddSmith.com/Desktop</h1>

                <headerutilities></headerutilities>
            </div>
            <div class="window__main js-background-image-element" style="background-image: url('https://www.betaarchive.com/imageupload/1304990899.or.90622.png'); height: 100%;">

                <ul class="icons">
                    <icon v-for="menu_item in menu_items" :menu_item_data="menu_item" :menu_items="menu_items" v-if="!menu_item.hide_icon"></icon>
                </ul>

                <window v-for="menu_item in menu_items" :menu_item_data="menu_item" :menu_items="menu_items"></window>

                <!-- Single blog post -->
                <portal-target name="single-blog-post"></portal-target>
                
            </div>
        </section>

        <i class="crt"></i>
    </main>
</template>

<script>
    import Window from './vue-components/Window.vue';
    import Splashscreen from './vue-components/Splashscreen.vue';
    import Headerutilities from './vue-components/HeaderUtilities.vue';
    import Icon from './vue-components/Icon.vue';

    import { apply_drag_to_initial_components } from './assets/js/draggable.js';

    export default {
        name: 'app',

        components: { 
            Window,
            Splashscreen,
            Headerutilities,
            Icon,
        },

        methods: {

        },

        computed: {
            focused_menu_item () {
                return this.menu_items.find( menu_item => menu_item.is_focused );
            },

            open_menu_items () {
                return this.menu_items.filter( menu_item => menu_item.is_open );
            }
        },

        created () {
            this.open_menu_items.forEach( menu_item => this.menu_item_stack.push( menu_item.id ) );
        },

        data () {
            return {
                menu_items: [
                    {   
                        'id' : 0,
                        'name' : 'MenuList',
                        'slug' : 'Menu',
                        'description' : '',
                        'is_closeable' : true,
                        'is_open' : true,
                        'is_focused' : false,
                        'hide_from_menu' : true
                    },
                    {
                        'id' : 1,
                        'name' : 'About',
                        'description' : 'Who da fuck is dat guy',
                        'is_closeable' : true,
                        'is_open' : false,
                        'is_focused' : false
                    },
                    // {
                    //     'name' : 'Contact',
                    //     'description' : 'Slide into the DMs',
                    //     'is_closeable' : true,
                    //     'is_open' : false,
                    //     'is_focused' : false
                    // },
                    {
                        'id' : 3,
                        'name' : 'Settings',
                        'description' : 'You like jazz?',
                        'is_closeable' : true,
                        'is_open' : false,
                        'is_focused' : false
                    },
                    {
                        'id' : 4,
                        'name' : 'Blog',
                        'description' : "I ain't no Dickins",
                        'is_closeable' : true,
                        'is_open' : false,
                        'is_focused' : false
                    },
                    {
                        'id' : 5,
                        'name' : 'Minesweeper',
                        'description' : 'Kaboom',
                        'is_closeable' : true,
                        'is_open' : true,
                        'is_focused' : false
                    },
                    {
                        'id' : 6,
                        'name' : 'Radio',
                        'description' : 'Tune into The MZA and the E Masta Flash',
                        'is_closeable' : true,
                        'is_open' : false,
                        'is_focused' : false
                    },
                    {
                        'id' : 7,
                        'name' : 'Wednesday',
                        'description' : 'It is Wednesday, my dudes',
                        'is_closeable' : true,
                        'is_open' : false,
                        'is_focused' : false,
                        'hide_from_menu' : true,
                        'hide_icon' : true,
                    },
                ],
                menu_selector: null,
                menu_item_stack: [],
            }
        },

        mounted () {
            apply_drag_to_initial_components();
        }
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
        line-height: $base_line_height;
        font-family: calibri;
        font-size: $base_font_size;
        // font-size: $base_font_size * .8;

        // @media ( min-width: 768px ) {
        //     font-size: $base_font_size * .9;
        // }

        // @media ( min-width: 1024px ) {
        //     font-size: $base_font_size;
        // }

        &.fs-Small {
            font-size: $base_font_size * .8;
            // font-size: ( $base_font_size * .8 ) * .8;

            // @media ( min-width: 768px ) {
            //     font-size: ( $base_font_size * .8 ) * .9;
            // }

            // @media ( min-width: 1024px ) {
            //     font-size: $base_font_size * .8;
            // }
        }

        &.fs-Large {
            font-size: $base_font_size * 1.2;
            // font-size: ( $base_font_size * 1.2 ) * .8;

            // @media ( min-width: 768px ) {
            //     font-size: ( $base_font_size * 1.2 ) * .9;
            // }

            // @media ( min-width: 1024px ) {
            //     font-size: $base_font_size * 1.2;
            // }
        }
    }

    body {
        background-color: #000;
        height: 100vh;
        width: 100vw;
        overflow: hidden;
    }

    .crt {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 30px;
        // background-color: rgba(255, 255, 255, .2);
        background-image: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, .08));
        pointer-event: none;
        z-index: 9999;
        animation-name: crt;
        animation-duration: 5s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
    }

    @keyframes crt {
        0% {
            top: -30px;
        }
        100% {
            top: 100%;
        }
    }
</style>

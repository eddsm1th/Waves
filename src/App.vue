<template>
    <main>
        <!-- <splashscreen></splashscreen> -->

        <section class="window window--fill" >
            <div class="window__header">
                <h1 class="window__title">$://EddSmith.com/Desktop</h1>

                <headerutilities></headerutilities>
            </div>
            <div class="window__main js-background-image-element" style="background-image: url('https://www.betaarchive.com/imageupload/1304990899.or.90622.png'); height: 100%;">

                <ul class="icons">
                    <icon v-for="menu_item in menu_items" :menu_item_data="menu_item" :menu_items="menu_items"></icon>
                </ul>

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
    import Headerutilities from './components/HeaderUtilities.vue';
    import Icon from './components/Icon.vue';

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
                return this.menu_items.find( menu_item => menu_item.is_focused === true );
            }
        },

        data () {
            return {
                menu_items: [
                    {
                        'name' : 'MenuList',
                        'slug' : 'Menu',
                        'description' : '',
                        'is_closeable' : true,
                        'is_open' : false,
                        'is_focused' : false
                    },
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
                        'is_open' : true,
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
</style>

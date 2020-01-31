<template>
    <section class="window js-draggable" :class="{ 'focused' : this.this_menu_item.is_focused, 'fullscreen' : this.is_fullscreen }" v-show="menu_item_data.is_open" @mousedown="toggle_focused">
        <div class="window__header js-draggable-trigger">
            <h1 class="window__title">$://EddSmith.com/{{ menu_item_data.slug ? menu_item_data.slug : menu_item_data.name }}</h1>
            <ul class="window__utilities">
                <li class="window__fullscreen" @click="is_fullscreen = !is_fullscreen"></li>
                <li class="window__close" :v-if="menu_item_data.closeable" @click="close_window">✕</li>
            </ul>
        </div>
        <div class="window__main">
            <component :is="menu_item_data.name" :menu_item_data="menu_item_data" :menu_items="menu_items"/>
        </div>
    </section>
</template>

<script>
    import About from './About';
    import Contact from './Contact';
    import Settings from './Settings';
    import Minesweeper from './Minesweeper';
    import Blog from './Blog';
    import Radio from './Radio';
    import MenuList from './MenuList';

    export default {
        name: 'window',

        components: {
            About,
            Contact,
            Settings,
            Minesweeper,
            Blog,
            Radio,
            MenuList,
        },

        props: {
            menu_item_data: Object,
            menu_items: Array,
        },

        data () {
            return {
                is_fullscreen: false,
            }
        },

        computed: {
            this_menu_item () {
                return this.menu_items.find( menu_item => menu_item.name.toLowerCase() === this.menu_item_data.name.toLowerCase() );
            }
        },

        methods: {
            close_window () {
                this.this_menu_item.is_focused = this.this_menu_item.is_open = false;
            },

            toggle_focused () {
                this.menu_items.filter( menu_item => menu_item.is_focused ).forEach( ( focused_menu_item ) => { focused_menu_item.is_focused = false; } );
                this.this_menu_item.is_focused = true;
            }
        },
    };
</script>

<style lang="scss">
    $base_colour: #FFBDAB;
    $window_padding: .4rem;

    .window {
        border: 1px solid #000;
        background-color: $base_colour;

        &.focused {
            z-index: 1;
        }

        &.fullscreen {
            transform: translate( 0, 0 ) !important;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }

        &:not( &--fill ) {
            box-shadow: $window_padding $window_padding rgba( 0, 0, 0, .5 );
        }

        &--fill {
            width: calc(100vw - 1px);
            height: calc(100vh - 1px);
            max-height: 100vh;
            position: relative;
            z-index: 1;
        }

        &__header {
            position: relative;
            display: flex;
            justify-content: space-between;
            cursor: pointer;
            line-height: 1;
        }

        &__utilities {
            list-style: none;
            display: flex;
        }

        &__title {
            padding: $window_padding;
            font-family: monospace;
            font-weight: 900;
            font-size: .6rem;
            pointer-events: none;
            user-select: none;
        }

        &__close {
            padding: $window_padding;
            font-family: monospace;
            font-weight: 900;
            font-size: .8rem;
            line-height: .76;
        }

        &__fullscreen {
            margin: $window_padding;
            height: .6rem;
            width: .6rem;
            border: 1px solid black;
            border-top: .15rem solid black;

            svg {
                height: 8px;
                width: 8px;
            }
        }

        &__main {
            padding: 0 $window_padding $window_padding;
            background-size: cover;
            background-position: center;

            &--no-padding {
                padding: 0;
            }
        }

        &--fill > & {
            &__header {
                border-bottom: 1px solid #000
            }
        }

        &__main { position: relative; }
        &__main & { position: absolute; }
    }
</style>

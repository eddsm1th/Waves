<template>
    <section class="window js-draggable" :class="{ 'focused' : this.this_menu_item.is_focused }" v-show="menu_item_data.is_open" @mousedown="toggle_focused">
        <div class="window__header js-draggable-trigger">
            <h1 class="window__title">$://EddSmith.com/{{ menu_item_data.slug ? menu_item_data.slug : menu_item_data.name }}</h1>
            <span class="window__close" :v-if="menu_item_data.closeable" @click="close_window">✕</span>
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
            menu_item_stack: Array,
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

        // &:not( &--fill ) {
        //     opacity: 0;
        //     transform-origin: 50% 100%;
        //     transform: scale(0);
        //     transition: .15s all ease;
        // }
        // &:not( &--fill ).active {
        //     opacity: 1;
        //     transform: scale(1);
        // }

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
            font-size: .6rem;
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
        &__main & {
            position: absolute;
            top: 10%;
            left: 20%;
        }
    }
</style>

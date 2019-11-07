<template>
    <section class="window js-draggable" v-show="menu_item_data.is_open">
        <div class="window__header js-draggable-trigger">
            <h1 class="window__title">$://EddSmith.com/{{ menu_item_data.name }}</h1>
            <span class="window__close" :v-if="menu_item_data.closeable" @click="closewindow()">✕</span>
        </div>
        <div class="window__main window__main--no-padding">
            <component :is="menu_item_data.name"/>
        </div>
    </section>
</template>

<script>
    import About from './About';
    import Contact from './Contact';
    import Settings from './Settings';
    import Minesweeper from './Minesweeper';

    export default {
        name: 'window',

        components: {
            About,
            Contact,
            Settings,
            Minesweeper
        },

        props: {
            menu_item_data: Object,
            menu_items: Array,
        },

        methods: {
            closewindow () {
                const window_to_close = this.menu_items.filter( menu_item => menu_item.name.toLowerCase() === this.menu_item_data.name.toLowerCase() )[0];
                window_to_close.is_open = false;
            }
        },
    };
</script>

<style lang="scss">
    .window {
        max-height: 600px;
        border: 1px solid #fff;
        background-color: #000;

        &--fill {
            width: calc(100vw - 1px);
            height: calc(100vh - 1px);
            border: none;
            max-height: none;
        }

        &__header {
            border-bottom: 1px solid #fff;
            position: relative;
            display: flex;
            justify-content: space-between;
            cursor: pointer;
        }

        &__title {
            padding: 5px;
            font-family: monospace;
            font-weight: 400;
            color: #fff;
            font-size: .6rem;
            pointer-events: none;
            user-select: none;
        }

        &__close {
            padding: 5px;
            border-left: 1px solid #fff;
            font-family: monospace;
            font-weight: 400;
            color: #fff;
            font-size: .6rem;
        }

        &__main {
            padding: 4px;

            &--no-padding {
                padding: 0;
            }
        }

        &__main { position: relative; }
        &__main & { position: absolute; }
    }
</style>

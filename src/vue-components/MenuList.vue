<template>
    <div class="menu" @click="focus_selector()">
        <p class="no-padding">Congratulations; you've reached the</p>
        <p>
            &nbsp;&nbsp;&nbsp;&nbsp;__&nbsp;&nbsp;___<br>
            &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;|/&nbsp;&nbsp;/__&nbsp;&nbsp;____&nbsp;&nbsp;__&nbsp;&nbsp;__<br>
            &nbsp;&nbsp;/&nbsp;/|_/&nbsp;/&nbsp;_&nbsp;\/&nbsp;__&nbsp;\/&nbsp;/&nbsp;/&nbsp;/<br>
            &nbsp;/&nbsp;/&nbsp;&nbsp;/&nbsp;/&nbsp;&nbsp;__/&nbsp;/&nbsp;/&nbsp;/&nbsp;/_/&nbsp;/<br>
            /_/&nbsp;&nbsp;/_/\___/_/&nbsp;/_/\__,_/<br>
        </p>
        <p>Select an options from the list below...</p>
        <ul class="menu__list">
            <li class="menu__item" v-for="menu_item in menu_items" v-if="!menu_item.hide_from_menu">
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
</template>

<script>
    export default {
        name: 'MenuList',

        props: {
            menu_item_data: Object,
            menu_items: Array,
        },

        data () {
        	return {
        		potential_selection: '',
        		menu_selector: null,
        	}
        },

        mounted () {
            this.menu_selector = document.querySelector('.js-menu-selector');
        },

        methods: {
        	menu_item_spacing_amount ( current_word_length ) {
                return Math.ceil( this.max_menu_item_length / 4 ) * 4 + 4 - parseInt( current_word_length );
            },

			handle_menu_selection ( event ) {
                event.preventDefault();
                if ( this.selected_menu_item ) {
                    if ( this.focused_menu_item ) this.focused_menu_item.is_focused = false;
                    this.selected_menu_item.is_open = this.selected_menu_item.is_focused = true;
                }

                this.potential_selection = "";
            },

            focus_selector () {
                this.menu_selector.focus();
            },
        },

        computed: {
        	max_menu_item_length () {
                return Math.max.apply( Math, this.menu_items.map( function ( value ) { return value.name.length } ) );
            },

            selected_menu_item () {
                return this.menu_items.find( menu_item => menu_item.name.toLowerCase() === this.potential_selection.toLowerCase() );
            },
        }
    };
</script>

<style lang="scss">
    $base_line_height: 1.4;
    $base_font_size: 20px;
    .menu {
        font-family: monospace;
        font-weight: 400;
        font-size: .6rem;
        padding: .4rem;
        background: #000;
        color: #FFBDAB;
        user-select: none;

        > * {
            &:not( :last-child ):not( .no-padding ) {
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

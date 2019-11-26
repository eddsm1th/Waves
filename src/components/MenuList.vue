<template>
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
        <!-- <ul class="menu__list">
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
        </form> -->
    </div>
</template>

<script>
    export default {
        name: 'MenuList',

        props: {
            menu_item_data: Object,
            menu_items: Array,
        },
    };
</script>

<style lang="scss">
</style>

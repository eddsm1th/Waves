<template>
	<li class="icon js-draggable js-draggable-trigger" @dblclick="activate_item( menu_item_data.name )">
		<div class="icon__media">
			<img :src="[
				`src/assets/images/icons/${ menu_item_data.slug ? menu_item_data.slug : menu_item_data.name }.png`
			]">
		</div>
		<p class="icon__text">{{ menu_item_data.slug ? menu_item_data.slug : menu_item_data.name }}</p>
	</li>
</template>

<script>
    export default {
        name: 'icon',

        props: {
            menu_item_data: Object,
            menu_items: Array,
        },

        methods: {
        	activate_item ( selected_item_name ) {
        		const selected_item = this.menu_items.find( menu_item => menu_item.name === selected_item_name );

				selected_item.is_open = selected_item.is_focused = true;
        	}
        }
    };
</script>

<style lang="scss">
	.icons {
		position: absolute;
		top: .4rem;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		list-style-type: none;
		max-height: 80%;
	}

	.icon {
		width: 88px;
		margin: 0 8px;
		padding: 16px 0;
		position: relative;

		&:active {
			&:after {
				content: "";
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				border: 1px dashed rgba( 0, 0, 0, .5 );
			}
		}

		&:nth-child(2) {
			&:before {
				content: "";
				width: 100%;
				height: 0;
			}
		}

		&__media {
			position: relative;
			height: 32px;
			width: 64px;
			margin: 0 12px; 
			padding-bottom: calc( 32px);

			img {
				display: block;
				width: 32px;
				margin: 0 auto;
			}
		}

		&__text {
			margin-top: .4rem;
			text-align: center;
			font-size: .6rem;
			font-weight: 900;
			color: #fff;
			position: relative;
			text-shadow: .06rem .06rem rgba( 0, 0, 0, .5 );
		}
	}
</style>

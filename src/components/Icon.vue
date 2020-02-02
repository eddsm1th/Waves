<template>
	<li class="icon js-draggable js-draggable-trigger" @dblclick="activate_item( menu_item_data.name )">
		<div class="icon__media">
			<img src="">
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
		max-height: 500px;
	}

	.icon {
		width: 4rem;
		margin: 0 .4rem;
		padding: .4rem 0;
		position: relative;

		&:after {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			border: 1px dashed rgba( 0, 0, 0, .5 );
		}

		&:active {
			&:after {
				content: "";
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
			width: calc( 100% - 1rem );
			height: 0;
			margin: 0 .5rem;
			background-color: deeppink;
			padding-bottom: calc( 100% - 1rem);
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

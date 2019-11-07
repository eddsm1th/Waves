<template>
    <div class="settings">
        <div class="settings__header">
            <div class="settings__header-media">
                <img src="https://i.kym-cdn.com/photos/images/original/000/948/031/828.jpg">
            </div>
            <h2 class="settings__title">Change some fuckinnn settings</h2>
        </div>
        <div>
            <h2 class="settings__title">Change some fuckinnn font sizes</h2>
            <ul class="settings__font-size">
                <li class="settings__font-size-item" v-for="font_size, id in this.font_sizes" @click="handle_new_font_selection( font_size )">
                    <label>
                        <input type="radio" :checked="font_size.checked">
                        {{ font_size.name }}
                    </label>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'settings',

        data () {
        	return {
        		font_sizes: [
                    {
                        'name' : 'Small',
                        'checked' : false,
                    },
                    {
                        'name' : 'Medium',
                        'checked' : true,
                    },
                    {
                        'name' : 'Large',
                        'checked' : false,
                    }
                ],
        		wallpapers: [
        			{
        				'name' : "Can't beat the classics",
        				'url' : '',
        			},
        			{
        				'name' : 'Sure, why not...',
        				'url' : '',
        			},
        			{
        				'name' : 'A series of tubes!',
        				'url' : '',
        			},
        			{
        				'name' : 'oooh, arty',
        				'url' : '',
        			}
        		]
        	}
        },

        methods: {
            handle_new_font_selection ( selected_font ) {
                if ( this.checked_font_size !== selected_font ) {
                    const   previous_font_size = this.font_sizes.filter( font_size => font_size.checked === true )[0],
                            html = document.querySelector('html');

                    previous_font_size.checked = false;
                    html.classList.remove(`fs-${previous_font_size.name}`);
                    selected_font.checked = true;
                    html.classList.add(`fs-${selected_font.name}`);
                }
            }
        }
    };
</script>

<style lang="scss">
    .settings {
        background-color: #C3C6CB;
        padding: 1rem;
        font-weight: 700;

        > * {
            &:not( :last-child ) {
                padding-bottom: 1rem;
                margin-bottom: 1rem;
                border-bottom: 1px solid darken( #C3C6CB, 20% );
            }
        }

        &__header {
            display: flex;
            align-items: center;
        }

        &__header-media {
            width: 30%;
            position: relative;
            height: 0;
            padding-bottom: 24%;
            margin-right: .5rem;
            border: 1px solid darken( #C3C6CB, 20% );

            img {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        &__title {
            font-size: 1rem;
        }

        &__font-size {
            margin-top: 1rem;
            list-style-type: none;
            display: flex;
            flex-wrap: wrap;
        }

        &__font-size-item {
            width: 33.333%;
            padding-right: .5rem;
            font-size: .8rem;

            label {
                display: flex;
                align-items: center;
            }
        }
    }
</style>

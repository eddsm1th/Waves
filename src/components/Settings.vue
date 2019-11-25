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
        <div>
            <h2 class="settings__title">El chango backgroundo</h2>
            <ul class="settings__wallpaper">
                <li class="settings__wallpaper-item" v-for="wallpaper in this.wallpapers" @click="handle_new_wallpaper_selection( wallpaper )">
                    <figure class="settings__wallpaper-item-media">
                        <img src="https://i.kym-cdn.com/photos/images/original/000/948/031/828.jpg">
                    </figure>
                    <label>
                        <input type="radio" :checked="wallpaper.checked">
                        {{ wallpaper.name }}
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
        				'url' : 'https://www.betaarchive.com/imageupload/1304990899.or.90622.png',
                        'checked' : true,
        			},
        			{
        				'name' : 'Sure, why not...',
        				'url' : 'https://i.kym-cdn.com/photos/images/original/000/948/031/828.jpg',
                        'checked' : false,
        			},
        			{
        				'name' : 'A series of tubes!',
        				'url' : 'https://i.ytimg.com/vi/_cZC67wXUTs/hqdefault.jpg',
                        'checked' : false,
        			},
        			{
        				'name' : 'oooh, arty',
        				'url' : 'https://i2.wp.com/metro.co.uk/wp-content/uploads/2013/12/spiderman.jpg?quality=90&strip=all&zoom=1&resize=644%2C858',
                        'checked' : false,
        			},
                    {
                        'name' : 'Kermit is king',
                        'url' : 'https://img.huffingtonpost.com/asset/5bad5bba1f0000390122a1bd.jpeg?ops=scalefit_630_noupscale',
                        'checked' : false,
                    }
        		]
        	}
        },

        methods: {
            handle_new_font_selection ( selected_font ) {
                if ( this.current_font_size !== selected_font ) {
                    const html = document.querySelector('html');

                    html.classList.remove(`fs-${this.current_font_size.name}`);
                    this.current_font_size.checked = false;
                    selected_font.checked = true;
                    html.classList.add(`fs-${selected_font.name}`);
                }
            },

            handle_new_wallpaper_selection ( selected_wallpaper ) {
                if ( this.current_wallpaper !== selected_wallpaper ) {
                    const target_element = document.querySelector('.js-background-image-element');

                    this.current_wallpaper.checked = false;
                    selected_wallpaper.checked = true;
                    target_element.style.backgroundImage = `url(${selected_wallpaper.url})`;
                }
            },
        },

        computed: {
            current_font_size () {
                return this.font_sizes.find( font_size => font_size.checked === true );
            },

            current_wallpaper () {
                return this.wallpapers.find( wallpaper => wallpaper.checked === true );
            },
        }
    };
</script>

<style lang="scss">
    .settings {
        font-weight: 700;
        width: 16rem;

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
            width: 3.5rem;
            height: 3rem;
            position: relative;
            margin-right: .5rem;
            border-top: 1px solid darken( #C3C6CB, 20% );
            border-right: 1px solid darken( #C3C6CB, 20% );
            border-bottom: 1px solid darken( #C3C6CB, 10% );
            border-left: 1px solid darken( #C3C6CB, 10% );

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

        &__font-size, &__wallpaper {
            margin-top: 1rem;
            list-style-type: none;
            display: flex;
            flex-wrap: wrap;
        }

        &__font-size-item {
            width: 33.333%;
            padding-right: .5rem;

            label {
                font-size: .8rem;
                display: flex;
                align-items: center;
                line-height: 1;
                margin-top: .2rem;

                input {
                    margin-right: .2rem;
                }
            }
        }

        &__wallpaper {
            margin-left: -.6rem;
            margin-bottom: -.6rem;
            width: 14rem;
        }

        &__wallpaper-item {
            padding: 0 0 .6rem .6rem;
            width: 50%;

            label {
                font-size: .8rem;
                display: flex;
                align-items: center;
                line-height: 1;
                margin-top: .2rem;

                input {
                    margin-right: .2rem;
                }
            }
        }

        &__wallpaper-item-media {
            width: 100%;
            height: 0;
            padding-bottom: 56.25%;
            position: relative;
            overflow: hidden;

            > img {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                object-fit: cover;
                width: 100%;
                border-top: 1px solid darken( #C3C6CB, 20% );
                border-right: 1px solid darken( #C3C6CB, 20% );
                border-bottom: 1px solid darken( #C3C6CB, 10% );
                border-left: 1px solid darken( #C3C6CB, 10% );
            }
        }
    }
</style>

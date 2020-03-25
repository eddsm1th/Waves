<template>
    <div class="settings">
        <div class="settings__block">
            <h3>Wallpaper</h3>
            <ul class="settings__list">
                <li class="settings__list-item" v-for="wallpaper in wallpapers" :class="{ 'active' : wallpaper.checked}" @click="handle_new_wallpaper_selection( wallpaper )">
                    <span>{{ wallpaper.name }}</span>
                </li>
            </ul>
        </div>
        <div class="settings__block">
            <h3>Font size</h3>
            <ul class="settings__list">
                <li class="settings__list-item" v-for="font_size in font_sizes" :class="{ 'active' : font_size.checked}" @click="handle_new_font_selection( font_size )">
                    <span>{{ font_size.name }}</span>
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

        &__block {
            &:not(:first-child) {
                margin-top: 1rem;
            }

            h3 {
                font-size: .8rem;
            }
        }

        &__list {
            list-style: none;
            background-color: #fff;
            border: 1px solid #000;
        }

        &__list-item {
            padding: .1rem .2rem;
            font-size: .6rem;

            &:active, &.active {
                background-color: #ededed;
            }
        }
    }
</style>

<template>
    <div class="blog-archive">
    	<div class="blog-archive__header">
    		<span class="blog-archive__header-title">$://EddSmith.com/Documents/Blog</span>
    		<input class="blog-archive__search" v-model="searched_query" placeholder="Search blogs...">
    	</div>
    	<table class="blog-archive__main">
    		<thead class="blog-archive__main-header">
    			<td @click="update_sort( 'name' )">
    				Name
                    <i :class="{ 'negative' : sort_arrow_polarity( 'name', -1 ), 'positive' : sort_arrow_polarity( 'name' ) }" class="blog-archive__sort-arrow"></i>
    			</td>
    			<td @click="update_sort( 'date' )">
    				Date modified
                    <i :class="{ 'negative' : sort_arrow_polarity( 'date', -1 ), 'positive' : sort_arrow_polarity( 'date' ) }" class="blog-archive__sort-arrow"></i>
    			</td>
    			<td>
    				Type
    			</td>
    		</thead>
    		<tr class="blog-archive__item" v-for="blog_post in this.available_blog_posts" @dblclick="open_this_blog_post( blog_post )">
    			<td class="blog-archive__item-title">
    				{{ blog_post.title }}.txt
    			</td>
    			<td class="blog-archive__item-date">
    				{{ blog_post.date }}
    			</td>
    			<td class="blog-archive__item-type">
    				TXT File
    			</td>
    		</tr>
    	</table>

        <portal to="single-blog-post">
            <section class="window js-blog-post blog-post__outer-wrap" :class="{ 'active' : this.open_blog_post && this.instantiated }">
                <div class="window__header js-draggable-trigger">
                    <h1 class="window__title">$://EddSmith.com/blog_post/{{ this.open_blog_post ? this.open_blog_post.title.split(' ').join('_') : '' }}</h1>
                    <span class="window__close" @click="close_window()">✕</span>
                </div>
                <div class="window__main" style="color: #fff;">
                    <div class="blog-post">
                        <div class="blog-post__inner">
                            <div class="blog-post__content">
                                <div class="js-blog-post-page-dimension">
                                    <h3 class="blog-post__title js-blog-post-title">
                                        {{ this.open_blog_post ? this.open_blog_post.title : '' }}
                                    </h3>
                                    <div class="blog-post__body js-blog-post-body" v-html="this.open_blog_post ? this.open_blog_post.pages.length > 0 ? this.open_blog_post.pages[0] : this.open_blog_post.content : ''"></div>
                                </div>
                            </div>
                        </div>

                        <div class="blog-post__inner" v-for="index in ( this.open_blog_post.pages.length > 1 ? this.open_blog_post.pages.length - 1 : 0 )">
                            <div class="blog-post__content">
                                <div class="blog-post__body js-blog-post-body" v-html="open_blog_post.pages[ index ]"></div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </portal>
    </div>
</template>

<script>
    import { apply_drag_functionality } from './../components/draggable.js';

    export default {
        name: 'blog',

        data () {
        	return {
        		blog_posts : [
        			{
        				'title' : 'this is some bullshit placeholder',
        				'content' :'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lacinia a orci a iaculis. Vestibulum eget placerat justo. Sed vehicula volutpat tristique. Sed et efficitur urna.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lacinia a orci a iaculis. Vestibulum eget placerat justo. Sed vehicula volutpat tristique. Sed et efficitur urna.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lacinia a orci a iaculis. Vestibulum eget placerat justo. Sed vehicula volutpat tristique. Sed et efficitur urna.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lacinia a orci a iaculis. Vestibulum eget placerat justo. Sed vehicula volutpat tristique. Sed et efficitur urna.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lacinia a orci a iaculis. Vestibulum eget placerat justo. Sed vehicula volutpat tristique. Sed et efficitur urna.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lacinia a orci a iaculis. Vestibulum eget placerat justo. Sed vehicula volutpat tristique. Sed et efficitur urna.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lacinia a orci a iaculis. Vestibulum eget placerat justo. Sed vehicula volutpat tristique. Sed et efficitur urna.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lacinia a orci a iaculis. Vestibulum eget placerat justo. Sed vehicula volutpat tristique. Sed et efficitur urna.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lacinia a orci a iaculis. Vestibulum eget placerat justo. Sed vehicula volutpat tristique. Sed et efficitur urna.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lacinia a orci a iaculis. Vestibulum eget placerat justo. Sed vehicula volutpat tristique. Sed et efficitur urna.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lacinia a orci a iaculis. Vestibulum eget placerat justo. Sed vehicula volutpat tristique. Sed et efficitur urna. test</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lacinia a orci a iaculis. Vestibulum eget placerat justo. Sed vehicula volutpat tristique. Sed et efficitur urna.</p>',
        				'date' : '2019-01-16',
        				'is_open' : true,
                        'pages' : [],
        			},
                    {
                        'title' : 'how the dinosaurs went extinct and the birth of a new era',
                        'content' : '<p>This is the story of Zoltan.</p>',
                        'date' : '2017-01-16',
                        'is_open' : false,
                        'pages' : [],
                    },
                    {
                        'title' : 'was Ceasar gay?',
                        'content' : '<p>This is the story of Zoltan.</p>',
                        'date' : '2015-01-16',
                        'is_open' : false,
                        'pages' : [],
                    },
        			{
        				'title' : 'beavers... why?',
        				'content' : '<p>This is when the world was blessed with my presence.</p>',
        				'date' : '1998-01-16',
        				'is_open' : false,
                        'pages' : [],
        			},
        		],
        		searched_query : '',
                sorting_options : [
                    {
                        'type' : 'name',
                        'order' : 0
                    },
                    {
                        'type' : 'date',
                        'order' : 0
                    }
                ],
                blog_post_has_been_opened: false,
                instantiated: false,
        	}
        },

        computed: {
        	available_blog_posts () {
        		if ( this.searched_query !== '' && this.searched_query !== null ) {
        			return this.sort_blog_posts( this.blog_posts.filter( blog_post => blog_post.title.toLowerCase().includes( this.searched_query.toLowerCase() ) ) );
        		}

        		return this.sort_blog_posts( this.blog_posts );
        	},

        	open_blog_post () {
        		return this.blog_posts.find( blog_post => blog_post.is_open );
        	},

            current_sort_option () {
                return this.sorting_options.find( sorting_option => sorting_option.order !== 0 );
            },
        },

        methods: {
            first_page_content () {
                if ( this.open_blog_post ) {
                    if ( this.open_blog_post.pages.length > 0 ) {
                        return this.open_blog_post.pages[0];
                    } else {
                        return this.open_blog_post.content;
                    }
                }

                return '';
            },

            sort_arrow_polarity ( type, order = 1 ) {
                return this.current_sort_option && this.current_sort_option.type === type && this.current_sort_option.order === order;
            },

        	open_this_blog_post ( blog_post ) {
                this.instantiated = true;

        		if ( this.open_blog_post ) this.open_blog_post.is_open = false;
        	   
        		blog_post.is_open = true;

                this.apply_drag_functionality_to_blog_post();

                if ( this.open_blog_post.pages.length === 0 ) {
                    setTimeout( function () {
                        this.paginate_open_blog_post();
                    }.bind(this), 200 );
                }
        	},

            paginate_open_blog_post () {
                let single_page_height = document.querySelector('.js-blog-post-page-dimension').offsetHeight,
                    content_height = document.querySelector('.js-blog-post-title').offsetHeight,
                    additional_content_blocks = [...document.querySelectorAll('.js-blog-post-body > *')],
                    current_page = '',
                    pages = [];

                for ( let i = 0; i < additional_content_blocks.length; i ++ ) {
                    content_height += additional_content_blocks[i].offsetHeight;

                    if ( content_height > single_page_height ) {
                        pages.push( current_page );
                        current_page = '';
                        content_height = additional_content_blocks[i].offsetHeight;
                    }

                    current_page += additional_content_blocks[i].outerHTML;
                }

                pages.push( current_page );

                this.open_blog_post.pages = pages;
            },

            apply_drag_functionality_to_blog_post () {
                if ( !this.blog_post_has_been_opened ) {
                    this.blog_post_has_been_opened = true;

                    apply_drag_functionality( document.querySelector('.js-blog-post') );
                }
            },

        	close_window () {
        		this.instantiated = false;
        	},

            sort_blog_posts ( array ) {
                if ( this.current_sort_option && this.current_sort_option.order !== 0 ) {
                    if ( this.current_sort_option.type === "name" ) {
                        if ( this.current_sort_option.order === 1 ) {
                            return this.sort_array_by_title( array );
                        } else if ( this.current_sort_option.order === -1 ) {
                            return this.sort_array_by_title( array, -1 );
                        }
                    } else if ( this.current_sort_option.type === "date" ) {
                        if ( this.current_sort_option.order === 1 ) {
                            return this.sort_array_by_date( array );
                        } else if ( this.current_sort_option.order === -1 ) {
                            return this.sort_array_by_date( array, -1 );
                        }
                    }
                }

                return array;
            },

            sort_array_by_date ( array, order = 1 ) {
                return array.sort( function( a, b ) {
                    const   primary = new Date( order === 1 ? a.date : b.date ),
                            secondary = new Date( order === 1 ? b.date : a.date );

                    return primary - secondary;
                } );
            },

            sort_array_by_title ( array, order = 1 ) {
                return array.sort( function( a, b ) {
                    const   primary = order === 1 ? a.title.toUpperCase() : b.title.toUpperCase(),
                            secondary = order === 1 ? b.title.toUpperCase() : a.title.toUpperCase();

                    return primary.localeCompare( secondary );
                } );
            },

            update_sort ( sort_type ) {
                const new_sorting_option = this.sorting_options.find( sorting_option => sorting_option.type === sort_type );

                if ( new_sorting_option ) { 
                    this.sorting_options.forEach( sorting_option => { if ( sorting_option.type !== sort_type ) sorting_option.order = 0 } );

                    new_sorting_option.order = new_sorting_option.order === 1 ? -1 : new_sorting_option.order + 1;
                }
            },
        }
    };
</script>

<style lang="scss">
	.blog-archive {
		padding: .4rem;
		background-color: #ededed;
		font-size: .6rem;
        min-width: 25vw;
        border: 1px solid #000;

		&__header {
			display: flex;
			padding-bottom: .4rem;
		}

		&__header-title, &__search {
			background: #fff;
			padding: .4rem;
			border: 1px solid #000;
		}

		&__header-title {
			margin-right: .4rem;
			padding-right: 1rem;
			flex: 1;
		}

		&__search {
			max-width: 6rem;
			font-size: .6rem;
            min-width: 180px;
		}

		&__main {
			width: 100%;
			background: #fff;
			border: 1px solid #000;

			td {
				padding: .2rem 1rem .2rem .4rem;
			}
		}

        &__sort-arrow {
            border-top: .3rem solid #C3C6CB;
            border-left: .15rem solid transparent;
            border-right: .15rem solid transparent;
            border-bottom: 0 solid transparent;
            align-self: center;
            margin-left: .4rem;
            transform: translateY(-50%) rotate(-90deg);
            position: absolute;
            top: 50%;

            &.negative {
                transform: translateY(-50%) rotate(0deg);
            }

            &.positive {
                transform: translateY(-50%) rotate(-180deg);
            }
        }

		&__main-header {
			border-bottom: 1px solid #C3C6CB;

			td {
                color: lighten( #000, 40% );
                position: relative;

                &:not( :last-child ) {
    				border-right: 1px solid #C3C6CB;
    			}
            }
		}

		&__item {
			cursor: pointer;
		}
	}

    .blog-post {
        border: 1px solid #000;
        padding: .8rem 4rem;
        background: #C3C6CB;
        overflow: scroll;
        max-height: 80vh;

        &__outer-wrap {
            pointer-events: none;
            opacity: 0;

            &.active {
                opacity: 1;
                pointer-events: auto;
            }
        }

        &__inner {
            $width: 600px;
            border: 1px solid #000;
            padding: 1rem;
            color: #000;
            background-color: #fff;
            width: 16vw;
            min-width: 400px;
            position: relative;
            height: 0;
            padding: 0;
            padding-bottom: 141.4%;
            box-shadow: .4rem .4rem rgba( 0, 0, 0, .3 );

            & + & {
                margin-top: 1rem;
            }
        }

        &__content {
            font-family: helvetica;
            padding: 1rem;
            font-size: .8rem;
            height: 100%;
            position: absolute;

            > * {
                height: 100%;
            }
        }

        &__title {
            font-size: 1rem;
            padding-bottom: 1rem;
        }

        &__body {
            font-size: .6rem;
            
            > * + * {
                padding-top: .8rem;
            }
        }
    }
</style>
§
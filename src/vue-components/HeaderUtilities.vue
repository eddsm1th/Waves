<template>
    <div class="header-utilities">
        <div class="header-utilities__fullscreen">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 438.54 438.54"><title>toggle-fullscreen</title><path d="M407.42,159a17.57,17.57,0,0,0,12.85,5.43,19.83,19.83,0,0,0,7.14-1.43q11.14-4.85,11.14-16.85V18.28a17.54,17.54,0,0,0-5.43-12.85A17.54,17.54,0,0,0,420.27,0H292.36q-12,0-16.85,11.42-4.85,11.13,4,19.7l41.11,41.11L219.27,173.59,117.92,72.23,159,31.12q8.85-8.56,4-19.7Q158.17,0,146.18,0H18.27A17.56,17.56,0,0,0,5.42,5.43,17.55,17.55,0,0,0,0,18.27V146.18q0,12,11.42,16.85a17.78,17.78,0,0,0,6.85,1.43A17.57,17.57,0,0,0,31.12,159l41.11-41.11L173.59,219.27,72.23,320.62,31.12,279.51q-8.57-8.85-19.7-4Q0,280.37,0,292.36V420.27a17.56,17.56,0,0,0,5.42,12.85,17.58,17.58,0,0,0,12.85,5.42H146.18q12,0,16.85-11.42,4.85-11.14-4-19.7l-41.11-41.11L219.27,265,320.62,366.31l-41.11,41.11q-8.85,8.56-4,19.7,4.86,11.43,16.85,11.42H420.27a18.52,18.52,0,0,0,18.27-18.27V292.36q0-12-11.14-16.85-11.7-4.85-20,4l-41.11,41.11L265,219.27,366.31,117.92Z"/></svg>
        </div>
        <div class="header-utilities__time">
            <span class="header-utilities__time-content">
                <span>{{ ( this.date_time.hours < 10 ? '0' : '' ) + this.date_time.hours }}</span>:<span>{{ ( this.date_time.minutes < 10 ? '0' : '' ) + this.date_time.minutes }}</span>
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'headerutilities',

        data () {
        	return {
                date_time: {
                    'minutes' : null,
                    'hours' : null,
                },
                bout_dat_time: false,
        	}
        },

        mounted () {
            this.set_times();
        },

        methods: {
            set_times ( date = new Date() ) {
                this.date_time.minutes = date.getMinutes();
                this.date_time.hours = date.getHours();
                this.bout_dat_time = this.date_time.minutes == 20 && this.date_time.hours == 16;

                setTimeout( function () {
                    this.set_times();
                }.bind( this ), 60000 )
            },

            toggle_fullscreen () {
            }
        }
    };
</script>

<style lang="scss">
    .header-utilities {
        font-size: .6rem;
        font-family: monospace;
        font-weight: 900;
        display: flex;

        > * {
            padding: .4rem;
            border-left: 1px solid #000;
        }

        &__fullscreen {
            svg {
                width: .6rem;
                height: .6rem;
                display: block;
            }
        }

        &__time-content {
            animation: 2s linear infinite blink;

            @keyframes blink {
                0% {
                    opacity: 1
                }
                49.999% {
                    opacity: 1
                }
                50% {
                    opacity: 0
                }
                74.999% {
                    opacity: 0
                }
                75% {
                    opacity: 1
                }
                100% {
                    opacity: 1;
                }
            }
        }
    }
</style>

<template>
    <div class="header-utilities">
        <div class="header-utilities__time">
            <span class="header-utilities__time-content">
                <span>{{ this.date_time.hours }}</span>:<span>{{ this.date_time.minutes }}</span>
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
        	}
        },

        mounted () {
            this.set_times();
        },

        methods: {
            set_times ( date = new Date() ) {
                this.date_time.minutes = date.getMinutes();
                this.date_time.hours = date.getHours();

                setTimeout( function () {
                    this.set_times();
                }.bind( this ), 60000 )
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

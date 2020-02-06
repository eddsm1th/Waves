
<!-- 

    TODO // PHASE 2:
        Make this like a web browser with different tabs for different pages.

        Have each tab be a different about page style

 -->

<template>
    <textarea class="about" :value="this.content"></textarea>
</template>

<script>
    export default {
        name: 'about',

        data () {
        	return {
        		content: `what up; i'm edd.

i'm a front end web develop based in derbyshire in the uk.

i enjoy making websites that are pleasing to the eye and are a step out of the norm.

currently i am working full time, but feel free to say hello or even just recommend me a song...

:)`
        	}
        }
    };
</script>

<style lang="scss">
	.about {
		border: 1px solid #000;
		display: block;
		font-family: courier;
		min-width: 400px;
		min-height: 400px;
		padding: .4rem;
	}
</style>

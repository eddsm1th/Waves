<template>
    <textarea class="about" :value="this.content"></textarea>
</template>

<script>
    export default {
        name: 'about',

        data () {
        	return {
        		content: `this is some testing

can i have line break in here`
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

<template>
    <img class="wednesday" src="src/assets/images/wednesday.png">
</template>

<script>
    export default {
        name: 'wednesday',
    };
</script>

<style lang="scss">
	.wednesday {
		border: 1px solid #000;
		width: 300px;
		display: block;
		animation-name: wednesday;
		animation-duration: 3s;
		animation-iteration-count: infinite;
		animation-timing-function: linear;
	}

	@keyframes wednesday {
		0% {
			filter: hue-rotate(0deg);
		}
		100% {
			filter: hue-rotate(359deg);
		}
	}
</style>

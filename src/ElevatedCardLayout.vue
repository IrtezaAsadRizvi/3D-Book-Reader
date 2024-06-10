<template>
	<div class="container">
		<div class="box" :class="{'animate': opened}">
			<slot></slot>
		</div>
	</div>

	<div id="actions" class="actions">
		<a href="#" @click.prevent="upload" v-show="progress === 0 || progress === 100"><i data-feather="plus"></i></a>
	</div>

	<div id="socials" class="socials">
		<a href="https://codepen.io/IrtezaAsad" target="_blank"><i data-feather="codepen"></i></a>
		<a href="https://irtezaasadrizvi.medium.com/" target="_blank"><i data-feather="pen-tool"></i></a>
		<a href="https://www.linkedin.com/in/irtezaasad/" target="_blank"><i data-feather="linkedin"></i></a>
		<a href="https://github.com/IrtezaAsadRizvi" target="_blank"><i data-feather="github"></i></a>
	</div>
</template>

<script>
export default {
	props: {
		opened: {
			type: Boolean,
			required: true,
			default: false
		},
		progress: {
			required: true,
			default: 0
		}
	},
	mounted() {
		feather.replace()
		setTimeout(() => {
			document.getElementById('socials').classList.add('visible')
			document.getElementById('actions').classList.add('visible')
		}, 1000)
	},
	watch: {
		opened (val) {
			if(val) this.initiateTilt()
		}
	},
	methods: {

		upload() {
			this.$emit('upload')
		},
		initiateTilt () {
			(function ($) {
				"use strict";
				setTimeout(() => {
					$('.box').tilt({
						maxTilt: 15,
						perspective: 1400,
						easing: "cubic-bezier(.03,.98,.52,.99)",
						speed: 1200,
						glare: true,
						maxGlare: 0.2,
						scale: 1.04
					});
				}, 3000)
			}(jQuery));
		}
	}
}
</script>

<style>
.container {
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
	background: #F0414C;
}

.box {
	border-radius: 12px;
	transform-style: preserve-3d;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 80px;
	height: 80px;
	background: linear-gradient(0.45turn, #D4D2D2, #EEECED);
  box-shadow: rgb(0 0 0 / 17%) 0px 3px 16px 0px inset, rgb(0 0 0 / 15%) 0px -30px 30px 0px inset, rgb(0 0 0 / 10%) 0px -10px 8px 0px inset, rgb(0 0 0 / 6%) 0px 2px 1px, rgb(0 0 0 / 9%) 0px 4px 2px, rgb(0 0 0 / 9%) 0px 8px 4px, rgb(0 0 0 / 9%) 0px 16px 8px, rgb(0 0 0 / 9%) 0px 32px 16px;
	position: relative;
	transition: all 0.3s ease-in-out;
}

.box:hover {
	transform: scale(1.05);
}

.animate {
	animation: anime 1s cubic-bezier(0.16, 1, 0.3, 1) 1s;
	-webkit-animation-fill-mode: forwards;
	/* Chrome 16+, Safari 4+ */
	-moz-animation-fill-mode: forwards;
	/* FF 5+ */
	-o-animation-fill-mode: forwards;
	/* Not implemented yet */
	-ms-animation-fill-mode: forwards;
	/* IE 10+ */
	animation-fill-mode: forwards;
	/* When the spec is finished */
}


@keyframes anime {
	0% {
		width: 80px;
		height: 80px;
		background: #F0414C;
		box-shadow: 0 0 0 #b81c26,
			0 0 0 #f1f1f1,
			10px 10px 10px #b81c26 inset,
			-10px -10px 10px #ff5964 inset;
	}

	/* 25% {
		width: 100px;
		height: 100px;
		background: #f1f1f1;
		box-shadow: 10px 10px 10px #b81c26,
			10px 10px 10px #ff5964,
			0 0 0 #b81c26 inset,
			0 0 0 #ff5964 inset;
	} */

	/* 50% {
		width: 30vw;
		height: 22vw;
		background: #f1f1f1;
		box-shadow: 10px 10px 10px #b81c26,
			10px 10px 10px #ff5964,
			0 0 0 #b81c26 inset,
			0 0 0 #ff5964 inset;
	} */

	100% {
		width: 60vw;
		height: 44vw;
		background: #f1f1f1;
		box-shadow: 40px 40px 40px #b81c26,
			0 0 0 #ff5964,
			0 0 0 #b81c26 inset,
			2px 2px 2px #ff5964 inset;
	}
}

.js-tilt-glare {
	z-index: 10 !important;
	pointer-events: none;
}

.js-tilt-glare-inner {
	width: 1000vw !important;
	height: 1000vh !important;
}

.actions, .socials {
	display: flex;
	justify-content: center;
	align-items: center;
	max-width: 200px;
	margin: 10px;
	position: fixed;
	bottom: -200px;
	right: 0;
	z-index: 15;
	transition: all 1s ease-in-out;
}
.actions {
	right: unset;
	left: 0;
}

@media only screen and (max-width: 768px) {
	.socials {
		right: calc(50% - 75px);
	}
}

.actions a, .socials a {
	color: white;
	margin: 0 3px;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
}

.actions a:hover, .socials a:hover {
	color: #EE9112;
	transform: scale(1.1);
}

.actions.visible, .socials.visible {
	bottom: 0 !important;
}
</style>
<template>
	<div class="container">
		<div class="box" :class="{'animate': opened}">
			<slot></slot>
		</div>
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
		}
	},
	mounted() {
		(function ($) {
			"use strict";
			feather.replace()
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
				$('.camera').css('opacity', '1')
				document.getElementById('socials').classList.add('visible')
			}, 3000)
		}(jQuery));
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
	border-radius: 20px;
	transform-style: preserve-3d;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 60px;
	height: 60px;
	background: #f1f1f1;
	overflow: hidden;
	box-shadow: 0 0 0 #d2d2d2,
		0 0 0 #f1f1f1,
		10px 10px 10px #d2d2d2 inset,
		-10px -10px 10px #f1f1f1 inset;
	position: relative;
}

.animate {
	animation: anime 3s cubic-bezier(0.16, 1, 0.3, 1) 1s;
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
		width: 60px;
		height: 60px;
		background: #F0414C;
		box-shadow: 0 0 0 #b81c26,
			0 0 0 #f1f1f1,
			10px 10px 10px #b81c26 inset,
			-10px -10px 10px #ff5964 inset;
	}

	25% {
		width: 60px;
		height: 60px;
		background: #f1f1f1;
		box-shadow: 10px 10px 10px #b81c26,
			10px 10px 10px #ff5964,
			0 0 0 #b81c26 inset,
			0 0 0 #ff5964 inset;
	}

	50% {
		width: 60px;
		height: auto;
		background: #f1f1f1;
		box-shadow: 10px 10px 10px #b81c26,
			10px 10px 10px #ff5964,
			0 0 0 #b81c26 inset,
			0 0 0 #ff5964 inset;
	}

	100% {
		width: auto;
		height: auto;
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

.socials {
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

@media only screen and (max-width: 768px) {
	.socials {
		right: calc(50% - 75px);
	}
}

.socials a {
	color: white;
	margin: 0 3px;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
}

.socials a:hover {
	color: #EE9112;
	transform: scale(1.1);
}

.socials.visible {
	bottom: 0 !important;
}
</style>
<!-- ShootingStars.svelte -->
<script lang="ts">
	let shootingStars: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

	function randomNum(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	const count: number = 100;
	let result: string = '';
	for (let i = 0; i < count; i++) {
		result += `${randomNum(-50, 50)}vw ${randomNum(-50, 50)}vh ${randomNum(0, 3)}px ${randomNum(
			0,
			3
		)}px #fff,`;
	}

	$: starBgStyle = `box-shadow: ${result.substring(0, result.length - 1)}`;
</script>

<div class="shootingWrapper">
	{#each shootingStars as star (star)}
		<span class="shooting-stars" />
	{/each}
</div>
<div class="stars" style={starBgStyle} />

<style>
	.shootingWrapper {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		z-index: -1;
		background: transparent;
		background: black;
		background-position: center;
		background-size: cover;
	}

	.stars {
		position: absolute;
		top: 50%;
		left: 50%;
		height: 1px;
		width: 1px;
		border-radius: 50%;
		background-color: hsl(0, 0%, 98%);
		z-index: 1;
		animation: zoom 10s alternate infinite;
	}

	@keyframes animateBg {
		0%,
		100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.2);
		}
	}
	.shooting-stars {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 4px;
		height: 4px;
		background: #fff;
		border-radius: 50%;
		box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.1), 0 0 0 8px rgba(255, 255, 255, 0.1),
			0 0 20px rgba(255, 255, 255, 1);
		animation: animate 10s linear infinite;
	}
	.shooting-stars::before {
		content: '';
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 300px;
		height: 1px;
		background: linear-gradient(90deg, #fff, transparent);
	}
	@keyframes animate {
		0% {
			transform: rotate(315deg) translateX(0);
			opacity: 1;
		}
		70% {
			opacity: 1;
		}
		100% {
			transform: rotate(315deg) translateX(-1500px);
			opacity: 0;
		}
	}
	.shooting-stars:nth-child(1) {
		top: 0;
		right: 0;
		left: initial;
		animation-delay: 0;
		animation-duration: 1s;
	}

	.shooting-stars:nth-child(2) {
		top: 0;
		right: 80px;
		left: initial;
		animation-delay: 0.2s;
		animation-duration: 3s;
	}

	.shooting-stars:nth-child(3) {
		top: 80px;
		right: 0px;
		left: initial;
		animation-delay: 0.4s;
		animation-duration: 2s;
	}

	.shooting-stars:nth-child(4) {
		top: 0;
		right: 180px;
		left: initial;
		animation-delay: 0.6s;
		animation-duration: 1.5s;
	}

	.shooting-stars:nth-child(5) {
		top: 0;
		right: 400px;
		left: initial;
		animation-delay: 0.8s;
		animation-duration: 2.5s;
	}

	.shooting-stars:nth-child(6) {
		top: 0;
		right: 600px;
		left: initial;
		animation-delay: 1s;
		animation-duration: 3s;
	}
	.shooting-stars:nth-child(7) {
		top: 300px;
		right: 0px;
		left: initial;
		animation-delay: 1s;
		animation-duration: 1.75s;
	}

	.shooting-stars:nth-child(8) {
		top: 0px;
		right: 700px;
		left: initial;
		animation-delay: 1.4s;
		animation-duration: 1.25s;
	}

	.shooting-stars:nth-child(9) {
		top: 0px;
		right: 1000px;
		left: initial;
		animation-delay: 0.75s;
		animation-duration: 2.25s;
	}

	.shooting-stars:nth-child(10) {
		top: 0px;
		right: 1000px;
		left: initial;
		animation-delay: 2.75s;
		animation-duration: 2.25s;
	}

	@keyframes zoom {
		0% {
			transform: scale(1);
		}
		100% {
			transform: scale(1.5);
		}
	}
</style>

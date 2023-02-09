<!-- Main component -->

<svelte:head>
	<!-- <link rel="stylesheet" href="assets/normalize.css"> -->
	<!-- <script src='assets/threex.rendererstats.js'></script> -->
	<!-- TODO SEO -->
	<meta name="facebook-domain-verification" content="8qnqs7ve6gp8a7dwibu1z1r7ki6t0q"/>
</svelte:head>

<script>
	import SmartUniversity from "./SmartUniversity.svelte";
</script>


<SmartUniversity/>


<style>

	:global(:root){
		--btn-primary: #616161;
		--btn-secondary: #929292;
		--btn-white: #fdfdfd;

		--status-green: #ffff00;
	}

	:global(body) {
		margin: 0;
		padding: 0;

		width: 100%;
		height: 100%;
	}

	/* Global CSS constants in App */
		/* pt to ems: https://reeddesign.co.uk/test/points-pixels.html */
	:global(h1){ font-size: 2.45em;	/* 30pt */}

	:global(h2){ font-size: 2em; }

	:global(p){ font-size: 1.5em; }

	:global(p.small){ font-size: 1em; }

	:global(.overlay) {
		position: absolute;
		z-index: 4;
		height: 0px;
	}

	:global(span.icon.close:hover svg path) {
		fill: #f00;
		transition: fill .3s;
	}

	:global(span.icon.close:hover) {
		cursor: pointer;
	}


</style>

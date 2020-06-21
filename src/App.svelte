<!-- Main component -->

<svelte:head>
	<!-- <link rel="stylesheet" href="assets/normalize.css"> -->
	<!-- <script src='assets/threex.rendererstats.js'></script> -->
	<!-- TODO SEO -->
</svelte:head>

<script>
	import SmartUniversity from "./SmartUniversity.svelte";
	// import 'bulma/css/bulma.css'
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
		z-index: 1;
		height: 0px;
	}


</style>

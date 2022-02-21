<template>
	<div class="column justify-center">
		<div>
			<img alt="logo" src="../assets/pp_logo.png" class="product-logo" />
		</div>
		<div class="self-center">
			<q-btn label="View Users" to="/users" color="primary" icon="mdi-account-multiple"></q-btn>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Home"
	};
</script>

<style scoped>
	.product-logo {
		max-width: 100%;
		margin: auto;
		padding-bottom: 15vh;
	}
</style>

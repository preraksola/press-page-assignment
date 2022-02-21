<template>
	<q-page class="row items-start justify-evenly">
		<home></home>
	</q-page>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import Home from "components/Home.vue";

	export default defineComponent({
		name: "PageIndex",
		components: { Home }
	});
</script>

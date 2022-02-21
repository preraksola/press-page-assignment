<template>
	<div class="q-pt-md">
		<q-btn label="Back" class="q-ml-lg" icon="mdi-arrow-left" color="primary" @click="goBack"></q-btn>
		<div v-if="isLoading" class="column justify-center items-center q-pa-xl text-positive text-bold">
			<q-spinner-orbit color="info" size="xl"></q-spinner-orbit>
			<span>Loading Data {{ isLoading }}</span>
		</div>
		<div v-if="!isLoading" class="row justify-center q-gutter-sm q-pt-sm">
			<div v-if="users.length === 0" class="row justify-center text-negative text-subtitle1">No data found</div>
			<div v-for="user in users" v-bind:key="user.id" class="col-xs-15 col-sm-5 col-md-3">
				<UserCard v-if="!isLoading" :user="user"></UserCard>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { User } from "src/utilities/models";
	import { notifyError } from "src/utilities/commonMethods";
	import { AxiosError } from "axios";
	import UserCard from "components/UserCard.vue";

	export default defineComponent({
		name: "Users",
		components: { UserCard },
		data() {
			return {
				isLoading: false
			};
		},
		async mounted() {
			try {
				await this.$store.dispatch("user/getUsers");
				this.isLoading = false;
			} catch (err) {
				notifyError(err as AxiosError);
			}
		},
		computed: {
			users(): User[] {
				return this.$store.getters["user/getUsersByCount"] as User[];
			}
		},
		methods: {
			goBack() {
				this.$router.back();
			}
		}
	});
</script>

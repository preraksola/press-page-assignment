<template>
	<q-card bordered>
		<q-item :href="user.html_url" target="_blank">
			<q-item-section avatar>
				<q-avatar size="40px">
					<img :src="user.avatar_url" alt="user-avatar" />
				</q-avatar>
			</q-item-section>

			<q-item-section>
				<q-item-label class="text-bold text-subtitle1">{{ user.login }}</q-item-label>
			</q-item-section>
		</q-item>

		<q-separator />

		<q-card-section horizontal class="justify-around text-center q-pa-xs">
			<div class="column items-center justify-center">
				<span class="text-primary text-subtitle1">
					<q-icon name="mdi-account-multiple" size="sm" />
					Followers
				</span>
				<span class="text-weight-medium">{{ followerCount }}</span>
			</div>

			<q-separator vertical inset />

			<div class="column items-center justify-center">
				<span class="text-positive text-subtitle1">
					<q-icon name="mdi-source-repository-multiple" size="sm" />
					Repositories
				</span>
				<span class="text-weight-medium">{{ repoCount }}</span>
			</div>

			<q-separator vertical inset />

			<div class="column items-center justify-center">
				<span class="text-primary text-subtitle1">
					<q-icon name="mdi-bell-ring" size="sm" />
					Subscriptions
				</span>
				<span class="text-weight-medium">{{ subscriptionCount }}</span>
			</div>
		</q-card-section>
		<q-separator />
		<q-card-actions align="right">
			<q-btn flat round color="negative" icon="delete" @click="deleteUser">
				<q-tooltip>Delete User</q-tooltip>
			</q-btn>
		</q-card-actions>
	</q-card>
</template>

<script lang="ts">
	import { User } from "src/utilities/models";

	import { getFollowerCount, getRepoCount, getSubscriptionCount } from "src/api/gitlab";
	import { notifyError, notifySuccess } from "src/utilities/commonMethods";
	import { AxiosError } from "axios";
	import { defineComponent } from "vue";

	export default defineComponent({
		name: "UserCard",
		props: {
			user: {
				type: Object as () => User,
				required: true
			}
		},
		data() {
			return {
				followerCount: 0,
				subscriptionCount: 0,
				repoCount: 0
			};
		},
		mounted() {
			this.getCountData();
		},
		methods: {
			deleteUser() {
				this.$store.commit("user/deleteUser", this.user);
				notifySuccess(`User "${this.user.login}" deleted successfully`);
			},

			getCountData() {
				getFollowerCount(this.user.followers_url)
					.then((res) => {
						this.followerCount = res.data?.length || 0;
					})
					.catch((err) => {
						notifyError(err as AxiosError);
					});

				getSubscriptionCount(this.user.subscriptions_url)
					.then((res) => {
						this.subscriptionCount = res.data?.length || 0;
					})
					.catch((err) => {
						notifyError(err as AxiosError);
					});

				getRepoCount(this.user.repos_url)
					.then((res) => {
						this.repoCount = res.data?.length || 0;
					})
					.catch((err) => {
						notifyError(err as AxiosError);
					});
			}
		}
	});
</script>

<style scoped></style>

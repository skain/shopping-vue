<script setup>
import ShoppingItem from './components/ShoppingItem.vue'
import ShoppingList from './shoppingList.js'
</script>

<script>
export default {
	data() {
		return {
			shoppingList: new ShoppingList()
		}
	},
	mounted() {
		this.shoppingList.loadFromStorage();
	}
}
</script>
<template>
	<div class="container" id="shoppingListContainer">
		<div class="row" v-for="item in shoppingList.listItems">
			<ShoppingItem :item="item" />
		</div>
	</div>
</template>

<style scoped>
#shoppingListContainer {
	margin-top: 10px;
}
</style>

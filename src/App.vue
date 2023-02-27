<script setup>
import ShoppingItem from './components/ShoppingItem.vue'
import ShoppingList from './shoppingList.js'
import { watch } from 'vue'
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
		watch(this.shoppingList,
			(newValue, oldValue) => {
				this.shoppingList.saveToStorage();
			},
			{ deep: true });
	}
}
</script>
<template>
	<div class="container" id="shoppingListContainer">
		<div class="row" v-for="item in shoppingList.listItems">
			<ShoppingItem :item="item" />
		</div>
	</div>
	<div id="addButton" @click="shoppingList.addNewItem()">
		+
	</div>
</template>

<style scoped>
#shoppingListContainer {
	margin-top: 10px;
}

#addButton {
	position: fixed;
	right: 12px;
	bottom: 21px;
	border-radius: 40px;
	font-size: 35px;
	font-weight: bold;
	background-color: lightblue;
	vertical-align: middle;
	text-align: center;
	height: 60px;
	width: 60px;
}

#addButton:hover {
		border: solid 1px;
		background-color: white;
	}
</style>

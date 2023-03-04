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
	<div id="shoppingListContainer">
			<ShoppingItem v-for="listItem in shoppingList.listItems" :item="listItem" @removeItemClick="(name) => shoppingList.removeItem(name)" />
	</div>
	<div id="buttonsDiv">
		<div id="sortButton" class="buttonDiv" @click="shoppingList.sortItems()">&ShortDownArrow;</div>
		<div id="addButton" class="buttonDiv" @click="shoppingList.addNewItem()">+</div>
	</div>
</template>

<style scoped>
#shoppingListContainer {
	margin-top: 10px;
	margin-inline: auto;
	max-width: 400px;
	display: grid;
	grid-template-columns: 1fr 80vw 1fr;
	row-gap: 4px;
}

#buttonsDiv {
	position: fixed;
	right: 12px;
	bottom: 21px;
}

.buttonDiv {
	border-radius: 20px;
	font-size: 24px;
	font-weight: bold;
	background-color: lightblue;
	vertical-align: middle;
	text-align: center;
	height: 38px;
	width: 38px;
	line-height: 38px;
	float: left;
	margin-right: 2px;
}

#sortButton {
	line-height: 32px;
}
</style>

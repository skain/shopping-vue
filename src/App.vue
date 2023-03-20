<script setup>
import ShoppingItem from './components/ShoppingItem.vue'
import ShoppingList from './shoppingList.js'
import { ref, watch, computed, reactive } from 'vue'

const shoppingList = reactive(new ShoppingList());
shoppingList.loadFromStorage();

function onItemChanged() {
	shoppingList.sortItems();
	shoppingList.saveToStorage();
}

function onItemRemoved(name) {
	shoppingList.removeItem(name);
	onItemChanged();
}

function onNewItemClicked() {
	shoppingList.addNewItem();
	shoppingList.sortItems();
	window.scrollTo(0, 0);
}

function onPPUCClicked() {
	window.open("https://skain.github.io/ppuc.htm");
}
</script>

<template>
	<div id="navDiv">
		<button type="button" class="navButton" id="addButton" @click="onNewItemClicked">+</button>
		<button type="button" class="navButton" id="PPUCButton" @click="onPPUCClicked">$/#</button>
	</div>
	<div id="appContainer">
		<div id="shoppingListContainer">
			<ShoppingItem v-for="listItem in shoppingList.listItems" :item="listItem" :key="listItem.id"
				@removeItemClick="(name) => onItemRemoved(name)" @itemChanged="onItemChanged" />
		</div>
	</div>
</template>

<style scoped>
#appContainer {
	margin: auto;
	width: var(--list-width);
}

#navDiv {
	position: sticky;
	top: 0;
	display: flex;
	justify-content: center;
	width: 100%;
	padding: 1rem 0;
	background-color: rgb(255, 242, 182);
	z-index: 1;
}

.navButton {
	padding: 2px 16px;
	border-radius: 5px;
	opacity: 0.9;
}

#addButton {
	color: var(--accent-color);
	font-weight: bold;
	border: solid 1px var(--accent-color);
	font-size: 1.5rem;
}

#PPUCButton {
	font-size: 1.0rem;
	margin-left: 6px;
	border-width: 1px;
}

#shoppingListContainer {
	margin-top: 1rem;
	display: grid;
	grid-template-columns: .5fr max(275px, 36vw) 2fr;
	row-gap: 4px;
	column-gap: 10px;
}
</style>
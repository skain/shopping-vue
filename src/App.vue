<script setup>
import ShoppingItem from './components/ShoppingItem.vue'
import ShoppingList from './shoppingList.js'
import { ref, watch, computed, reactive } from 'vue'

const shoppingList = reactive(new ShoppingList());
const sortedList = computed(() => shoppingList.sortItems());
shoppingList.loadFromStorage();
watch(shoppingList, () => shoppingList.saveToStorage(), { deep: true });
</script>

<template>
	<div id="shoppingListContainer">
			<ShoppingItem v-for="(listItem) in sortedList" :item="listItem" :key="JSON.stringify(listItem)" @removeItemClick="(name) => shoppingList.removeItem(name)" />
	</div>
	<div id="buttonsDiv">
		<div id="sortButton" class="buttonDiv" @click="shoppingList.sortItems()">&ShortDownArrow;</div>
		<div id="addButton" class="buttonDiv" @click="shoppingList.addNewItem()">+</div>
	</div>
</template>

<style scoped>
#shoppingListContainer {
	display: grid;
	grid-template-columns: .5fr max(275px, 36vw) 2fr;
	row-gap: 4px;
	column-gap: 10px;
}

#buttonsDiv {
	position: fixed;
	right: calc(50vw - (var(--list-width) / 2));
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

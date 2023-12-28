<script setup>
import ShoppingItem from './components/shoppingItem.vue'
import ShoppingList from './shoppingList.js'
import { reactive, toRefs } from 'vue'

const shoppingList = reactive(new ShoppingList());
var { itemFilter } = toRefs(shoppingList);
shoppingList.loadFromStorage();

function onItemChanged() {
	shoppingList.sortItems();
	shoppingList.saveToStorage();
}

function onItemNameChanged() {
	onItemChanged();
}

function onItemCheckedChanged() {
	shoppingList.itemFilter = '';
	onItemChanged();
}

function onItemRemoved(name) {
	shoppingList.removeItem(name);
	onItemChanged();
}

function onNewItemClicked() {
	shoppingList.addNewItem(shoppingList.itemFilter);
	onItemChanged();
	window.scrollTo(0, 0);
}

function onPPUCClicked() {
	window.open("https://skain.github.io/ppuc.htm");
}

function getImportExportDialog() {
	return document.getElementById("importExportDialog");
}

function getImportExportTextArea() {
	return document.getElementById("importExportText");
}

function getCopiedNotification() {
	return document.getElementById("copiedNotification");
}

function loadExportImportTextFromList() {
	const listData = shoppingList.getJSONFromStorage();
	getImportExportTextArea().value = listData;
	navigator.clipboard.writeText(listData);
	getCopiedNotification().style.visibility = 'visible';
}

function onExportImportClicked() {
	loadExportImportTextFromList();
	getImportExportDialog().showModal();
}

function onImportExportOKClicked() {
	getImportExportDialog().close();
}

function onClearTextClicked() {
	getImportExportTextArea().value = '';
	getCopiedNotification().style.visibility = 'hidden';
}

function onClearFilterClicked() {
	shoppingList.itemFilter = '';
}

function JSONIsValid(json) {
	try
	{
		JSON.parse(json);
		return true;
	}
	catch 
	{
		return false;
	}
}

function onImportClicked() {
	const toImport = getImportExportTextArea().value;
	if (confirm(`Import: ${toImport}`)) {
		if (JSONIsValid(toImport)) {
			shoppingList.saveJSONToStorage(toImport);
			shoppingList.loadFromStorage();
		}
		else {
			alert("JSON is not valid!");
		}
	} else {
		alert('Import cancelled.');
	}
}
</script>

<template>
	<div id="navDiv">
		<input type="text" v-model="itemFilter" placeholder="Filter/Add New Item">
		<button type="button" class="navButton" id="addButton" title="Add new item" @click="onNewItemClicked" v-show="shoppingList.listItems.length < 1">+</button>
		<button type="button" class="navButton" id="clearFilterButton" title="Clear filter" @click="onClearFilterClicked">X</button>
		<button type="button" class="navButton" id="PPUCButton" title="PricePerUnit Calculator" @click="onPPUCClicked">$/#</button>
		<button type="button" class="navButton" id="exportImportButton" title="Export/Import" @click="onExportImportClicked">&uarr; &darr;</button>
	</div>
	<div id="appContainer">
		<div id="shoppingListContainer">
			<ShoppingItem v-for="listItem in shoppingList.listItems" :item="listItem" :key="listItem.id"
				@removeItemClick="(name) => onItemRemoved(name)" @itemCheckedChanged="onItemCheckedChanged" @itemNameChanged="onItemNameChanged" />
		</div>
	</div>
	<dialog id="importExportDialog">
		<div id="importExportDialogForm">
			<h4>Import/Export Shopping List</h4>
			<textarea id="importExportText"></textarea>
			<div id="copiedNotification">
				<em>Data copied to clipboard!</em>
			</div>
			<div id="importExportButtons">
				<button type="button" @click="onImportExportOKClicked">OK</button>
				<button type="button" @click="onClearTextClicked">Clear</button>
				<button type="button" @click="onImportClicked">Import</button>
			</div>
		</div>
	</dialog>
</template>

<style scoped>
#appContainer {	
	margin: auto;
	width: var(--list-width);
}

h4 {
	margin: 0 0 6px 0;
	color: var(--off-black);
}

#navDiv {
	position: sticky;
	top: 0;
	display: flex;
	justify-content: center;
	width: 100%;
	padding: 1rem 0;
	background-color: var(--flat-bg-color);
	opacity: 0.9;
	z-index: 1;
	gap: 4px;
}

.navButton {
	padding: 2px 16px;
	border-radius: 5px;
	font-size: 1.0rem;
	border-width: 1px;
}

#addButton {
	color: var(--accent-color);
	font-weight: bold;
	border: solid 1px var(--accent-color);
	font-size: 1.5rem;
}

#shoppingListContainer {
	margin-top: 1rem;
	display: grid;
	grid-template-columns: .5fr max(275px, 36vw) 2fr;
	row-gap: 4px;
	column-gap: 10px;
}

#importExportDialog {
	height: 80vh;
	width: 80vw;
	border: none;
	background-color: var(--flat-bg-color);
}
#importExportDialogForm{
	height: 100%;
	display: flex;
	flex-direction: column;
	gap: 4px;
}

#importExportDialog textarea {
	height: 100%;
	display: block;
	border: none;
}

#importExportButtons {
	display: flex;
	justify-content: center;
	gap: 4px;
}

#importExportButtons button {
	font-size: 1.1rem;
	color: var(--off-black);
}

#copiedNotification {
	font-size: .8rem;
	color: red;
	visibility: hidden;
}
</style>
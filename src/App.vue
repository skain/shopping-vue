<script setup>
import ShoppingItem from './components/shoppingItem.vue'
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
	getImportExportTextArea().textContent = listData;
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
	getImportExportTextArea().textContent = '';
	getCopiedNotification().style.visibility = 'hidden';
}
</script>

<template>
	<div id="navDiv">
		<button type="button" class="navButton" id="addButton" @click="onNewItemClicked">+</button>
		<button type="button" class="navButton" id="PPUCButton" @click="onPPUCClicked">$/#</button>
		<button type="button" class="navButton" id="exportImportButton" @click="onExportImportClicked">&uarr; &darr;</button>
	</div>
	<div id="appContainer">
		<div id="shoppingListContainer">
			<ShoppingItem v-for="listItem in shoppingList.listItems" :item="listItem" :key="listItem.id"
				@removeItemClick="(name) => onItemRemoved(name)" @itemChanged="onItemChanged" />
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
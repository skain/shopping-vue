export default class ShoppingList {
	constructor() {
		this.listItems = [];
		this.localStorageKey = 'shoppingList';
	}

	loadFromStorage() {
		this.listItems = JSON.parse(localStorage.getItem(this.localStorageKey)) ?? [new ShoppingListItem('bananas'), new ShoppingListItem('xxx')];
	}

	saveToStorage() {
		localStorage.setItem(this.localStorageKey, JSON.stringify(this.listItems));
	}

	addNewItem() {
		this.listItems.push(new ShoppingListItem(''));
	}

	removeItem(name) {
		let indexToRemove = null;
		for (let i = 0; i < this.listItems.length; i++) {
			if (this.listItems[i].name === name) {
				indexToRemove = i;
				break;
			}
		}

		if (indexToRemove) {
			delete this.listItems[indexToRemove];
		}
	}
}

class ShoppingListItem {
	constructor(name) {
		this.name = name;
		this.checked = false;
	}
}
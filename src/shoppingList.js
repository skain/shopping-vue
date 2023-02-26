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
}

class ShoppingListItem {
	constructor(name) {
		this.name = name;
		this.checked = false;
	}
}
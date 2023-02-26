export default class ShoppingList {
	constructor() {
		this.listItems = [];
	}

	loadFromStorage() {
		this.listItems = JSON.parse(localStorage.getItem('shoppingList')) ?? [new ShoppingListItem('bananas'), new ShoppingListItem('xxx')];
	}
}

class ShoppingListItem {
	constructor(name) {
		this.name = name;
		this.checked = false;
	}
}
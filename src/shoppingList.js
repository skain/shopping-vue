export default class ShoppingList {
	constructor() {
		this.listItems = [];
		this.localStorageKey = 'shoppingList';
	}

	getJSONFromStorage() {
		return localStorage.getItem(this.localStorageKey);
	}

	saveJSONToStorage(json) {
		localStorage.setItem(this.localStorageKey, json);
	}

	loadFromStorage() {
		this.listItems = JSON.parse(this.getJSONFromStorage()) ?? [new ShoppingListItem('bananas'), new ShoppingListItem('xxx')];
	}

	saveToStorage() {
		this.saveJSONToStorage(JSON.stringify(this.listItems));
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

		if (indexToRemove > -1) {
			this.listItems.splice(indexToRemove, 1);
		}
	}

	getSortedItems() {
		function byName(a, b) {
			if (a.name < b.name)
				return -1;
			if (a.name > b.name)
				return 1;
			return 0;
		}

		function byChecked(a, b) {
			if (a.checked != b.checked) {
				if (a.checked) {
					return 1;
				}
				else {
					return -1;
				}
			}
			else {
				return 0;
			}
		}

		function fullSort(a, b) {
			let checked = byChecked(a, b);
			if (checked == 0) {
				return byName(a, b);
			}
			else {
				return checked;
			}

		}
		return [...this.listItems].sort(fullSort);
	}

	sortItems() {
		this.listItems = this.getSortedItems();
	}
}

class ShoppingListItem {
	constructor(name) {
		this.name = name;
		this.checked = false;
		this.id = Date.now();
	}
}
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

		if (indexToRemove > -1) {
			this.listItems.splice(indexToRemove, 1);
		}
	}

	sortItems() {
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
}

class ShoppingListItem {
	constructor(name) {
		this.name = name;
		this.checked = false;
	}
}
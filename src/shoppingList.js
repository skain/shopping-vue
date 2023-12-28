export default class ShoppingList {
	constructor() {
		this._listItems = [];
		this.localStorageKey = 'shoppingList';
		this.itemFilter = '';
	}

	get listItems() {
		return this.applyItemFilterToListItems();
	}

	applyItemFilterToListItems() {
		if (!this.itemFilter) {
			return this._listItems
		}
		return this._listItems.filter((item) => item.name.toLowerCase().includes(this.itemFilter.toLowerCase()));
	}

	getJSONFromStorage() {
		return localStorage.getItem(this.localStorageKey);
	}

	saveJSONToStorage(json) {
		localStorage.setItem(this.localStorageKey, json);
	}

	parseJSONFromStorage() {
		try 
		{
			return JSON.parse(this.getJSONFromStorage());
		}
		catch
		{
			return null;
		}
	}

	loadFromStorage() {
		this._listItems = this.parseJSONFromStorage() ?? [new ShoppingListItem('bananas'), new ShoppingListItem('xxx')];
	}

	saveToStorage() {
		this.saveJSONToStorage(JSON.stringify(this._listItems));
	}

	addNewItem(itemName) {
		console.log(`Adding: ${itemName}`);
		this._listItems.push(new ShoppingListItem(itemName));
	}

	removeItem(name) {
		let indexToRemove = null;
		for (let i = 0; i < this._listItems.length; i++) {
			if (this._listItems[i].name === name) {
				indexToRemove = i;
				break;
			}
		}

		if (indexToRemove > -1) {
			this._listItems.splice(indexToRemove, 1);
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
		return [...this._listItems].sort(fullSort);
	}

	sortItems() {
		this._listItems = this.getSortedItems();
	}
}

class ShoppingListItem {
	constructor(name) {
		this.name = name;
		this.checked = false;
		this.id = Date.now();
	}
}
<script setup>
const props = defineProps({ item: Object });
</script>
<template>
	<input class="item-cb" type="checkbox" v-model="item.checked" @change="$emit('itemCheckedChanged')">
	<input class="item-tb" type="text" v-model="item.name" @blur="$emit('itemNameChanged')">
	<button type="button" class="btn" @click="$emit('removeItemClick', item.name)">X</button>
</template>

<style scoped>
input {
	opacity: 0.75;
}

input:focus {
	opacity: 1.0;
}

.item-tb {
	border: solid 1px darkgray;
	padding: 4px 6px;
	border-radius: 4px;
}

@media screen and (max-width: 600px) {
	.item-tb {
		max-width: 277px;
	}
}

.item-cb {
	transform: scale(2);
}

input:checked {
	accent-color: var(--accent-color);
}

.btn {
	background-color: darkgray;
	color: white;
	border-radius: 5px;
	border: 1px solid rgb(112, 112, 112);
	font-weight: bold;
	max-width: 3ch;
}
</style>
<script setup>
const props = defineProps({ item: Object});
</script>
<template>
	<div style="align-self: center;">
		<input class="item-cb" type="checkbox" v-model="item.checked" @change="$emit('itemChanged')">
	</div>
	<div>
		<input class="item-tb" type="text" v-model="item.name" @blur="$emit('itemChanged')" >
	</div>
	<div style="justify-self: right;">
		<button type="button" class="btn" @click="$emit('removeItemClick', item.name)">X</button>
	</div>
</template>

<style scoped>
input {
	opacity: 0.75;
}

input:focus {
	opacity: 1.0;
}

.item-tb {
	width: 99%;
	border: solid 1px darkgray;
	padding: 4px 6px;
	border-radius: 4px;
}

.item-cb {
	transform: scale(2);
}

input:checked {
	accent-color: var(--accent-color);
}

.btn {
	line-height: 31px;
	margin-top: 1px;
	background-color: darkgray;
	color: white;
	border-radius: 5px;
	border: 1px solid rgb(112, 112, 112);
	padding: 1px 8px;
	font-weight: bold;
	margin-left: 2px;
}
</style>
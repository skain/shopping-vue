<script>
export default {
	props: ['item']
}
</script>
<template>
	<div>
		<input class="item-cb" type="checkbox" v-model="item.checked">
	</div>
	<div>
		<input class="item-tb" type="text" v-model="item.name">
	</div>
	<div>
		<button type="button" class="btn" @click="$emit('removeItemClick', item.name)">X</button>
	</div>
</template>

<style scoped>
.item-tb {
	width: 95%;
	border: solid 1px darkgray;
	padding: 4px 6px;
	border-radius: 4px;
}

.item-cb {
	margin: 6px;
	transform: scale(2);
}

input:checked {
	accent-color: rgb(194, 70, 48);
}

.btn {
	line-height: 20px;
	background-color: darkgray;
	color: white;
	border-radius: 5px;
	border: 1px solid rgb(112, 112, 112);
	padding: 1px 6px;
	font-weight: bold;
	margin-left: 2px;
}
</style>
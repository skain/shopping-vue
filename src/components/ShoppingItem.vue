<script>
export default {
	props: ['item']
}
</script>
<template>
	<div class="col-1">
		<input class="form-check-input item-cb" type="checkbox" v-model="item.checked">
	</div>
	<div class="col-11">
		<input class="form-control item-tb" type="text" v-model="item.name">
	</div>
</template>

<style scoped>
.item-cb {
	margin-top: 0px;
	height: 37px;
	width: 37px;

}

.item-tb {
	margin-left: 11px;
}
</style>
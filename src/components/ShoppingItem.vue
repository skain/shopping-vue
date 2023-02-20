<script>
export default {
	props: {
	}
}
</script>
<template>
	<div class="row">
		<div class="col-1">
			<input class="form-check-input item-cb" type="checkbox">
		</div>
		<div class="col-11">
			<input class="form-control item-tb" type="text" value="Bananas">
		</div>
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
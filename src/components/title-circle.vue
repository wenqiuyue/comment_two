<template>
	<div class="title-circle">
		<div class="left-circle" :style="bigCircleColor"></div>
		<div class="text" :style="`width:${textWidth}`">
			<span>{{ number }}</span>
			<div class="title">{{ title }}</div>
		</div>
		<div class="left-circle big" :style="bigCircleColor"></div>
		<div class="right-circle" :style="smallCircleColor"></div>
	</div>
</template>
<script>
export default {
	name: 'title-circle',
	props: {
		title: String,
		number: String,
		bigColorDeep: { tyep: String, default: '#FFCFDD' },
		bigColorShallow: { tyep: String, default: '#FFEAF0' },
    smallColor: { tyep: String, default: '#8ec6f9' },
    textWidth:String
	},
	computed: {
		bigCircleColor() {
			return {
				'background-image': `linear-gradient(${this.bigColorDeep}, ${this.bigColorShallow})`
			};
		},
		smallCircleColor() {
			return {
				background: this.smallColor
			};
		}
	}
};
</script>
<style lang="less" scoped>
.title-circle {
	padding: 2rem;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	.left-circle {
		height: 15px;
		width: 15px;
		border-radius: 50%;
	}
	.big {
		height: 16px;
		width: 16px;
	}
	.right-circle {
		height: 11px;
		width: 11px;
		border-radius: 50%;
		margin-top: 5px;
		margin-left: -6px;
		opacity: 0.7;
	}
	.text {
		position: relative;
		padding: 0 8px;
		text-align: center;
		span {
			font-size: 30px;
			color: #ebebec;
		}
		.title {
			position: absolute;
			top: 7px;
			font-weight: bold;
			font-size: 20px;
		}
	}
}
</style>

<template>
	<div class="title-circle">
		<div class="left-circle" :style="leftCircle"></div>
		<div class="text" :style="`width:${textWidth}`">
			<!-- <span>{{ number }}</span> -->
			<div class="title" :style="titleStyle">{{ title }}</div>
		</div>
		<div class="left-circle" :style="rightCircleBig"></div>
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
		textWidth:{type:String,default:'151px'},
		leftCircleSize:{type:String,default:'15px'},
		rightCircleBigSize:{type:String,default:'16px'},
		rightCircleSmallSize:{type:String,default:'11px'},
		titleFontSize:{type:String,default:'20px'},
	},
	computed: {
		leftCircle() {
			return {
				'background-image': `linear-gradient(${this.bigColorDeep}, ${this.bigColorShallow})`,
				'height': `${this.leftCircleSize}`,
				'width': `${this.leftCircleSize}`
			};
		},
		rightCircleBig() {
			return {
				'background-image': `linear-gradient(${this.bigColorDeep}, ${this.bigColorShallow})`,
				'height': `${this.rightCircleBigSize}`,
				'width': `${this.rightCircleBigSize}`
			};
		},
		smallCircleColor() {
			return {
				background: this.smallColor,
				'height': `${this.rightCircleSmallSize}`,
				'width': `${this.rightCircleSmallSize}`
			};
		},
		titleStyle(){
			return {
				'top': `${this.titleTop}`,
				'font-size': `${this.titleFontSize}`
			}
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
		border-radius: 50%;
	}
	.right-circle {
		border-radius: 50%;
		margin-top: 5px;
		margin-left: -6px;
		opacity: 0.7;
	}
	.text {
		padding: 0 8px;
		text-align: center;
		.title {
			font-weight: bold;
		}
	}
}
</style>

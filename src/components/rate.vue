<template>
  <el-rate
    class="c_t_rate"
    v-model="value"
    :icon-classes="iconClasses"
    void-icon-class="iconfont icon-pingfendengjiRating4"
    :colors="['#FF3722', '#FF8622','#FFCE00']"
    :disabled="isDisabled"
    disabled-void-color="rgb(198, 209, 222)"
    disabled-void-icon-class="iconfont icon-pingfendengjiRating4"
    allow-half
  >
  </el-rate>
</template>
<script>
export default {
  name:'rate',
  props:{
    value:{
      type:Number,
      default:null
    },
    isDisabled:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return{
      iconClasses: ['iconfont icon-pingfendengjiRating4', 'iconfont icon-pingfendengjiRating4', 'iconfont icon-pingfendengjiRating4'],
    }
  },
}
</script>
<style lang="less" scoped>
</style>
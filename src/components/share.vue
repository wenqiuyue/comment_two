<template>
  <div class="share">
      <facebook :url="url" :scale="size"></facebook>
      <twitter :url="url"  :scale="size"></twitter>
      <linkedin :url="url" :scale="size"></linkedin>
      <telegram :url="url" :scale="size"></telegram>
      <pinterest :url="url" :scale="size"></pinterest>
      <reddit :url="url" :scale="size"></reddit>
      <google :url="url" :scale="size"></google>
      <email :url="url" :scale="size"></email>
  </div>
</template>
<script>
import {
  Facebook,
  Twitter,
  Linkedin,
  Pinterest,
  Reddit,
  Telegram,
  Email,
  Google
} from "vue-socialmedia-share";
export default {
  name:"share",
  components: {
    Facebook,
    Twitter,
    Linkedin,
    Pinterest,
    Reddit,
    Telegram,
    Email,
    Google
  },
  props:{
    size:{
      type:String,
      default:'3'
    },
    url:{
      type:String,
      default:null
    }
  },
  data(){
    return{
    }
  },
}
</script>
<style lang="less" scoped>
.share{
  text-align: center;
  span{
    margin-right: 5px;
  }
}
</style>
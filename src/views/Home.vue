<template>
  <div class="home">
    <div class="test">111</div>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
<style lang="less" scoped>
@import '../assets/style/style.less';
.home{
  // background: @main-color;
  .test{
    background: @main-color;
  }
}
</style>

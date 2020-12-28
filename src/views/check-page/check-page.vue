<template>
  <div class="check-page">
    <header-com></header-com>
    <div class="c_check">
      <h1><span>You are being redirected</span> <span element-loading-spinner="el-icon-loading" v-loading="loading"></span></h1>
      <h4>We are checking <span>{{url}}</span> through our antivirus system</h4>
      <h5>Please be patient,as this may take a few moments.</h5>
      <h6 @click="handleUrl">if you are not redirected, please continue here to {{url}}</h6>
    </div>
    <footer-com></footer-com>
  </div>
</template>
<script>
export default {
  data(){
    return {
      loading:true,
      url:null
    }
  },
  mounted(){
    console.log(this.$route.query)
    this.url=this.$route.query.url
    setTimeout(()=>{
      this.handleUrl();
    },3000)
  },
  methods:{
    /**
     * 跳转到产品页
     */
    handleUrl(){
      window.location.href=this.$route.query.url
      this.loading=false
    }
  }
}
</script>
<style lang="less" scoped>
.check-page{
  height: 100%;
  .c_check{
    background: #f2f2f5;
    text-align: center;
    padding: 7rem 0;
    h1{
      span{
        margin-left: 0.8rem;
      }
    }
    h4{
      font-weight: normal;
      font-size: 1.5rem;
      color: #515174;
      span{
        color: #67c23a;
      }
    }
    h5{
      font-weight: normal;
      font-size: 1rem;
      color: #515174;
    }
    h6{
      font-weight: normal;
      font-size: 1rem;
      color:#67c23a;
      margin: 1rem 0;
      cursor: pointer;
    }

  }
}
</style>
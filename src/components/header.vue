<template>
  <div class="header_com">
    <div class="h_header">
      <div class="logo">
        <span class="l_logo" @click="goHome">
          <el-image
            style="width: 11rem"
            :src="require('../assets/logo1.png')"
            fit="contain">
          </el-image>
        </span>
        <div class="search" v-if="isShowSearch">
          <el-input v-model="searchData" placeholder="Search for a company or category…"></el-input>
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">Search</el-button>
        </div>
      </div>
      <div class="header_button">
        <span class="categories" @click="goCategories">Categories</span>
        <el-button class="companies" type="gone" plain>For companies</el-button>
      </div>
    </div>
    <div class="phone_header">
      <div class="p_logo" v-if="!isPhoneSearch">
        <svg-icon value="icon-fanhui" :size="1.5" v-if="isShowSearch" @click="$router.back()"></svg-icon>
        <span @click="goHome">
          <el-image
            style="width: 9rem"
            :src="require('../assets/logo1.png')"
            fit="contain">
          </el-image>
        </span>
      </div>
      <div class="p_icon" v-if="!isPhoneSearch">
        <i class="p_h_icon el-icon-search" @click="isPhoneSearch=true"></i>
        <el-dropdown trigger="click" @command="handleCommand">
          <i class="p_h_icon el-icon-menu"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">Categories</el-dropdown-item>
            <el-dropdown-item command="2">For companies</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <el-input
        v-else
        placeholder="Search for a company or category…"
        v-model="searchData">
        <el-button type="primary" slot="append" size="mini" @click="handleSearch">Search</el-button>
        <i slot="prefix" class="el-input__icon el-icon-back" style="font-size:1.1rem" @click="isPhoneSearch=false"></i>
      </el-input>
    </div>
  </div>
</template>
<script>
export default {
  name:'header-com',
  props:{
    //是否显示搜索功能
    isShowSearch:{
      type:Boolean,
      default:true
    },
    //搜索是否跳转
    isRouter:{
      type:Boolean,
      default:true
    }
  },
  data(){
    return {
      activeIndex: '1',
      searchData:null, //搜索
      isPhoneSearch:false
    }
  },
  methods:{
    /**
     * 搜索
     */
    handleSearch(){
      if(!this.searchData){
        return;
      }
      this.$router.push({
        path:'/product-list',
        query:{
          searchData:this.searchData
        }
      })
      this.$emit('freshData',1,this.searchData);
    },
    /**
     * 去往分类页面
     */
    goCategories(){
      this.$router.push({ path: '/categories'});
    },
    /**
     * 去往首页
     */
    goHome(){
      this.$router.push({ path: '/'});
    },
    /**
     * 手机模式下拉菜单触发
     */
    handleCommand(command){
      if(command==1){
        this.goCategories();
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import '../assets/style/style.less';
.header_com{
  background: @main-color;
  .h_header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
    font-weight: bold;
    height: 72px;
    padding:0 20px;
    color: #333333;
    max-width: 1206px;
    margin: 0 auto;
    .logo{
      display: flex;
      flex-direction: row;
      align-items: center;
      .l_logo{
        cursor: pointer;
      }
      .search{
        margin-left: 32px;
        display: flex;
        flex-direction: row;
        width: 390px;
        button{
          margin-left: 5px;
        }
      }
    }
    .header_button{
      .categories{
        cursor: pointer;
      }
      .companies{
        margin-left: 2rem;
        border: 2px solid #333333;
        font-weight: bold;
        display: initial;    
      }
      .el-button--gone:hover
      {
        background: #333333;
        border-color: #333333;
        color: @main-color;
      }
      .el-button--gone{
        background: @main-color;
        color:#333333;
      }
    }
  }
  .phone_header{
    display: none;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
    font-weight: bold;
    height: 72px;
    padding:0 20px 0 15px;
    color: #ffffff;
    max-width: 1206px;
    margin: 0 auto;
    .p_logo{
      display: flex;
      align-items: center;
      svg{
        margin-right: 1rem;
      }
    }
    .p_icon{
      .p_h_icon{
        font-size: 1.3rem;
        margin-left: 1rem;
        color: #ffffff;
      }
    }
  }
  @media all and (max-width: 1024px) {
    .phone_header{
      display: flex;
    }
    .h_header{
      display: none;
    }
  }
}
</style>
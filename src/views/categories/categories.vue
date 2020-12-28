<template>
<div class="categories" v-loading="loading">
  <header-com></header-com>
  <div class="c_categories">
    <div class="categories_top">
      <div class="c_t_container">
        <h2>Explore comment.com Marketplace</h2>
        <h5>Find the right products for you and your internet business.</h5>
      </div>
    </div>
    <div class="c_c_categories">
      <el-row :gutter="20">
        <el-col :span="8" :xs="0">
          <div class="left_categories">
            <h3>View Category</h3>
            <ul>
              <li v-for="(item,index) in typeList" :key="index" @click="handleLeftCategory(index)">{{item.Name}}</li>
            </ul>
          </div>
        </el-col>
        <el-col :span="16" :xs="24">
          <div class="right_categories">
            <el-row :gutter="20" v-for="(item,index) in typeList" :key="index" class="right_row" :id="index">
              <el-col :span="8"><div class="r_left_categories"><span>{{item.Name}}</span></div></el-col>
              <el-col :span="16">
                <div class="r_right_categories">
                  <span v-for="(citem,cindex) in item.info" :key="cindex" @click="handleProductList(citem,item.Name)">{{citem.Name}}</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
    <footer-com></footer-com>
  </div>
</div>
</template>
<script>
export default {
  data(){
    return{
      loading:false,
      typeList:null
    }
  },
  mounted(){
    this.getTypeListData();
  },
  methods:{
    /**
     * 获取分类列表
     */
    getTypeListData(){
      this.loading=true;
      this.$apiHttp.getTypeList().then((resp)=>{
        if(resp.res==200){
          this.typeList=resp.data
        }
      this.loading=false;
      })
    },
    /**
     * 点击左边的分类，右边定位
     */
    handleLeftCategory(index){
      window.location.href = `#${index}`;
    },
    /**
     * 根据类别查看产品列表
     */
    handleProductList(item,name){
      this.$router.push({
        path:'/product-list',
        query:{
          pName:name,
          Name:item.Name,
          Id:item.Id
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.categories{
  height: 100%;
}
.c_categories{
  background: #f2f2f5;
  height: calc(100% - 72px);
  overflow: auto;
  .categories_top{
    background: #ffffff;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 50, 0.04);
    .c_t_container{
      max-width: 1056px;
      margin-left: auto;
      margin-right: auto;
      padding: 18px 16px;
      h2{
        margin: 0;
      }
      h5{
        margin: 5px 0 0 0;
        font-size: 16px;
        color: #aaa;
        font-weight: normal;
      }
    }
  }
  .c_c_categories{
    padding: 16px;
    max-width: 1056px;
    margin: 0 auto;
    min-height: calc(100% - 210px);
    .left_categories{
      background: #ffffff;
      padding: 28px 24px;
      h3{
        margin-top: 0;
        margin-bottom: 24px;
        font-weight: 400;
      }
      ul{
        margin: 0;
        padding: 0;
        list-style-type: none;
        li{
          margin-bottom: 16px;
          font-size: 0.875rem;
          cursor: pointer;
          &:hover{
            color: #1989fa;
          }
        }
      }
    }
    .right_categories{
      background: #ffffff;
      padding: 28px 24px;
      .right_row{
        margin-bottom: 15px;
        .r_left_categories{
          font-size: 1.17rem;
          color: #1b1b21;
        }
        .r_right_categories{
          padding-bottom: 15px;
          border-bottom: 1px solid #E8E8EB;
          display: flex;
          flex-flow: row wrap;
          line-height: 1.5rem;
          span{
            flex-basis: 50%;
            margin-bottom: 8px;
            overflow-wrap: break-word;
            word-wrap: break-word;
            font-size: 0.875rem;
            color: #1b1b21;
            cursor: pointer;
            &:hover{
              color: #1989fa;
            }
          }
        }
      }
    }
  }
}
	@media all and (max-width: 1024px) {
    .c_categories{
      .categories_top{
        .c_t_container{
          padding: 0.8rem 1rem;
          h2{
            font-size: 1.1rem;
          }
          h5{
            font-size: 0.875rem;
          }
        }
      }
      .c_c_categories{
        padding: 0.5rem;
        min-height: calc(100% - 158px);
        .right_categories{
          padding: 1.5rem 1rem;
          .right_row{
            margin-bottom: 1rem;
            .r_left_categories{
              font-size: 1rem;
            }
            .r_right_categories{
              padding-bottom: 0.3rem;
              line-height: 1.5rem;
              span{
                flex-basis: 50%;
                margin-bottom: 8px;
                font-size: 0.75rem;
              }
            }
          }
        }
      }
    }
  }
</style>
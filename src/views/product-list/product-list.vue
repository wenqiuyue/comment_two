<template>
  <div class="product-list" v-loading="loading">
    <header-com :isRouter="false" @freshData="getQuerySearch"></header-com>
    <div class="p_product-list">
      <div class="p_product-list_top">
        <div class="p_l_t_container">
          <div class="return" v-if="!searchWord && typeData.pName" ><span @click="$router.back()"><i class="el-icon-arrow-left"></i>{{typeData.pName}}</span></div>
          <h2>{{`${proList&&proList.length?proList.length:0} result(s) for "${searchWord?searchWord:typeData.Name}"`}}</h2>
          <h5>Find the right products for you and your internet business.</h5>
        </div>
      </div>
      <div class="p_product-list_container">
        <div v-if="proList&&proList.length>0">
          <div class="list_card" v-for="(item,index) in proList" :key="index" @click="handleProductInfo(item.Id)">
            <el-image
              :src="item.Cover"
              fit="contain"
              >
               <div slot="error" class="error_img_tips">
                  Failed to load 
              </div>
            </el-image>
            <div class="list_card_right">
              <div>
                <span class="l_c_r_title">{{item.Name}}</span>
              </div>
              <div class="l_c_r_score">
                <rate
                  class="c_t_rate"
                  :value="item.Rank"
                  :isDisabled="true"
                >
                </rate>
                <span class="score_num">{{item.CommentCount}} reviews</span>
                <el-tag type="primary" size="small" v-if="item.Price">${{item.Price}} one time fee</el-tag>
                <el-tag type="success" size="small" v-if="item.Discount">{{item.Discount}}</el-tag>
              </div>
              <p class="l_c_r_describ">{{item.Description?item.Description.replace(/&lt;.+?&gt;/g, ''):'No introduction'}}</p>
            </div>
          </div>
        </div>
        <empty v-else :tips="'No data available'"></empty>
      </div>
      <div class="page" v-if="pageData.pageNum>1">
        <el-pagination
          layout="prev, pager, next"
          :page-count="pageData.pageNum"
          :current-page="pageData.pageIndex"
          :page-size="pageData.pageSize"
          @current-change="handleChangePage($event)"
        >
        </el-pagination>
      </div>
      <footer-com></footer-com>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      searchWord:null, //搜索的词
      loading:false, //加载
      proList:[], //产品列表数据
      typeData:{
        pName:null, //产品一级分类名称
        Name:null, //二级分类数据
        Id:null
      },
       pageData:{
        pageIndex: 1,
        pageSize: 10,
        pageNum: 0,
      }
    }
  },
  created(){
    this.searchWord=this.$route.query.searchData
    this.typeData.pName=this.$route.query.pName
    this.typeData.Name=this.$route.query.Name
    this.typeData.Id=this.$route.query.Id
  },
  mounted(){
    if(this.searchWord){
      this.getQuerySearch();
    }else{
      this.getTypeToProductData();
    }
  },
  methods:{
    /**
     * 分页切换
     */
    handleChangePage(page){
      if(this.searchWord){
        this.getQuerySearch(page);
      }else{
        this.getTypeToProductData(page);
      }
    },
    /**
     * 根据类型获取产品
     */
    getTypeToProductData(page){
      this.loading=true;
      if(page){
        this.pageData.pageIndex=page;
      }else{
        this.pageData.pageIndex=1;
      }
      const data={
        typeId:this.typeData.Id,
        page:this.pageData.pageIndex,
        pageCount:this.pageData.pageSize
      }
      this.$apiHttp.getTypeToProduct({params:data}).then((resp)=>{
        if(resp.res==200){
          this.proList=resp.data.query
          this.pageData.pageNum=resp.data.pageCount;
        }
        this.loading=false;
      })
    },
    /**
     * 获取搜索产品
     */
    getQuerySearch(page,word){
      if(word){
        this.searchWord=word;
      }
      this.loading=true;
      if(page){
        this.pageData.pageIndex=page;
      }else{
        this.pageData.pageIndex=1;
      }
      const data={
        work:this.searchWord,
        page:this.pageData.pageIndex,
        pageCount:this.pageData.pageSize
      }
      this.$apiHttp.querySearch({ params:data}).then((resp)=>{
        if(resp.res==200){
          this.proList=resp.data.query;
          this.pageData.pageNum=resp.data.pageCount;
        }
        this.loading=false;
      })
    },
    /**
     * 查看产品详情
     */
    handleProductInfo(pid){
      this.$router.push({
        path:'/product-info',
        query:{
          pid:pid
        }
      });
    },
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/style/style.less';
  .product-list{
    height: 100%;
    .p_product-list{
      background: #f2f2f5;
      height: calc(100% - 72px);
      overflow: auto;
      .p_product-list_top{
        background: @top-bg;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 50, 0.04);
        .p_l_t_container{
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
          .return{
            span{
              cursor: pointer;
              font-size: 0.875rem;
              color: #1b1b21;
              &:hover{
                color:#1989fa;
              }
            }
          }
        }
      }
      .p_product-list_container{
        min-height: calc(100% - 310px);
        max-width: 1056px;
        margin: 0 auto;
        padding: 15px 0 25px 0;
        .list_card{
          background: @car-bg;
          box-shadow: 0 12px 20px 0 rgba(0, 0, 50, 0.12);
          margin-bottom: 12px;
          padding: 24px 10px 24px 40px;
          display: flex;
          flex-direction: row;
          .el-image{
            width: 100px;
            height: 65px;
          }
          /deep/.error_img_tips{
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            color: #c0c4cc;
            vertical-align: middle;
            background: #f5f7fa;
          }
        }
        .list_card_right{
          width: calc(100% - 132px);
          padding-left: 32px;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          .l_c_r_title{
            font-size: 1.125rem;
            color: #1b1b21;
          }
          .l_c_r_score{
            margin-top: 12px;
            display: flex;
            flex-direction: row;
            align-items: center;
            /deep/.el-rate__icon{
                font-size: 1.3rem;
              }
            /deep/.icon-pingfendengjiRating4{
              font-size: 1.3rem;
            }
            .score_num{
              margin:0 5px;
              color: #454554;
              font-size: 0.875rem;
            }
            .el-tag{
              margin-left: 6px;
            }
          }
          .l_c_r_describ{
            color: #6f6f87;
            font-size: 0.875rem;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
          }
        }
      }
      .page{
        background: #ffffff;
      }
    }
    @media all and (max-width: 1024px) {
      .p_product-list{
        .p_product-list_top{
          .p_l_t_container{
            padding: 0.8rem 0.8rem;
            h2{
              margin: 0.3rem 0 0 0;
              font-size: 1.25rem;
            }
            h5{
              margin: 0.3rem 0 0 0;
              font-size: 0.875rem;
            }
            .return{
              span{
                font-size: 0.875rem;
              }
            }
          }
        }
        .p_product-list_container{
          min-height: calc(100% - 158px);
          max-width: 97%;
          padding: 0.5rem 0;
          .list_card{
            box-shadow: 0 2px 3px 0 rgba(0, 0, 50, 0.12);
            margin-bottom: 0.5rem;
            padding: 0.6rem 0.3rem 0.4rem 0.5rem;
            .el-image{
              width: 80px;
              height: 80px;
            }
          }
          .list_card_right{
            width: calc(100% - 90px);
            padding-left: 10px;
            .l_c_r_title{
              font-size: 1rem;
            }
            .l_c_r_score{
              margin-top: 0.3rem;
              display: flex;
              flex-direction: row;
              flex-flow: row wrap;
              align-items: center;
              /deep/.el-rate__icon{
                font-size: 1rem;
              }
              /deep/.icon-pingfendengjiRating4{
                font-size: 1rem;
              }
              .score_num{
                margin:0 5px;
                font-size: 0.75rem;
              }
              .el-tag{
                margin-left:0;
                margin-right: 5px;
                margin-top: 5px;
              }
            }
            .l_c_r_describ{
              font-size: 0.8rem;
              margin: 0.5rem 0;
            }
          }
        }
      }
    }
  }
</style>
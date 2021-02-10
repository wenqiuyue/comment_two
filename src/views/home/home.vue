<template>
<div class="home" v-loading="loading">
  <header-com :isShowSearch="false"></header-com>
  <div class="h_home">
    <div class="banner">
      <div class="c_banner">
        <h1 class="title_1">Listen to free and true voices from the public.</h1>
        <h2 class="title_2">We support you to write good reviews, and also support you to leave negative reviews.</h2>
        <div class="b_search">
          <el-input class="s_input" v-model="searchData" placeholder="Search for a company or category…"></el-input>
          <el-button class="s_button" type="success" icon="el-icon-search" @click="handleSearch" plain>Search</el-button>
        </div>
        <h2 class="title_3">Browse businesses by category</h2>
        <div class="b_type">
          <div class="type_card" v-for="(item,index) in hotType" :key="item.id" @click="handleProList(item)">
            <svg-icon value="icon-greenFlowerBG" :size="7.7"></svg-icon>
            <div class="type_card_text">{{item.name}}</div>
          </div>
          <div class="type_card" @click="goCategories">
            <svg-icon value="icon-greenFlowerBG" :size="7.7"></svg-icon>
            <div class="type_card_text">More</div>
          </div>
        </div>
      </div>
    </div>
    <div class="recent_reviews pc" @click="clickCard($event)">
      <div class="r_r_title">
        <title-circle 
          :title="'Recent reviews'" 
          :textWidth="'310px'"
          :titleFontSize="'40px'"
          :rightCircleBigSize="'26px'"
          :rightCircleSmallSize="'21px'" 
          :leftCircleSize="'25px'">
        </title-circle>
      </div>
      <vue-seamless-scroll v-if="hotReview && hotReview.length>0" :data="hotReview" :class-option="defaultOption" class="seamless-warp">
        <div class="r_r_reviews" >
          <div class="r_r_r_card" v-for="(item,index) in hotReview" :key="index">
            <div class="r_r_r_c_card" v-for="(review,ind) in item" :key="ind">
              <div class="c_title">
                <el-avatar class="c_t_img" size="large" :src="review.Icon"></el-avatar>
                <rate
                  class="c_t_rate"
                  :value="review.Rank"
                  :isDisabled="true"
                >
                </rate>
              </div>
              <p class="c_user">{{review.Name}} <span class="rev">reviewed</span> <span :data-pro="JSON.stringify(review)" :id="review.ComentId"  class="pro">{{review.ProName}}</span></p>
              <p class="c_text_title">{{review.Title}}</p>
              <p class="c_text">
                {{review.Content}}
              </p>
            </div>
          </div>
        </div>
      </vue-seamless-scroll>
      <empty v-else :tips="'No hot comments'" :paddingData="3"></empty>
    </div>
    <div class="recent_reviews phone">
      <title-circle :title="'Recent reviews'"></title-circle>
        <div class="r_r_reviews" v-if="hotReview && hotReview.length>0">
          <div class="r_r_r_card" v-for="(item,index) in hotReview" :key="index">
            <div class="r_r_r_c_card" v-for="(review,ind) in item" :key="ind">
              <div class="c_title">
                <el-avatar class="c_t_img" size="large" :src="review.Icon"></el-avatar>
                <rate
                  class="c_t_rate"
                  :value="review.Rank"
                  :isDisabled="true"
                >
                </rate>
              </div>
              <p class="c_user">{{review.Name}} <span class="rev">reviewed</span> <span @click="handleProInfo(review)" class="pro">{{review.ProName}}</span></p>
              <p class="c_text_title">{{review.Title}}</p>
              <p class="c_text">
                {{review.Content}}
              </p>
            </div>
          </div>
        </div>
      <empty v-else :tips="'No hot comments'" :paddingData="3"></empty>
    </div>
    <div class="be_heard">
      <div class="pc">
        <title-circle 
            :title="'About'" 
            :textWidth="'145px'"
            :titleFontSize="'40px'"
            :rightCircleBigSize="'26px'"
            :rightCircleSmallSize="'21px'" 
            :leftCircleSize="'25px'">
        </title-circle>
      </div>
      <div class="phone">
        <title-circle :title="'About'" :textWidth="'75px'"></title-circle>
      </div>
      <!-- <h1 class="heard_title">About</h1> -->
      <p class="heard_text">
        comment.com provides you with millions of valuable user reviews. Sharing your most authentic experience to help customers make better choices.
      </p>
      <div class="what_do"><el-button class="companies" type="gone" plain @click="goCategories">Find out</el-button></div>
    </div>
    <footer-com></footer-com>
  </div>
</div>
</template>
<script>
import vueSeamlessScroll from 'vue-seamless-scroll'
export default {
  components:{
    vueSeamlessScroll
  },
  data(){
    return{
      loading:false, //加载
      searchData:null, //搜索
      hotReview:null, //热门评论
      hotType:null, //热门分类
    }
  },
  computed: {
    defaultOption () {
      return {
        step: 1, // 数值越大速度滚动越快
        limitMoveNum: this.hotReview.length, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 3, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      }
    }
},
  mounted(){
    this.getQueryCommentTypeData();
  },
  methods:{
    /**
     * 去当前热门分类的产品列表
     */
    handleProList(item){
      this.$router.push({
        path:'/product-list',
        query:{
          Name:item.name,
          Id:item.id
        }
      })
    },
    clickCard(e){
      if(!e.target.id){
        return;
      }
      const item = JSON.parse(e.target.dataset.pro);
      if(!item.ProId){
        return;
      }
      this.$router.push({
        path:'/product-info',
        query:{
          pid:item.ProId
        }
      })
    },
    /**
     * 查看评论中的产品详情
     */
    handleProInfo(review){
      if(!review.ProId){
        return;
      }
      this.$router.push({
        path:'/product-info',
        query:{
          pid:review.ProId
        }
      })
    },
    /**
     * 搜索
     */
    handleSearch(){
      if(this.searchData){
          this.$router.push({
          path:'/product-list',
          query:{
            searchData:this.searchData
          }
        })
      }
    },
    /**
     * 获取首页热门评论
     */
    getQueryCommentTypeData(){
      this.loading=true;
      Promise.all([
        this.$apiHttp.getQueryHotType({params:{pageCount:3}}),
        this.$apiHttp.getQueryHotComment({params:{pageCount:12}})
      ]).then((resp)=>{
        if(resp[0].res == 200 && resp[1].res == 200){
          if(resp[1].data){
            this.hotReview = _.chunk(resp[1].data,2);
          }
          this.hotType=resp[0].data;
        }
      }).finally(()=> this.loading=false);
    },
    /**
     * 查看分类
     */
    goCategories(){
      this.$router.push({ path: '/categories'});
    }
  }
}
</script>
<style lang="less" scoped>
.home{
  height: 100%;
}
.h_home{
  height: calc(100% - 72px);
  overflow: auto;
  .banner{
    background: url("~@/assets/images/banner.jpg") no-repeat;
    height: 600px;
    width: 100%;
    background-size:cover;
    .c_banner{
      padding: 80px 24px 88px;
      width: 50%;
      margin: 0 auto;
      .title_1{
        margin-bottom: 12px;
        color: #ffffff;
      }
      .title_2{
        font-size: 1.25rem;
        color: #E7E9E9;
        margin-bottom: 40px;
        font-weight: 500;
      }
      .title_3{
        font-size: 1rem;
        color:  #E7E9E9;
        margin-bottom: 30px;
        font-weight: 500;
      }
      .b_search{
        display: flex;
        flex-direction: row;
        margin-bottom: 56px;
        .s_input{
          margin-right: 3px;
          /deep/.el-input__inner{
            height: 60px;
            color: #1B1B21;
            font-size: 1rem;
          }
        }
        .s_button{
          font-size: 1rem;
        }

      }
      .b_type{
        padding-top: 16px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .type_card{
          flex-shrink: 0;
          position: relative;
          cursor: pointer;
          margin-bottom: 8px;
          height: 123px;
          width: 123px;
          display: flex;
          justify-content: center;
          .type_card_text{
            font-size: 0.875rem;
            font-weight: bold;
            position: absolute;
            color: #666666;
            text-align: center;
            height: 123px;
            width: 100px;
            top: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            word-break: break-all;
          }
          .type_card_icon{
            margin-bottom: 0.2rem;
          }
        }
      }
    }
  }
  .recent_reviews{
    background-color: #F9F8F6;
    overflow:hidden;
    .seamless-warp{
      // height: 540px;
    }
    .r_r_title{
      padding:35px 0 25px 0;
    }
    .r_r_reviews{
      padding: 0 12px;
      display:flex;
      flex-direction: row;
      width: 2160px;
      &:last-child {
        margin-right:-143px;
      }
      .r_r_r_card{
        display: flex;
        flex-direction: column;
        padding-bottom: 15px;
        margin-right: 10px;
        width: 330px;
        flex-shrink: 0;
        .r_r_r_c_card{
          border-radius: 8px;
          background: #ffffff;
          margin-bottom: 10px;
          padding: 22px 15px 22px 22px;
          width: 290px;
          box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
          transition: transform .6s,box-shadow .6s;
          cursor: default;
          &:hover{
            transform: perspective(1px) scale(1.05);
            box-shadow: 0 12px 20px 0 rgba(0,0,50,0.12);
          }
          .c_title{
            display: flex;
            flex-direction: row;
            align-items: center;
            .c_t_img{

            }
            .c_t_rate{
              margin-left: 8px;
              /deep/.el-rate__icon{
                font-size: 1.2rem;
              }
              /deep/.icon-pingfendengjiRating4{
                font-size: 1.2rem;
              }
            }
          }
          .c_user{
            color: #1b1b21;
            font-weight: 700;
            font-size: 0.75rem;
            .rev{
              color: #adadad;
            }
            .pro{
              cursor: pointer;
            }
          }
          .c_text_title{
            display: -webkit-box;
            -webkit-line-clamp: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            margin-bottom: 5px;
            font-weight: bold;
          }
          .c_text{
            font-size: 0.875rem;
            display: -webkit-box;
            -webkit-line-clamp: 6;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            color: #1B1B21;
          }
        }
      }
    }
  }
  .phone{
    display: none;
  }
  .pc{
    display: flex;
    flex-direction: column;
  }
  .be_heard{
    background-color:#F9F8F6;
    padding: 10px 24px 80px;
    .heard_title{
      text-align: center;
      font-size: 2.875rem;
      margin-top: 0;
      margin-bottom: 16px;
      color: #C7C6C9;
    }
    .heard_text{
      text-align: center;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 32px;
      font-size: 1.25rem;
      line-height: 1.75rem;
      max-width: 780px;
      color: #434d5b;
    }
    .what_do{
      text-align: center;
      .companies{
        border: 2px solid  #000032;
        font-weight: bold;    
      }
      .el-button--gone:hover
      {
        background:#000032;
        color: #F9F8F6;
        border-color: #000032;
      }
      .el-button--gone{
        background:#F9F8F6;
        color: #000032;
      }
    }
  }
}
	@media all and (max-width: 1024px) {
    .h_home{
      height: calc(100% - 72px);
      overflow: auto;
      .banner{
        background: url("~@/assets/images/banner.jpg") no-repeat;
        height: auto;
        .c_banner{
          padding: 1rem;
          width: 90%;
          margin-left: auto;
          margin-right: auto;
          .title_1{
            margin-bottom: 0.875rem;
            font-size: 1.7rem;
          }
          .title_2{
            font-size: 0.875rem;
            margin-bottom: 1rem;
          }
          .title_3{
            font-size: 1rem;
            margin-bottom: 1rem;
          }
          .b_search{
            margin-bottom: 2rem;
            .s_input{
              margin-right: 0.1rem;
              /deep/.el-input__inner{
                height: 3rem;
                font-size: 1rem;
              }
            }
            .s_button{
              font-size: 1rem;
            }

          }
          .b_type{
            padding-top: 0.2rem;
            flex-wrap: wrap;
            .type_card{
              width: 30%;
              margin-bottom: 0;
              box-shadow: 0 2px 2px 0 rgba(0,0,50,0.04);
              padding:0.5rem 0.2rem 0.2rem 0.2rem;
              .type_card_text{
                font-size: 0.75rem;
                line-height: 1rem;
                height: 134px;
              }
              .type_card_icon{
                margin-bottom: 0.1rem;
              }
            }
          }
        }
      }
      .phone{
        display: flex;
        flex-direction: column;
      }
      .pc{
        display: none;
      }
      .recent_reviews{
        .r_r_title{
          font-size: 1.25rem;
          padding:2rem 0;
        }
        .r_r_reviews{
          padding: 0 8px;
          display:-webkit-box;
          width: calc(100% - 24px);
          margin-right: 0 !important;
          overflow-x: scroll;
          .r_r_r_card{
            padding-bottom: 0.8rem;
            margin-right: 0.5rem;
            width: 70%;
            .r_r_r_c_card{
              border-radius: 8px;
              margin-bottom: 0.5rem;
              padding: 1.1rem 0.5rem;
              width: calc(100% - 1rem);
              transition: transform .6s;
              cursor: default;
              &:hover{
                transform: perspective(0px) scale(1);
                box-shadow: 0 12px 20px 0 rgba(0,0,50,0.12);
              }
              .c_title{
                .c_t_rate{
                  margin-left: 0.5rem;
                }
              }
            }
          }
        }
      }
      .be_heard{
        padding: 0rem 1rem 2rem;
        .heard_title{
          font-size: 2rem;
          margin-bottom: 0;
        }
        .heard_text{
          margin-bottom: 1rem;
          font-size: 1rem;
          line-height: 1.75rem;
        }
      }
    }
	}
</style>
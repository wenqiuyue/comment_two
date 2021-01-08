<template>
  <div class="product-info" v-loading="loading">
    <header-com></header-com>
    <div class="p_product-info" v-if="processDetails">
      <div class="p_product-info_top">
        <div class="p_info_t_container">
          <div class="left_container">
            <el-image
              :src="processDetails.Cover"
              fit="contain">
              <div slot="error" class="error_img_tips">
                Failed to load 
              </div>
            </el-image>
            <div class="left_c_info">
              <h2 @click="handleHomePage">{{processDetails.Name}}</h2>
              <h5>Reviews {{processDetails.CommentCount?processDetails.CommentCount:0}}  •  Excellent</h5>
              <rate :value="processDetails.Rank" :isDisabled="true"></rate>
            </div>
          </div>
          <div class="right_container">
            <div class="r_c_operation_group">
              <div class="r_c_operation">
                <svg-icon value="icon-rili" :size="1.5"></svg-icon>
                <span class="r_c_num">{{processDetails.BirthYear}}</span>
              </div>
              <div class="r_c_operation">
                <svg-icon value="icon-qian" :size="1.5"></svg-icon>
                <span class="r_c_num">${{processDetails.Price}}</span>
              </div>
              <div class="r_c_operation">
                <svg-icon value="icon-fenxiangzhuanqian" :size="1.5"></svg-icon>
                <span class="r_c_num">Earn</span>
              </div>
              <div class="r_c_operation">
                <svg-icon :value="likeProList.indexOf(processDetails.Id)==-1?'icon-xihuan1':'icon-xihuan'" :size="1.5" @click="handleLike" v-preventReClick></svg-icon>
                <span class="r_c_num">{{processDetails.Likes}}</span>
              </div>
              <div class="r_c_operation">
                <el-popover
                  placement="bottom"
                  trigger="click">
                  <div>
                    <p class="share_title">Please select where to share</p>
                    <share :size="'2'" :url="$route.fullPath"></share>
                  </div>
                  <svg-icon value="icon-fenxiang" :size="1.5" slot="reference"></svg-icon>
                </el-popover>
                <span class="r_c_num r_c_num_share">{{processDetails.Shares}}</span>
              </div>
            </div>
            <el-button size="mini" type="warning" plain @click="handleHomePage">Visit Homepage</el-button>
            <!-- <el-button size="mini" type="primary" plain>Relevant Articles</el-button> -->
          </div>
        </div>
      </div>
      <div class="p_p-info_main">
        <el-row :gutter="20">
          <el-col :span="16" :xs="24">
            <div class="left_main_top">
              <div class="write_one"></div>
              <div class="write_two"></div>
              <div class="write_three">
                <div class="t_title">Share your thoughts...</div>
                <el-rate
                  v-model="rateValue"
                  :icon-classes="iconClasses"
                  void-icon-class="iconfont icon-pingfendengjiRating4"
                  allow-half
                  :colors="['#FF3722', '#FF8622','#FFCE00']"
                  @change="rateChange"
                  >
                </el-rate>
              </div>
            </div>
            <div class="left_main_review">
              <div class="left_main_review_title">
                <h2> There are {{processDetails.CommentCount?processDetails.CommentCount:0}} Reviews</span>
                </h2>
              </div>
            </div>
            <div v-if="productComment && productComment.length>0">
              <div class="left_main_review_card" v-for="(item,index) in productComment" :key="index">
                <div class="card_user">
                  <el-avatar size="large" :src="item.Icon"></el-avatar>
                  <span class="user_name">{{item.Name}}</span>
                  <rate :value="item.Rank" :isDisabled="true"></rate>
                </div>
                <p class="card_text" v-html="item.Content"></p>
                <div class="score_date">
                  <div class="card_bottom">
                    <el-tooltip class="item" effect="dark" content="Useful" placement="top-start">
                      <svg-icon value="icon-xihuan1" :size="1.3" :style="likeReviewList.indexOf(`${processDetails.Id}-${item.ComentId}`)==-1?'color:#aaa':'color:#f56c6c'" @click="handleUseFul(item,index)" v-preventReClick></svg-icon>
                    </el-tooltip>
                    <span>({{item.Likes}})</span>
                  </div>
                  <span class="date">{{item.Time?dateEnglish(item.Time):'--:--'}}</span>
                </div>
              </div>
              <div class="left_page" v-if="commentPage.pageNum>1">
                <el-pagination
                  layout="prev, pager, next"
                  :page-count="commentPage.pageNum"
                  :current-page="commentPage.pageIndex"
                  :page-size="commentPage.pageSize"
                  @current-change="getQueryProductCommentData($event)"
                >
                </el-pagination>
              </div>
            </div>
            <empty v-else :tips="'No Reviews'" :paddingData="3"></empty>
          </el-col>
          <el-col :span="8" :xs="24">
            <div class="right_discount">
              <h3 v-if="processDetails.Price">${{processDetails.Price}} one time fee</h3>
              <div class="r_d_main">
                <span class="m_discount" v-if="processDetails.Discount">{{processDetails.Discount}}</span>
                <span v-if="processDetails.Coupon">Coupon: {{processDetails.Coupon}}</span>
              </div>
              <div class="relevant_pro">
                <el-dropdown trigger="click" placement="bottom-start" @command="handleTypeProductCommand">
                  <el-button type="product" plain>
                    <span class="button_text">
                      <span>Related products</span>
                      <svg-icon value="icon-goahead" :size="1.4"></svg-icon>
                    </span>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(item,index) in processDetails.TypeProduct" :key="index" :command="item.Id">{{item.Name}}</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
            <el-button class="add_comparison_button" type="warning" plain @click="handleAddComparison">Add Into Comparison</el-button>
            <div class="right_comparison">
              <div class="comparison_list_title">
                <svg-icon value="icon-cebianlan-bijiao-xuanzhong" :size="1.3"></svg-icon>
                <span>{{`Comparison[${comparisonList.length}/4]`}}</span>
              </div>
              <ul class="comparison_list_ul">
                <li v-for="(item,index) in comparisonList" :key="index">
                  <span>{{item.name}}</span>
                  <svg-icon value="icon-shanchu" :size="1.6" @click="handleComparisonDel(item)"></svg-icon>
                </li>
              </ul>
              <div class="comparison_list_button">
                <el-button class="comparison_button" type="comp" plain @click="handleCompare">Compare</el-button>
                <p class="comparison_tips">
                  Please choose the same type of product to compare the more detailed data
                </p>
              </div>  
            </div>
            <div class="right_Informations">
              <h3>What is the {{processDetails.Name}}</h3>
              <div class="r_r_Informations">
                <div class="c_row">
                  <div class="card_left_introduce">{{processDetails.Description?processDetails.Description.replace(/&lt;.+?&gt;/g, ''):'No introduction'}}</div>
                </div>
              </div>
            </div>
            <div class="right_img" v-if="processDetails.Images && processDetails.Images.length>0">
              <h3>{{processDetails.Images.length}} Images</h3>
              <div class="r_r_img">
                <el-carousel indicator-position="outside">
                  <el-carousel-item v-for="(item,index) in processDetails.Images" :key="index">
                    <el-image
                      style="height:100%;width:100%"
                      :src="item"
                      fit="contain"
                     >
                      <div slot="error" class="error_img_tips">
                        Failed to load 
                      </div>
                    </el-image>
                  </el-carousel-item>
                </el-carousel>
              </div>
            </div>
            <div class="right_Informations">
              <h3>{{processDetails.Name}} Informations</h3>
              <div class="r_r_Informations">
                <div class="c_row">
                  <div class="card_left">Contacts</div>
                    <div class="card_right">
                      <span class="c_r_span">
                        <svg-icon value="icon-youjian"></svg-icon>
                        <span>Email</span>
                      </span>
                      <span class="c_r_span span_click" @click="handleHomePage">
                        <svg-icon value="icon-gongsiwangzhi"></svg-icon>
                        <span>{{processDetails.Url}}</span>
                      </span>
                    </div>
                </div>
                <div class="c_row">
                  <div class="card_left">Infomations</div>
                    <div class="card_right">
                      <span class="c_r_span">
                        <svg-icon value="icon-icon_pinglun"></svg-icon>
                        <span>Reviews ({{processDetails.CommentCount}})</span>
                      </span>
                      <span class="c_r_span" v-if="processDetails.Price">
                        <svg-icon value="icon-qian"></svg-icon>
                        <span>${{processDetails.Price}} one time fee</span>
                      </span>
                      <span class="c_r_span">
                        <svg-icon value="icon-rili"></svg-icon>
                        <span>Start in {{processDetails.BirthYear}}</span>
                      </span>
                      <span class="c_r_span">
                        <svg-icon value="icon-xihuan"></svg-icon>
                        <span>Likes ({{processDetails.Likes}})</span>
                      </span>
                      <span class="c_r_span" v-if="processDetails.Discount">
                        <svg-icon value="icon-fenxiangzhuanqian"></svg-icon>
                        <span>{{processDetails.Discount}}</span>
                      </span>
                    </div>
                </div>
              </div>
            </div>
            <div class="right_scam">
              <h3>Is {{processDetails.Name}} a Scam?</h3>
              <div class="scam_tips">Do you think that {{processDetails.Name}} is a scam ? Please vote!</div>
              <div class="scam_button">
                  <div class="button_text_success" @click="handleVote(1)">
                    <div>
                      <svg-icon value="icon-dui"></svg-icon>
                      <span> NOT SCAM ({{processDetails.VoteY}})</span>
                    </div>
                    <div>{{processDetails.Name}} is <strong>NOT</strong> a scam</div>
                  </div>
                  <div class="button_text_fail" @click="handleVote(0)">
                    <div>
                      <svg-icon value="icon-icon1"></svg-icon>
                      <span>SCAM ({{processDetails.VoteN}})</span>
                    </div>
                    <div>{{processDetails.Name}} is a scam</div>
                  </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <footer-com></footer-com>
    </div>
  </div>
</template>
<script>
import preventReClick from '../../utils/plugins';
import types from '../../commons/types';
import {dateEnglish} from '../../commons';
export default {
  data(){
    return{
      loading:false, //加载
      isEllipsis:true, //产品介绍是否是省略状态
      rateValue:null,
      iconClasses: ['iconfont icon-pingfendengjiRating4', 'iconfont icon-pingfendengjiRating4', 'iconfont icon-pingfendengjiRating4'],
      comparisonList:[], //产品比较列表
      processDetails:null, //产品详情
      likeProList:[], //喜欢产品列表
      likeReviewList:[], //喜欢的评论
      voteList:[], //投票列表
      pid:null, //产品id
      productComment:[], //产品评论
      commentPage:{
        pageIndex: 1,
        pageSize: 5,
        pageNum: 0,
      },
      isMoreRow:false, //产品介绍是否需要显示更多
      isClick:false //是否点击
    }
  },
  created(){
    this.pid=this.$route.query.pid;
  },
  mounted(){
    this.getComparisonList();
    this.getLikeList();
    this.getLikeReviewList();
    this.getInit();
    this.getVoteList();
    setTimeout(()=>{
      const row=this.$refs.description.offsetHeight/24
      if(row>2){
        this.isMoreRow=true;
      }
    },500)
  },
  methods:{
    dateEnglish,
    /**
     * 相关产品
     */
    handleTypeProductCommand(com){
      window.open("http://120.25.67.116:8030/product-info?pid="+com);
    },
    /**
     * 评论分数进入写评论
     */
    rateChange(){
      this.$router.push({
        path:'/write-review',
        query:{
          rate:this.rateValue,
          proid:this.processDetails.Id
        }
      })
    },
    /**
     * 跳转产品页
     */
    handleHomePage(url){
      window.open("http://120.25.67.116:8030/check-page?url="+this.processDetails.Url);
    },
    /**
     * 产品详情数据初始化
     */
    getInit(){
      this.loading=true;
      const data={
        Id:this.pid,
        page:1,
        pageCount:this.commentPage.pageSize
      }
      Promise.all([
        this.$apiHttp.getProcessDetails({params:{Id:this.pid}}),
        this.$apiHttp.getQueryProductComment({params:data})
      ]).then((resp)=>{
        if(resp[0].res==200 && resp[1].res==200){
          this.processDetails=resp[0].data;
          this.productComment=resp[1].data.data;
          this.commentPage.pageNum=resp[1].data.TotalPage;
          this.loading=false;
        }
      })
    },
    /**
     * 产品详情
     */
    getProcessDetailsData(){
      this.loading=true;
      this.$apiHttp.getProcessDetails({params:{Id:this.pid}}).then((resp)=>{
        if(resp.res==200){
          this.processDetails=resp.data
        }
        this.loading=false;
      })
    },
    /**
     * 产品评论
     */
    getQueryProductCommentData(page){
      this.commentPage.pageIndex=page;
      const data={
        Id:this.pid,
        page:this.commentPage.pageIndex,
        pageCount:this.commentPage.pageSize
      };
      this.loading=true;
      this.$apiHttp.getQueryProductComment({params:data}).then((resp)=>{
        if(resp.res==200){
          this.productComment=resp.data.data;
          this.commentPage.pageNum=resp.data.TotalPage;
        }
        this.loading=false;
      })
    },
    /**
     * 获取投票
     */
    getVoteList(){
      this.voteList=[];
      const lVoteList=JSON.parse(localStorage.getItem(types.VOTE));
      if(lVoteList){
        this.voteList=lVoteList;
      }
    },
    /**
     * 投票
     */
    handleVote(vote){
      if(this.voteList.indexOf(this.processDetails.Id)!=-1){
        this.$message({
              message: 'You have voted',
              type: 'warning'
            });
            return;
      }
      const data={
        ProId: this.processDetails.Id,
        votes:vote
      }
      this.$apiHttp.vote({params:data}).then((resp)=>{
        if(resp.res==200){
          if(resp.data){
            this.$message({
              message: 'success',
              type: 'success'
            });
            this.getProcessDetailsData();
            this.voteList.push(this.processDetails.Id);
            localStorage.setItem(types.VOTE, JSON.stringify(this.voteList));
          }else{
            this.$message({
              message: 'You have voted',
              type: 'warning'
            });
          }
        }
      })
    },
    /**
     * 评论点赞
     */
    handleUseFul(com,index){
      //该评论点过赞，则退出
       if(this.likeReviewList.indexOf(`${this.processDetails.Id}-${com.ComentId}`)!=-1 || this.isClick){
        return;
      }
      this.isClick=true;
      this.$apiHttp.fabulous({params:{Id:com.ComentId}}).then((resp)=>{
        if(resp.res==200){
          this.$message({
            message: 'Comments like success',
            type: 'success'
          });
          //评论点赞成功后，则将缓存评论数据
          this.likeReviewList.push(`${this.processDetails.Id}-${com.ComentId}`);
          localStorage.setItem(types.LIKE_REVIEW, JSON.stringify(this.likeReviewList));
          this.productComment[index].Likes = this.productComment[index].Likes + 1;
        }
        this.isClick=false;
      })
    },
    /**
     * 获取点赞的评论
     */
    getLikeReviewList(){
      this.likeReviewList=[];
      const lReviewList=JSON.parse(localStorage.getItem(types.LIKE_REVIEW));
      if(lReviewList){
        this.likeReviewList=lReviewList;
      }
    },
    /**
     * 喜欢
     */
    handleLike(){
      if(this.likeProList.indexOf(this.processDetails.Id)!=-1 || this.isClick){
        return;
      }
      this.isClick=true;
      const data={
        proId:this.processDetails.Id
      }
      this.$apiHttp.ProductLikes({params:data}).then((resp)=>{
        if(resp.res==200){
          this.$message({
            message: 'Like success',
            type: 'success'
          });
          this.likeProList.push(data.proId);
          //将点赞的产品存到本地
          localStorage.setItem(types.LIKE_PROID, JSON.stringify(this.likeProList));
          this.processDetails.Likes=this.processDetails.Likes+1;
        }
        this.isClick=false;
      })
    },
    /**
     * 获取喜欢产品列表
     */
    getLikeList(){
      this.likeProList=[];
      const lList=JSON.parse(localStorage.getItem(types.LIKE_PROID));
      if(lList){
        this.likeProList=lList;
      }
    },
    /**
     * 删除比较列表
     */
    handleComparisonDel(pro){
      this.comparisonList=this.comparisonList.filter((m,ind) => m.id!=pro.id);
      localStorage.setItem(types.PRODUCT_COMPARISON, JSON.stringify(this.comparisonList));
    },
    /**
     * 获取产品比较列表
     */
    getComparisonList(){
      this.comparisonList=[];
      const cList=JSON.parse(localStorage.getItem(types.PRODUCT_COMPARISON));
      if(cList){
        this.comparisonList.push(...cList)
      }
    },
    /**
     * 将产品加入到比较列表
     */
    handleAddComparison(){
      const idList=this.comparisonList.map((m)=>{
        return m.id
      })
      if( idList.indexOf(this.processDetails.Id)!=-1 || this.comparisonList.length>=4){
        return;
      }
      const comparisonData={
        name: this.processDetails.Name,
        id: this.processDetails.Id
      }
      this.comparisonList.push(comparisonData)
      localStorage.setItem(types.PRODUCT_COMPARISON, JSON.stringify(this.comparisonList));
    },
    /**
     * 进入比较
     */
    handleCompare(){
      this.$router.push('/compare')
    },
    /**
     * 进入写评论
     */
    handleWriteReview(){
      this.$router.push({
        path:'/write-review',
        query:{
          proid:this.processDetails.Id
        }
      })
    },
  }
}
</script>
<style lang="less" scoped>
.share_title{
  color: #333333;
  font-weight: bold;
}
.product-info{
  height: 100%;
  /deep/.error_img_tips{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    color: #c0c4cc;
    vertical-align: middle;
    background: #f5f7fa;
  }
  .p_product-info{
    background: #f2f2f5;
    height: calc(100% - 72px);
    overflow: auto;
    .p_product-info_top{
      background: #ffffff;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 50, 0.04);
      .p_info_t_container{
          max-width: 1056px;
          margin-left: auto;
          margin-right: auto;
          padding: 18px 16px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          .left_container{
            display: flex;
            flex-direction: row;
            .el-image{
                width: 180px;
                height: 100px;
              }
            .left_c_info{
              margin-left: 24px;
              /deep/.el-rate__icon{
                font-size: 1.8rem;
              }
              /deep/.icon-pingfendengjiRating4{
                font-size: 1.8rem;
              }
              h2{
                margin: 0;
                font-size: 2rem;
                cursor: pointer;
                &:hover{
                  color:#1989fa;
                  text-decoration:underline;
                }
              }
              h5{
                margin: 5px 0;
                font-size: 1rem;
                color: #515174;
                font-weight: 400;
              }
            }
          }
          .right_container{
            display: flex;
            flex-direction: column;
            .r_c_operation_group{
              display: -webkit-box;
              flex-direction: row;
              margin-bottom: 2px;
              .r_c_operation{
                margin-right: 20px;
                display: flex;
                flex-direction: column;
                align-items: center;
                .r_c_num{
                  user-select: none;
                  font-size: 0.75rem;
                  margin-top: 3px;
                  color: #666666;
                }
                .r_c_num_share{
                  margin-top: 0;
                }
                svg{
                  color:#aaa;
                  cursor: pointer;
                  &:hover{
                    color:#1989fa;
                  }
                }
              }
            }
            button{
              width: 100%;
              margin-top: 8px;
              margin-left: 0;
            }
          }
        }
    }
    .p_p-info_main{
      padding: 16px;
      max-width: 1056px;
      margin: 0 auto;
      .left_main_introduce{
        background: #ffffff;
        padding: 22px 24px;
        margin-bottom: 12px;
        .introduce_title{
          display: flex;
          flex-direction: row;
          align-items: center;
          // justify-content: space-between;
          h2{
            font-size: 1.5rem;
            color: #32323d;
            margin: 0;
            margin-left: 5px;
            user-select: none;
          }
        }
        .introduce_container{
          padding-left: 5px;
          font-size: 0.875rem;
          text-indent: 2em;
          color: #515174;
          line-height: 1.5rem;
          word-break: break-all;
          user-select: none;
        }
        .c_ellipsis{
          display: -webkit-box;
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
        }
        .more{
          display: flex;
          justify-content: flex-end;
          align-items: center;
          span{
            font-size: 13px;
            margin-right: 5px;
            color: #1a66ff;
            cursor: pointer;
            user-select: none;
            &:hover{
              text-decoration:underline;
            }
          }
        }
      }
      .left_main_top{
        height: 140px;
        display: flex;
        position: relative;
        align-items: center;
        flex-direction: row;
        background-color: #fff;
        background-image: linear-gradient(to top, #fdf6ec, #f5dab1);
        background-repeat: no-repeat;
        margin-bottom: 3px;
        .write_one{
          left: 0;
          width: 260px;
          height: 100%;
          position: absolute;
          clip-path: circle(76% at 35% 72%);
          background-color: #fff;
          -webkit-clip-path: circle(76% at 35% 72%);
        }
        .write_two{
          width: 138px;
          height: 125px;
          z-index: 1;
          margin-left: 44px;
          margin-right: 112px;
          background: url('~@/assets/images/write.png') no-repeat;
          background-size: contain;
        }
        .write_three{
          .t_title{
            color: #333333;
            font-size: 24px;
            margin-bottom: 21px;
            font-weight: bold;
          }
        }
        .el-rate{
          height: auto;
        }
        /deep/.icon-pingfendengjiRating4{
          font-size: 2.4rem;
        }
      }
      .left_main_review{
        background: #ffffff;
        padding: 22px 24px;
        margin-bottom: 2px;
        .left_main_review_title{
          display: flex;
          flex-direction: row;
          align-items: center;
          h2{
            font-size: 1.5rem;
            color: #32323d;
            margin: 0;
            margin-left: 5px;
            .num{
              margin-left: 6px;
              color: #73738f;
              font-weight: 500;
              font-size: 1.4rem;
            }
          }
        }
      }
      .left_main_review_card{
        background: #ffffff;
        padding: 22px 24px;
        margin-bottom: 8px;
        .card_user{
          display: flex;
          align-items: center;
          padding-bottom: 16px;
          .user_name{
            margin: 0 10px 0 8px;
            font-size: 0.875rem;
            color: #454554;
          }
        }
        .score_date{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding-top: 13px;
          /deep/.el-rate__icon{
            font-size: 1.2rem;
          }
          /deep/.icon-pingfendengjiRating4{
            font-size: 1.2rem;
          }
          .date{
            color: #73738f;
            font-size: 0.875rem;
            user-select: none;
          }
        }
        .card_text{
          margin: 0;
          padding-bottom: 16px;
          border-bottom: 1px solid #e8e8eb;
          line-height: 1.5rem;
          color: #32323d;
          // user-select: none;
        }
        .card_bottom{
          display: flex;
          align-items: center;
          padding-top: 10px;
          svg{
            cursor: pointer;
          }
          span{
            margin-left: 5px;
            color: #666666;
            user-select: none;
          }
        }
      }
      .left_page{
        background: #ffffff;
        padding: 5px 0;
      }
      .left_main-img{
        background: #ffffff;
        padding: 22px 24px 10px 24px;
        margin-bottom: 12px;
        .img_title{
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-bottom: 15px;
          h2{
            font-size: 1.5rem;
            color: #32323d;
            margin: 0;
            margin-left: 5px;
          }
        }
      }
      .left_main-informations{
        background: #ffffff;
        padding: 22px 24px 10px 24px;
        margin-bottom: 12px;
        .informations_title{
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-bottom: 15px;
          h2{
            font-size: 1.5rem;
            color: #32323d;
            margin: 0;
            margin-left: 5px;
          }
        }
        .informations_card{
          .c_row{
            border-bottom: 1px dotted #ddd;
            padding-bottom: 10px;
            margin-bottom: 10px;
            .card_left{
              font-size: 15px;
              color: #555;
            }
            .card_right{
              display: flex;
              flex-flow: row wrap;
              .c_r_span{
                flex-basis: 50%;
                margin-bottom: 8px;
                font-size: 13px;
                color: #aaaaaa;
                display: flex;
                align-items: center;
                span{
                  margin-left: 5px;
                }
              }
            }
          }
        }
      }
      .add_comparison_button{
        width: 100%;
      }
      .right_scam{
        margin-top: 12px;
        background: #ffffff;
        h3{
          margin: 0;
          padding: 12px 15px;
          border-bottom: 1px solid #e8e8eb;
          font-size: 1rem;
          font-weight: 500;
        }
        .scam_tips{
          font-size: 12px;
          color: #999;
          text-align: center;
          padding: 18px 24px;
        }
        .scam_button{
          display: flex;
          flex-direction: column;
          padding: 2px 24px;
          button{
            margin-left: 0;
            margin-bottom: 15px;
          }
          .button_text{
            display: flex;
            flex-direction: column;
            div{
              &:nth-child(1){
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                span{
                  margin-left: 5px;
                }
              }
              &:nth-child(2){
                margin-top: 5px;
                word-wrap: break-word;
              }
            }
          }
          .button_text_success{
            text-align: center;
            color: #67c23a;
            background: #f0f9eb;
            border:1px solid #c2e7b0;
            border-radius: 4px;
            padding: 12px 10px;
            cursor: pointer;
            margin-bottom: 10px;
            &:hover{
              background: #67c23a;
              color: #ffffff;
            }
             div{
              &:nth-child(1){
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                span{
                  margin-left: 5px;
                }
              }
              &:nth-child(2){
                margin-top: 5px;
                word-break: break-all;
                font-size: 13px;
              }
            }
          }
          .button_text_fail{
            text-align: center;
            color: #f56c6c;
            background: #fef0f0;
            border:1px solid #fbc4c4;
            border-radius: 4px;
            padding: 12px 10px;
            cursor: pointer;
            margin-bottom: 15px;
            &:hover{
              background: #f56c6c;
              color: #ffffff;
            }
             div{
              &:nth-child(1){
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                span{
                  margin-left: 5px;
                }
              }
              &:nth-child(2){
                margin-top: 5px;
                word-break: break-all;
                font-size: 13px;
              }
            }
          }
        }
      }
      .right_img{
        margin-top: 12px;
        background: #ffffff;
        h3{
          margin: 0;
          padding: 12px 15px;
          border-bottom: 1px solid #e8e8eb;
          font-size: 1rem;
          font-weight: 500;
        }
        .r_r_img{
          padding-top: 5px;
          /deep/.el-carousel__container{
            height: 200px;
          }
        }
      }
      .right_Informations{
        margin-top: 12px;
        background: #ffffff;
        h3{
          margin: 0;
          padding: 12px 15px;
          border-bottom: 1px solid #e8e8eb;
          font-size: 1rem;
          font-weight: 500;
        }
        .r_r_Informations{
          padding: 8px 15px 0 15px;
          .c_row{
            border-bottom: 1px dotted #ddd;
            padding-bottom: 5px;
            margin-bottom: 10px;
            .card_left{
              font-size: 15px;
              color: #555;
              margin-bottom: 5px;
            }
            .card_right{
              display: flex;
              flex-flow: row wrap;
              .c_r_span{
                flex-basis: 50%;
                margin-bottom: 8px;
                font-size: 13px;
                color: #aaaaaa;
                display: flex;
                align-items: center;
                span{
                  margin-left: 5px;
                }
              }
              .span_click{
                color: #4395ff;
                cursor: pointer;
                &:hover{
                  color: #60bf39;
                }
              }
            }
            .card_left_introduce{
              line-height: 1.5rem;
              word-break: break-all;
              user-select: none;
              min-height: 60px;
              font-size: 14px;
              color: #555555;
            }
          }
        }
      }
      .right_discount{
        margin-bottom: 12px;
        background: #ffffff;
        h3{
          margin: 0;
          padding: 12px 15px;
          border-bottom: 1px solid #e8e8eb;
          font-size: 1rem;
          font-weight: 500;
        }
        .r_d_main{
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 16px;
          span{
            font-size: 0.875rem;
            margin-bottom: 5px;
            color: #777777;
          }
          .m_discount{
            color: #67c23a !important;
            font-weight: 700;
          }
        }
        .relevant_pro{
          padding: 8px 24px 11px 24px;
          .el-dropdown,button{
            width: 100%;
          }
          button{
            padding-bottom: 8px;
            padding-top: 8px;
            .button_text{
              display: flex;
              align-items: center;
              justify-content: center;
              span{
                margin-right: 5px;
              }
            }
          }
          .el-button--product{
            background: #ffffff;
            color:#1b1b21;;
            border: 1px solid #9a9aad;
          }
          .el-button--product:hover{
            background: #ffffff;
            color:#409eff;
            border: 1px solid#409eff;
          }
        }
      }
      .right_comparison{
        margin-top: 2px;
        background: #ffffff;
        .comparison_list_button{
          padding: 0 24px 12px 24px;
          .comparison_button{
            width: 100%;
          }
          .el-button--comp{
            background: #ffffff;
            color:#1b1b21;;
            border: 1px solid #9a9aad;
          }
          .el-button--comp:hover{
            background: #ffffff;
            color:#409eff;
            border: 1px solid#409eff;
          }
          .comparison_tips{
            text-align: center;
            font-size: 12px;
            color: #999999;
          }
        }
        .comparison_list_title{
          padding: 12px 15px;
          border-bottom: 1px dotted #ddd;
          display: flex;
          align-items: center;
          span{
            margin-left: 5px;
            color: #515174;
          }
          svg{
            color: #515174;
          }
        }
        .comparison_list_ul{
          margin: 0;
          padding: 12px 24px;
          list-style-type: none;
          li{
            padding: 6px 0;
            font-size: 13px;
            border-bottom: 1px dashed #ddd;
            display: flex;
            justify-content: space-between;
            align-items: center;
            svg{
              flex-shrink: 0;
            }
          }
        }
      }
    }
  }
  @media all and (max-width: 1024px) {
    .p_product-info{
      .p_product-info_top{
        .p_info_t_container{
            padding: 1.25rem 1rem;
            flex-direction: column;
            .left_container{
              .el-image{
                width: 80px;
                height: 80px;
              }
              .left_c_info{
                margin-left: 1.2rem;
                /deep/.icon-pingfendengjiRating4{
                  font-size: 1.6rem;
                }
                h2{
                margin: 0;
                font-size: 1.25rem;
                }
                h5{
                  margin: 0.3rem 0;
                  font-size: 0.875rem;
                }
              }
            }
            .right_container{
              display: flex;
              flex-direction: column;
              margin-top: 1.5rem;
              .r_c_operation_group{
                .r_c_operation{
                  margin-right: 2rem;
                }
              }
              button{
                width: 100%;
                margin-top: 0.7rem;
                margin-left: 0;
              }
            }
          }
      }
      .p_p-info_main{
        padding: 0.6rem 0.3rem;
        .left_main_introduce{
          padding: 1.5rem 1.6rem;
          margin-bottom: 0.75rem;
          .more{
            span{
              font-size: 0.8rem;
            }
          }
        }
        .left_main_top{
          height: 120px;
          margin-bottom: 3px;
          .write_one{
            left: 0;
            width: 270px;
            height: 100%;
            position: absolute;
            clip-path: circle(76% at 35% 72%);
            background-color: #fff;
            -webkit-clip-path: circle(92% at -16% 130%);
          }
          .write_two{
            width: 167px;
            height: 80px;
            margin-left: 12px;
            margin-right: 20px;
          }
          .write_three{
            .t_title{
              margin-bottom: 10px;
            }
          }
          /deep/.icon-pingfendengjiRating4{
            font-size: 1.5rem;
          }
        }
        .left_main_review{
          padding: 1.3rem 1.5rem;
        }
        .left_main_review_card{
          padding: 1.3rem 1.5rem;
          margin-bottom: 0.5rem;
          .card_user{
            padding-bottom: 1rem;
          }
          .score_date{
            padding: 0.875rem 0;
            /deep/.el-rate__icon{
              font-size: 1.2rem;
            }
            /deep/.icon-pingfendengjiRating4{
              font-size: 1.2rem;
            }
            .date{
              font-size: 0.875rem;
            }
          }
          .card_text{
            padding-bottom: 1rem;
            font-size: 0.875rem;
          }
          .card_bottom{
            padding-top: 0.6rem;
          }
        }
        .left_page{
          background: #ffffff;
          padding: 5px 0;
        }
        .right_Informations{
          .r_r_Informations{
            padding: 8px 15px 0 15px;
            .c_row{
              .card_right{
                .c_r_span{
                  font-size: 0.75rem;
                }
              }
            }
          }
        }
        .right_discount{
          margin: 0.75rem 0;
          h3{
            padding: 0.75rem 0.875rem;
          }
          .r_d_main{
            padding-top: 1rem;
          }
        }
      }
    }
  }
}
</style>
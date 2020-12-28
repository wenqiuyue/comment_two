<template>
  <div class="write-review" v-loading="loading">
    <header-com></header-com>
    <div class="w_write-review" v-if="processDetails">
      <div class="write-review_top">
        <div class="t_container">
          <el-image
            style="width: 80px; height: 60px"
            :src="processDetails.Cover"
            fit="cover">
            <div slot="error" class="error_img_tips">
                Failed to load 
            </div>
          </el-image>
          <div class="t_c_right_info">
            <h2 @click="handleReturn"><svg-icon value="icon-fanhui"></svg-icon> {{processDetails.Name}}</h2>
            <h5>{{processDetails.Url}}</h5>
          </div>
        </div>
      </div>
      <div class="write-review_main">
        <el-form :model="reviewForm" :rules="rules" ref="ruleForm" label-width="100px">
          <h2>Give your comments</h2>
          <el-rate
            class="r_rate"
            v-model="reviewForm.Rank"
            :icon-classes="iconClasses"
            void-icon-class="iconfont icon-pingfendengjiRating4"
            allow-half
            :colors="['#FF3722', '#FFCE00','#00B67A']">
          </el-rate>
          <h2>Tell us about your experience</h2>
          <el-form-item prop="Content">
            <el-input
              class="input_experience"
              type="textarea"
              :rows="8"
              placeholder="This is where you write your review. Explain what happened, and leave out offensive words. Keep your feedback honest, helpful, and constructive."
              v-model="reviewForm.Content">
            </el-input>
          </el-form-item>
          <div class="form_inline">
            <el-form-item class="form_item" label="Upload Avatar:">
              <el-upload
                class="upload-demo"
                action="http://120.25.67.116:5251/api/HotType/CompareDatat"
                :on-success="handleAvatarSuccess"
                :on-error="handleAvatarError"
                :on-progress="handleAvatarProgress"
                :show-file-list="false"
                >
                <el-avatar v-loading="uploadLoading" element-loading-spinner="el-icon-loading" v-if="reviewForm.Icon" size="large" :src="url+reviewForm.Icon" fit="cover"></el-avatar>
                <svg-icon v-else value="icon--" :size="2.5"></svg-icon>
              </el-upload>
            </el-form-item>
            <el-form-item prop="Name" class="form_item">
              <el-input v-model="reviewForm.Name" placeholder="Name"></el-input>
            </el-form-item>
          </div>
          <div class="form_inline">
            <el-form-item prop="Email" class="form_item">
              <el-input v-model="reviewForm.Email" placeholder="Email"></el-input>
            </el-form-item>
            <el-form-item prop="Code" class="form_item">
              <el-input v-model="reviewForm.Code" placeholder="Verification Code">
                <validate-code slot="append" @input="getCode" ></validate-code>
              </el-input>
            </el-form-item>
          </div>
          <el-form-item>
            <el-button type="primary" style="width:100%" @click="handleSubmit">Submit My Review</el-button>
          </el-form-item>
        </el-form>
      </div>
      <footer-com></footer-com>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    var checkCode = (rule, value, callback) => {
      if (value!=this.codeValidate) {
        return callback(new Error('Verification code error'));
      }else{
        callback();
      }
    };
    return{
      loading:false, //加载
      uploadLoading:false, //头像上传加载
      iconClasses: ['iconfont icon-pingfendengjiRating4', 'iconfont icon-pingfendengjiRating4', 'iconfont icon-pingfendengjiRating4'],
      reviewForm:{
        ProId:null, //产品id
        Content:null, //评论内容
        Email:null, //邮箱
        Name:null, //用户名称
        Icon:'/Images/avt/b07fab35-4ccd-461c-ac7d-c9ca6370049b.png', //用户头像
        Rank:null, //评分
        Code:null //验证码
      },
      codeValidate:null, //当前验证码
      processDetails:null, //产品详情
      rules: {
        Content: [
          { required: true, message: 'Please enter the content', trigger: 'blur' },
        ],
        Name:[
          { required: true, message: 'Please enter the content', trigger: 'blur' },
        ],
        Email:[
          { required: true, message: 'Please enter the content', trigger: 'blur' },
          { type: 'email', message: 'Please enter the correct email', trigger: ['blur'] }
        ],
        Code:[
          { required: true, message: 'Please enter the content', trigger: 'blur' },
          { validator: checkCode, trigger: 'blur' }
        ],
      }
    }
  },
  computed:{
    url(){
      return process.env.VUE_APP_BASE_URL;
    }
  },
  created(){
    if(this.$route.query.rate){
      this.reviewForm.Rank=this.$route.query.rate - 0;
    }
  },
  mounted(){
    this.getProcessDetailsData();
  },
  methods:{
     /**
     * 产品详情
     */
    getProcessDetailsData(){
      this.loading=true;
      this.$apiHttp.getProcessDetails({params:{Id:this.$route.query.proid}}).then((resp)=>{
        if(resp.res==200){
          this.processDetails=resp.data
        }
        this.loading=false;
      })
    },
    /**
     * 提交评论表单
     */
    handleSubmit(){
      this.$refs.ruleForm.validate((valid)=>{
        if(valid){
          this.reviewForm.ProId=this.$route.query.proid;
          this.loading=true;
          this.$apiHttp.addCommentInfo(this.reviewForm).then((resp)=>{
            this.loading=false;
            if(resp.res==200 && (resp.data==1 || resp.data==2)){
              this.$message({
                message: 'Comment successful',
                type: 'success'
              });
              this.$alert('Your comment is being reviewed. Please check it later', 'Tips', {
                confirmButtonText: 'Determine',
                type: 'warning',
                center: true
              }).then(() => {
                this.$router.back()
              }).catch(()=>{});
            }else{
              this.$message({
                message: 'Comment failed',
                type: 'error'
              });
            }
          })
        }else{
          return;
        }
      })
    },
    /**
     * 获取验证码
     */
    getCode(code){
      this.codeValidate=code;
    },
    /**
     * 头像上传时
     */
    handleAvatarProgress(){
      this.uploadLoading=true;
    },
    /**
     * 头像上传成功
     */
    handleAvatarSuccess(res, file){
      this.reviewForm.Icon =res.msg;
      this.uploadLoading=false;
    },
    /**
     * 头像上传失败
     */
    handleAvatarError(){
      this.$message({
        message: 'Failed to upload Avatar',
        type: 'error'
      });
      this.uploadLoading=false;
    },
    /**
     * 返回
     */
    handleReturn(){
      this.$router.back();
    },
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/style/style.less';
.write-review{
  height: 100%;
  .w_write-review{
    background: #f2f2f5;
    height: calc(100% - 72px);
    overflow: auto;
    .write-review_top{
      background: @top-bg;;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 50, 0.04);
      .t_container{
        max-width: 510px;
        margin-left: auto;
        margin-right: auto;
        padding: 18px 16px;
        display: flex;
        flex-direction: row;
        align-items: center;
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
        .t_c_right_info{
          margin-left: 24px;
          h2{
            margin: 0;
            font-size: 1.17em;
            cursor: pointer;
            &:hover{
              text-decoration:underline;
              color: #1989fa;
            }
          }
          h5{
            margin: 3px 0;
            font-size: 1rem;
            color: #9a9aad;
            font-weight: 400;
          }
        }
      }
    }
    .write-review_main{
      max-width: 510px;
      background: @car-bg;
      margin: 16px auto;
      padding: 24px 24px 1px;
      h2{
        margin: 0;
        font-size: 1.125rem;
        color: #454554;
      }
      .r_rate{
        margin: 8px 0 18px 0;
        /deep/.icon-pingfendengjiRating4{
          font-size: 1.7rem;
        }
      }
      .input_experience{
        margin: 16px 0;
      }
      /deep/.el-form-item__content{
        margin-left: 0 !important;
        width: 100%;
        line-height: 0;
      }
      .form_inline{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
      .form_item{
        display: flex;
        flex-direction: row;
        width: 48%;
        /deep/.el-form-item__label{
          width: 85% !important;
        }
        /deep/.el-input-group__append{
          padding: 0;
        }
      }
    }
  }
  @media all and (max-width: 1024px) {
    .w_write-review{
      .write-review_top{
        .t_container{
          padding: 1rem 0.9rem;
          .t_c_right_info{
            margin-left: 0.7rem;
            h2{
              font-size: 1.17em;
            }
            h5{
              font-size: 0.875rem;
            }
          }
        }
      }
      .write-review_main{
        margin: 0.7rem auto;
        padding: 1.5rem 1rem 0.2rem;
        h2{
          font-size: 1.1rem;
        }
        .r_rate{
          margin: 0.5rem 0 1.2rem 0;
          /deep/.icon-pingfendengjiRating4{
            font-size: 1.6rem;
          }
        }
        .form_item{
          display: flex;
          flex-direction: row;
          width: 49%;
          /deep/.el-form-item__label{
            width: 85% !important;
          }
        }
      }
    }
  }
}
</style>
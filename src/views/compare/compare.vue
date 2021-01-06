<template>
  <div class="compare" v-loading="loading">
    <header-com></header-com>
    <div class="c_compare">
      <div class="c_compare_main">
        <div class="main_top">
          <svg-icon value="icon-cebianlan-bijiao-xuanzhong" :size="1.3"></svg-icon>
          <span>WHICH IS BETTER</span>
        </div>
        <div class="t_table">
          <table class="main_table">
            <tbody>
              <tr>
                <th class="m_th">Products</th>
                <th v-for="(item,index) in compareData" :key="index">
                  <span @click="handleHomePage(item.Url)">{{item.Name}}</span>
                </th>
              </tr>
              <tr v-for="(item,index) in tableTr" :key="index">
                <td :class="item.td=='Reviews' || item.td=='Likes' ? 'm_td_icon':'m_th'">
                  <svg-icon v-if="item.td=='Reviews' || item.td=='Likes'" :value="item.icon"></svg-icon>
                  <span>{{item.td}}</span>
                </td>
                <td v-for="(comitem,ind) in compareData" :key="ind">
                  <el-image
                    v-if="item.td=='COVER'"
                    :src="comitem[item.key]"
                    fit="cover">
                    <div slot="error" class="error_img_tips">
                      Failed to load 
                    </div>
                  </el-image>
                  <span v-else-if="item.td=='RELEASE TIME'">{{comitem[item.key]?comitem[item.key].timeFormat("yyyy-MM-dd"):'--:--'}}</span>
                  <span v-else-if="item.td=='PRICE'">{{comitem[item.key]?`$${comitem[item.key]} one time fee`:'--'}}</span>
                  <!-- <span v-else-if="item.td=='Commission'">{{comitem[item.key]?comitem[item.key]:'--'}}</span> -->
                  <span v-else-if="index<5">{{comitem[item.key]?comitem[item.key]:'0'}}</span>
                  <span v-else>{{getCust(item.Cust,comitem.Id)}}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <footer-com></footer-com>
    </div>
  </div>
</template>
<script>
import types from '../../commons/types';
export default {
  data(){
    return{
      loading:false,
      compareData:null, //比较数据
      tableTr:[
        {td:"COVER",icon:'',key:'Cover'},
        {td:"RELEASE TIME",icon:'',key:'Time'},
        {td:"PRICE",icon:'',key:'Price'},
        {td:"Reviews",icon:'icon-pinglun1',key:'CommentCount'},
        {td:"Likes",icon:'icon-xihuan',key:'Likes'},
        // {td:"Commission",icon:'',key:'Commissions'},
      ]
    }
  },
  mounted(){
    this.compareProduct();
  },
  methods:{
    getCust(cust,id){
      const d=_.filter(cust, {Id:id})[0];
      if(d){
        return d.data
      }else{
        return '--'
      }
    },
    /**
     * 跳转产品页
     */
    handleHomePage(url){
      window.open("http://120.25.67.116:8028/check-page?url="+url);
    },
    /**
     * 获取比较数据 
     * */
    compareProduct(){
      this.loading=true;
      const pLIst = JSON.parse(localStorage.getItem(types.PRODUCT_COMPARISON));
      const data = pLIst.map((m)=>{
        return m.id
      })
      this.$apiHttp.compareToProduct(data).then((resp)=>{
        if(resp.res==200){
          this.compareData=resp.data.ProInfo;
          resp.data.ComparInfo.forEach((m) => {
						this.tableTr.push(
							JSON.parse(
								JSON.stringify(m)
								.replace("Name", "td")
							)
					  );
          })
        }
        this.loading=false;
      })
    }
  }
  
}
</script>
<style lang="less" scoped>
@import '../../assets/style/style.less';
.compare{
  height: 100%;
  width: 100%;
  .c_compare{
    height: calc(100% - 72px);
    background: #f2f2f5;
    overflow-y: auto;
    .c_compare_main{
      max-width: 1200px;
      margin: 0 auto;
      padding: 24px 1.5rem;
      /deep/.error_img_tips{
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #c0c4cc;
        vertical-align: middle;
        background: #f5f7fa;
      }
      .main_top{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px 0;
        background: #fdf6ec;
        border: 1px solid#e6a23c;
        border-radius: 5px;
        color: #e6a23c;
        span{
          margin-left: 5px;
        }
      }
      .t_table{
        .main_table{
          padding: 20px 16px;
          background: #FFF;
          box-shadow: 0px 3px 20px -3px rgba(0,0,0,0.25);
          margin-top: 10px;
          width: 100%;
          tr{
            border-bottom: 1px solid #ddd;;
          }
          th{
            color: #666;
            padding: 7px;
            line-height: 1.6;
            font-size: 19px;
            text-align: center;
            font-weight: normal;
            span{
              color:#e6a23c;
              cursor: pointer;
              &:hover{
                color: #60bf39;
              }
            }
          }
          .m_th{
            vertical-align: middle;
            border-left: 1px dashed #ddd;
            border-right: 1px dashed #ddd;
          }
          .m_td_icon{
            display: flex;
            align-items: center;
            justify-content: center;
            border-left: 1px dashed #ddd;
            border-right: 1px dashed #ddd;
            span{
              margin-left: 3px;
            }
          }
          td{
            border-top: 1px solid #ddd;
            text-align: center;
            padding: 7px;
            line-height: 1.6;
            color: #666;
            font-size: 16px;
            .el-image{
              max-width: 200px;
              max-height: 130px;
              margin: 16px 0px;
            }
          }
        }
      }
    }
  }
  @media all and (max-width: 1024px) {
    .c_compare{
      width: 100%;
      .c_compare_main{
        max-width: 100%;
        padding: 1.5rem 0.5rem;
        overflow-x: hidden;
        .t_table{
          width: 100%;
          overflow-x: scroll;
          .main_table{
            padding: 1rem 0.8rem;
            margin-top: 10px;
            width: 100%;
            th{
              font-size: 1rem;
            }
            td{
              font-size: 0.875rem;
              .el-image{
                max-width: 87px;
                max-height: 62px;
                margin: 16px 0px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
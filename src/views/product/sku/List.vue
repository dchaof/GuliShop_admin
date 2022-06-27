<template>
  <div>
    <el-table :data="records"  style="width: 100%" border>
      <el-table-column type="index" label="序号" width="80px" align="center">
      </el-table-column>
      <el-table-column prop="skuName" label="名称" width="width">
      </el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="width">
      </el-table-column>
      <el-table-column  label="默认图片" width="110px">
        <template slot-scope="{row,$index}">
          <img :src="row.skuDefaultImg" alt="" style="width:100px;height:100px;">
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量" width="80px">
      </el-table-column>
      <el-table-column prop="price" label="价格" width="80px">
      </el-table-column>
      <el-table-column label="操作" width="width">
        <template slot-scope="{row,$index}">
          <el-button type="success" icon="el-icon-bottom" size="mini" title="下架" v-if="row.isSale === 1" @click="cancelSale(row)"></el-button>
          <el-button type="info" icon="el-icon-top" size="mini" title="上架" @click="onSale(row)" v-if="row.isSale === 0"></el-button>
          <el-button type="primary" icon="el-icon-edit" size="mini" title="修改" @click="edit"></el-button>
          <el-button type="info" icon="el-icon-info" size="mini" title="查看" @click="getSkuInfo(row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" title="删除"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- "
       -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="getList"
      style="text-align:center;"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout=" prev, pager, next, jumper,->,total, sizes"
      :total="total">
    </el-pagination>

    <!-- 抽屉 -->
    <el-drawer :visible.sync="show" :show-close="false" size="50%">
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{skuInfo.skuName}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{skuInfo.skuDesc}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{skuInfo.price}}元</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <template>
            <el-tag type="success" v-for="(attr,index) in skuInfo.skuAttrValueList" :key="attr.id" style="margin-right:10px;">{{attr.attrId}}-{{attr.valueId}}</el-tag>
          </template>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">图片列表</el-col>
        <el-col :span="16">
          <el-carousel height="400px" style="width:400px;">
              <el-carousel-item v-for="skuImage in skuInfo.skuImageList" :key="skuImage.id">
                <img :src="skuImage.imgUrl" alt="" style="width:400px;height:400px;">
              </el-carousel-item>
            </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script> 
export default {
  name: 'attr',
  data(){
    return {
      page:1,//代表当前的页数
      limit:3,//代表当前页有几条数据
      records:[],
      total:0,
      skuInfo:{},
      show:false,

    }
  },
  mounted(){
    this.getList()
  },
  methods:{
    async getList(pages = 1){
      this.page = pages
      let {page,limit} = this
      let result = await this.$API.sku.getList(page,limit)
      if(result.code === 200){
        console.log(result)
        this.records = result.data.records
        this.total = result.data.total
      }
    },
    handleSizeChange(limit){
      this.limit = limit
      this.getList()
    },
    //上架
    async onSale(row){
      let result = await this.$API.sku.onSale(row.id)
      if(result.code === 200){
        row.isSale = 1
        this.$message.success('上架成功')
        
      }
    },
    //下架
    async cancelSale(row){
      let result = await this.$API.sku.cancelSale(row.id)
      if(result.code === 200){
        this.$message.success('下架成功')
        row.isSale = 0
        
      }
    },
    //修改
    edit(){
      this.$message({
        type:'info',
        message:'正在开发中...'
      })
    },

    //获取sku的详情信息
    async getSkuInfo(sku){
      //展示抽屉
      this.show = true

      //获取数据
      let result = await this.$API.sku.get(sku.id)
      if(result.code === 200){
        this.skuInfo = result.data
      }
    }

  }
}
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }

  .el-carousel__button {
    width: 10px;
    height: 10px;
    background: red;
    border-radius: 50%;

  }
</style>

<style scoped>
  .el-row .el-col-5 {
    font-size: 18px;
    text-align: right;

  }
  .el-col {
    margin: 10px 10px;
  }
</style>
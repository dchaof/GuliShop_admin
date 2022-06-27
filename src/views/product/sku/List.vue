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
          <el-button type="success" icon="el-icon-bottom" size="mini" title="下架"></el-button>
          <el-button type="info" icon="el-icon-top" size="mini" title="上架"></el-button>
          <el-button type="primary" icon="el-icon-edit" size="mini" title="修改"></el-button>
          <el-button type="info" icon="el-icon-info" size="mini" title="查看"></el-button>
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

  }
}
</script>

<style lang="less" scoped>

</style>
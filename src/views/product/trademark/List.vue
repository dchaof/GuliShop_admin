<template>
  <div>
    <el-button type="primary" icon="el-icon-plus">添加</el-button>
    <!-- 
      table写法 先写eltable回车
      有几列就复制几个列
      先把动态数据属性data干掉
      有边框的添加table的border属性
      每个列的width控制列的宽度
      每个列的label控制列的名称
      想让那个列居中那么哪个列就需要添加align= center
      哪个列是序号 需要添加type=index
     -->
    <el-table
      style="width: 100%"
      border
      :data='trademarkList'
    >
      <el-table-column
        label="序号"
        align="center"
        type="index"
        width="80">
      </el-table-column>
      <el-table-column
        prop='tmName'
        label="品牌名称"
        width="width">
      </el-table-column>
      <el-table-column
        label="品牌LOGO"
        width="width">
        <template slot-scope="row,$index">
          <!-- 这两个参数名字不可以写错  row代表的是某个品牌的对象  $index代表的是某个品牌的索引下标 -->
          <img :src="row.logoUrl" alt="" style="width:80px;height:60px">
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="width">
        <template slot-scope="row,$index">
          <div>
            <el-button type="warning" icon="el-icon-edit" size="mini">修改</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器  -->
    
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="getTrademarkList"
      style="text-align:center"
      :current-page="page"
      :page-sizes="[3,6,9]"
      :page-size="limit"
      layout="  prev, pager, next, jumper,->,sizes,total"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Trademark',
  data(){
    return {
      page:1,
      limit:3,
      total:0,
      trademarkList:[]
    }
  },
  mounted(){
    this.getTrademarkList()
  },
  methods:{
    //获取品牌信息列表 以及 翻页获取列表
    async getTrademarkList(page = 1){
      this.page = page
      const result = await this.$API.trademark.getPageList(this.page,this.limit)
      if(result.code === 200){
        this.trademarkList = result.data.records
        this.total = result.data.total
      }
    },
    //处理修改每页数量的回调函数
    handleSizeChange(size){
      this.limit = size
      this.getTrademarkList()
    }
  }
}
</script>

<style lang="less" scoped>

</style>
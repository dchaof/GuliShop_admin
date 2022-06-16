<template>
  <div>
    <el-card>
      <CategorySelector @ChangeCategory="changeCategory"></CategorySelector>
    </el-card>
    <el-card style="margin-top:20px">
      <el-table
      border
      :data="attrList"
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="80">
      </el-table-column>
      <el-table-column
        prop="attrName"
        label="属性名称"
        width="150">
      </el-table-column>
      <el-table-column
        prop="attrValueList"
        label="属性值列表"
        width="width">
        <template slot-scope="{row,$index}">
          <el-tag type="success" v-for="(attrValue,index) in row.attrValueList" :key="attrValue.id">{{attrValue.valueName}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作"
        width="150">
        <template>
            <HintButton type="warning" icon="el-icon-edit" size="mini" title="修改"></HintButton>
            <HintButton type="danger" icon="el-icon-delete" size="mini" title="删除"></HintButton>
        </template>
      </el-table-column>
    </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'attr',
  data(){
    return {
      category1Id:'',
      category2Id:'',
      category3Id:'',
      attrList:[],
    }
  },
  methods:{
    changeCategory({categoryId,level}){
      if(level === 1){
        this.category1Id = categoryId
      }else if(level === 2){
        this.category2Id = categoryId
      }else if(level === 3){
        this.category3Id = categoryId
        //发送请求获取数据列表
        this.getAttrList()
      }
    },
    async getAttrList(){
      let {category1Id,category2Id,category3Id} = this
      const result = await this.$API.attr.getList(category1Id,category2Id,category3Id)
      if(result.code === 200){
        this.attrList = result.data
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>

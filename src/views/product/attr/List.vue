<template>
  <div>
    <el-card>
      <CategorySelector @ChangeCategory="changeCategory"></CategorySelector>
    </el-card>
    <el-card style="margin-top:20px"></el-card>
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

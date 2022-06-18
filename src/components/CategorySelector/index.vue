<template>
  <div>
    <el-form :inline="true" :model="cForm" class="demo-form-inline" :disabled="!isShowList">
      <el-form-item label="一级分类">
        <el-select v-model="cForm.category1Id" placeholder="请选择" @change="changeCategory1(cForm.category1Id)">
          <el-option
          :label="category1.name"
          :value="category1.id"
          v-for="(category1, index) in category1List" :key="category1.id"
          
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="cForm.category2Id" placeholder="请选择" @change="changeCategory2(cForm.category2Id)">
          <el-option 
          :label="category2.name"
          :value="category2.id"
          v-for="(category2, index) in category2List" :key="category2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="cForm.category3Id" placeholder="请选择" @change="changeCategory3(cForm.category3Id)">
          <el-option 
          :label="category3.name"
          :value="category3.id"
          v-for="(category3, index) in category3List" :key="category3.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: '',
  props:['isShowList'],
  data(){
    return {
      cForm:{
        category1Id:'',
        category2Id:'',
        category3Id:''
      },
      category1List:[],
      category2List:[],
      category3List:[]
    }
  },
  mounted(){
     this.getCategory1List()
  },
  methods:{
    async getCategory1List(){
      const result = await this.$API.category.getCategory1()
      if(result.code === 200){
        this.category1List = result.data
      }
     },
     async changeCategory1(category1Id){
        this.$emit('ChangeCategory',{categoryId:category1Id,level:1})
        this.category2List = [];
        this.category3List = [];
        this.cForm.category2Id = '';
        this.cForm.category3Id = ''
      const result = await this.$API.category.getCategory2(category1Id)
      if(result.code === 200){
        this.category2List = result.data

      }
     },
     async changeCategory2(category2Id){
      this.$emit('ChangeCategory',{categoryId:category2Id,level:2})
      this.category3List = [];
      this.cForm.category3Id = '';
      const result = await this.$API.category.getCategory3(category2Id) 
      if(result.code === 200){
        this.category3List = result.data
      }
      
     },

     //点击完三级列表  下面的属性 数据就会展现出来
     changeCategory3(category3Id){
      //把id传递到父组件当中去
      this.$emit('ChangeCategory',{categoryId:category3Id,level:3})
     }
  }
}
</script>

<style lang="less" scoped>

</style>

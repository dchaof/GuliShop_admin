<template>
  <div>
    <el-card>
      <CategorySelector @ChangeCategory="changeCategory"></CategorySelector>
    </el-card>
    <el-card style="margin-top:20px">
      <div v-show="isShowList">
        <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="showAddDiv">添加属性值</el-button>
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
          <template slot-scope="{row,$index}">
              <HintButton type="warning" icon="el-icon-edit" size="mini" title="修改" @click="updateAttrValue(row)"></HintButton>
              <HintButton type="danger" icon="el-icon-delete" size="mini" title="删除"></HintButton>
          </template>
        </el-table-column>
      </el-table>
      </div>
      <div v-show="!isShowList">
        <el-form :model="attrForm" :inline="true" >
          <el-form-item
            label="属性名"
            >
            <el-input type="age" v-model="attrForm.attrName" placeholder="请输入属性名"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus" :disabled="!attrForm.attrName" @click="addAttrValue">添加属性值</el-button>
        <el-button @click="isShowList = true">取消</el-button>

        <el-table
          :data="attrForm.attrValueList"
          border
          style="width: 100%;margin: 20px 0">
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="80">
          </el-table-column>
          <el-table-column
            label="属性值名称"
            width="width">
            <template slot-scope="{row,$index}">
              <el-input v-model="row.valueName" placeholder=""></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="width">
            <template slot-scope="{row,$index}">
              <HintButton type="danger" icon="el-icon-delete" size="mini" title="删除"></HintButton>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" >保存</el-button>
        <el-button @click="isShowList = true">取消</el-button>

      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'attr',
  data(){
    return {
      category1Id:'',
      category2Id:'',
      category3Id:'',
      attrList:[],
      isShowList:true,//控制第二个card显示添加还是列表
      attrForm:{
        attrName:'',
        attrValueList:[
          /* {
            attrId:0,
            id:0,
            valueName:''
          } */
        ],
        categoryId:0,
        categoryLevel:3
      },

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
    },
    showAddDiv(){
      this.isShowList = false;
      //点击完添加  清空添加列表中的信息
      this.attrForm.attrName = '';
      this.attrForm.attrValueList = []
      this.attrForm.categoryId = this.category3Id
    },
    addAttrValue(){
      this.attrForm.attrValueList.push({
          attrId:this.attrForm.id,
          valueName:''
      })
    },
    updateAttrValue(row){
      this.isShowList = false;
      //一定要深拷贝
      this.attrForm = cloneDeep(row)
    }
  }
}
</script>

<style lang="less" scoped>

</style>

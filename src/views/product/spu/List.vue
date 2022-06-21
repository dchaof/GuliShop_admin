<template>
  <div>
    <el-card>
      <CategorySelector @ChangeCategory="changeCategory" :isShowList="isShowList"></CategorySelector>
    </el-card>
    <el-card style="margin-top:20px">
      <div  v-show="!isShowSkuList && !isShowSpuList">
        <el-button type="primary" icon="el-icon-plus" @click="showAddSpuForm()" >添加SPU</el-button>
        <el-table
          :data="spuList"
          border
          style="width: 100%">
          <el-table-column
            label="序号"
            width="80"
            align="center"
            type="index">
          </el-table-column>
          <el-table-column 
            prop="spuName"
            label="SPU名称"
            width="width">
          </el-table-column>
          <el-table-column
            prop="description"
            label="SPU描述"
            width="width">
          </el-table-column>
          <el-table-column
            prop="prop"
            label="操作"
            width="width">
            <template slot-scope="{row,$index}">
              <HintButton  type="success" icon="el-icon-plus" size="mini" title="添加SKU" @click="showAddSkuForm(row,category1Id,category2Id)"></HintButton>
              <HintButton  type="warning" icon="el-icon-edit" size="mini"  title="修改SPU" @click="showUpdateSpuForm(row)"></HintButton>
              <HintButton  type="info" icon="el-icon-info" size="mini" title="查看SKU列表"></HintButton>

              <el-popconfirm
                :title="`你确定删除${row.spuName}吗？`"
                @onConfirm="deleteSpu(row)"
              >
                <HintButton slot="reference"  type="danger" icon="el-icon-delete" size="mini"  title="删除SPU"></HintButton>
              </el-popconfirm>
              
            </template>
          </el-table-column>
        </el-table>
        <!-- 翻页器 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="getSpuList"
          style="text-align:center"
          :current-page="page"
          :page-sizes="[2,3,5]"
          :page-size="limit"
          layout=" prev, pager, next, jumper,->,total, sizes"
          :total="total">
        </el-pagination>
      </div>
      <skuForm v-show="isShowSkuList" :visible.sync="isShowSkuList" ref="sku"></skuForm>
      <!-- visible父子数据同步 -->
      <!-- <spuForm v-show="isShowSpuList" ref="spu" :visible.sync="isShowSpuList" ></spuForm> -->


      <spuForm v-show="isShowSpuList" ref="spu" :visible="isShowSpuList" @update:visible="isShowSpuList = $event" @successBack='successBack' @cancelBack="cancelBack"></spuForm>
    </el-card>
  </div>
</template>

<script>
import skuForm from '@/views/product/components/skuForm'
import spuForm from '@/views/product/components/spuForm'
export default {
  name: 'attr',
  components:{
    skuForm,
    spuForm
  },
  data(){
    return {
      category1Id:'',
      category2Id:'',
      category3Id:'',
      isShowList:true,//只用于三级联动的下拉列表能否操作
      page:1,
      limit:2,
      spuList:[],
      total:0,
      isShowSkuList:false,
      isShowSpuList:false
    }
  },
  methods:{
    changeCategory({categoryId,level}){
      if(level === 1){
        this.category1Id = categoryId
        this.category2Id = ''
        this.category3Id = ''
      }else if(level === 2){
        this.category2Id = categoryId
        this.category3Id = ''
      }else if(level === 3){
        this.category3Id = categoryId
        this.getSpuList()
      }
    },
    async getSpuList(pager = 1){
      this.page = pager
      try {
        let {page, limit, category3Id} = this
        let result = await this.$API.spu.getList(page, limit, category3Id)
        if(result.code === 200){
          this.spuList = result.data.records
          this.total = result.data.total
        }
      } catch (error) {
          this.$message.info('获取失败')
      }
    },
    handleSizeChange(size){
      this.limit = size
      this.getSpuList()
    },
    showAddSpuForm(){
      this.isShowSpuList = true
      //再使用ref获取元素的时候 标签中不能用vif否则为undefined
      this.$refs.spu.initAddSpuFormData(this.category3Id)
    },
    showUpdateSpuForm(row){
      //用于标识修改模式
      this.flag = row.id
      this.isShowSpuList = true
      this.$refs.spu.initUpdateSpuFormData(row)
    },
    showAddSkuForm(row,category1Id,category2Id){
      
      this.isShowSkuList = true
      this.$refs.sku.initAddSkuFormData(row,category1Id,category2Id)
    },
    successBack(){
      if(this.flag){
        this.getSpuList(this.page)
      }else{
        this.getSpuList()
      }
      //清除标识
      this.flag = null
    },
    cancelBack(){
      this.flag = null
    },

    //删除spu信息
    async deleteSpu(row){
      try {
        await this.$API.spu.remove(row.id)
        this.$message.success('删除成功')
        this.getSpuList(this.spuList.length > 1 ? this.page : this.page - 1)
      } catch (error) {
        this.$$message.info('删除失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
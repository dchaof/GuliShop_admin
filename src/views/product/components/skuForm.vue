<template>
  <el-form v-model="skuForm" label-width="100px">
      <el-form-item label="SPU 名称">{{spu.spuName}}</el-form-item>
      <el-form-item label="SKU 名称">
        <el-input v-model="skuForm.skuName" placeholder="SKU 名称"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input v-model="skuForm.price" placeholder="SKU 价格" type="number"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input v-model="skuForm.weight" placeholder="SKU 重量" type="number"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input v-model="skuForm.skuDesc" placeholder="SKU 规格描述" type="textarea" rows="4"></el-input> 
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form label-width="100px" :inline="true">
          <el-form-item :label="attr.attrName" v-for="attr in attrList" :key="attr.id">
            <el-select  placeholder="请选择" v-model="attr.attrIdValueId" >
              <el-option :label="attrValue.valueName" :value="`${attr.id}:${attrValue.id}`" v-for="attrValue in attr.attrValueList" :key="attrValue.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form> 
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form label-width="100px" :inline="true">
          <el-form-item :label="spuSaleAttr.saleAttrName" v-for="spuSaleAttr in spuSaleAttrList" :key="spuSaleAttr.id">
            <el-select  placeholder="请选择" v-model="spuSaleAttr.attrIdValueId">
              <el-option :label="spuSaleAttrValue.saleAttrValueName" :value="`${spuSaleAttr.id}:${spuSaleAttrValue.id}`" v-for="spuSaleAttrValue in spuSaleAttr.spuSaleAttrValueList" :key="spuSaleAttrValue.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form> 
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table
          :data="spuImageList"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange"
          >
          <el-table-column
            type="selection"
            prop="prop"
            width="55"
            >
          </el-table-column>
          <el-table-column
            label="图片"
            prop="prop"
            width="width">
            <template slot-scope="{row,$index}">
              <img :src="row.imgUrl" alt="" style="width:80px;height:100px;">
            </template>
          </el-table-column>
          <el-table-column
            label="名称"
            prop="imgName"
            width="width">
          </el-table-column>
          <el-table-column
            label="操作"
            prop="prop"
            width="width">
            <template slot-scope="{row,$index}">
              <el-button v-if="row.isDefault === '0'" type="primary" size="mini" @click="setDefault(row)" >设为默认</el-button>
              <el-tag v-else type="success">默认</el-tag>
            </template>
          </el-table-column>
        </el-table>
        
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
</template>

<script>
export default {
  name: '',
  data(){
    return {
      skuForm:{
        // 下面3个数据从父组件传入收集
			  category3Id: null, // 3级分类ID
			  spuId: null, // SPU的id
        tmId: null, // 品牌ID
        // 下面4个通过v-model收集
			  skuName: null, // sku的名称
			  skuDesc: null, // sku的描述
			  price: null, // sku的价格
        weight: null, // sku的重量
        
			  skuDefaultImg: null, // sku的默认图片  
			  skuAttrValueList: [], // sku的属性值列表
			  skuSaleAttrValueList: [], // sku属性属性值列表
			  skuImageList: [], // 选择的spu图片列表
			},
      spu:{},
      attrList:[],
      spuSaleAttrList:[],
      spuImageList:[],
      checkedImageList:[],
    }
  },
  methods:{
    async initAddSkuFormData(row,category1Id,category2Id){
      this.spu = row
      //根据选中的三级分类列表 获取平台属性列表
      //http://localhost:9529/dev-api/admin/product/attrInfoList/2/13/61
      let promise1 = this.$API.sku.getAttrList(category1Id,category2Id,row.category3Id)
      //获取spu销售属性列表
      //http://localhost:9529/dev-api/admin/product/spuSaleAttrList/6
      let promise2 = this.$API.sku.getSpuSaleAttrList(row.id)
      //获取spu图片列表
      //http://localhost:9529/dev-api/admin/product/spuImageList/6
      let promise3 = this.$API.sku.getSpuImageList(row.id)

      let result = await Promise.all([promise1,promise2,promise3])

      this.attrList = result[0].data
      this.spuSaleAttrList = result[1].data
      let spuImageList = result[2].data

      //为了实现图片默认功能，添加了ischecked的属性
      spuImageList.forEach(item => item.isDefault = '0')
      this.spuImageList = spuImageList
    },
    handleSelectionChange(val) {
      // console.log(val)
      this.checkedImageList = val
    },
    //设置默认
    setDefault(row){
      //排他
      this.spuImageList.forEach(item => item.isDefault = '0')
      row.isDefault = 1
      this.skuForm.skuDefaultImg = row.imgUrl
    },
    //保存
    async save(){
      let {spu,skuForm,attrList,spuSaleAttrList,checkedImageList} = this
      //整理父组件传过来的
      skuForm.tmId = spu.tmId
      skuForm.category3Id = spu.category3Id
      skuForm.spuId = spu.id
      

      skuForm.skuAttrValueList = attrList.reduce((prev,item) => {
        if(item.attrIdValueId){
          let [attrId,valueId] = item.attrIdValueId.split(':')
          let obj = {
            attrId,
            valueId
          }
          prev.push(obj)
        }
        return prev
      },[])

      skuForm.skuSaleAttrValueList = spuSaleAttrList.reduce((prev,item) => {
        if(item.attrIdValueId){
          let [saleAttrId,saleAttrValueId] = item.attrIdValueId.split(':')
          let obj = {
            saleAttrId,
            saleAttrValueId
          }
          prev.push(obj)
        }
        return prev
      },[])

      


      skuForm.skuImageList = checkedImageList.map(item => {
        return {
          imgName:item.imgName,
          imgUrl:item.imgUrl,
          spuImgId:item.id,
          isDefault:item.isDefault
        }
      })

      //发送请求
      try {
        await this.$API.sku.addUpdate(this.skuForm)
        this.$message.success('保存成功')
        //返回到spu列表页
        this.$emit('update:visible',false)
        //重置data数据
        this.resetData()
      } catch (error) {
        this.$message.info('保存失败')
      }

      
    },
    resetData(){
      this.skuForm = {
        // 下面3个数据从父组件传入收集
			  category3Id: null, // 3级分类ID
			  spuId: null, // SPU的id
        tmId: null, // 品牌ID
        // 下面4个通过v-model收集
			  skuName: null, // sku的名称
			  skuDesc: null, // sku的描述
			  price: null, // sku的价格
        weight: null, // sku的重量
        
			  skuDefaultImg: null, // sku的默认图片  
			  skuAttrValueList: [], // sku的属性值列表
			  skuSaleAttrValueList: [], // sku属性属性值列表
			  skuImageList: [], // 选择的spu图片列表
			}
      this.spu = {}
      this.attrList = []
      this.spuSaleAttrList = []
      this.spuImageList = []
      this.checkedImageList = []
    },
    cancel(){
      //返回到spu列表页
      this.$emit('update:visible',false)
      //重置data数据
      this.resetData()
    },
  }
}
</script>

<style lang="less" scoped>

</style>

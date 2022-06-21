<template>
  <el-form v-model="skuForm" label-width="100px">
      <el-form-item label="SPU 名称">spuname</el-form-item>
      <el-form-item label="SKU 名称">
        <el-input v-model="skuForm.skuName" placeholder="SKU 名称"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input v-model="skuForm.price" placeholder="SKU 价格"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input v-model="skuForm.skuName" placeholder="SKU 重量"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input v-model="skuForm.skuName" placeholder="SKU 规格描述" type="textarea" rows="4"></el-input> 
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form label-width="100px" :inline="true">
          <el-form-item label="屏幕尺寸">
            <el-select  placeholder="请选择" v-model="model">
              <el-option label="label" value="value"></el-option>
            </el-select>
          </el-form-item>
        </el-form> 
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form label-width="100px" :inline="true">
          <el-form-item label="颜色">
            <el-select  placeholder="请选择" v-model="model">
              <el-option label="label" value="value"></el-option>
            </el-select>
          </el-form-item>
        </el-form> 
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table
          border
          style="width: 100%">
          <el-table-column
            type="selection"
            prop="prop"
            width="55">
          </el-table-column>
          <el-table-column
            label="图片"
            prop="prop"
            width="width">
          </el-table-column>
          <el-table-column
            label="名称"
            prop="prop"
            width="width">
          </el-table-column>
          <el-table-column
            label="操作"
            prop="prop"
            width="width">
          </el-table-column>
        </el-table>
        
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button @click="$emit('update:visible',false)">取消</el-button>
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
      model:''
    }
  },
  methods:{
    async initAddSkuFormData(row,category1Id,category2Id){

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
      this.spuImageList = result[2].data
    }
  }
}
</script>

<style lang="less" scoped>

</style>

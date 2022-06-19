<template>
  <div>
    <el-form label-width="100px" :model="spuInfo">
      <el-form-item label="SPU名称">
        <el-input v-model="spuInfo.spuName" placeholder="请输入SPU名称"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
         <el-select v-model="spuInfo.tmId" placeholder="请选择品牌">
          <el-option
            :label="tm.tmName"
            :value="tm.id"
            v-for="(tm, index) in trademarkList" :key="tm.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input v-model="spuInfo.description" placeholder="请输入SPU描述" type="textarea" rows="4"></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="spuImageList">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select v-model="spuInfo.spuSaleAttrId" placeholder="请选择类型">
          <el-option
            label="label"
            value="value">
          </el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" >添加销售属性</el-button>
        <el-table
          border
          style="width:100%; margin:20px 0">
          <el-table-column
            label="序号"
            width="80"
            type="index"
            align="center">
          </el-table-column>
          <el-table-column
            label="属性名"
            width="150">
          </el-table-column>
          <el-table-column
            label="属性值名称列表"
            width="width">
          </el-table-column>
          <el-table-column
            label="操作"
            width="150">
          </el-table-column>
        </el-table>
        <el-button type="primary">保存</el-button>
        <el-button @click="$emit('update:visible',false)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
      dialogImageUrl: '', // 大图的url
      dialogVisible: false, // 标识大图dilaog是否显示

      spuId: '', // SPU ID
      spuInfo: { // SPU详情信息对象
        category3Id: null, // 3级分类ID
        spuName: '', // spu名称
        description: '', // spu描述
        tmId: null, // spu的品牌id
        spuSaleAttrList: [], // spu的销售属性列表
        spuImageList: [], // spu图片列表

      }, 
      spuImageList: [], // SPU图片列表
      trademarkList: [], // 品牌列表
      saleAttrList: [], // 销售属性列表
      attrIdAttrName: '', // 用来收集销售属性id与name   id:name
      loading: false,
      spuSaleAttrId:''
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //修改spu
    async initUpdateSpuFormData(spu){
      console.log(spu)
      //获取spu详情
      let result = await this.$API.spu.get(spu.id)
      if(result.code === 200){
        this.spuInfo = result.data
      }

      //获取spu图片列表数据
      let imgResult = await this.$API.spu.getSpuImageList(spu.id)
      if(imgResult.code === 200){
        let spuImageList = imgResult.data
        spuImageList.forEach(item => {
          item.name = item.imgName
          item.url = item.imgUrl
        });
        this.spuImageList = spuImageList
      }

      //获取所有品牌列表数据
      let trademarkResult = await this.$API.spu.getTrademarkList()
      if(trademarkResult.code === 200){
        this.trademarkList = trademarkResult.data
      }


      //获取所有的销售属性数据
      let baseSaleAttrResult = await this.$API.spu.getSaleAttrList()
      if(baseSaleAttrResult.code === 200){
        this.saleAttrList = baseSaleAttrResult.data
      }
    },
    //添加spu
    async initAddSpuFormData(){
      //获取所有品牌列表数据
      let trademarkResult = await this.$API.spu.getTrademarkList()
      if(trademarkResult.code === 200){
        this.trademarkList = trademarkResult.data
      }


      //获取所有的销售属性数据
      let baseSaleAttrResult = await this.$API.spu.getSaleAttrList()
      if(baseSaleAttrResult.code === 200){
        this.saleAttrList = baseSaleAttrResult.data
      }
    }
  },

}
</script>

<style lang="less" scoped>

</style>

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
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :file-list="spuImageList">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <!-- --------------------------------------------------------------------- -->
        <el-select v-model="spuSaleAttrIdName" :placeholder="unUsedSpuSaleAttrList.length > 0 ? `还剩${unUsedSpuSaleAttrList.length}个属性` : '没有了'">
          <el-option
            v-for="(unUsedSpuSaleAttr, index) in unUsedSpuSaleAttrList" :key="unUsedSpuSaleAttr.id"
            :label="unUsedSpuSaleAttr.name"
            :value="`${unUsedSpuSaleAttr.id}:${unUsedSpuSaleAttr.name}`">
          </el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" @click="addSaleAttr" :disabled="!spuSaleAttrIdName">添加销售属性</el-button>
        <el-table
          :data="spuInfo.spuSaleAttrList"
          border
          style="width:100%; margin:20px 0">
          <el-table-column
            label="序号"
            width="80"
            type="index"
            align="center">
          </el-table-column>
          <el-table-column
            prop="saleAttrName"
            label="属性名"
            width="150">
          </el-table-column>
          <el-table-column
            label="属性值名称列表"
            width="width">
            <template slot-scope="{row,$index}">
              <el-tag
                v-for="(spuSaleAttrValue, index) in row.spuSaleAttrValueList" :key="spuSaleAttrValue.id" 
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index,1)">
                {{spuSaleAttrValue.saleAttrValueName}}
              </el-tag>
              <!-- inputVisible挂在属性上  每个属性只有一个   之前我们在平台属性中是直接添加在属性值当中   因为现在我们每个属性值身上不能有编辑模式和查看模式 -->
              <!-- row.inputValue是在输入框中输入的内容收集到哪里   我们先把收集的数据存储到当前属性当中  后面失去焦点或者回车 直接去属性身上去拿-->

              <!--  -->
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(row)"
                @blur="handleInputConfirm(row)"
              >
              </el-input>
              <!--  -->
              <el-button v-else class="button-new-tag" size="small" @click="showInput(row)">添加</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="150">
            <template slot-scope="{row,$index}">
              <HintButton type="danger" icon="el-icon-delete" size="mini" title="删除" @click="spuInfo.spuSaleAttrList.splice($index,1)"></HintButton> 
            </template>
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
      attrIdAttrName: '', 
      loading: false,
      spuSaleAttrIdName:''// 用来收集销售属性id与name   id:name
    }
  },
  computed:{
    unUsedSpuSaleAttrList(){
      return this.saleAttrList.filter(saleAttr=>{
        return this.spuInfo.spuSaleAttrList.every(spuSaleAttr=>{
          return saleAttr.name !== spuSaleAttr.saleAttrName
        })
      })
    }
  },
  methods: {
    handleRemove(file, fileList) {
      
      this.spuImageList = fileList
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSuccess(response,file, fileList){
      
      this.spuImageList = fileList
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
    },
    //添加销售属性
    addSaleAttr(){
      
      let [baseSaleAttrId,saleAttrName] = this.spuSaleAttrIdName.split(':')
      let obj = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: []
      }
      this.spuInfo.spuSaleAttrList.push(obj)
      this.spuSaleAttrIdName = ''

    },
    //点击添加 变为输入框和自动获取焦点
    showInput(row){
      //设置响应式属性
      this.$set(row,'inputVisible',true)
      //自动获取焦点
      this.$nextTick(() => {
        this.$refs.saveTagInput.focus()
      })
    },
    //焦点移出或者回车 的回调
    handleInputConfirm(row){
      let saleAttrValueName = row.inputValue
      
      if(saleAttrValueName.trim() === ''){
        row.inputValue = ''
        return 
      }
      let isRepeat = row.spuSaleAttrValueList.some(item =>{
        item.saleAttrValueName === saleAttrValueName
      })
      if(isRepeat) {
        this.$message.info('输入属性值名称不能重复')
        row.inputValue = ''
        return 
      }

      //变成想要的数据结构
      let obj = {
        saleAttrValueName
      }
      //添加到属性值列表中
      //点击添加 一直添加两个属性值  ？？？？？？？？？？？？
      row.spuSaleAttrValueList.push(obj)
      //input内容清空
      row.inputValue = ''
      //关闭input框变成按钮
      row.inputVisible = false
    },
  },

}
</script>

<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>

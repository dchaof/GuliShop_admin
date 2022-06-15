<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" @click="showAddDialog">添加</el-button>
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
        <!-- <template slot-scope="row,$index"> -->
        <template v-slot:default="scope">
          <!-- 这两个参数名字不可以写错  row代表的是某个品牌的对象  $index代表的是某个品牌的索引下标 -->
          <!-- <img :src="row.logoUrl" alt="" style="width:80px;height:60px"> -->
          <img :src="scope.row.logoUrl" alt="" style="width:80px;height:60px">
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="width">
        <template slot-scope="row,$index">
          <div>
            <el-button type="warning" icon="el-icon-edit" size="mini" @click="showUpdateDialog(row)">修改</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteTrademark(row)">删除</el-button>
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


    <!-- 点击添加弹出的对话框 -->
    <el-dialog :title="tmForm.id?'修改品牌':'添加品牌'" :visible.sync="dialogFormVisible">
  <el-form :model="tmForm" style="width:80%">
    <el-form-item label="品牌名称" label-width="100px">
      <el-input v-model="tmForm.tmName" autocomplete="off"></el-input>
    </el-form-item>
    <!-- 需要添加宽度 不添加下面的文字就会向左偏移 -->
    <el-form-item label="品牌LOGO" label-width="100px">
      <!-- action 为上传给后台的地址 -->
      <el-upload
        class="avatar-uploader"
        action="/dev-api/admin/product/fileUpload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addOrUpdate" >确 定</el-button>
  </div>
</el-dialog>
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
      trademarkList:[],
      dialogFormVisible:false,
      tmForm:{
        tmName:'',
        logoUrl:''
      },
      imageUrl: ''

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
    },
    //上传成功将后台传回来的真实地址进行存储
    handleAvatarSuccess(res, file) {
        //这个返回的是本地地址
        // this.imageUrl = URL.createObjectURL(file.raw);
        //收集图片真实后台地址  有两种方法 分别是 res.data  file. 
        // this.tmForm.logoUrl = res.data
        this.tmForm.logoUrl = file.response.data
      },
      //判断图片的类型和图片的大小
    beforeAvatarUpload(file) {
      //判断是否是jpg文件
      // const isJPG = file.type === 'image/jpeg';
      const fileArr = ['image/jpeg','image/png','image/gif']
      const isJpgOrPng = fileArr.indexOf(file.type) !== -1
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJpgOrPng) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      // return isJPG && isLt2M;
      return isJpgOrPng && isLt2M;
    },
    //展示添加对话框  点击添加需要将 对话框中的内容清空 
    showAddDialog(){
      this.dialogFormVisible = true
      this.tmForm = {
        tmName:'',
        logoUrl:''
      }
    },
    //修改品牌内容
    showUpdateDialog(row){
      this.dialogFormVisible = true

      //不可以这样写  如果这样写table中的数据和tmform中的数据就是指向同一个位置
      //当改变tmForm的时候  table中展示的数据也会被修改
      //this.tmForm = row.row


      //拷贝分为深拷贝和浅拷贝
      //拷贝 必然会开辟出一个新的地址  也就是将数据存储到不同的地址
      //浅拷贝  拷贝对象只拷贝的地址  是浅拷贝
      //深拷贝  不仅拷贝对象的地址还拷贝对象内的值

      //row里面都是基本数据类型  不谈深拷贝还是浅拷贝
      this.tmForm = {...row.row}      

    },
    //点击确定修改信息
    async addOrUpdate(){
      //获取数据
      let tmForm = this.tmForm
      //整理数据
      //发送请求
      try {
        const result = await this.$API.trademark.addOrUpdate(tmForm)
        this.$message.success(tmForm.id?'修改成功':'添加成功')
        //获取列表信息
        
        this.dialogFormVisible = false
        this.getTrademarkList(tmForm.id?this.page : 1)

      } catch (error) {
        this.dialogFormVisible = false
        this.$message.warning('修改失败')
      }
      //成功之后
      //失败之后
    },
    //删除信息
    deleteTrademark(row){
      this.$confirm(`你确定删除${row.row.tmName}吗？`,'提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      })
      .then(async ()=>{
        try {
          await this.$API.trademark.delete(row.row.id)
          this.getTrademarkList(this.trademarkList.length>1?this.page : this.page-1)
          this.$message({
            type:"success",
            message:'删除成功'
          })
        } catch (error) {
          this.$message({
            type:"info",
            message:'删除失败'
          })
        }

        
      })
      .catch(()=>{
        this.$message({
          type:'info',
          message:'点击了取消'
        })
      })
    }

  }
}
</script>

// scope需要删除的  不然的话鼠标滑过不会生效
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
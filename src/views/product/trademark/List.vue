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
        <template slot-scope="row,$index">
          <!-- 这两个参数名字不可以写错  row代表的是某个品牌的对象  $index代表的是某个品牌的索引下标 -->
          <img :src="row.logoUrl" alt="" style="width:80px;height:60px">
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="width">
        <template slot-scope="row,$index">
          <div>
            <el-button type="warning" icon="el-icon-edit" size="mini">修改</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
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
    <el-dialog title="添加品牌" :visible.sync="dialogFormVisible">
  <el-form :model="tmForm" style="width:80%">
    <el-form-item label="品牌名称" label-width="100px">
      <el-input v-model="tmForm.tmName" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="品牌LOGO" label-width="100px">
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
    //上传文件  的方法
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    //展示添加对话框
    showAddDialog(){
      this.dialogFormVisible = true
    }
  }
}
</script>

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
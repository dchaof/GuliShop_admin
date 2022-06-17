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
              <!-- 一定要使用 native  使自定义事件转化为原生的事件  keyup再elinput组件中没有emit -->
              <el-input v-model="row.valueName" placeholder="请输入添加的属性值" v-if="row.isEdit === true" @blur="toLook(row)" @keyup.enter.native="toLook(row)" size="mini" :ref="$index"></el-input>
              <span v-else @click="toEdit(row,$index)" style="display:block;width:100%;height:100%;">{{row.valueName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="width">
            <template slot-scope="{row,$index}">
              <el-popconfirm
                :title="'确认删除'+row.valueName+'吗？'"
                @onConfirm="attrForm.attrValueList.splice($index,1)"
              >
                <HintButton slot="reference" type="danger" icon="el-icon-delete" size="mini" title="删除" ></HintButton>
              </el-popconfirm>
              
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
      this.attrForm = {
        attrName : '',
        attrValueList : [],
        categoryId : this.category3Id
      }

    },
    addAttrValue(){
      this.attrForm.attrValueList.push({
          attrId:this.attrForm.id,
          valueName:'',
          isEdit:true//添加属性值的时候  用来标识是否是编辑模式
      })
      this.$nextTick(()=>{
        this.$refs[this.attrForm.attrValueList.length-1].focus();
      })

    },
    updateAttrValue(row){
      this.isShowList = false;
      //一定要深拷贝
      this.attrForm = cloneDeep(row)
      this.attrForm.attrValueList.forEach(item => {
        //设置响应式必须用 vm.$set 或 VM.set 设置数据  否则不是响应式  
        //或者直接操作对应的对象
        //再生命周期中 只有再beforeCreate 到 created 初始化的数据才是响应式的
        this.$set(item,'isEdit',false)
      })
    },
    toLook(row){
      let valueName = row.valueName
      if(!valueName.trim()){
        this.$message.info('属性值不可以为空')
        return 
      }
      let isRepeat = this.attrForm.attrValueList.some(item =>{
        if(item !== row){
          return item.valueName === valueName.trim()
        }
      })
      if(isRepeat){
        this.$message.info('这个属性值已经存在了')
        return 
      }
      row.isEdit = false
    },
    //点击之后san变为input
    toEdit(row,index){
      row.isEdit = true
      //自动获取焦点的功能，根据index就知道哪个input要获取焦点 然后这个index值正好对应的使ref的值
      //为何this.$refs[index] 为undefined
      //因为我们获取这个焦点太快了
      //上面我们把row.isEdit === true之后，由于dom是用vif进行创建的  紧接着就去获取节点
      //此时input还没有创建好 所以获取到的是undefined
      //$nextTick 代表的是 页面最后一次更新完之后执行的回调
      this.$nextTick(()=>{
        //等待页面更新完成之后再去获取input节点
        this.$refs[index].focus();

        //$nextTick   和 updated的区别
        //$nextTick  是最近一次页面更新完执行的回调  只执行一次
        //updated   只要页面发生更新就会执行一次
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>

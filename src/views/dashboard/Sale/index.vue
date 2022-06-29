<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <!--  @tab-click="handleClick" -->
            <!-- 头部左侧内容 -->
            <el-tabs class="tab" v-model="activeName">
                <el-tab-pane label="销售额" name="销售额">销售额</el-tab-pane>
                <el-tab-pane label="访问量" name="访问量">访问量</el-tab-pane>
            </el-tabs>
            <!-- 头部右侧内容 -->
            <div class="right">
                <span>今日</span>
                <span>本周</span>
                <span>本月</span>
                <span>本年</span>
                <!-- v-model="value1" -->
                <el-date-picker
                    class="date"
                    type="monthrange"
                    range-separator="-"
                    start-placeholder="开始月份"
                    end-placeholder="结束月份"
                    size="mini">
                </el-date-picker>
            </div>
        </div>

        <el-row :gutter="10">
            <el-col :span="16">123</el-col>
            <el-col :span="8">456</el-col>
        </el-row>
    </el-card>
</template>

<script>
export default {
  name: 'Sale',
  data(){
    return {
        activeName:'销售额'
    }
  }
}
</script>

<style scoped>
    .clearfix {
        display: flex;
        justify-content: space-between;
        position: relative;
    }
    .tab {
        width: 100%;
    }
    .right {
        position: absolute;
        top: 0;
        right: 0;
    }
    .date {
        width: 200px;
    }
    .right span {
        margin: 0 10px;
    }
</style>

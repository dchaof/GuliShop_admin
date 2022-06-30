<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <!--  @tab-click="handleClick" -->
            <!-- 头部左侧内容 -->
            <el-tabs class="tab" v-model="activeName">
                <el-tab-pane label="销售额" name="sale"></el-tab-pane>
                <el-tab-pane label="访问量" name="visible"></el-tab-pane>
            </el-tabs>
            <!-- 头部右侧内容 -->
            <div class="right">
                <span @click="setDay">今日</span>
                <span @click="setWeek">本周</span>
                <span @click="setMonth">本月</span>
                <span @click="setYear">本年</span>
                <!--value-format='yyyy-MM-d' 设置日期的格式  -->
                <el-date-picker
                    v-model="data"
                    class="date"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    size="mini"
                    value-format='yyyy-MM-d'>
                </el-date-picker>
            </div>
        </div>

        <el-row :gutter="10">
            <el-col :span="18">
                <!-- 容器 -->
                <div class="charts" ref="charts"></div>
            </el-col>
            <el-col :span="6" class="right">
                <h3>门店{{title}}排名</h3>
                <ul>
                    <li>
                        <span class="rindex">1</span><span>肯德基</span><span class="rvalue">123456</span>
                    </li>
                    <li>
                        <span class="rindex">2</span><span>肯德基</span><span class="rvalue">123456</span>
                    </li>
                    <li>
                        <span class="rindex">3</span><span>肯德基</span><span class="rvalue">123456</span>
                    </li>
                    <li>
                        <span >4</span><span>肯德基</span><span class="rvalue">123456</span>
                    </li>
                    <li>
                        <span >5</span><span>肯德基</span><span class="rvalue">123456</span>
                    </li>
                    <li>
                        <span >6</span><span>肯德基</span><span class="rvalue">123456</span>
                    </li>
                    <li>
                        <span >7</span><span>肯德基</span><span class="rvalue">123456</span>
                    </li>
                </ul>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
import * as echarts from 'echarts'
import dayjs from 'dayjs'
export default {
  name: 'Sale',
  data(){
    return {
        activeName:'sale',
        charts:null,
        data:[],
    }
  },
  mounted(){
    this.charts = echarts.init(this.$refs.charts)

    this.charts.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
            type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
            type: 'category',
            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月','八月','九月','十月','十一月','十二月'],
            axisTick: {
                alignWithLabel: true
            }
            }
        ],
        yAxis: [
            {
            type: 'value'
            }
        ],
        series: [
            {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220,320,185,561,267,422],
            color:'yellowgreen'
            }
        ],
        title:{
            text:'销售额趋势'
        }
    })
  },
  computed:{
    title(){
        return this.activeName == 'sale' ? '销售额' : '访问量'
    }
  },
  watch:{
    activeName(){
        this.charts.setOption({
            title:{
                text:this.title + '趋势'
            }
        })
    }
  },
  methods:{
    setDay(){
        const day = dayjs().format('YYYY-MM-DD')
        this.data = [day,day]
    },
    setWeek(){
        const start = dayjs().day(1).format('YYYY-MM-DD')
        const end = dayjs().day(7).format('YYYY-MM-DD')
        this.data = [start,end]
    },
    setMonth(){
        const start = dayjs().startOf('month').format('YYYY-MM-DD')
        const end = dayjs().endOf('month').format("YYYY-MM-DD") 
        this.data = [start,end]
    },
    setYear(){
        const start = dayjs().startOf('year').format('YYYY-MM-DD')
        const end = dayjs().endOf('year').format("YYYY-MM-DD") 
        this.data = [start,end]
    }
  }
}
</script>

<style scoped>
    .box-card {
        margin: 10px 0;
    }
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
        width: 250px;
    }
    .right span {
        margin: 0 10px;
        cursor: pointer;
    }
    .charts {
        width: 100%;
        height: 300px;
    }
    .right ul {
        list-style: none;
        width: 100%;
        height: 300px;
        padding: 0;
    }
    .right li {
        height: 8%;
        margin: 10px 0;
    }
    .right span {
        margin: 0 10px;
    }
    .rindex {
        float: left;
        width: 20px;
        height: 20px;
        background-color: black;
        text-align: center;
        border-radius: 50%;
        color: #fff;
    }
    .rvalue {
        float: right;
    }
</style>

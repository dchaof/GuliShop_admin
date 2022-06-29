<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'BarCharts',
  mounted(){
    let Barcharts = echarts.init(this.$refs.charts)
    Barcharts.setOption({
        xAxis:{
          //隐藏x轴
          show:false,
          type:'category'
        },
        yAxis:{
          //隐藏y轴
          show:false
        },
        series:[
            {
                type:'bar',
                data:[56,34,50,61,23,42,12,80],
                color:'skyblue'
            }
        ],
        grid:{
          top:0,
          left:0,
          right:0,
          bottom:0
        },
        tooltip:{}
    })
  }
}
</script>

<style scoped>
    .charts {
        width: 100%;
        height: 100%;
    }
</style>

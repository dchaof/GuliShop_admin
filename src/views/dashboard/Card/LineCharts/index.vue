<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'LineCharts',
  mounted(){
    let linecharts = echarts.init(this.$refs.charts)
    linecharts.setOption({
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
                type:'line',
                data:[56,34,50,61,23,42,12,80],
                //拐点样式设置
                itemStyle:{
                  opacity:0
                },
                //线条的样式
                lineStyle:{
                  color:'purple'
                },
                //区域颜色
                areaStyle:{
                  color:{
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: 'purple' // 0% 处的颜色
                    }, {
                        offset: 1, color: '#fff' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                  }
                }
            }
        ],
        grid:{
          top:0,
          left:0,
          right:0,
          bottom:0
        }
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

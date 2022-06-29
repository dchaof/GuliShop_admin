<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'progressCharts',
  mounted(){
    let progressCharts = echarts.init(this.$refs.charts)
    progressCharts.setOption({
        xAxis:{
          //隐藏x轴
          show:false,
          min:0,
          max:100
          
        },
        yAxis:{
          //隐藏y轴
          show:false,
          //均分到y轴
          type:'category'
        },
        series:[
            {
                type:'bar',
                data:[78],
                //颜色
                color:'yellowgreen',
                //柱形的宽度
                barWidth:10,
                //文本的设置
                label:{
                    show:true,
                    //显示文本的设置
                    formatter:'|',
                    //对文本位置的设置
                    position: 'right'

                },
                //背景颜色的设置
                showBackground:true,
                backgroundStyle:{
                    color:'#eee'
                },
                
            }
        ],
        grid:{
          top:0,
          left:0,
          right:0,
          bottom:0
        },
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


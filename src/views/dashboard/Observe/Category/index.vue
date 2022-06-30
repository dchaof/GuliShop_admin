<template>
  <div>
    <el-card>
      <div slot="header" class="header">
        <div class="header-category">
          <span>销售额类别占比</span>
          <el-radio-group v-model="value">
            <el-radio-button label="全部渠道"></el-radio-button>
            <el-radio-button label="线上"></el-radio-button>
            <el-radio-button label="门店"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div>
        <div class="echarts" ref="echarts"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "Category",
  data() {
    return {
      value: "全部渠道"
    };
  },
  mounted() {
    let myecharts = echarts.init(this.$refs.echarts);

    myecharts.setOption({
      title:{
        left:'center',
        top:'center'
      },
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            position: "outsize",
          },
          labelLine: {
            show: true,
          },
          data: [
            { value: 1048, name: "肯德基" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" },
          ],
        },
      ],
    });
    //绑定事件
    myecharts.on('mouseover',  params => {
      let {value,name} = params.data
      myecharts.setOption({
        title:{
          text:value,
          subtext:name
        }
      })
    });
  },
};
</script>

<style scoped>
.header-category {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header {
  border-bottom: 1px solid #eee;
}
.echarts {
  width: 100%;
  height: 400px;
}
</style>

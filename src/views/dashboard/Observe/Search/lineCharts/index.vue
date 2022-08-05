<template>
  <div>
    <div class="header">
      <span class="search-header">人均搜索次数</span>
      <i class="el-icon-warning-outline"></i>
    </div>
    <div class="main">
      <span class="main-title">2.7</span>
      <span class="main-content">26.2</span>
      <i class="el-icon-caret-bottom" style="color: red"></i>
    </div>
    <div class="footer">
      <div class="charts" ref="charts"></div>
    </div>
  </div>
</template>

<script>
// 引入echarts
import * as echarts from "echarts";
export default {
  name: "",
  mounted() {
    // 初始化echarts实例
    let lineCharts = echarts.init(this.$refs.charts);
    // 配置数据
    /** @type EChartsOption */
    lineCharts.setOption({
      xAxis: {
        // 隐藏x轴
        show: false,
        // 均分
        type: "category",
      },
      yAxis: {
        // 隐藏y轴
        show: false,
      },
      // 系列
      series: [
        {
          // 图形样式-折线图
          type: "line",
          data: [10, 7, 33, 12, 27, 21, 55, 35, 25],
          // 拐点的样式设置
          itemStyle: {
            opacity: 0,
          },
          smooth: true,
          // 线条的样式
          lineStyle: {
            color: "skyblue",
          },
          // 填充颜色设置
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "skyblue", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#fff", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
      ],
      // 布局调试
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    });
  },
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
}
.search-header {
  margin-right: 20px;
}
.main {
  margin: 10px 0px;
}
.main-title {
  margin-right: 30px;
}
.main-content {
  margin-right: 5px;
}
.charts {
  width: 100%;
  height: 50px;
}
</style>
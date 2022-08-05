<template>
  <!-- 容器 -->
  <div class="charts" ref="charts"></div>
</template>

<script>
// 引入echarts
import * as echarts from "echarts";
import { Tooltip } from "element-ui";
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
          // 图形样式-柱状图
          type: "bar",
          data: [10, 7, 33, 12, 27, 21, 55, 35, 25, 17, 42, 30],
        },
      ],
      // 布局调试
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
      // 提示插件
      tooltip: {},
    });
  },
};
</script>

<style scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>

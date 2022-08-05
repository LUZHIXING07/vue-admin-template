<template>
  <el-card>
    <div slot="header" class="header">
      <div class="search-header">
        <span>线上热门搜索</span>
        <el-dropdown>
          <span>
            <i class="el-icon-more"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>奥利奥</el-dropdown-item>
              <el-dropdown-item disabled>双皮奶</el-dropdown-item>
              <el-dropdown-item>奶茶</el-dropdown-item>
              <el-dropdown-item>芝士奶盖</el-dropdown-item>
              <el-dropdown-item>冰丝绒拿铁</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="12">
          <LineChart></LineChart>
        </el-col>
        <el-col :span="12">
          <LineCharts></LineCharts>
        </el-col>
      </el-row>
      <!-- Table表格 -->
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column label="排名" width="80" type="index" />
        <el-table-column label="搜索关键字" width="230" />
        <el-table-column label="用户数" sortable />
        <el-table-column label="周涨幅" sortable />
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        layout="prev, pager, next"
        :total="1000"
        class="pagination"
      />
    </div>
  </el-card>
</template>

<script>
import LineChart from "./lineChart";
import LineCharts from "./lineCharts";
export default {
  name: "",
  data() {
    return {
      tableData: [{}],
    };
  },
  components: {
    LineChart,
    LineCharts,
  },
};
</script>

<style scoped>
.header {
  border-bottom: 1px solid #eee;
  padding: 10px 0px;
}
.search-header {
  display: flex;
  justify-content: space-between;
}
.pagination {
  text-align: right;
}
</style>
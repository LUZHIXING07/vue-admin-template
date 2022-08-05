<template>
  <div>
    <!-- 表格 -->
    <el-table style="width: 100%" border :data="records">
      <el-table-column type="index" label="序号" width="80" align="center">
      </el-table-column>
      <el-table-column prop="skuName" label="名称" width="width">
      </el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="width">
      </el-table-column>
      <el-table-column label="默认图片" width="110">
        <template slot-scope="{ row, $index }">
          <img
            :src="row.skuDefaultImg"
            alt=""
            style="width: 80px; height: 80px"
          />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量(KG)" width="80">
      </el-table-column>
      <el-table-column prop="price" label="价格(元)" width="80">
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row, $index }">
          <el-button
            type="success"
            icon="el-icon-sort-down"
            size="mini"
            v-if="row.isSale == 0"
            @click="sale(row)"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-sort-up"
            size="mini"
            v-else
            @click="cancel(row)"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="edit"
          ></el-button>
          <el-button
            type="info"
            icon="el-icon-info"
            size="mini"
            @click="getSkuInfo(row)"
          ></el-button>
          <el-popconfirm
            title="这段内容确定删除吗?"
            @onConfirm="deleteSku(row)"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              slot="reference"
              style="margin-left: 10px"
            ></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      style="text-align: center"
      @current-change="getSkuList"
      @size-change="handleSizeChange"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout=" prev, pager, next, jumper,->,sizes,total"
      :total="total"
    >
    </el-pagination>
    <!-- 抽屉效果 -->
    <el-drawer
      :visible.sync="show"
      :with-header="false"
      :show-close="false"
      size="45%"
      :before-close="handleClose"
    >
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuInfo.price }}元</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <template>
            <el-tag
              v-for="item in skuInfo.skuAttrValueList"
              :key="item.id"
              style="margin-right: 10px"
              >{{ item.attrName }}--{{ item.valueName }}</el-tag
            >
          </template>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel trigger="click" height="450px">
            <el-carousel-item
              v-for="item in skuInfo.skuImageList"
              :key="item.id"
            >
              <img :src="item.imgUrl" alt="" />
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "Sku",
  data() {
    return {
      page: 1, // 代表当前第几页
      limit: 10, // 代表当前页面有几条数据
      records: [], // 存储SKU列表的数据
      total: 0, // 存储分页器一共展示的数据
      skuInfo: {}, // 存储SKU信息
      show: false,
    };
  },
  // 组件挂载完毕
  mounted() {
    // 获取sku列表的方法
    this.getSkuList();
  },
  methods: {
    // 获取sku列表数据的方法
    async getSkuList(pages = 1) {
      this.page = pages;
      // 解构出默认的参数
      const { page, limit } = this;
      let result = await this.$API.sku.reqSkuList1(page, limit);
      if (result.code == 200) {
        this.records = result.data.records;
        this.total = result.data.total;
      }
    },
    handleSizeChange(limit) {
      // 修改参数
      this.limit = limit;
      this.getSkuList();
    },
    // 上架
    async sale(row) {
      let result = await this.$API.sku.reqSale(row.id);
      if (result.code == 200) {
        row.isSale = 1;
        this.$message({ type: "success", message: "上架成功" });
      }
    },
    // 下架
    async cancel(row) {
      let result = await this.$API.sku.reqCancel(row.id);
      if (result.code == 200) {
        row.isSale = 0;
        this.$message({ type: "success", message: "下架成功" });
      }
    },
    edit() {
      this.$message("正在开发中");
    },
    // 获取SKU详情的方法
    async getSkuInfo(row) {
      let result = await this.$API.sku.reqSkuById(row.id);
      if (result.code == 200) {
        this.skuInfo = result.data;
        this.show = true;
      }
    },
    // 关闭弹出框
    handleClose(done) {
      this.show = false;
      this.skuInfo = {};
      done();
    },
    // 删除SKU
    async deleteSku(row) {
      let { page, cecords } = this;
      let result = await this.$API.sku.reqDeleteSku(row.id);
      if (result.code == 200) {
        this.$message({ type: "success", message: "删除成功" });
        this.getSkuList(this.records.length > 1 ? page : page - 1);
      }
    },
  },
};
</script>

<style scoped>
.el-row .el-col-5 {
  font-style: 18px;
  text-align: right;
}
.el-col {
  margin: 10px 10px;
}
.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__button {
  width: 10px;
  height: 10px;
  background: red;
  border-radius: 50%;
}
</style>

<style>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
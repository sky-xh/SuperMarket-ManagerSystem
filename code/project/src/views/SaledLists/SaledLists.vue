<template>
  <div class="saled-lists">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>销售列表</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="时间">
          <el-col :span="5">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.date1"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="1" style="text-align:center;">-</el-col>
          <el-col :span="5">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.date2"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="6" style="text-align:center;">
            <el-form-item label="关键字">
              <el-input v-model="form.name" placeholder="商品名称,订单号,会员卡"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="1" style="text-align:center;">
            <el-button type="primary">查询</el-button>
          </el-col>
        </el-form-item>
      </el-form>
      <el-table :data="salelists" stripe style="width: 100%; margin-bottom:20px;">
        <el-table-column prop="ordernumber" label="订单号" width="170"></el-table-column>
        <el-table-column prop="name" label="名称" width="170"></el-table-column>
        <el-table-column prop="counts" label="数量" width="170"></el-table-column>
        <el-table-column prop="realprice" label="实际售价" width="170"></el-table-column>
        <el-table-column prop="vip" label="优惠(促销/会员)" width="170"></el-table-column>
        <el-table-column prop="returnmoney" label="退款" width="170"></el-table-column>
        <el-table-column prop="saleoftime" label="销售时间"></el-table-column>
      </el-table>
      <div>
        <el-pagination
          :page-sizes="[3, 5, 10, 15]"
          layout="total, sizes, prev, pager, next, jumper"
          :page-size="pagesize"
          :current-page="currentpage"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      salelists: [],
      pagesize: 5,
      currentpage: 1,
      total: 0,
    };
  },
  methods: {
    handleSizeChange(val){
      this.pagesize = val;
      this.querylists();
    },
    handleCurrentChange(val){
      this.currentpage = val;
      this.querylists();
    },
    // 数据加载
    querylists(){
      // 获取页码,页量
      let params = {
        pagesize: this.pagesize,
        currentpage: this.currentpage
      };
      this.$http.get('/salelists/quertlists', params)
      .then(response => {
          this.salelists = response.map(item => {
            return {
              ordernumber: item.ordernumber,
              name: item.name,
              counts: item.counts,
              realprice: item.realprice,
              vip: item.vip,
              returnmoney: item.returnmoney,
              saleoftime: item.saleoftime,
              id: item.id,
            };
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 查询总条数
    querytotal() {
      this.$http
        .get("/salelists/totallists")
        .then(response => {
          this.total = response.length;
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
  mounted(){
    this.querytotal();
    this.querylists();
  }
};
</script>

<style lang="less">
@import url("./saledlists.less");
</style>


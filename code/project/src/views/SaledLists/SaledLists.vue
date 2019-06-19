<template>
  <div class="saled-lists">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>销售列表</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="时间">
          <el-col :span="8">
            <el-date-picker
              v-model="form.timeTo"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="6" style="text-align:center;">
            <el-form-item label="关键字">
              <el-input v-model="form.key" placeholder="商品名称,订单号,会员卡"></el-input>
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
        <el-table-column prop="saleoftime" label="销售时间">
          <template slot-scope="scope">{{ scope.row.saleoftime }}</template>
        </el-table-column>
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
import { quertLists, totalLists } from '@/api/saleLists'
export default {
  data() {
    return {
      form: {
        timeTo: "",
        key: ""
      },
      salelists: [],
      pagesize: 5,
      currentpage: 1,
      total: 0
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pagesize = val;
      this.querylists();
    },
    handleCurrentChange(val) {
      this.currentpage = val;
      this.querylists();
    },
    // 数据加载
    querylists() {
      // 获取页码,页量
      let params = {
        pagesize: this.pagesize,
        currentpage: this.currentpage
      };
      quertLists(params)
        .then(response => {
          this.salelists = response.map(item => {
            let ctime = this.$moment(item.saleoftime).format("YYYY-MM-DD");
            return {
              ordernumber: item.ordernumber,
              name: item.name,
              counts: item.counts,
              realprice: item.realprice,
              vip: item.vip,
              returnmoney: item.returnmoney,
              saleoftime: ctime,
              id: item.id
            };
          });
          // 如果没有数据,返回上一页并刷新列表
          if (!response.length && this.currentpage !== 1) {
            // 回到上一页
            this.currentpage -= 1;
            this.querytotal();
            this.querylists();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 查询总条数
    querytotal() {
      totalLists()
        .then(response => {
          this.total = response.length;
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
  created() {
    this.querytotal();
    this.querylists();
  }
};
</script>

<style lang="less">
@import url("./saledlists.less");
</style>


<template>
  <div class="sell-total">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>销售统计</span>
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
          <el-col class="line" :span="1" style="text-align:center;">
            <el-button type="primary" @click='submit'>提交</el-button>
          </el-col>
        </el-form-item>
      </el-form>
      <!-- 报表 -->
      <div id="myChart" :style="{width: '1150px', height: '500px'}"></div>
    </el-card>
  </div>
</template>

<script>
import { saleTotal } from '@/api/goods';
import moment from 'moment';
export default {
  name: "hello",
  data() {
    return {
      form: {
        timeTo: '',
      },
      xdata: [
            "2019/6/13",
            "2019/6/14",
            "2019/6/15",
            "2019/6/16",
            "2019/6/17",
            "2019/6/18",
            "2019/6/19",
            "2019/6/20",
            "2019/6/21",
            "2019/6/22"
          ],
      values: [300, 300, 300, 150, 500, 50, 400, 300, 300, 300],
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: ""
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["销售统计"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.xdata,
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: `{value} 元`
          }
        },
        series: [
          {
            name: "销售统计",
            type: "line",
            stack: "总量",
            data: this.values,
          }
        ]
      });
    },
    submit(){
      let params = {
        params: this.form.timeTo
      }
      saleTotal(params)
      .then(res => {
        this.values = res.map(item => item.data);
        this.xdata = res.map(item => moment(item.date).format('YYYY-MM-DD'));
        this.drawLine();
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
};
</script>
<style lang="less">
@import url("./selltotal.less");
</style>

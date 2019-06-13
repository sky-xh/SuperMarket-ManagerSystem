<template>
  <div class="sell-total">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>销售统计</span>
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
          <el-col class="line" :span="4" style="text-align:center;">
            <el-form-item>
              <el-select v-model="form.region" placeholder="销售情况统计">
                <el-option label="日用品" value="shanghai"></el-option>
                <el-option label="食品" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="1" style="text-align:center;">
            <el-button type="primary">提交</el-button>
          </el-col>
        </el-form-item>
      </el-form>
      <!-- 报表 -->
      <div id="myChart" :style="{width: '1150px', height: '500px'}"></div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "hello",
  data() {
    return {
      form: {}
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
        text: ''
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['销售统计']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['2019/6/13',
               '2019/6/14',
               '2019/6/15',
               '2019/6/16',
               '2019/6/17',
               '2019/6/18',
               '2019/6/19',
               '2019/6/20',
               '2019/6/21',
               '2019/6/22',
        ]
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: `{value} 元`
        }
    },
    series: [
        {
            name:'销售统计',
            type:'line',
            stack: '总量',
            data:[320, 432, 401, 434, 390, 530, 510, 432, 401, 434]
        },
    ]
});
    }
  }
};
</script>
<style lang="less">
@import url("./selltotal.less");
</style>

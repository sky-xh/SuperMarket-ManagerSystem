<template>
  <div class="class-admin">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>分类管理</span>
      </div>
      <el-table :data="classadmin" style="width: 100%">
        <el-table-column prop="classname" label="分类名称" width="800"></el-table-column>
        <el-table-column label="管理">
            <el-button type="primary" icon="el-icon-edit">修改</el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
    data(){
        return{
            classadmin:[
                {classname: '日用品'},
                {classname: '↳ 舒肤佳'},
                {classname: '↳ ↳ 舒肤佳A'},
                {classname: '↳ ↳ 舒肤佳B'},
                {classname: '食品'},
                {classname: '↳ 优乐美'},
                {classname: '烟酒'},
                {classname: '↳ 利群'},
            ]
        }
    }
}
</script>

<style lang="less">
    @import url('./classadmin.less');
</style>


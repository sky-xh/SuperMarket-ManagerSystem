<template>
  <div class="add-class">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加分类</span>
      </div>
      <el-form
        :model="addclass"
        :rules="rules"
        ref="addclass"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="所属分类" prop="region">
          <el-select v-model="addclass.class" placeholder="顶级分类">
            <el-option label="食品" value="食品"></el-option>
            <el-option label="烟酒" value="烟酒"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="addclass.name"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="resource">
          <el-radio-group v-model="addclass.status">
            <el-radio label="启用"></el-radio>
            <el-radio label="禁用"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <el-button type="primary">立即创建</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
    data(){
        return{
            addclass: {
                class: '',
                name: '',
                status: ''
            },
            rules: {
                name:[
                    { required: true, message: '请输入分类名称', trigger: 'blur' },
                ]
            }

        }
    }
}
</script>

<style lang="less">
    @import url('./addclass.less');
</style>


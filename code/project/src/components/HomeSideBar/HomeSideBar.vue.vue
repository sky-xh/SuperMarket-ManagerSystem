<template>
  <div class="home-side-bar">
    <el-menu
      default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#3d3d3d"
      text-color="#fff"
      active-text-color="rgb(64, 158, 255)"
      unique-opened
      router
      style="border-right:none"
    >
      <el-submenu :index="(index + 1) + ''" v-for="(menu, index) in menus" :key="index">
        <template slot="title">
          <i :class="menu.icon"></i>
          <span>{{ menu.title }}</span>
        </template>
        <el-menu-item
          :index="submenu.path"
          v-for="(submenu, index) in menu.children"
          :key="index"
        >{{ submenu.title }}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { checkAuthority } from "@/api/account";
export default {
  data() {
    return {
      menus: []
    };
  },
  methods: {
    checkauthority() {
      checkAuthority()
        .then(res => {
          let region = res;
          let menu = [
            // 系统管理
            {
              icon: "el-icon-setting",
              title: "系统管理",
              role: ['超级管理员', '普通用户'],
              children: [{ path: "/home/systeminfo", title: "系统信息" }]
            },
            // 账号管理
            {
              icon: "el-icon-user",
              title: "账号管理",
              role: ['超级管理员'],
              children: [
                { path: "/home/accountmanage", title: "账号管理" },
                { path: "/home/addaccount", title: "添加账号" },
                { path: "/home/passwordmodif", title: "密码修改" }
              ]
            },
            // 商品管理
            {
              icon: "el-icon-goods",
              title: "商品管理",
              role: ['超级管理员', '普通用户'],
              children: [
                { path: "/home/goodsmanage", title: "商品管理" },
                { path: "/home/addgoods", title: "添加商品" }
              ]
            },
            // 分类管理
            {
              icon: "el-icon-s-order",
              title: "分类管理",
              role: ['超级管理员', '普通用户'],
              children: [
                { path: "/home/classadmin", title: "分类管理" },
                { path: "/home/addclass", title: "添加分类" }
              ]
            },
            // 统计管理
            {
              icon: "el-icon-s-management",
              title: "统计管理",
              role: ['超级管理员'],
              children: [
                { path: "/home/selltotal", title: "销售统计" },
                { path: "/home/goodstotal", title: "进货统计" }
              ]
            },
            // 进货管理
            {
              icon: "el-icon-s-claim",
              title: "进货管理",
              role: ['超级管理员'],
              children: [
                { path: "/home/addstock", title: "添加库存" },
                { path: "/home/stocklists", title: "库存列表" }
              ]
            },
            // 出货管理
            {
              icon: "el-icon-s-cooperation",
              title: "出货管理",
              role: ['超级管理员'],
              children: [
                { path: "/home/saledlists", title: "销售列表" },
                { path: "/home/goodscheckout", title: "商品出库" },
                { path: "/home/goodsreturn", title: "商品退货" }
              ]
            },
            // 会员管理
            {
              icon: "el-icon-s-custom",
              title: "会员管理",
              role: ['超级管理员'],
              children: [
                { path: "/home/addvipaccount", title: "添加账号" },
                { path: "/home/vipaccountmanage", title: "账号管理" }
              ]
            },
            // 个人中心
            {
              icon: "el-icon-setting",
              title: "个人中心",
              role: ['超级管理员', '普通用户'],
              children: [{ path: "/home/personal", title: "个人资料" }]
            }
          ];
          this.menus = menu.filter(item => item.role.includes(region));
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.checkauthority();
  }
};
</script>

<style lang='less'>
@import url("./homesidebar.less");
</style>

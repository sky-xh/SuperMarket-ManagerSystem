import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // 一级路由
    { path: '*', redirect: '/login'},
    { path: '/login', component: () => import('./views/Login/Login.vue')},
    { path: '/home',redirect: '/home/systeminfo', component: () => import('./views/Home/Home.vue'), children: [
      // 二级路由
      {path: '/home/accountmanage', component: () => import('./views/AccountManage/AccountManage.vue')},
      {path: '/home/addaccount', component: () => import('./views/AddAccount/AddAccount.vue')},
      {path: '/home/addgoods', component: () => import('./views/AddGoods/AddGoods.vue')},
      {path: '/home/goodsmanage', component: () => import('./views/GoodsManage/GoodsManage.vue')},
      {path: '/home/goodstotal', component: () => import('./views/GoodsTotal/GoodsTotal.vue')},
      {path: '/home/passwordmodif', component: () => import('./views/PasswordModif/PasswordModif.vue')},
      {path: '/home/selltotal', component: () => import('./views/SellTotal/SellTotal.vue')},
      {path: '/home/systeminfo', component: () => import('./views/SystemInfo/SystemInfo.vue')},
      {path: '/home/classadmin', component: () => import('./views/ClassAdmin/ClassAdmin.vue')},
      {path: '/home/addclass', component: () => import('./views/AddClass/AddClass.vue')},
      {path: '/home/addstock', component: () => import('./views/AddStock/AddStock.vue')},
      {path: '/home/stocklists', component: () => import('./views/StockLists/StockLists.vue')},
      {path: '/home/saledlists', component: () => import('./views/SaledLists/SaledLists.vue')},
      {path: '/home/goodscheckout', component: () => import('./views/GoodsCheckout/GoodsCheckout.vue')},
      {path: '/home/goodsreturn', component: () => import('./views/GoodsReturn/GoodsReturn.vue')},
      {path: '/home/addvipaccount', component: () => import('./views/AddVipAccount/AddVipAccount.vue')},
      {path: '/home/vipaccountmanage', component: () => import('./views/VipAccountManage/VipAccountManage.vue')},
    ]},
  ]
})

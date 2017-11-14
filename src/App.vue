<template>
  <div id="app">
    <div>
      <keep-alive >
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
    <tabbar style="position:fixed" slot="bottom">
      <tabbar-item link="/home" selected>
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item link="/commodity">
        <span slot="label">商品</span>
      </tabbar-item>
      <tabbar-item link="/user">
        <span slot="label">个人</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'
export default {
  name: 'app',
  components: {
    Tabbar,
    TabbarItem
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

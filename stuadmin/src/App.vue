<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  methods:{
    
  },
}
</script>

<style lang="less">
    @import url('./assets/css/reset.less');
    html,body{
      width: 100%;
      height: 100%;
    }
    #app{
      width: 100%;
      height: 100%;
    }
</style>

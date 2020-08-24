<template>
  <div id="app">
      <header-title></header-title>
      <router-view />
  </div>
</template>
<script type="text/javascript">
import HeaderTitle from '@/components/header/header'
  export default {
    name: 'App',
    components: {
      HeaderTitle
    }
}
</script>
<style lang="scss">
*{
  padding: 0;
  margin:0;
  list-style: none;
}
html,body,#app{
  width: 3840px;
  height: 2160px;
}
#app {
  width: 3840px;
  height: 2160px;
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #B1D2E9;
  font-size: 40px;
  background:linear-gradient(0deg,rgba(5,21,48,1) 0%,rgba(8,20,54,1) 100%);
}
</style>

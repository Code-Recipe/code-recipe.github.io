<!-- not used -->
<template>
  <b-navbar toggleable="md" type="dark" visible="false">
  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
  <b-navbar-brand href="/">程谱</b-navbar-brand>
  <b-collapse is-nav id="nav_collapse">
    <b-navbar-nav>
      <b-nav-item href="/">首页</b-nav-item>
    </b-navbar-nav>
  </b-collapse>
  </b-navbar>
</template>
<style lang="scss" scoped>
.navbar-dark {
  background-color: #222222;
}
.navbar-brand {
  padding-left: 20px;
  padding-right: 20px;
}
.nav-item {
  padding-left: 10px;
  padding-right: 10px;
}
.form-inline {
  margin: 0;
}
</style>
<script>
    export default {
        props: {
        }
    }
</script>

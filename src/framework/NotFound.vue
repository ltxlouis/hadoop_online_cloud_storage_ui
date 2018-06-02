<template>
  <div>
    <p class="not">404 not found</p>
    <p class="not">
      <router-link id="linkr" to="/">返回主页面</router-link>
    </p>
  </div>
</template>
<script>
  export default {
  }
</script>
<style scoped>
  .not {
    text-align: center;
    font-size: 36px;
    margin-top: 20%;
  }

  #linkr {
    color: #66b1ff;
  }

  #linkr a {
    text-decoration: none;
    color: #20A0FF;
  }
</style>

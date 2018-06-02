<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',

  created () {
    document.title = this.$route.name
  },

  watch: {
    '$route'(to, from) {
      document.title = to.name
    }
  }

}
</script>

<template>
  <div id="top">
    <el-row id="row" align="middle">
      <el-col :span="1">
        <img id="icon-img" class="menu-item" src="../../assets/logo.png"/>
      </el-col>
      <el-col :span="8" :offset="1">
        <el-input
          id="searchInput"
          placeholder=" 搜索网盘文件"
          v-model="searchText">
          <i slot="suffix" class="el-input__icon el-icon-search" @click="search"></i>
        </el-input>
      </el-col>
      <!--<el-col :span="1" :offset="13">-->
        <!--<img id="user-avatar" class="menu-item" src="../../assets/user01.jpg" alt="user01">-->
      <!--</el-col>-->
    </el-row>
  </div>
</template>

<script>
  import {acquireUrl} from "../../utils";
  import local from "../../utils/localStorage";

  export default {
    name: 'frame-menu',
    mounted() {
      this.id = localStorage.getItem('id');
    },
    data() {
      return {
        id: '',
        searchText: ''
      }
    },

    methods: {
      search() {
        this.$store.commit('search', this.searchText)
      },

    }
  }
</script>

<style>
  .menu-item {
    height: 40px;
    /*vertical-align: center;*/
    /*margin-top: auto;*/
    /*margin-bottom: auto;*/
  }

  #icon-img {
    margin-left: 36px;
  }

  #searchInput {
    margin-left: 46px;
  }

</style>

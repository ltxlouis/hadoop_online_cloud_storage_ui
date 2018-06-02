<template>
  <div>
    <el-container>
      <el-header>
        <frame-menu/>
      </el-header>
      <el-container>
        <!--<el-aside width="200px">-->
          <left-menu></left-menu>
        <!--</el-aside>-->
        <el-container>
          <el-header>
            <TopToolBar></TopToolBar>
          </el-header>
          <el-main>
            <router-view></router-view>
            <!--<uploadPanel></uploadPanel>-->
          </el-main>
          <!--<el-footer>footer</el-footer>-->
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import frameMenu from './components/frame-menu'
  import leftMenu from './components/left-menu'
  import uploadPanel from '../components/Upload'
  import TopToolBar from './components/TopToolBar'

  export default {
    name: 'appMain',

    components: {
      frameMenu, leftMenu, TopToolBar
    },

    mounted() {
      this.id = localStorage.getItem('id');
      console.log('local id is: ' + this.id);
    },

    data() {
      return {
        id: '',
      }
    },

    methods: {
    }
  }

</script>

<style>
  .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    /*line-height: 800px;*/
    line-height: 900px;
  }

  /*.el-main {*/
    /*background-color: #E9EEF3;*/
    /*color: #333;*/
    /*text-align: center;*/
    /*line-height: 800px;*/
  /*}*/

  body > .el-container {
    margin-bottom: 40px;
  }
</style>

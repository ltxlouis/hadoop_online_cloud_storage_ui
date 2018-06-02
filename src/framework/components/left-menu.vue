<template>
  <div id="app">
    <el-menu class="el-menu-vertical-demo"
             @open="handleOpen"
             @close="handleClose"
             :collapse="isCollapse"
             default-active="1"
             :default-openeds="['1']">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span slot="title">我的网盘</span>
        </template>
        <el-input
          placeholder=""
          v-model="filterText">
        </el-input>
        <el-button id="refresh-button" size="mini" type="primary" @click="getUserFileTree">刷新文件列表</el-button>

        <!--<el-card shadow="always" class="box-card" v-show="!isCollapse">-->
        <el-tree :data="userTreeData" :props="defaultProps" @node-click="handleNodeClick"
                 v-show="!isCollapse" ref="fileTree"
                 :filter-node-method="filterNode"></el-tree>
        <!--</el-card>-->
      </el-submenu>
      <!--<el-menu-item index="2">-->
        <!--&lt;!&ndash;<i class="el-icon-menu"></i>&ndash;&gt;-->
        <!--&lt;!&ndash;<span slot="title">导航二</span>&ndash;&gt;-->
      <!--</el-menu-item>-->
      <!--<el-menu-item index="3">-->
        <!--<i class="el-icon-setting"></i>-->
        <!--<span slot="title">导航三</span>-->
      <!--</el-menu-item>-->

    </el-menu>
    <div id="bottom-card">
      <el-card shadow="always" class="box-card top-panel" v-show="!isCollapse">
        <div class="text item">用户 ID:
          <p class="el-button el-button--primary el-button--mini">{{ this.id }}</p>
        </div>
        <div>欢迎登录</div>
      </el-card>
      <el-button class="top-panel userB" type="info" size="small"
                 @click="chgPwd" v-show="!isCollapse">修改密码
      </el-button>
      <el-button class="top-panel userB" type="danger" size="small"
                 icon="el-icon-circle-close-outline" @click="signOut" v-show="!isCollapse">登出
      </el-button>
    </div>

    <!--<el-button type="primary" :icon="arrowIcon" size="medium"-->
               <!--class="top-panel"-->
               <!--@click="handleArrowClick"></el-button>-->

  </div>
</template>

<script>
  import {acquireUrl} from "../../utils";
  import local from "../../utils/localStorage";

  export default {
    name: "left-menu",
    mounted() {
      this.id = localStorage.getItem('id');
      this.getUserFileTree();
    },

    computed: {
      addFolder() {
        return this.$store.getters['getAddFolder']
      },

      addFile() {
        return this.$store.getters['getRefreshFileList']
      }
    },

    watch: {
      filterText(val) {
        this.$refs.fileTree.filter(val);
      },

      addFolder: function (newv, oldv) {
        console.log('怎么回事')
        this.getUserFileTree()
        console.log(this.userTreeData)
      },

      addFile: function (newv, oldv) {
        this.getUserFileTree()
      }
    },

    data() {
      return {
        id: '',
        arrowIcon: 'el-icon-arrow-left',
        isCollapse: false,
        filterText: '',
        userTreeData: [],

        defaultProps: {
          children: 'children',
          label: 'title'
        }
      }
    },

    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleArrowClick() {
        this.isCollapse = !this.isCollapse;
        if (this.isCollapse) {
          this.arrowIcon = 'el-icon-arrow-right';
        } else {
          this.arrowIcon = 'el-icon-arrow-left';
        }
      },
      chgPwd() {
        this.$router.push('/chg-pwd');
      },
      handleNodeClick(data) {
        console.log(data);
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },

      getUserFileTree() {
        let url = acquireUrl('get', 'getUserFileTree') + this.id;
        this.axios.get(url).then(r => {
          if (r.data.flag === 'F') {
            this.$message({
              showClose: true,
              message: '获取用户文件目录失败 请重试',
              type: 'error',
              duration: 5000
            });
          } else {
            this.userTreeData = r.data.result.children;
          }
        })
      },

      signOut() {
        // const _this = this;
        let url = acquireUrl('post', 'signOut');
        let data = {
          'hcToken': local.getLocalWithNoV('hcToken')
        };
        this.axios.post(url, data).then(r => {
          if (r.data.flag === 'T') {
            local.delLocalStorage('hcToken');
            local.delLocalStorage('id');
            this.$router.push('/sign-in');
            this.$message({
              showClose: true,
              message: '登出成功 请重新登录',
              type: 'success'
            });
          } else {
            this.$message({
              showClose: true,
              message: '登出失败 请重试',
              type: 'error',
              duration: 5000
            });
          }
        })
      }
    }
  }
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 179px;
  }

  .top-panel {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  #bottom-card {
    position: absolute;
    bottom: 20px;
  }

  #refresh-button {
    margin-top: 20px;
    margin-bottom: 20px;
  }
</style>

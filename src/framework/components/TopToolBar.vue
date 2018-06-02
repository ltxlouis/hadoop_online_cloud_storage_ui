<template>
  <div class="boxshadow">
    <el-row>
      <!--total of 24-->
      <el-col :span="1" :offset="1" id="newButton">
        <el-dropdown class="toolbarbutton" @command="handleCommand">
          <el-button type="success" size="small">
            <i class="el-icon-plus"></i> 新建
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="newFolderCommand">新文件夹</el-dropdown-item>
            <el-dropdown-item command="uploadFileCommand">上传文件</el-dropdown-item>
            <!--<el-dropdown-item>上传文件夹</el-dropdown-item>-->
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="6" :offset="4">
        <div class="toolbarbutton">

        </div>
      </el-col>
      <!--<el-col :span="2" :offset="10">-->
        <!--<el-dropdown class="toolbarbutton">-->
          <!--<el-button type="primary" size="small">-->
            <!--菜单<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
          <!--</el-button>-->
          <!--<el-dropdown-menu slot="dropdown">-->
            <!--<el-dropdown-item>菜单1</el-dropdown-item>-->
            <!--<el-dropdown-item>菜单2</el-dropdown-item>-->
          <!--</el-dropdown-menu>-->
        <!--</el-dropdown>-->
      <!--</el-col>-->
    </el-row>

    <!-- add folder dialog -->
    <el-dialog
      title="新增文件夹"
      width="27%"
      :visible.sync="dialogVisible"
      @open="dialogOpen"
      @close="dialogVisible = false">

      <el-input
        ref="newFolderInput"
        placeholder="请输入文件夹名字"
        v-model="newFolderName"
        clearable
        @keyup.native.enter="handleAddFolder">
      </el-input>
      <el-button id="inputPanel" size="medium" type="primary" @click="handleAddFolder">提交</el-button>
      <el-button size="medium" @click="dialogVisible = false">取消</el-button>

    </el-dialog>

    <el-dialog
      title="上传文件"
      :visible.sync="uploadVisible"
      @close="uploadVisible = false">

      <upload-panel></upload-panel>
    </el-dialog>

  </div>
</template>

<script>
  import uploadPanel from '../../components/Upload'

  export default {
    name: "TopToolBar",
    components: { uploadPanel },

    methods: {

      handleAddFolder() {
        this.$store.commit('addFolder', this.newFolderName);
        this.$store.commit('refreshFileList');
        this.dialogVisible = false;
      },

      handleCommand(command) {
        if (command === 'newFolderCommand') {
          this.dialogVisible = true;
          this.newFolderName = '';
        }
        if (command === 'uploadFileCommand') {
          this.uploadVisible = true;
        }
      },

      dialogOpen() {
        this.$nextTick(() => {
          this.$refs.newFolderInput.$el.querySelector('input').focus();
        })
      }
    },

    data() {
      return {
        dialogVisible: false,
        newFolderName: '',
        uploadVisible: false
      }
    }
  }
</script>

<style>
  .boxshadow {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }

  .toolbarbutton {
    margin-top: 5px;
    margin-bottom: 5px;
  }

  #newButton {
    margin-left: 18px;
  }

  #inputPanel {
    margin-top: 27px;
  }

</style>

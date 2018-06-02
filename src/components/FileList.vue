<template>
  <div>
    <el-button id="top-button" type="primary" plain size="small" @click="getUserFileListGoBack">上一级
    </el-button>
    <el-button type="primary" plain size="small" @click="getRootFileList">回到根目录</el-button>
    <el-button v-show="showDelete" type="danger" size="small" @click="handleDelete">删除</el-button>
    <el-table
      border
      ref="multipleTable"
      :data="fileListData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      @row-dblclick="handleRowDblclick">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column label="文件名" sortable>
        <!--prop="title"-->

        <template slot-scope="scope">
          <i :class="getFileIcon(scope.row.isFile)"></i>
          <span style="margin-left: 10px" class="noselect">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        prop="timeCreated"
        label="创建时间">
      </el-table-column>
      <el-table-column
        sortable
        prop="timeModified"
        label="修改时间">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <a
            style="text-decoration: none"
            :href="getDownloadUrl(scope.row.origTitle)"
            class="el-button el-button--primary el-button--mini el-icon-download"
            v-if="showDownload(scope.row.isFile)">下载</a>
          <!--<el-button-->
          <!--size="mini"-->
          <!--type="danger"-->
          <!--@click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>


    <el-dialog
      title="修改名称"
      width="27%"
      :visible.sync="dialogVisible"
      @open="dialogOpen"
      @close="dialogVisible = false">

      <el-input
        ref="newFolderInput"
        placeholder="请输入需要新名称"
        v-model="newTitle"
        clearable
        @keyup.native.enter="handleChangTitle">
      </el-input>
      <el-button id="inputPanel" size="medium" type="primary" @click="handleChangTitle">提交
      </el-button>
      <el-button size="medium" @click="dialogVisible = false">取消</el-button>

    </el-dialog>

    <!--<div>-->
      <!--<el-button type="primary" @click="showDirId">查看dirid</el-button>-->
    <!--</div>-->
  </div>
</template>

<script>
  import { acquireUrl } from "../utils";

  export default {
    name: "FileList",

    mounted() {
      this.userId = localStorage.getItem('id');
      this.getRootFileList();
      this.fileListDataP = this.fileListData;
    },

    computed: {
      currDirId() {
        return this.$store.getters['getDirId']
      },

      newFolderName() {
        return this.$store.getters['getNewFolderName']
      },

      addFolder() {
        return this.$store.getters['getAddFolder']
      },

      addFile() {
        return this.$store.getters['getRefreshFileList']
      },

      showDelete() {
        return this.multipleSelection.length !== 0
      },

      search() {
        return this.$store.getters['getSearch']
      },

      searchText() {
        return this.$store.getters['getSearchText']
      }
    },

    watch: {
      addFolder: function (newv, oldv) {
        console.log("点击了新增文件夹")
        console.log(this.currDirId)
        console.log(this.newFolderName)
        let url = acquireUrl('post', 'addNode');
        let data = {
          'parentId': this.currDirId,
          'title': this.newFolderName,
          'isFile': 0
        };
        this.axios.post(url, data).then(r => {
          if (r.data.flag === 'T') {
            // this.getRootFileList();
            this.getCurrDirFileList();
            this.$message({
              showClose: true,
              message: '添加文件夹成功',
              type: 'success'
            });
          } else {
            this.$message({
              showClose: true,
              message: '添加文件夹失败',
              type: 'error',
              duration: 5000
            });
          }
        }).catch(e => console.log(e))
      },

      addFile: function (newv, oldv) {
        this.getCurrDirFileList();
      },

      search: function (newv, oldv) {
        let url = acquireUrl('post', 'searchFiles')
        let data = {
          'userId': this.userId,
          'title': this.searchText
        }
        this.axios.post(url, data).then(r => {
          if (r.data.flag === 'T') {
            this.fileListData = r.data.result
            this.$message({
              showClose: true,
              message: '搜索成功',
              type: 'success'
            })
          } else {
            this.$message({
              showClose: true,
              message: '搜索失败',
              type: 'error',
              duration: 5000
            })
          }
        })
      }
    },

    data() {
      return {
        userId: '',
        newTitle: '',
        fileListData: [],
        fileListDataP: [],
        multipleSelection: [],
        dialogVisible: false,
        index: null,
        row: null
      }
    },

    methods: {
      // toggleSelection(rows) {
      //   if (rows) {
      //     rows.forEach(row => {
      //       this.$refs.multipleTable.toggleRowSelection(row);
      //     });
      //   } else {
      //     this.$refs.multipleTable.clearSelection();
      //   }
      // },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection)
      },

      handleRowDblclick(row, event) {
        // console.log(event);
        if (row.isFile === 0) {
          this.getFileList(row.id);
          this.$store.commit('setDirId', row.id);
          console.log('curr dir id is: ' + this.currDirId + row)
        }
      },

      getRootFileList() {
        let url = acquireUrl('get', 'getUserRootList') + this.userId;
        this.axios.get(url).then(r => {
          if (r.data.flag === 'T') {
            // this.fileListDataP = this.fileListData;
            this.fileListData = r.data.result.list;
            this.$store.commit('setDirId', r.data.result.id);
          } else {
            this.$message({
              showClose: true,
              message: '获取文件列表失败',
              type: 'error',
              duration: 5000
            })
          }
        }).catch(e => console.log(e));
      },

      getUserFileListGoBack() {
        let url = acquireUrl('get', 'getUserFileListGoBack') + this.currDirId;
        this.axios.get(url).then(r => {
          if (r.data.flag === 'T') {
            this.fileListData = r.data.result.list;
            this.$store.commit('setDirId', r.data.result.id);
          } else {
            this.$message({
              showClose: true,
              message: '获取文件列表失败',
              type: 'error',
              duration: 5000
            })
          }
        })
      },

      getCurrDirFileList() {
        let url = acquireUrl('get', 'getFileListByNodeId') + this.currDirId;
        this.axios.get(url).then(r => {
          if (r.data.flag === 'T') {
            this.fileListData = r.data.result;
          } else {
            this.$message({
              showClose: true,
              message: '获取文件列表失败',
              type: 'error',
              duration: 5000
            })
          }
        })
      },

      getFileList(id) {
        let url = acquireUrl('get', 'getFileListByNodeId') + id;
        this.axios.get(url).then(r => {
          if (r.data.flag === 'T') {
            this.fileListData = r.data.result;
          } else {
            this.$message({
              showClose: true,
              message: '获取文件列表失败',
              type: 'error',
              duration: 5000
            })
          }
        })
      },

      handleEdit(index, row) {
        this.row = row
        this.index = index
        this.dialogVisible = true
        this.newTitle = row.title
      },

      handleChangTitle() {
        let url = acquireUrl('post', 'updateFileTitle');
        let data = {
          'id': this.row.id,
          'title': this.newTitle
        }
        this.axios.post(url, data).then(r => {
          if (r.data.flag === 'T') {
            this.$store.commit('refreshFileList');
            this.$message({
              showClose: true,
              message: '修改成功',
              type: 'success'
            });
          } else {
            this.$message({
              showClose: true,
              message: '修改失败',
              type: 'error',
              duration: 5000
            });
          }
        })
        this.dialogVisible = false;
      },

      handleDelete() {
        let list = []
        let idList = []
        for (let i in this.multipleSelection) {
          list.push(this.getSourcePath(this.multipleSelection[i].origTitle))
          idList.push(this.multipleSelection[i].id)
        }
        let deleteFileUrl = acquireUrl('post', 'delNodes')
        let deleteFromHdfs = acquireUrl('post', 'deleteFilesFromHdfs')
        let listData = {
          'list': list
        }
        let idListData = {
          'idList': idList
        }
        this.axios.post(deleteFromHdfs, listData).then(r => {
          if (r.data.flag === 'T') {
            this.axios.post(deleteFileUrl, idListData).then(r => {
              if (r.data.flag === 'T') {
                this.getCurrDirFileList();
                this.$refs.multipleTable.clearSelection();
                this.$message({
                  showClose: true,
                  message: '删除成功',
                  type: 'success'
                })
              } else {
                this.getCurrDirFileList();
                this.$refs.multipleTable.clearSelection();
                this.$message({
                  showClose: true,
                  message: '删除失败',
                  type: 'error',
                  duration: 5000
                })
              }
            });
          } else {
            this.getCurrDirFileList();
            this.$refs.multipleTable.clearSelection();
            this.$message({
              showClose: true,
              message: '从hdfs删除失败',
              type: 'error',
              duration: 5000
            })
          }
        })
        // this.$refs.multipleTable.clearSelection();
        // this.getCurrDirFileList();
      },

      getSourcePath(title) {
        return "/user/" + this.userId + "/" + title + "/"
      },

      handleDownload() {

      },

      download() {
        // return acquireUrl('get', 'downloadFromHdfs') + "%2usr%2admin%2a.jpg";
        return "'http://localhost:9090/hc/downloadFromHdfs?sourcePath=/user/admin/Fa.jpg'";
      },

      getFileIcon(isFile) {
        if (isFile === 1) {
          return 'el-icon-document';
        } else {
          return 'el-icon-menu';
        }
      },

      showDownload(isFile) {
        return isFile === 1;
      },

      handleGoBack() {
        this.fileListData = this.fileListDataP;
      },

      showDirId() {
        console.log(this.currDirId)
      },

      dialogOpen() {
        this.$nextTick(() => {
          this.$refs.newFolderInput.$el.querySelector('input').focus();
        })
      },

      getDownloadUrl(title) {
        return "http://localhost:9090/hc/downloadFromHdfs?sourcePath=/user/" + this.userId + "/" + title;
      }

    }
  }
</script>

<style>
  #inputPanel {
    margin-top: 27px;
  }

  #top-button {
    margin-bottom: 27px;
  }

  .noselect {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
  }
</style>

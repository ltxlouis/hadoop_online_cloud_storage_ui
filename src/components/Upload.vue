<template>
  <div id="container">
    <el-upload class="upload-demo"
               ref="upload"
               :action="url"
               :on-preview="handlePreview"
               :on-remove="handleRemove"
               :on-success="handleSuccess"
               :on-error="handleError"
               :file-list="fileList"
               :auto-upload="false"
               :drag="true"
               :headers="header"
               :data="rdata"
               :multiple="true">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器
      </el-button>
      <!--<el-button @click="showfilelist">查看filelist</el-button>-->
      <div slot="tip" class="el-upload__tip">上传文件列表</div>
    </el-upload>

  </div>
</template>

<script>
  import {acquireUrl} from "../utils";
  import localStorage from "../utils/localStorage"

  export default {
    name: 'upload',

    mounted() {
      let _this = this;
      this.id = localStorage.getLocalByKey('id');
      this.header.hcToken = localStorage.getLocalWithNoV('hcToken');
      this.url = acquireUrl('post', 'uploadToHdfs');
      this.rdata.destPath = '/user/' + _this.id + '/';
    },

    computed: {
      currDirId() {
        return this.$store.getters['getDirId']
      }
    },

    data() {
      return {
        id: '',
        url: '',
        header: {
          hcToken: ''
        },
        rdata: {
          destPath: ''
        },
        fileList: []
      }
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleSuccess(response, file, fileList) {
        console.log(response)
        if (response.flag === 'T') {
          let url = acquireUrl('post', 'addNode');
          let data = {
            'parentId': this.currDirId,
            'isFile': 1,
            'title': file.name
          };
          this.axios.post(url, data).then(r => {
            if (r.data.flag === 'T') {
              this.$store.commit('refreshFileList');
              this.$message({
                showClose: true,
                message: '上传成功',
                type: 'success'
              });
            } else {
              this.$message({
                showClose: true,
                message: '上传失败',
                type: 'error',
                duration: 5000
              });
            }
          });
        } else {
          this.$message({
            showClose: true,
            message: '上传失败',
            type: 'error',
            duration: 5000
          });
        }

      },
      handleError(err, file, fileList) {
        this.uploadFileList = fileList
        this.$message({
          showClose: true,
          message: '上传失败',
          type: 'error',
          duration: 5000
        });
      },

      showfilelist() {
        // console.log(this.uploadFileList[0].name)
        // console.log(this.uploadFileList[1].name)
        for (let i in this.uploadFileList) {
          console.log(this.uploadFileList[i].name)
        }
      },

      // getFileList() {
      //   let url = acquireUrl('get', 'getFileList') + this.rdata.destPath;
      //   this.axios.get(url).then(r => {
      //     if (r.data.flag === 'T') {
      //       this.gridData = r.data.result.fileList;
      //     } else {
      //       this.$message({
      //         showClose: true,
      //         message: '网络错误',
      //         type: 'error',
      //         duration: 5000
      //       })
      //     }
      //   }).catch(e => console.log(e));
      // },

      test2() {
        this.axios.get('http://127.0.0.1:9090/hc/test').then(r => {
          console.log(r.status);
        }).catch(e => {
          if (e.response) {
            console.log(e.response.status)
          }
        })
      }
    }
  }
</script>

<style scoped>
  /*#container {*/
    /*width: 800px;*/
  /*}*/
</style>

<template>
  <div class="loginWrapper">
    <div class="hd">
      <img id="pic" src="../assets/logo.png" alt="hCloud">
    </div>
    <div class="bd">
      <el-form :model="loginForm" :rules="loginRule" ref="loginForm">
        <el-form-item>
          <el-input v-model="loginForm.id" placeholder="账号" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item prop="oldPassword">
          <el-input v-model="loginForm.oldPassword" placeholder="原密码" type="password"></el-input>
        </el-form-item>
        <el-form-item prop="newPassword">
          <el-input v-model="loginForm.newPassword" placeholder="新密码" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit"
                     @click.native.prevent="submitForm('loginForm')" class="submitBtn">修改密码
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="ft">
      <router-link to="/">返回主页</router-link>
    </div>
  </div>
</template>

<script>
  import {acquireUrl} from "../utils";
  import localStorage from "../utils/localStorage"

  export default {
    name: 'login',
    mounted() {
      this.loginForm.id = localStorage.getLocalByKey('id');
    },

    data() {
      return {
        loginForm: {
          id: '',
          oldPassword: '',
          newPassword: ''
        },
        loginRule: {
          oldPassword: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
          ],
          newPassword: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
          ]
        },
        chgPwdFlag: '',
        signOutFlag: ''
      }
    },
    methods: {
      submitForm(formName) {
        const _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = {
              'id': this.loginForm.id,
              'oldPassword': this.loginForm.oldPassword,
              'newPassword': this.loginForm.newPassword
            };
            let url = acquireUrl('post', 'chgPwd');
            let signOutUrl = acquireUrl('post', 'signOut');
            let datar = {
              'hcToken': localStorage.getLocalWithNoV('hcToken')
            };
            this.axios.post(url, data).then(r => {
              _this.chgPwdFlag = r.data.flag;
              this.axios.post(signOutUrl, datar).then(rs => {
                _this.signOutFlag = rs.data.flag;
                if (_this.chgPwdFlag === 'T' && _this.signOutFlag === 'T') {
                  this.$message({
                    showClose: true,
                    message: '用户 ' + _this.loginForm.id + '密码修改成功 请重新登录',
                    type: 'success'
                  });
                  localStorage.delLocalStorage('hcToken');
                  localStorage.delLocalStorage('id');
                  this.$router.push('/sign-in');
                } else {
                  this.$message({
                    showClose: true,
                    message: '出现错误 请重试',
                    type: 'error',
                    duration: 5000
                  });
                }
              }).catch(e => console.log(e));
            }).catch(e => console.log(e));

          } else {
            return false
          }
        })
      }
    }
  }

</script>

<style scoped>

  .loginWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    font-size: 18px;
  }

  .loginWrapper .hd {
    width: 300px;
    margin-top: 100px;
  }

  .loginWrapper .hd h2 {
    font-weight: 400;
    color: #20A0FF;
  }

  .loginWrapper .hd p {
    font-size: 15px;
    color: #606266;
  }

  .loginWrapper .bd {
    width: 300px;
  }

  .loginWrapper .bd .submitBtn {
    width: 100%;
  }

  .loginWrapper .bd .el-form-item:last-child {
    margin-bottom: 20px;
  }

  .loginWrapper .ft {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 300px;
  }

  .loginWrapper .ft a {
    font-size: 14px;
    text-decoration: none;
    color: #20A0FF;
  }

  #pic {
    width: 80px;
    padding-left: 110px;
    margin-bottom: 80px;
  }
</style>

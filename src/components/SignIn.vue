<template>
  <div class="loginWrapper">
    <div class="hd">
      <img id="pic" src="../assets/logo.png" alt="hCloud">
    </div>
    <div class="bd">
      <el-form :model="loginForm" :rules="loginRule" ref="loginForm">
        <el-form-item prop="id">
          <el-input type="userName" v-model="loginForm.id" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="密码" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit" @click.native.prevent="submitForm('loginForm')" class="submitBtn">登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="ft">
      <router-link to="/sign-up">还没有账号？马上注册</router-link>
    </div>
  </div>
</template>

<script>
  import {acquireUrl} from "../utils";
  import localStorage from "../utils/localStorage"

  export default {
    name: 'login',
    data() {
      return {
        loginForm: {
          id: '',
          password: ''
        },
        loginRule: {
          id: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 10, message: '长度在 3 到 16 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        const vm = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = {
              'id': this.loginForm.id,
              'password': this.loginForm.password
            };
            let url = acquireUrl('post', 'signIn');
            this.axios.post(url, data).then(r => {
              if (r.data.flag === 'T') {
                let rto = r.data.result.rt;
                let rid = r.data.result.id;
                localStorage.setLocalStorage('hcToken', rto, 20);
                localStorage.setLocalKeyValue('id', rid);
                vm.$router.push('/');
                this.$message({
                  showClose: true,
                  message: '欢迎登录 ' + rid,
                  type: 'success'
                });
              } else {
                this.$message({
                  showClose: true,
                  message: '登录失败 请重新登录',
                  type: 'error',
                  duration: 5000
                })
              }
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

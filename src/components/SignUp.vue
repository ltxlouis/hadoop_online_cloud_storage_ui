<template>
  <div class="loginWrapper">
    <div class="hd">
      <img id="pic" src="../assets/logo.png" alt="hCloud">
    </div>
    <div class="bd">
      <el-form :model="registerForm" :rules="registerRule" ref="registerForm">
        <el-form-item prop="id">
          <el-input @blur="chkId" type="id" v-model="registerForm.id"
                    placeholder="用户 id" prefix-icon="el-icon-caret-right"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="registerForm.password"
                    placeholder="密码" type="password" prefix-icon="el-icon-caret-right"></el-input>
        </el-form-item>
        <el-form-item prop="checkPwd">
          <el-input v-model="registerForm.checkPwd" placeholder="请再次输入密码"
                    type="password" prefix-icon="el-icon-caret-right"></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="registerForm.email" placeholder="邮箱"
                    type="email"></el-input>
        </el-form-item>
        <el-form-item prop="username">
          <el-input type="username" v-model="registerForm.username"
                    placeholder="用户昵称"></el-input>
        </el-form-item>
        <el-form-item prop="age">
          <el-input tpye="age" v-model.number="registerForm.age" placeholder="年龄"/>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="registerForm.gender">
            <el-radio label="1">男</el-radio>
            <el-radio label="0">女</el-radio>
            <el-radio label="-1">保密</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit"
                     @click.native.prevent="submitForm('registerForm')" class="submitBtn">立即注册
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm('registerForm')" class="submitBtn">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="ft">
      <router-link to="/sign-in">已经有账号？马上登录</router-link>
    </div>
  </div>
</template>

<script>
  import {acquireUrl} from "../utils";

  export default {
    data() {
      const _this = this;
      const validateUser = (rule, value, cb) => {
        let pattern = /^[\w\u4e00-\u9fa5]{3,10}$/g;
        if (value === '') {
          return cb(new Error('请输入用户名'))
        } else if (!pattern.test(value)) {
          return cb(new Error('请输入3-10个字母/汉字/数字/下划线'))
        }
        setTimeout(() => {
          if (_this.flag === "F") {
            cb(new Error('用户名已被注册'));
          } else {
            cb();
          }
        }, 200);
      };
      const validatePwd = (rule, value, cb) => {
        let pattern = /^\S{3,20}$/g;
        if (value === '') {
          cb(new Error('请输入密码'))
        } else if (!pattern.test(value)) {
          cb(new Error('请输入3-20个非空白字符'))
        } else {
          if (this.registerForm.checkPwd !== '') {
            this.$refs.registerForm.validateField('checkPwd')
          }
          cb()
        }
      };
      const validateCheckPwd = (rule, value, cb) => {
        if (value === '') {
          cb(new Error('请再次输入密码'))
        } else if (value !== this.registerForm.password) {
          cb(new Error('两次输入密码不一致!'))
        } else {
          cb()
        }
      };
      const validataAge = (rule, value, cb) => {
        if (!Number.isInteger(value) && value !== '') {
          cb(new Error('年龄必须为数字'));
        } else if (value < 0 || value > 200) {
          cb(new Error('请输入正确的年龄'));
        } else {
          cb();
        }
      };
      return {
        registerForm: {
          id: '',
          password: '',
          checkPwd: '',
          email: '',
          username: '',
          gender: '',
          age: ''
        },
        flag: 'T',
        registerRule: {
          id: [
            {validator: validateUser, trigger: 'blur'}
          ],
          password: [
            {validator: validatePwd, trigger: 'blur'}
          ],
          checkPwd: [
            {validator: validateCheckPwd, trigger: 'blur'}
          ],
          email: [
            {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'}
          ],
          age: [
            {validator: validataAge, trigger: 'blur'}
          ]
        }
      }
    },

    methods: {
      submitForm(formName) {
        let _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = {
              'id': this.registerForm.id,
              'username': this.registerForm.username,
              'password': this.registerForm.password,
              'email': this.registerForm.email,
              'gender': this.registerForm.gender,
              'age': this.registerForm.age
            };
            let url = acquireUrl('post', 'addUser');
            _this.axios.post(url, data).then((r) => {
              if (r.data.flag === 'T') {
                this.$message({
                  showClose: true,
                  message: '注册成功 请登录',
                  type: 'success',
                  duration: 5000
                });
                this.$router.push('/sign-in');
              } else {
                this.$message({
                  showClose: true,
                  message: '注册失败 请重新注册',
                  type: 'error',
                  duration: 5000
                });
              }
            });
          } else {
            return false;
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      chkId() {
        this.flag = 'T';
        let _this = this;
        let geturl = acquireUrl('get', 'chkId') + this.registerForm.id;
        this.axios.get(geturl).then(r => {
          if (r.data.flag === 'F') {
            _this.flag = 'F';
          }
        }).catch(e => console.log(e));
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
    color: #1f2f3d;
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

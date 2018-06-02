<template>
  <div class="bd">
    <el-form>
      <el-form-item>
        <el-button type="primary" @click="testToken1" class="submitBtn">显示token
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="testToken" class="submitBtn">清除token
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="testToken2" class="submitBtn">显示id
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import localStorage from "../utils/localStorage"

  export default {
    name: 'dev',
    methods: {
      testToken() {
        localStorage.delLocalStorage('hcToken');
        console.log('token is: ' + localStorage.getLocalStorage('hcToken'));
      },

      testToken1() {
        console.log('token is: ' + localStorage.getLocalStorage('hcToken'));
      },

      testToken2() {
        console.log('id is: ' + localStorage.getLocalByKey('id'));
      }
    }
  }

</script>
<style scoped>
  .bd {
    margin: auto;
    width: 170px;
    padding: 10px;
    padding-top: 170px;
  }

  .submitBtn {
    width: 100%;
  }
</style>

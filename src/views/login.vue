<template>
  <div class="login">
    <el-form class="login-form" :model="loginForm">
      <h3 class="title">小龙后台管理系统</h3>

      <el-form-item>
        <el-input
          v-model="loginForm.username"
          placeholder="账号"
          type="text"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-input
          v-model="loginForm.password"
          placeholder="密码"
          type="password"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-input
          style="width: 63%"
          v-model="loginForm.code"
          placeholder="验证码"
        ></el-input>
        <div class="login-code">
          <img :src="codeUrl" class="login-code-img" alt="" @click="getCode" />
        </div>
      </el-form-item>

      <el-checkbox
        style="margin: 0px 0px 25px 0px"
        v-model="loginForm.rememberMe"
        >记住密码</el-checkbox
      >
      <el-form-item style="width: 100%">
        <el-button type="primary" style="width: 100%">
          <span>登录</span>
        </el-button>
      </el-form-item>
    </el-form>

    <div class="el-login-footer">
      <span>Copyright © 2019-2023 Jessica All Rights Reserved.</span>
    </div>
  </div>
</template>

<script>
import { getCodeImg } from "../api/login";

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        code: "",
        rememberMe: false,
      },
      codeUrl: "",
      captchaEnabled: true,
    };
  },
  created() {
    this.getCode();
  },
  methods: {
    getCode() {
      getCodeImg().then((res) => {
        this.captchaEnabled =res.captchaEnabled === undefined ? true : res.captchaEnabled;
        if(this.captchaEnabled){
          this.codeUrl="data:image/gif;base64," +res.img
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.login {
  height: 100%;
  background: url("../assets/image/login-background.jpg");
  /* 超过的部分 裁减掉
     */
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;

  .title {
    color: #707070;
    text-align: center;
    margin: 0px auto 30px;
  }

  .login-form {
    box-sizing: border-box; //这个属性没有看懂
    width: 400px;
    border-radius: 6px;
    background: #fff;
    padding: 25px 25px 5px 25px;
  }

  .el-login-footer {
    height: 40px;
    line-height: 40px;
    position: fixed;
    bottom: 0px;
    color: #fff;
    font-size: 12px;
    letter-spacing: 1px;
    font-family: Arial;
  }

  .login-code {
    width: 33%;
    float: right; //login-code绑定的元素是个div,需要把图片放到右边去

    img {
      cursor: pointer;
    }

    .login-code-img {
      height: 38px;
    }
  }
}
</style>
$(function () {
  // 点击去注册
  $("#link_reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });

  //   点击去登录
  $("#link_login").on("click", function () {
    $(".reg-box").hide();
    $(".login-box").show();
  });

  //   表单验证
  layui.form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repwd: (val) => {
      if ($(".reg-box [name=password]").val() !== val) {
        return layui.layer.msg("两次密码不一致");
      }
    },
  });

  //
  //   const baseurl = "http://127.0.0.1:8088";
  $("#form_reg").on("submit", (e) => {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/api/reguser",
      data: {
        username: $(".reg-box [name=username]").val(),
        password: $(".reg-box [name=password]").val(),
      },
      success: function (res) {
        console.log(res);
        if (res.status != 0) {
          return layui.layer.msg(res.msg);
        }
        layui.layer.msg(res.msg);
        location.href = "/login.html";
      },
    });
  });

  //   点击登录
  $("#form_login").on("submit", (e) => {
    console.log(1111);
    e.preventDefault();
    $.ajax({
      type: "get",
      url: "/api/login",
      data: $("#form_login").serialize(),
      success: (res) => {
        console.log(res);
        if (res.status != 0) {
          return layui.layer.msg(res.msg);
        }
        localStorage.setItem("token", res.token);
        location.href = "/index.html";
      },
    });
  });
});

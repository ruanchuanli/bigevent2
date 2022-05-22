$(function () {
  layui.form.verify({
    pwd: /^[\S]{6,12}$/,
    repwd: (val) => {
      if (val != $(".layui-form [name=password]").val()) {
        return layui.layer.msg("两次密码不一致");
      }
    },
  });

  //   提交
  $(".layui-form").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/my/updatepwd",
      data: {
        password: $(".layui-form [name=oldPwd]").val(),
        newPwd: $(".layui-form [name=newPwd]").val(),
      },
      success: function (res) {
        if (res.status != 0) {
          return layui.layer.msg(res.msg);
        }
        layui.layer.msg(res.msg);
      },
    });
  });
});

$(function () {
  // 昵称正则
  layui.form.verify({
    nickname: (val) => {
      if (val.length > 6 || val.length < 1) {
        return lyui.layer.msg("昵称长度是在1-6位");
      }
    },
  });

  //   获取用户基本信息
  getinfo();
  //   提交修改
  $(".layui-form").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/my/edituser",
      data: {
        id: id,
        nickname: $(".layui-form [name=nickname]").val(),
        email: $(".layui-form [name=email]").val(),
      },
      success: function (res) {
        console.log(res);
        if (res.status != 0) {
          return layui.layer.msg(res.msg);
        }
        window.parent.getuserinfo();
        layui.layer.msg(res.msg);
      },
    });
  });
  // 重置
  $(".reset").on("click", function (e) {
    e.preventDefault();
    getinfo();
  });
});
// 获取用户基本信息函数
let id = "";
const getinfo = () => {
  $.ajax({
    type: "GET",
    url: "/my/getuserinfo",
    success: function (res) {
      if (res.status != 0) {
        return layui.layer.msg("获取用户信息失败");
      }
      layui.form.val("userinfo", res.data);
      id = res.data.id;
    },
  });
};

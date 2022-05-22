$(function () {
  // 获取用户信息
  getuserinfo();
  //   退出功能
  $(".quit").on("click", function () {
    layui.layer.confirm(
      "确认退出登录吗?",
      { icon: 3, title: "提示" },
      function (index) {
        //do something
        localStorage.removeItem("token");
        location.href = "/login.html";
        layer.close(index);
      }
    );
  });
});
// 不能用const定义该函数，userinfo页面得通过window.parent执行该方法
function getuserinfo() {
  console.log(localStorage.getItem("token"));
  $.ajax({
    type: "get",
    url: "/my/getuserinfo",
    // headers: { Authorization: localStorage.getItem("token") },
    success: function (res) {
      console.log(res);
      renderuser(res.data);
    },
  });
}

// 渲染用户信息
const renderuser = function (user) {
  // 获取用户名字
  let name = user.nickname || user.username;
  // 设置欢迎文本
  $("#welcome").html(`欢迎 ${name}`);
  // 按需渲染用户头像
  if (user.user_pic !== null) {
    // 渲染图片头像
    $(".layui-nav-img").attr("src", user.user_pic).show();
    $(".text-avatar").hide();
  } else {
    // 渲染文本头像
    $(".layui-nav-img").hide();
    let firstName = name[0].toUpperCase();
    $(".text-avatar").html(firstName);
  }
};

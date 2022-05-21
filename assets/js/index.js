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

const getuserinfo = () => {
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
};

// 渲染用户信息
const renderuser = (data) => {
  let username = data.nickname || data.username;
  $("#welcome").html(`欢迎 ${username}`);

  console.log(username);
  if (data.user_pic != null) {
    $(".userinfo img").prop("src", data.user_pic);
    $(".text-avatar").hide();
  } else {
    $(".text-avatar").show();
    $(".userinfo img").hide();
    $(".text-avatar").html(username[0].toUpperCase());
  }
};

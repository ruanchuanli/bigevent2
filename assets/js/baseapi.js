$(function () {
  // 请求拦截器
  // 发送ajax一定会执行的函数
  $.ajaxPrefilter((option) => {
    option.url = "http://127.0.0.1:8088" + option.url;
    if (option.url.includes("/my/")) {
      option.headers = { Authorization: localStorage.getItem("token") };
    }
    option.complete = (res) => {
      if (
        res.responseJSON.status == 1 &&
        res.responseJSON.msg == "身份认证失败!"
      ) {
        localStorage.removeItem("token");
        location.href = "/login.html";
      }
    };
  });
});

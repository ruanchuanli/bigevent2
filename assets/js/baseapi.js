$(function () {
  // 请求拦截器
  // 发送ajax之前执行一定会执行的函数
  $.ajaxPrefilter((option) => {
    option.url = "http://127.0.0.1:8088" + option.url;
  });
});

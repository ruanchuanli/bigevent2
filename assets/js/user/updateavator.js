$(function () {
  // 获取image标签
  let $image = $("#image");
  //   配置项
  const option = {
    //   裁剪框宽高比
    aspectRatio: 1,
    // 预览区域
    preview: ".img-preview",
  };
  //   创建裁剪区域
  $image.cropper(option);

  //   // 获取用户基本信息函数
  //   let id = "";
  //   $.ajax({
  //     type: "GET",
  //     url: "/my/getuserinfo",
  //     success: function (res) {
  //       if (res.status != 0) {
  //         return layui.layer.msg("获取用户信息失败");
  //       }
  //       id = res.data.id;
  //     },
  //   });
  //   上传图片
  $(".commit").on("click", function () {
    //   相当于点击了隐藏的input
    $(".file").click();
    $(".file").on("change", function (e) {
      let files = $(".file")[0].files;
      if (files.length <= 0) {
        return layui.layer.msg("请选择文件");
      }
      let url = URL.createObjectURL(files[0]);
      $image.cropper("destroy").attr("src", url).cropper(option);
      console.log(files);
      console.log(url);
      //   点击确定更改头像
      $(".sure").on("click", function (e) {
        // 1、拿到用户裁切之后的头像
        // 直接复制代码即可
        const dataURL = $image
          .cropper("getCroppedCanvas", {
            // 创建一个 Canvas 画布
            width: 100,
            height: 100,
          })
          .toDataURL("image/png");
        console.log(dataURL);
        $.ajax({
          type: "post",
          url: "/my/update/avatar",
          data: {
            avatar: dataURL,
          },
          success: function (res) {
            if (res.status != 0) {
              return layui.layer.msg("更新头像失败");
            }
            layui.layer.msg(res.msg);
            window.parent.getuserinfo();
          },
        });
      });
    });
  });
});

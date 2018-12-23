function submitmessage() {
    var message = $('#message').val();
    console.log(message);
    if (message.length==0)
        {
            alert("输入不能为空！");
            return ;
        }
    var data = {
        message: message,
    };
    var dataToSend = JSON.stringify(data);//从一个对象解析出字符串 
    $.ajax({
        url: "/message",
        type: "post",
        data: dataToSend,
        beforeSend: function(request) {
            request.setRequestHeader("X-Xsrftoken", $.cookie("_xsrf"));
        },
        success: function () {
            alert("留言添加成功！");
            $('#message').val("");

        },
        error: function () {//获取失败
            alert("failed");
        }
    });


}
function getvisitinfo(name) {
    data = { name: name };
    dataToSend = JSON.stringify(data);
    $.ajax({
        url: "/user",
        type: "post",
        async: false,
        data: dataToSend,
        beforeSend: function(request) {
            request.setRequestHeader("X-Xsrftoken", $.cookie("_xsrf"));
        },
        success: function (arg) {
            info = jQuery.parseJSON(arg);
            //    console.log(info);
        },
        error: function () {
            alert("failed");
        }
    });
}

function update() {
    $('#visit_img').attr("src", '/static/uploads/avatar/' + info.id + '.jpg');
    $('#visit_img').attr("onerror", 'javascript:this.src="/static/images/default.png"');
    $('#visit_name').html("姓名：" + info.realname);
    $('#visit_nickname').html("昵称：" + info.nickname);
    $('#visit_organization').html("学院：" + info.organization);
    $('#visit_major').html("专业：" + info.major);
    if (info.description == null) {
        $('#visit_description').html("个性签名：这个学生很懒，还没有设置个性签名哦！");
    }
    else {
        $('#visit_description').html("个性签名：" + info.description);
    }
    $('#visit_score').html('积分：' + info.score + '&nbsp;&nbsp;&nbsp;&nbsp;提交数：' + info.submit + '&nbsp;&nbsp;&nbsp;&nbsp;通过数：' + info.accept);

    Modal1.show();
    Modal1.setHeight("300px");
    Modal1.setWidth("500px");

}

function InitModal1() {
    $(document.body).append('<div id = "modal1"></div>');
    Modal1 = new Modal();
    Modal1.renderto = "#modal1"; //绘制到div
    Modal1.InitMax = false; //是否最大化
    Modal1.title = "用户信息详情";
    Modal1.Init();
    $('.modal-body').append('<img id = "visit_img" src = ""/>');
    $('.modal-body').append('<span id = "visit_name">姓名：' + info.realname + '</span>');
    $('.modal-body').append('<span id = "visit_nickname">昵称：' + info.nickname + '</span>');
    $('.modal-body').append('<span id = "visit_organization">学院：' + info.organization + '</span>');
    $('.modal-body').append('<span id = "visit_major">专业：' + info.major + '</span>');
    $('.modal-body').append('<span id = "visit_description">个性签名：' + info.description + '</span>');
    $('.modal-body').append('<span id = "visit_score">积分：' + info.score + '&nbsp;&nbsp;&nbsp;&nbsp;提交数：' + info.submit + '&nbsp;&nbsp;&nbsp;&nbsp;通过数：' + info.accept + '</span>');
}

function DoAjax(nid) {
    console.log(nid);
    str = "/notice/delete";
    // console.log(str)
    $.ajax({
        url: str,//对应handler的方法
        type: "POST",//Post方法
        data: { dat1: nid },//要往服务器传递的数据
        beforeSend: function(request) {
            request.setRequestHeader("X-Xsrftoken", $.cookie("_xsrf"));
        },
        success: function () {
            window.location.href = "/notice/manage";
        },
        error: function () {//获取失败
            alert("failed");
        }
    });
}
function del(nid) {
    var msg = "删除的公告不可恢复！确定要删除么？";
    if (confirm(msg) == true) {
        DoAjax(nid);
    }
}
function notice_add() {
    var title = $('#n_title').val();
    var content = $('#n_content').val();
    var source = $('#n_source').val();
    var top = $('input[name="top"]:checked').val();
    if (title.length == 0 || content.length == 0 || source.length == 0) {
        alert("输入不能为空！");
        return;
    }
    console.log(title, content, source, top);
    var data =
        {
            title: title,
            content: content,
            source: source,
            top: top
        }
    var dataToSend = JSON.stringify(data);
    $.ajax({
        url: "/notice/add",
        type: "post",
        data: dataToSend,
        beforeSend: function(request) {
            request.setRequestHeader("X-Xsrftoken", $.cookie("_xsrf"));
        },
        success: function () {
            alert("公告添加成功");
            window.location.href = "/notice/manage"
        },
        error: function () {
            alert("failed");
        }
    });

}

function get_notice(id) {
    var data =
        {
            id: id
        }
    var dataToSend = JSON.stringify(data);
    $.ajax({
        url: "/get_notice",
        type: "post",
        data: dataToSend,
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("X-Xsrftoken", $.cookie("_xsrf"));
        },
        success: function (arg) {
            notice = jQuery.parseJSON(arg);
            console.log(notice);
            $('#n_title').val(notice.title);
            $('#n_content').val(notice.content);
            $('#n_source').val(notice.source);
            $('input[name="top"][value="' + notice.top + '"]').attr("checked", 'true');
        },
        error: function () {
            alert("failed");
        }
    });
}

function notice_edit(id) {
    var title = $('#n_title').val();
    var content = $('#n_content').val();
    var source = $('#n_source').val();
    var top = $('input[name="top"]:checked').val();
    if (title.length == 0 || content.length == 0 || source.length == 0) {
        alert("输入不能为空！");
        return;
    }
    console.log(title, content, source, top);
    var data =
        {
            id: id,
            title: title,
            content: content,
            source: source,
            top: top
        }
    var dataToSend = JSON.stringify(data);
    $.ajax({
        url: "/notice/edit",
        type: "post",
        data: dataToSend,
        beforeSend: function(request) {
            request.setRequestHeader("X-Xsrftoken", $.cookie("_xsrf"));
        },
        success: function () {
            alert("公告编辑成功");
            window.location.href = "/notice/manage";
        },
        error: function () {
            alert("failed");
        }
    });

}

function istop(id) {
    var data =
        {
            id: id
        }
    var dataToSend = JSON.stringify(data);
    $.ajax({
        url: "/top",
        type: "post",
        data: dataToSend,
        beforeSend: function(request) {
            request.setRequestHeader("X-Xsrftoken", $.cookie("_xsrf"));
        },
        success: function () {
            window.location.href = "/notice/manage";
        },
        error: function () {
            alert("failed");
        }
    });
}

function notice_manage(page) {
    var perpage = 20;
    var data = {
        page: page,
        perpage: perpage
    }
    var dataTosend = JSON.stringify(data);
    $.ajax(
        {
            url: "/notice/manage",
            type: "POST",
            data: dataTosend,
            beforeSend: function(request) {
                request.setRequestHeader("X-Xsrftoken", $.cookie("_xsrf"));
            },
            success: function (arg) {
                var obj = jQuery.parseJSON(arg);
                console.log(obj);
                if (document.getElementById('tbody')) {
                    $('#tbody').remove();
                }
                $('#table').append('<tbody id="tbody" ></tbody>');
                for (var i = 0; i < obj.length; i++) {
                    td1 = '<td>' + obj[i].title + '</td>';
                    td2 = '<td>' + obj[i].source + '</td>'
                    td3 = '<td>' + obj[i].time + '</td>';
                    td4 = '<td><a id=' + obj[i].id + ' class = "edit_notice" ><span class = "glyphicon glyphicon-pencil"></span></a></td>';
                    if (parseInt(obj[i].top) == 1) {
                        td5 = '<td> <a id=' + obj[i].id + ' href="javascript:void(0);" onclick="istop(this.id);"><span id="istop" class = "glyphicon glyphicon-arrow-down"></span></a> </td>';
                    }
                    else {
                        td5 = '<td> <a id=' + obj[i].id + ' href="javascript:void(0);" onclick="istop(this.id);"><span id="istop" class = "glyphicon glyphicon-arrow-up"></span></a> </td>';
                    }
                    td6 = '<td> <a id=' + obj[i].id + ' href="javascript:void(0);" onclick="del(this.id);"><span class = "glyphicon glyphicon-trash"></span></a> </td>';
                    tr = '<tr>' + td1 + td2 + td3 + td4 + td5 + td6 + '</tr>';
                    $('#tbody').append(tr);
                }
                $('.edit_notice').click(function(){
                    console.log("!!!!!!!!!!!!1");
                    Modal1.show();
                    Modal1.setHeight("400px");
                    Modal1.setWidth("500px");
                    get_notice(this.id);
                    $('#sure').attr("onclick",'notice_edit('+this.id+');');
                  });
                notice_num = parseInt(obj[0].notice_num);
                // console.log(notice_num)
                Paging("notice_manage_page", 'notice_manage', notice_num, page, perpage, "pagefoot");
            },
            error: function () {
                alert("failed");
            }
        }
    );

}


function DoAjax(page) {
    // ws.close();
    var perpage = $('#perpage').val();
    var key = $('#key').val();
    var arr = $('#select').val();
    var option = "";
    var lang = "";
    var language = {
        "l0" : "0",
        "l1" : "1",
        "l2" : "2"
    }
    if(arr) {
        if(arr.length == 2){
            option = arr[0];
            lang = language[arr[1]];
        }
        else{
            if(arr[0] == "title" || arr[0] == "pro" || arr[0] == "author"){
                option = arr[0];
            }
            else{
                lang = language[arr[0]];
            }
        }
    }
    var data = {
        key: key,
        page: page,
        perpage: perpage,
        option: option,
        lang: lang,
    };
    var dataToSend = JSON.stringify(data);//从一个对象解析出字符串 
    $.ajax({
        url: "/answer/search",
        type: "post",
        data: dataToSend,
        beforeSend: function(request) {
            request.setRequestHeader("X-Xsrftoken", $.cookie("_xsrf"));
        },
        success: function (arg) {

            var obj = jQuery.parseJSON(arg);
            // console.log(obj);
            if (document.getElementById('tbody')) {
                $('#tbody').remove();
            }
            $('#table').append('<tbody id="tbody" ></tbody>');
            if (obj.length==1)
            {
                tr = '<tr>' + '<td style = "color:red ">' + '没有符合查询条件的状态' + '</td>' + '</tr>';
                $('#tbody').append(tr);
            }
            var count = obj[0], myanswer = $('#myanswer').val(), u_level = $('#answer').val();
            for (var i = obj.length - 1; i >= 1; i--) {
                //如果是其他用户 则看不到未审核的
                if(myanswer != 1 && u_level != 1 && u_level != 2 && obj[i].status == 0) {
                    continue;
                }
                td0 = '<td>' + obj[i].a_id + '</td>';
                td1 = '<td>' + '<a href="/answer/detail?an=' + obj[i].a_id + '">' + obj[i].title + '</a></td>';
                td2 = '<td>' + obj[i].p_id + '</td>';
                td3 = '<td>' + '<a href="/problem/submit?tw=' + obj[i].p_id + '">' + obj[i].p_title + '</a></td>';
                td4 = '<td>'+ obj[i].u_realname + '</td>';
                td5 = '<td>' + obj[i].time + '</td>';
                td6 = ""
                td7 = ""
                td8 = ""

                //如果是本人或者管理员或者教师
                if(myanswer == 1 || u_level == 1 || u_level == 2) {
                    //如果是用户本人， 可以查看状态， 编辑以及删除
                    if(myanswer == 1) {
                        if(obj[i].status == 0){
                            td6 = '<td>' + "正在审核中" + '</td>';
                        } 
                        else {
                            td6 = '<td>' + '审核已通过' + '</td>';
                        }
                        td7 = '<td>' + '<a href="/answer/edit?an='+ obj[i].a_id + '"><span class = "glyphicon glyphicon-pencil"></span></td>';
                        td8 = '<td>' + '<a href = "javascript:void(0);" onclick = "answerdelete('+ obj[i].a_id + ')"><span class = "glyphicon glyphicon-trash"></span></a></td>';
                    }
                    // 如果是管理员或者教师， 可以修改状态， 删除但是不能编辑
                    else {
                        if(obj[i].status == 0){
                            td6 = '<td>' + '<a href="/answer/detail?an=' + obj[i].a_id + '">' + "正在审核中" + '</td>';
                        } 
                        else {
                            td6 = '<td>' + '<a href="/answer/detail?an=' + obj[i].a_id + '">' + '审核已通过' + '</td>';
                        }
                        td8 = '<td>' + '<a href = "javascript:void(0);" onclick = "answerdelete('+ obj[i].a_id + ')"><span class = "glyphicon glyphicon-trash"></span></a></td>';
                    }
                } 
                tr = '<tr>' + td0 + td1 + td2 + td3 + td4 + td5 + td6 + td7 + td8 + '</tr>';
                $('#tbody').append(tr);
            }
            Paging("answer_page", 'DoAjax', count, page, perpage, "pagefoot");
        },
        error: function () {//获取失败
            alert("failed");
        }
    });
}

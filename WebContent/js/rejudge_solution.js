function DoAjax(page) {
    // ws.close();
    var perpage = $('#perpage').val();
    var key = $('#key').val();
    var arr = $('#select').val();
    var option = "";
    var lang = "";
    var result = "";
    var language = {
        "l0": "0",
        "l1": "1",
        "l2": "2",
        "l3": "3"
    }
    var status = 0;//只要搜索条件数组不为空，表示需要搜索，即用status提示后台，这个是搜索请求
    if (arr) {
        status = 1;
        if (arr.length == 1) {
            if (arr[0] == "pro" || arr[0] == "user") {
                option = arr[0];
            } else {
                if (arr[0] == "l0" || arr[0] == "l1" || arr[0] == "l2") {
                    lang = language[arr[0]];
                } else {
                    result = arr[0];
                }
            }
        } else if (arr.length == 3) {
            option = arr[0];
            lang = language[arr[1]];
            result = arr[2];
        } else if (arr.length == 2) {
            if (arr[0] == "pro" || arr[0] == "user") {
                option = arr[0];
                if (arr[1] == "l0" || arr[1] == "l1" || arr[1] == "l2") {
                    lang = language[arr[1]];
                } else {
                    result = arr[1];
                }
            } else {
                lang = language[arr[0]];
                result = arr[1];
            }
        }

        $('#history').css("display", "none");
        $('#now').css('display', 'none');
    } else {
        status = 0;
    }
    var data = {
        key: key,
        page: page,
        option: option,
        perpage: perpage,
        result: result,
        lang: lang,
        status: status,
        start_time: time
    };
    var dataToSend = JSON.stringify(data);//从一个对象解析出字符串 
    $.ajax({
        url: "/solution/rejudge_solution",
        type: "post",
        data: dataToSend,
        beforeSend: function(request) {
            request.setRequestHeader("X-Xsrftoken", $.cookie("_xsrf"));
        },
        success: function (arg) {
            var obj = jQuery.parseJSON(arg);
            if (document.getElementById('tbody')) {
                $('#tbody').remove();
            }
            $('#table').append('<tbody id="tbody" ></tbody>');
            solu_num = parseInt(obj[0]);
            if (solu_num == 0) {
                tr='<tr><td style="color:red">没有符合查询条件的状态</td></tr>';
                $('#tbody').append(tr);
                return;
            }
            for (var i = 1; i < obj.length; ++i) {
                td1 = '<td>' + obj[i].u_name + '</td>';
                td2 = '<td><input type="button" value="' + obj[i].u_realname + '" id=' + obj[i].u_name + '  style="border:0px;color:#08c" name="showInfo" data-dismiss="modal" aria-hidden="true"></td>';
                td3 = '<td>' + obj[i].p_id + '</td>'
                td4 = '<td>' + '<a href="/problem/submit?tw=' + obj[i].p_id + '">' + obj[i].p_title + '</a></td>';
                td5 = '<td><font color = "' + obj[i].orig_color + '">' + obj[i].orig_result + '</font></td>';
                td6 = '<td><font color = "' + obj[i].s_color + '">' + obj[i].s_result + '</font></td>';
                td7 = '<td>' + obj[i].orig_memory + '</td>';
                td8 = '<td>' + obj[i].s_memory + '</td>';
                td9 = '<td>' + obj[i].orig_time + '</td>';
                td10 = '<td>' + obj[i].s_time + '</td>';
                if (parseInt(u_level) == 1 || parseInt(u_level) == 2) {
                    td11 = '<td>' + '<a href="/sourcecode?gj=' + obj[i].s_id + '" target="_blank">' + obj[i].s_lang + '</a></td>'
                } else {
                    td11 = '<td>' + obj[i].s_lang + '</td>'
                }
                td12 = '<td>' + obj[i].orig_similarity_percentage + '</td>';
                td13 = '<td>' + obj[i].s_similarity_percentage + '</td>';
                td14 = '<td>' + obj[i].s_posttime + '</td>';
                td15 = '<td>' + obj[i].rejudge_time + '</td>';
                tr = '<tr>' + td1 + td2 + td3 + td4 + td5 + td6 + td7 + td8 + td9 + td10 + td11 + td12 + td13 + td14 + td15 +'</tr>';
                $('#tbody').append(tr);
            }
            Paging("solution_page", 'DoAjax', solu_num, page, perpage, "pagefoot");
            $("input[name='showInfo']").each(function () {
                var currentEle = $(this);
                currentEle.click(function () {
                    getvisitinfo(this.id);
                    update();
                });
            });
        },
        error: function () {//获取失败
            alert("failed");
        }
    });
}

function get_solution(page) {
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
    };
    var status = 0;//只要搜索条件数组不为空，表示需要搜索，即用status提示后台，这个是搜索请求
    var cid = $('#cid').val();
    var is_manage = $('#is_manage').val(); //管理标志，如为1则有重复率显示和重新评测按钮，如为0则无
    if (parseInt(cid) > 0) {
        status = 1;
        if (parseInt(is_manage) == 0) {
            option = "user_course"; //用户端查看课程/考试状态只显示用户自己的提交状态
        }
    }
    if (arr) {
        status = 1;
        if (arr.length == 1) {
            if (arr[0] == "pro" || arr[0] == "user") {
                option = arr[0];
            } else {
                if (arr[0] == "l0" || arr[0] == "l1" || arr[0] == "l2" || arr[0] == "l3") {
                    lang = language[arr[0]];
                } else {
                    result = arr[0];
                }
            }
        }
        else if (arr.length == 3) {
            option = arr[0];
            lang = language[arr[1]];
            result = arr[2];
        } else if (arr.length == 2) {
            if (arr[0] == "pro" || arr[0] == "user") {
                option = arr[0];
                if (arr[1] == "l0" || arr[1] == "l1" || arr[1] == "l2" || arr[1] == "l3") {
                    lang = language[arr[1]];
                } else {
                    result = arr[1];
                }
            } else {
                lang = language[arr[0]];
                result = arr[1];
            }
        }
    }
    // alert("option" + option);
    // alert("lang" + lang);
    // alert("result" + result);
    // console.log("uid:" +u_id);
    var data = {
        key: key,
        page: page,
        option: option,
        perpage: perpage,
        result: result,
        lang: lang,
        status: status,
        cid: cid
    };
    var dataToSend = JSON.stringify(data);//从一个对象解析出字符串 
    $.ajax({
        url: "/solution/search",
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
            if (obj.length <= 1)
            {
                if (page > 1) {
                    var func = eval(get_solution);
                    new func(page - 1);
                }
                var tr='<tr><td style="color:red">没有符合查询条件的状态</td></tr>';
                $('#tbody').append(tr);
                $('#pagefoot').html('');
                return;
            }
            if (parseInt(is_manage) == 1 && parseInt(obj[0].authorized) == 0) {
                var tr = '<tr><td style="color:red;">您没有管理权限</td></tr>';
                $('#tbody').append(tr);
                $('#pagefoot').html('');
                return;
            }
            for (var i = 1; i < obj.length; i++) {
                //点击竞赛用户姓名不显示弹窗；竞赛不显示题号
                //对非超级管理员或课程组教师过滤u_id为1的用户的提交
                if (parseInt(obj[i].u_id) == 1 && !(parseInt(u_level) == 1 || parseInt(u_level) == 2))
                {
                    //练习和课程/考试显示为张少华，竞赛显示为管理员用户
                    if (parseInt(cid) >= 0) {
                        var td1 = '<td>20131344022</td>';
                        var td2 = '<td><input type="button" value="张少华" id="20131344022" class="showInfo" name="showInfo" data-dismiss="modal" aria-hidden="true"></td>';
                        var td3 = '<td>1001</td>';
                    } else {
                        var td1 = '<td>admin</td>';
                        var td2 = '<td>管理员用户</td>';
                        var td3 = '';
                    }
                    var td4 = '<td>' + '<a href="/problem/submit?tw=1001">a+b的问题</a></td>';
                    var td5 = '<td style="color:' + obj[i].color + ';">' + obj[i].status + '</td>';
                    var td6 = '<td>' + obj[i].memory + '</td>';
                    var td7 = '<td>' + obj[i].time + '</td>';
                    var td8 = '<td>' + obj[i].lang + '</td>';
                    var td9 = '<td>' + obj[i].post_time + '</td>';
                    var tr = '<tr>' + td1 + td2 + td3 + td4 + td5 + td6 + td7 + td8 + td9 + '</tr>';
                    $('#tbody').append(tr);
                    continue;
                }
                var td1 = '<td>' + obj[i].u_name + '</td>';
                if (parseInt(cid) == 0) {
                    var td2 = '<td><input type="button" value="' + obj[i].u_realname + '" id=' + obj[i].u_name + ' class="showInfo" name="showInfo" data-dismiss="modal" aria-hidden="true"></td>';
                    var td3 = '<td>' + obj[i].p_id + '</td>';
                    var td4 = '<td>' + '<a href="/problem/submit?tw=' + obj[i].p_id + '">' + obj[i].p_title + '</a></td>';
                } else {
                    var td2 = '<td>' + obj[i].u_realname + '</td>';
                    if (parseInt(cid) > 0) {
                        var td3 = '<td>' + obj[i].p_id + '</td>';
                    } else {
                        var td3 = '';
                    }
                    //课程/考试和竞赛带上cid
                    var td4 = '<td>' + '<a href="/problem/submit?tw=' + obj[i].p_id + '&ck=' + cid + '">' + obj[i].p_title + '</a></td>';
                }
                //Compile Error时若此条为用户自己的提交或登录身份是教师则带上CE信息的链接
                if ((parseInt(u_id) == obj[i].u_id || obj[0].authorized == 1) && obj[i].status == "Compile Error") {
                    //竞赛模式要多加一个参数
                    if (parseInt(cid) < 0) {
                        var td5 = '<td><a target="_blank" href="/ceinfo?gj=' + obj[i].s_id + '&lx=' + (-parseInt(cid)) + '" style="color:' + obj[i].color + ';">' + obj[i].status + '</a></td>';
                    } else {
                        var td5 = '<td><a target="_blank" href="/ceinfo?gj=' + obj[i].s_id + '" style="color:' + obj[i].color + ';">' + obj[i].status + '</a></td>';
                    }
                } else {
                    var td5 = '<td style="color:' + obj[i].color + ';">' + obj[i].status + '</td>';
                }
                var td6 = '<td>' + obj[i].memory + '</td>';
                var td7 = '<td>' + obj[i].time + '</td>';
                //登录身份为超级管理员或课程组教师则带上源代码链接
                if (obj[0].authorized == 1) {
                    //竞赛模式要多加一个参数
                    if (parseInt(cid) < 0) {
                        var td8 = '<td>' + '<a target="_blank" href="/sourcecode?gj=' + obj[i].s_id + '&lx=' + (-parseInt(cid)) + '">' + obj[i].lang + '</td>';
                    } else {
                        var td8 = '<td>' + '<a target="_blank" href="/sourcecode?gj=' + obj[i].s_id + '">' + obj[i].lang  + '</td>';
                    }
                } else {
                    var td8 = '<td>' + obj[i].lang + '</td>';
                }
                var td9 = '<td>' + obj[i].post_time + '</td>';
                var td10 = '';
                var td11 = '';
                //管理标志设置为1时显示重复率和重新评测按钮
                if (parseInt(is_manage) == 1) {
                    var td10 = '<td>' + obj[i].sim_percent + '</td>';
                    var td11 = '<td id="rejudge_pos_' + obj[i].s_id + '"><button class="btn btn-sm btn-info" type="button" onclick="rejudge(' + obj[i].s_id + ');">重新评测</button></td>';
                }
                var tr = '<tr>' + td1 + td2 + td3 + td4 + td5 + td6 + td7 + td8 + td9 + td10 + td11 + '</tr>';
                $('#tbody').append(tr);
            }

            var solu_num = parseInt(obj[0].solu_num);
            Paging("solution_page_" + cid + "_" + is_manage, 'get_solution', solu_num, page, perpage, "pagefoot");
            //练习状态下点击姓名显示个人信息弹窗
            if (parseInt(cid) == 0) {
                $("input[name='showInfo']").each(function () {
                    var currentEle = $(this);
                    currentEle.click(function () {
                        getvisitinfo(this.id);
                        update();
                    });
                });
            }
        },
        error: function () {//获取失败
            alert("刷新太快啦！请稍后再试");
        }
    });
}

function rejudge(s_id) {
    var r = confirm("确定要重新评测这条记录吗？");
    if (r == true) {
        var cid = $('#cid').val();
        var ct_id = 0;
        if (parseInt(cid) < 0) {
            ct_id = -parseInt(cid);
        }
        var data = {
            ct_id: ct_id,
            s_id: s_id
        };
        $.ajax({
            url: "/solution/rejudge",
            type: "POST",
            data: JSON.stringify(data),
            beforeSend: function(request) {
                request.setRequestHeader("X-Xsrftoken", $.cookie("_xsrf"));
            },
            success: function(arg) {
                $('#rejudge_pos_' + s_id).html('<span style="color:limegreen;">' + arg + '</span>');
            },
            error: function() {
                $('#rejudge_pos_' + s_id).html('<span style="color:red;">重新评测请求发送失败</span>');
            }
        });
    }
}


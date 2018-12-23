
function Add_Course() {

    console.log("add");


    console.log($('#c_name').val());
    console.log($('#c_teacher').val());
    console.log($('#reservationtime').val());

    var title = $('#c_name').val();
    var teacher = $('#c_teacher').val()
    if (title.length == 0 || teacher.length == 0) {
        alert("输入不能为空！");
        return;
    }
    var start = $("input[name='daterangepicker_start']").val() + ":00";
    var end = $("input[name='daterangepicker_end']").val() + ":00";
    if (start > end) {
        alert("时间设置不合理！");
        return;
    }
    var type = $("input[name='c_type']:checked").val();
    var is_restrict_ip = $("input[name='c_is_restrict_ip']:checked").val();
    var is_separate_pwd = $("input[name='c_is_separate_pwd']:checked").val();
    console.log(title, teacher, start, end, type);
    var data = {
        title: title,
        teacher: teacher,
        start: start,
        end: end,
        type: type,
        is_restrict_ip: is_restrict_ip,
        is_separate_pwd: is_separate_pwd
    };
    var dataToSend = JSON.stringify(data);
    $.ajax({
        url: "/course/add",//对应handler的方法
        type: "POST",//Post方法
        data: dataToSend,//要往服务器传递的数据
        beforeSend: function(request) {
            request.setRequestHeader("X-Xsrftoken", $.cookie("_xsrf"));
        },
        success: function () {
            alert("添加成功！");
            window.location.href = "/course/manage?kclx=" + type;
            //console.log("成功！")
        },
        error: function () {//获取失败
            alert("failed");
            // console.log("!!!!!!!!!!!");
        }
    });
}

function get_course(page) {


    var perpage = 10;

    var data = {
        page: page,
        perpage: 10,
        type: type
    };
    dataToSend = JSON.stringify(data);
    $.ajax(
        {
            url: "/course/manage",
            type: "POST",
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
                if (obj.length == 0) {
                    if (page > 1) {
                        var func = eval(get_course);
                        new func(page - 1);
                    }
                    var tr = '<tr><td style="color:red">没有查询到课程/考试</td></tr>';
                    $('#tbody').append(tr);
                    $('#pagefoot').html('');
                    return;
                }
                for (var i = 0; i < obj.length; i++) {
                    td1 = '<td>' + obj[i].num + '</td>';
                    td2 = '<td> <a href="/course/problem/manage?kcbs=' + obj[i].id + '">' + obj[i].name + '</td>'
                    td3 = '<td>' + obj[i].teacher + '</td>';
                    td4 = '<td>' + obj[i].start_time + '</td>';
                    td5 = '<td>' + obj[i].end_time + '</td>';
                    if(u_level==1||u_level==2)
                        td6 = '<td><a name="edit" id=' + obj[i].id + '  href="javascript:void(0);" ><span class = "glyphicon glyphicon-pencil"></span></a></td>'
                    else
                        td6 = '';
                    tr = '<tr>' + td1 + td2 + td3 + td4 + td5 + td6 + '</tr>';
                    $('#tbody').append(tr);
                }
                course_num = parseInt(obj[0].course_num);
                // console.log(course_num)
                Paging("course_manage_page", 'get_course', course_num, page, perpage, "pagefoot");
                $("a[name='edit']").each(function () {
                    var currentEle = $(this);
                    currentEle.click(function () {
                        getcourseinfo(this.id);
                        Modal1.show();
                        Modal1.setHeight("300px");
                        Modal1.setWidth("500px");



                    });
                });
            },
            error: function () {
                alert("failed");
            }
        }
    );
}

function getcourseinfo(id) {

    // console.log(id);
    var data = {
        id: id
    }
    var dataToSend = JSON.stringify(data);
    $.ajax(
        {
            url: "/getcourseinfo",
            type: "POST",
            async: false,
            data: dataToSend,
            beforeSend: function(request) {
                request.setRequestHeader("X-Xsrftoken", $.cookie("_xsrf"));
            },
            success: function (arg) {
                var course = jQuery.parseJSON(arg);
                $('#c_name').val(course.name);
                $('#c_teacher').val(course.teacher);
                $('#reservationtime').val((course.start_time).substring(0, 16) + " - " + (course.end_time).substring(0, 16));
                $('input[name="c_type"][value="' + course.type + '"]').attr("checked", 'true');
                $('input[name="c_is_restrict_ip"][value="' + course.is_restrict_ip + '"]').attr("checked", 'true');
                $('input[name="c_is_separate_pwd"][value="' + course.is_separate_pwd + '"]').attr("checked", 'true');
                $('#reservationtime').daterangepicker({
                    timePicker: true,
                    timePickerIncrement: 1,
                    timePicker12Hour: false,
                    format: "YYYY-MM-DD HH:mm"
                }, function (start, end, label) {
                    console.log(start.toISOString(), end.toISOString(), label);
                });
                $('#sure').attr("onclick", 'Course_edit(' + id + ');');

            },
            error: function () {
                alert("failed");
            }

        }
    );
}

function Course_edit(id) {
    var title = $('#c_name').val();
    var teacher = $('#c_teacher').val()
    if (title.length == 0 || teacher.length == 0) {
        alert("输入不能为空！");
        return;
    }
    var start = $("input[name='daterangepicker_start']").val() + ":00";
    var end = $("input[name='daterangepicker_end']").val() + ":00";
    if (start > end) {
        alert("时间设置不合理！");
        return;
    }
    var type = $("input[name='c_type']:checked").val();
    var is_restrict_ip = $("input[name='c_is_restrict_ip']:checked").val();
    var is_separate_pwd = $("input[name='c_is_separate_pwd']:checked").val();
    console.log(title, teacher, start, end, type);
    var data = {
        id: id,
        title: title,
        teacher: teacher,
        start: start,
        end: end,
        type: type,
        is_restrict_ip: is_restrict_ip,
        is_separate_pwd: is_separate_pwd
    };
    var dataToSend = JSON.stringify(data);
    $.ajax({
        url: "/course/edit",//对应handler的方法
        type: "POST",//Post方法
        data: dataToSend,//要往服务器传递的数据
        beforeSend: function(request) {
            request.setRequestHeader("X-Xsrftoken", $.cookie("_xsrf"));
        },
        success: function () {
            alert("编辑成功！");
            window.location.href = "/course/manage?kclx=" + type;
            //console.log("成功！")
        },
        error: function () {//获取失败
            alert("failed");
            // console.log("!!!!!!!!!!!");
        }
    });

}

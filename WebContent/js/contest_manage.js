$(document).ready(function () {
    InitModal1();
    $('#add_contest').click(function () {
        Modal1.show();
        Modal1.setHeight("250px");
        Modal1.setWidth("500px");
        var myDate = new Date();
        if (parseInt(myDate.getMonth()) + 1 < 10) {
            month = '0' + (myDate.getMonth() + 1);
        }
        else {
            month = myDate.getMonth() + 1;
        }
        if (parseInt(myDate.getDate()) < 10) {
            date = '0' + myDate.getDate();
        }
        else {
            date = myDate.getDate();
        }
        var str = myDate.getFullYear() + "-" + month + "-" + date + " " + myDate.getHours() + ":" + myDate.getMinutes();

        $('#reservationtime').val(str + " - " + str);
        $('#reservationtime').daterangepicker({
            timePicker: true,
            timePickerIncrement: 1,
            timePicker12Hour: false,
            format: "YYYY-MM-DD HH:mm"
        }, function (start, end, label) {
            console.log(start.toISOString(), end.toISOString(), label);
        });
        $('#ct_name').val("");
        $('#ct_description').val("");
        $('#ct_lockrankbefore').val("60");
        $('input[name="ct_type"][value="0"]').attr("checked", true);
        $('#sure').attr("onclick", "Add_Contest();");
    });


});
function Add_Contest() {
    var name = $("#ct_name").val();
    if (name.length == 0) {
        alert("标题不得为空！");
    } else {
        var name = $('#ct_name').val();
        var des = $('#ct_description').val();
        var lockrankbefore = $('#ct_lockrankbefore').val() * 60;
        var time = $('#reservationtime').val();
        var type = $("input[name='ct_type']:checked").val();
        var data = { 
                "name": name,
                "des": des,
                "time": time,
                "lockrankbefore": lockrankbefore,
                "type": type
        };
        var dataToSend = JSON.stringify(data);//从一个对象解析出字符串 
        $.ajax({
            url: "/contest/add",
            type: "POST",//Post方法
            data: dataToSend,
            beforeSend: function(request) {
                request.setRequestHeader("X-Xsrftoken", $.cookie("_xsrf"));
            },
            success: function () {
                alert("添加成功！");
                window.location = "/contest/manage";
            },
            error: function () {
                alert("failed");
            }
        });
    }
}

function edit_click(id) {
    getcontestinfo(id);
    Modal1.show();
    Modal1.setHeight("300px");
    Modal1.setWidth("500px");


}

function getcontestinfo(id) {
    var data = {
        id:id
    };
    var dataToSend = JSON.stringify(data);
    $.ajax(
        {
            url: "/getcontestinfo",
            type: "POST",
            async: false,
            data: dataToSend,
            beforeSend: function(request) {
                request.setRequestHeader("X-Xsrftoken", $.cookie("_xsrf"));
            },
            success: function (arg) {
                var contest = jQuery.parseJSON(arg);
                $('#ct_name').val(contest.name);
                $('#ct_description').val(contest.description);
                $('#reservationtime').val((contest.start_time).substring(0, 16) + " - " + (contest.end_time).substring(0, 16));
                $('#reservationtime').daterangepicker({
                    timePicker: true,
                    timePickerIncrement: 1,
                    timePicker12Hour: false,
                    format: "YYYY-MM-DD HH:mm"
                }, function (start, end, label) {
                    //console.log(start.toISOString(), end.toISOString(), label);
                });
                $('#ct_lockrankbefore').val(contest.ct_lockrankbefore/60);
                $('input[name="ct_type"][value="' + contest.ct_type + '"]').attr("checked", true);
                $('#sure').attr("onclick", 'contest_edit(' + id + ');');

            },
            error: function () {
                alert("failed");
            }

        }
    );
}

function contest_edit(id) {
    var title = $('#ct_name').val();
    var description = $('#ct_description').val();
    var type = $("input[name='ct_type']:checked").val();
    if (title.length == 0) {
        alert("输入不能为空！");
        return;
    }
    var start = $("input[name='daterangepicker_start']").val() + ":00";
    var end = $("input[name='daterangepicker_end']").val() + ":00";
    if (start > end) {
        alert("时间设置不合理！");
        return;
    }
    var lockrankbefore = $("input[name='ct_lockrankbefore']").val();
    if (lockrankbefore < 0) {
        alert("时间设置不合理！");
        return;
    }
    var data = {
        id: id,
        title: title,
        start: start,
        end: end,
        lockrankbefore: lockrankbefore*60,
        description:description,
        type: type
    };
    var dataToSend = JSON.stringify(data);
    $.ajax({
        url: "/contest/edit",//对应handler的方法
        type: "POST",//Post方法
        data: dataToSend,//要往服务器传递的数据
        beforeSend: function(request) {
            request.setRequestHeader("X-Xsrftoken", $.cookie("_xsrf"));
        },
        success: function () {
            alert("编辑成功！");
            window.location.href = "/contest/manage";
        },
        error: function () {//获取失败
            alert("failed");
            // console.log("!!!!!!!!!!!");
        }
    });

}

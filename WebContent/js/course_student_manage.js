function get_course_student_manage(page) {
    var perpage = 20;
    var data = {
        page: page,
        perpage: perpage,
        id: cid,
        key: $('#key').val()
    };
    dataToSend = JSON.stringify(data);
    $.ajax(
        {
            url: "/course/student/manage",
            type: "POST",
            data: dataToSend,
            beforeSend: function(request) {
                request.setRequestHeader("X-Xsrftoken", $.cookie("_xsrf"));
            },
            success: function (arg) {
                var obj = jQuery.parseJSON(arg);
                //console.log(obj);
                if (document.getElementById('tbody')) {
                    $('#tbody').remove();
                }
                $('#table').append('<tbody id="tbody" ></tbody>');
                if (obj.length <= 1) {
                    if (page > 1) {
                        var func = eval(get_course_student_manage);
                        new func(page - 1);
                    }
                    $('#tbody').append('<tr><td style="color:red">没有符合查询条件的学生</td></tr>');
                    $('#pagefoot').html('');
                    return;
                }
                for (var i = 1; i < obj.length; i++) {
                    td1 = '<td>' + obj[i].number + '</td>';
                    td2 = '<td>' + obj[i].name + '</td>';
                    td3 = '<td>' + obj[i].accept_num + '</td>';
                    td4 = '<td>' + obj[i].submit_num + '</td>';
                    td5 = '<td>' + obj[i].accept_rate + '</td>';
                    td6 = '<td>' + obj[i].grade + '</td>';
                    td7 = '<td>' + obj[i].organization + '</td>';
                    td8 = '<td>' + obj[i].major+ '</td>';
                    td9 = '<td>' + obj[i].ip + '&nbsp;<a id="' + obj[i].id + '" class="glyphicon glyphicon-refresh" onclick="clearip(this.id);" href="javascript:void(0);"></a></td>';
                    if(u_level==1||u_level==2){
                        if (obj[i].block == 0) {
                            td10 = '<td><a id="'+obj[i].id+'" class="glyphicon glyphicon-lock" style="margin-left:10px" onclick="block(this.id)" href="javascript:void(0);"></a>&nbsp;&nbsp&nbsp&nbsp<a id="'+obj[i].id+'" class="glyphicon glyphicon-trash" onclick="del(this.id)" href="javascript:void(0);"></a></td>';
                        } else {
                            td10 = '<td><a id="'+obj[i].id+'" class="glyphicon glyphicon-repeat" stype="margin-left:10px" onclick="unblock(this.id)" href="javascript:void(0);"></a>&nbsp;&nbsp&nbsp&nbsp<a id="'+obj[i].id+'" class="glyphicon glyphicon-trash" onclick="del(this.id)" href="javascript:void(0);"></a></td>';
                        }
                    }else{
                        if (obj[i].block == 0) {
                            td10 = '<td><a id="'+obj[i].id+'" class="glyphicon glyphicon-lock" style="margin-left:10px" onclick="block(this.id)" href="javascript:void(0);"></a></td>';
                        } else {
                            td10 = '<td><a id="'+obj[i].id+'" class="glyphicon glyphicon-repeat" stype="margin-left:10px" onclick="unblock(this.id)" href="javascript:void(0);"></a></td>';
                        }

                    }

                    tr = '<tr>' + td1 + td2 + td3 + td4 + td5 + td6 + td7 + td8 + td9 + td10 + '</tr>';
                    $('#tbody').append(tr);
                }
                student_num = parseInt(obj[0]);
                // console.log(student_num)
                Paging("course_student_manage_page_" + cid, 'get_course_student_manage', student_num, page, perpage, "pagefoot");

            },
            error: function () {
                alert("failed");
            }
        }
    );
}

function get_course_problem(page) {
    
    
        var perpage = 20;
    
        var data = {
            page: page,
            perpage: perpage,
            id: id
        };
        dataToSend = JSON.stringify(data);
        $.ajax(
            {
                url: "/course/problem",
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
                            var func = eval(get_course_problem);
                            new func(page - 1);
                        }
                        $('#tbody').append('<tr><td style="color:red">没有符合查询条件的题目</td></tr>');
                        $('#pagefoot').html('');
                        return;
                    }
                    for (var i = 1; i < obj.length; i++) {
                        td1 = '<td>' + ((page-1)*perpage+i) + '</td>';
                        td2 = '<td>' + obj[i].id + '</td>';
                        td3 = '<td><a href="/problem/submit?tw='+obj[i].id+'&ck='+id+'">' + obj[i].title+ '</a></td>';
                        td4 = '<td style="color:'+obj[i].color+';">' + obj[i].status + '</td>';
                        tr = '<tr>' + td1 + td2 + td3 + td4 + '</tr>';
                        $('#tbody').append(tr);
                    }
                    problem_num = parseInt(obj[0]);
                    // console.log(problem_num)
                    Paging("course_problem_page_" + id, 'get_course_problem', problem_num, page, perpage, "pagefoot");
    
                },
                error: function () {
                    alert("failed");
                }
            }
        );
    }

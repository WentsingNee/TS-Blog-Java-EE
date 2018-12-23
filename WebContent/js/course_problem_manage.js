function get_course_problem_manage(page) {
    var perpage = 20;
    var data = {
        page: page,
        perpage: perpage,
        id: cid
    };
    dataToSend = JSON.stringify(data);
    $.ajax(
        {
            url: "/course/problem/manage",
            type: "POST",
            data: dataToSend,
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
                    td1 = '<td>' + obj[i].id + '</td>';
                    td2 = '<td><a href="/problem/submit?tw='+obj[i].id+'&ck='+cid+'">' + obj[i].title + '</a></td>';
                    td3 = '<td ><a id='+obj[i].id+' class="glyphicon glyphicon-trash" onclick="del(this.id)" href="javascript:void(0);"></a></td>';
                    tr = '<tr>' + td1 + td2 + td3 + '</tr>';
                    $('#tbody').append(tr);
                }
                problem_num = parseInt(obj[0].problem_num);
                // console.log(problem_num)
                Paging("course_problem_manage_page", 'get_course_problem_manage', problem_num, page, perpage, "pagefoot");

            },
            error: function () {
                alert("failed");
            }
        }
    );
}
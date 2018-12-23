function getusercourse(page) {

    var perpage = 10;

    var data = {
        page: page,
        perpage: 10,
        type: type
    };
    dataToSend = JSON.stringify(data);
    $.ajax(
        {
            url: "/course",
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
                if (obj.length==0)
                {
                    switch(type){
                        case 0:
                            tr = '<tr>' + '<td style = "color:red ">' + '当前没有加入任何课程' + '</td>' + '</tr>';
                            break;
                        case 1:
                            tr = '<tr>' + '<td style = "color:red ">' + '当前没有加入任何考试' + '</td>' + '</tr>';
                            break;
                        default:
                            tr = '<tr>' + '<td style = "color:red ">' + '无记录' + '</td>' + '</tr>';
                    }
                    $('#tbody').append(tr);
                    course_num = 0; 
                }
                else{
                    for (var i = 0; i < obj.length; i++) {
                        td1 = '<td>' + obj[i].num + '</td>';
                        if (parseInt(obj[i].select) == 1) {
                            td2 = '<td> <a href="/course/problem?kcbs=' + obj[i].id + '">' + obj[i].name + '</td>'
                        }
                        else {
                            td2 = '<td> <a href="#" style="color:#999;">' + obj[i].name + '</td>'
                        }
                        td3 = '<td>' + obj[i].teacher+ '</td>';
                        td4 = '<td>' + obj[i].status + '</td>';
                        td5 = '<td>' + obj[i].start_time + '</td>';
                        td6 = '<td>' + obj[i].end_time + '</td>';

                        tr = '<tr>' + td1 + td2 + td3 + td4 + td5 + td6 + '</tr>';
                        $('#tbody').append(tr);
                    }
                    course_num = parseInt(obj[0].course_num);
                }
                // console.log(course_num)
                Paging("course_page", 'getusercourse', course_num, page, perpage, "pagefoot");

            },
            error: function () {
                alert("failed");
            }
        }
    );
}

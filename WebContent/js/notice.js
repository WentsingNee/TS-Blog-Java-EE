function get_notice(page) {
    var perpage = 4;
    var data = {
        page: page,
        perpage: perpage
    }
    var dataTosend = JSON.stringify(data);
    $.ajax(
        {
            url: "/notice",
            type: "POST",
            data: dataTosend,
            beforeSend: function(request) {
                request.setRequestHeader("X-Xsrftoken", $.cookie("_xsrf"));
            },
            success: function (arg) {
                var obj = jQuery.parseJSON(arg);
                console.log(obj);
                if (document.getElementById('notice_body')) {
                    $('#notice_body').remove();
                }
                $('#notice').append('<div id="notice_body" ></div>');
                for (var i = 0; i < obj.length; i++) {
                    if (parseInt(obj[i].num) % 2 == 0) {
                        notice_part1 = '<img src="../../static/images/remind_fill.png" class="img_icon">';

                    }
                    else {
                        notice_part1 = '<img src="../../static/images/remind.png" class="img_icon">';
                    }
                    notice_part2 = '<div class="notice_title">'+notice_part1+'<h3 class="tit">'+obj[i].title+'</h3></div>';
                    notice_part3 = '<p class="notice_content">'+obj[i].content+'</p>';
                    notice_part4 = '<div class="sourceAndTime"><p>'+obj[i].source+'</p><code>'+obj[i].time+'</code></div>'
                    var notice = notice_part2 + notice_part3 + notice_part4;
                    $('#notice_body').append('<div class="each_one" >'+notice+'</div>');
                }

                var notice_num = parseInt(obj[0].notice_num);
                // console.log(notice_num)
                Paging("notice_page", 'get_notice', notice_num, page, perpage, "pagefoot");
            },
            error: function () {
                alert("failed");
            }
        }
    );

}

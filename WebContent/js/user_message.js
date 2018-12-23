function get_message(page) {
    var perpage = $('#perpage').val();
    var data = {
        page: page,
        perpage: perpage
    };
    var dataToSend = JSON.stringify(data);
    $.ajax(
        {
            url: "/message/manage",
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
                if (obj.length == 0) {
                    $("#tbody").append("<tr><td>暂无留言</td></tr>");
                    return;
                }
                for (var i = 0; i < obj.length; i++) {
                    td1 = '<td>' + obj[i].name + '</td>';
                    td2 = '<td style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">' + obj[i].content + '</td>';

                    status = parseInt(obj[i].status);

                    if((status & 1) == 0){
                        _hint = "未读";
                        _status = "warning";
                    }
                    else if((status & 4) != 0){
                        _hint="已关闭";
                        _status="default";
                    }
                    else if((status & 2) != 0){
                        _hint = "已回复";
                        _status = "success";
                    }
                    else if((status & 1) != 0){
                        _hint = "已读";
                        _status = "primary";
                    }


                    td3 = '<td><span class="label label-'+_status+'">'+_hint+"</span> " + obj[i].posttime +  '</td>';

                    if(u_id == obj[i].receiverid) type="msg_rcv";
                    else if(u_id == obj[i].uid) type="msg_send";

                    if(u_id!=obj[i].uid && ((parseInt(obj[i].status)&6)==0)){

                        td4 = '<td><button class="btn btn-sm btn-success" onclick="replyto('+obj[i].mid+');">回复</button></td>';
                        tr = '<tr name="message" class="' + type + '" id="' + obj[i].mid + '" style="color:black">'+ td1 + td2 + td3 + td4 + '</tr>';
                    }else{
                        td4 = '<td><button class="btn btn-sm btn-info" onclick="display('+obj[i].mid+');">查看</button></td>';
                        tr = '<tr name="message" class="'+ type +'" id="' + obj[i].mid + '" style="color:#aaa">'+ td1 + td2 + td3 + td4+ '</tr>';
                    }

                    $('#tbody').append(tr);
                }
                message_num = parseInt(obj[0].message_num);
                Paging("message_page", 'get_message', message_num, page, perpage, "pagefoot");

            },
            error: function () {
                alert("failed");

            }
        }
    );
}

function get_message_sent(page) {
    var perpage = $('#perpage').val();
    var data = {
        page: page,
        perpage: perpage
    };
    var dataToSend = JSON.stringify(data);
    $.ajax(
        {
            url: "/message/sent",
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
                if (obj.length == 0) {
                    $("#tbody").append("<tr><td>暂无留言</td></tr>");
                    return;
                }
                for (var i = 0; i < obj.length; i++) {
                    td1 = '<td>' + obj[i].receivername + '</td>';
                    td2 = '<td style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">' + obj[i].content + '</td>';

                    status = parseInt(obj[i].status);

                    if((status & 1) == 0){
                        _hint = "未读";
                        _status = "warning";
                    }
                    else if((status & 4) != 0){
                        _hint="已关闭";
                        _status="default";
                    }
                    else if((status & 2) != 0){
                        _hint = "已回复";
                        _status = "success";
                    }
                    else if((status & 1) != 0){
                        _hint = "已读";
                        _status = "primary";
                    }


                    td3 = '<td><span class="label label-'+_status+'">'+_hint+"</span> " + obj[i].posttime +  '</td>';

                    if(u_id == obj[i].receiverid) type="msg_rcv";
                    else if(u_id == obj[i].uid) type="msg_send";

                    td4 = '<td><button class="btn btn-sm btn-info" onclick="display('+obj[i].mid+');">查看</button></td>';
                    tr = '<tr name="message" class="'+ type +'" id="' + obj[i].mid + '" style="color:#aaa">'+ td1 + td2 + td3 + td4 + '</tr>';

                    $('#tbody').append(tr);
                }
                message_num = parseInt(obj[0].message_num);
                Paging("message_page", 'get_message', message_num, page, perpage, "pagefoot");

            },
            error: function () {
                alert("failed");

            }
        }
    );
}

function change_status(id) {
    console.log(id);
    var data = {
        id: id
    };
    var dataToSend = JSON.stringify(data);
    $.ajax(
        {
            url: "/message/status",
            type: "POST",
            data: dataToSend,
            beforeSend: function(request) {
                request.setRequestHeader("X-Xsrftoken", $.cookie("_xsrf"));
            },
            success: function (number) {
                console.log(number);
                $('#' + id).css("color", "#aaa");
                if (number == 0) {
                    $('#message_number').css("display", "none");
                }
                else {
                    $('#message_number').html(parseInt(number));
                    $('#message_number').css("display", "inline-block");
                }

            },
            error: function () {
                alert("failed");
            }
        }
    );
}

function change_all(value)
{
    var data = {
        value:value
    };
    var dataToSend = JSON.stringify(data);
    $.ajax(
        {
            url: "/message/changeall",
            type: "POST",
            data: dataToSend,
            beforeSend: function(request) {
                request.setRequestHeader("X-Xsrftoken", $.cookie("_xsrf"));
            },
            success: function (number) {


                if (number == 0) {
                    $('#message_number').css("display", "none");
                    $('#message_number').html(parseInt(number));
                    $('.msg_rcv').css("color","#aaa");
                }
                else {
                    $('#message_number').html(parseInt(number));
                    $('#message_number').css("display", "inline-block");
                    $('.msg_rcv').css("color","black");
                }

            },
            error: function () {
                alert("failed");
            }
        }
    );
}

function replyto(mid){
    var readpn = 'panel-success';
    var unreadpn = 'panel-danger';
    var readlb = ' <span class="label label-success">Read</span>';
    var unreadlb = ' <span class="label label-warning">Unread</span>';
    $("#historymsg").html('');
    $("#msgcontent-reply").val('');
    var data = {
        'mid' : mid
    };
    var dataToSend = JSON.stringify(data);
    $.ajax(
        {
            url: "/message/detail",
            type: "POST",
            data: dataToSend,
            beforeSend: function(request) {
                request.setRequestHeader("X-Xsrftoken", $.cookie("_xsrf"));
            },
            success: function (arg) {

                var obj = jQuery.parseJSON(arg);
                console.log(obj);

                for (var i = 0; i < obj.length; i++) {
                    var status = parseInt(obj[i].status);
                    if((status&1)==0){
                        pn = unreadpn;
                        lb = unreadlb;
                    }else{
                        pn = readpn;
                        lb = readlb;
                    }
                    $('#historymsg').append('<div class="panel '+pn+'">'+
                        '<div class="panel-heading">'+obj[i].name+' 发送于'+obj[i].posttime+lb+'</div>'+
                        '<div class="panel-body" style="word-wrap:break-word">'+
                        obj[i].content+
                        '</div></div>');
                    if(obj[i].receiverid==u_id&&((status&1)==0))
                        change_status(mid);
                }
            },
            error: function () {
                alert("failed");
            }
        }
    );
    $('#replymid').val(mid);
    $('#replyModal').modal('toggle');
}

function display(mid){
    var readpn = 'panel-success';
    var unreadpn = 'panel-danger';
    var readlb = ' <span class="label label-success">Read</span>';
    var unreadlb = ' <span class="label label-warning">Unread</span>';
    $("#historymsg-disp").html('');
    var data = {
        'mid' : mid
    };
    var dataToSend = JSON.stringify(data);
    $.ajax(
        {
            url: "/message/detail",
            type: "POST",
            data: dataToSend,
            beforeSend: function(request) {
                request.setRequestHeader("X-Xsrftoken", $.cookie("_xsrf"));
            },
            success: function (arg) {

                var obj = jQuery.parseJSON(arg);
                console.log(obj);

                for (var i = 0; i < obj.length; i++) {
                    var status = parseInt(obj[i].status);
                    if((status&1)==0){
                        pn = unreadpn;
                        lb = unreadlb;
                    }else{
                        pn = readpn;
                        lb = readlb;
                    }
                    $('#historymsg-disp').append('<div class="panel '+pn+'">'+
                        '<div class="panel-heading">'+obj[i].name+' 发送于'+obj[i].posttime+lb+'</div>'+
                        '<div class="panel-body" style="word-wrap:break-word">'+
                        obj[i].content+
                        '</div></div>');
                    if(obj[i].receiverid==u_id&&((status&1)==0))
                        change_status(mid);
                }
            },
            error: function () {
                alert("failed");
            }
        }
    );
    $('#dispModal').modal('toggle');
}

function msgsend_single(){
    $('#ssingleModal').modal('toggle');
}

function msgsend_group(){
    $('#sgroupModal').modal('toggle');
}

function close_message(){
    var postfield = {
        mid : $("#replymid").val(),
    }
    postfield = JSON.stringify(postfield);
    $('#replyModal').modal('toggle');
    $.ajax(
        {
            url: "/message/close",
            type: "POST",
            data: postfield,
            beforeSend: function(request) {
                request.setRequestHeader("X-Xsrftoken", $.cookie("_xsrf"));
            },
            success: function (arg) {
                get_message(1);
            },
            error: function () {
                alert("failed");
            }
        }
    );
}

function dosend_reply(){
    var postfield = {
        mid : $("#replymid").val(),
        message: $("#msgcontent-reply").val()
    }
    postfield = JSON.stringify(postfield);
    $('#replyModal').modal('toggle');
    $.ajax(
        {
            url: "/message/reply",
            type: "POST",
            data: postfield,
            beforeSend: function(request) {
                request.setRequestHeader("X-Xsrftoken", $.cookie("_xsrf"));
            },
            success: function (arg) {
                get_message(1);
            },
            error: function () {
                alert("failed");
            }
        }
    );
}

function dosend_ss(){
    var pf = $('#uids').val().split('\n');
    var postfield = {
        uids:pf,
        message:$("#msgcontent-ss").val()
    }
    postfield = JSON.stringify(postfield);
    $.ajax(
        {
            url: "/message/ssingle",
            type: "POST",
            data: postfield,
            beforeSend: function(request) {
                request.setRequestHeader("X-Xsrftoken", $.cookie("_xsrf"));
            },
            success: function (arg) {
                get_message(1);
            },
            error: function () {
                alert("failed");
            }
        }
    );
    $('#ssingleModal').modal('toggle');
}

function dosend_sg(){
    $('#sgroupModal').modal('toggle');
}

$(function(){
    $('.msg_rcv').on('click',function(){
        replyto(this.id);
    });});


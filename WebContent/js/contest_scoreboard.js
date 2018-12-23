function sec_to_time(s) {
    var t;
    if(s < 0) {
        s = -s;
        t = "-";
    } else {
        t = "";
    }
    var hour = Math.floor(s/3600);
    var min = Math.floor(s/60) % 60;
    var sec = s % 60;
    if(hour < 10) {
        t += '0'+ hour + ":";
    } else {
        t += hour + ":";
    }

    if(min < 10) {
        t += "0";
    }
    t += min + ":";
    if(sec < 10) {
        t += "0";
    }
    t += sec;
    return t;
};
function get_scoreboard_json(ct_id) {
    var data = {
            ct_id: ct_id
    };
    dataToSend = JSON.stringify(data);
    $.ajax({
        url: "/contest/scoreboard/"+ct_id,
        type: "POST",
        data: dataToSend,
        beforeSend: function(request) {
            request.setRequestHeader("X-Xsrftoken", $.cookie("_xsrf"));
        },
        success: function (arg) {
            var obj = jQuery.parseJSON(arg);
            if (document.getElementById('tbody')) {
                $('#tbody').remove();
            }
            $('#table').append('<tbody id="tbody"></tbody>');
            if (obj.length == 0) {
                $('#tbody').append('<tr><td style="color:red">暂时还未发布榜单</td></tr>');
                $('#pagefoot').html('');
                return;
            }
            for (var i = 0; i < obj.length; i++) {
                var row = obj[i];
                rank = '<td class="score_cell">' + row[0] +'</td>';
                u_name = '<td class="score_cell">' + row[2] + '</td>';
                u_realname = '<td class="score_cell">' + row[3] + '</td>'; 
                solved = '<td class="score_cell">' + row[4] + '</td>';
                time = '<td class="score_cell">' + sec_to_time(row[5]) + '</td>';
                var problems = row[6];
                var problems_item = '';
                for(var j = 0; j < problems.length; ++j) {
                    var problem = problems[j];
                    if(problem[0] == 0) {
                        block_class = "score_correct";
                        first_row = sec_to_time(problem[2]);
                        if(problem[1] == 1) {
                            second_row = "1 try";
                        } else {
                            second_row = problem[1] + ' tries';
                        }
                    } else if(problem[0] == 1) {
                        if(problem[1] == 0) {
                            block_class = "";
                            first_row = '&nbsp;';
                            second_row = '&nbsp;';
                        } else {
                            block_class = "score_incorrect";
                            first_row = '--';
                            if(problem[1] == 1) {
                                second_row = "1 try";
                            } else {
                                second_row = problem[1] + ' tries';
                            }
                        }
                    } else if(problem[0] == 2) {
                        if(problem[1] == 0) {
                            block_class = "";
                            first_row = '&nbsp;';
                            second_row = '&nbsp;';
                        } else {
                            block_class = "score_pending";
                            first_row = '--';
                            if(problem[1] == 1) {
                                second_row = "1 try";
                            } else {
                                second_row = problem[1] + ' tries';
                            }
                        }
                    }
                    problems_item = problems_item + '<td class="score_cell"><div class="'+block_class+'">'+first_row+'<div>'+second_row+'</div></div></td>';
                }
                tr = '<tr>' + rank + u_name + u_realname + solved + time + problems_item+'</tr>';
                $('#tbody').append(tr);
            }
        },
        error: function () {
            alert("failed");
        }
    });
}

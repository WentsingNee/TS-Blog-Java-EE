function select_data(uid) {
    tim = $('#time').val();
    $.ajax({
        url: "/data/add",
        type: "post",
        async: false,
        data: { u_id: uid, time: tim },
        beforeSend: function(request) {
            request.setRequestHeader("X-Xsrftoken", $.cookie("_xsrf"));
        },
        success: function (arg) {
            //  console.log("-------------------");
            var obj = jQuery.parseJSON(arg);
            datas.push(obj);
            // console.log("ajax,users");
            // console.log(users);
            // console.log("ajax,datas");
            // console.log(datas);
        },
        error: function () {//获取失败
            alert("failed");
        }
    });
}
function drawselect(uid) {
    // console.log("编号：");
    // console.log(uid);
    // console.log("----------------------------");
    if (users.indexOf(uid) == -1) {
        //    console.log("数据");
        users.push(uid);
        select_data(uid);
        //    console.log(users);
        //    console.log(datas);
        //    console.log("----------------------------");


    }
    else {
        // console.log("索引");
        //        console.log($.inArray(uid,users));
        //        console.log("----------------------------");
        var start = $.inArray(uid, users);
        users.splice(start, 1);
        datas.splice(start, 1);
        //    console.log("数据");
        //    console.log(users);
        //    console.log(datas);
        //    console.log("----------------------------");


    }
    //    console.log("-------------------");
    //    console.log("users");
    //    console.log(users);
    // console.log("datas");
    // console.log(datas);
    drawimage();
}
function drawimage() {
    series_data = new Array();
    for (var i = 0; i < datas.length; i++) {
        series_data.push({ "name": datas[i][0], "data": datas[i].slice(1, datas[i].length) })
    }

    // console.log(series_data);
    var chart = new Highcharts.Chart('data_image', {
        title: {
            text: '用户提交次数趋势图',
            x: -20
        },
        subtitle: {
            text: 'Think Spirit',
            x: -20
        },
        xAxis: {
            categories: days
        },
        yAxis: {
            title: {
                text: '提交次数'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: series_data
    });
}
function set_thedays(time) {
    time =  parseInt(time);
    days.length = 0;
    
    today = new Date();
    today.setDate(today.getDate() - (time+1));
    // console.log(today.getDate());
    for (var i=1;i<=time;i++)
    {
        today.setDate(today.getDate() + 1);
        day = today;
        var y = 1900+day.getYear();
        var m = (day.getMonth() +1) < 10 ? "0" + (day.getMonth() +1) : (day.getMonth() +1);//获取当前月份的日期，不足10补0
        var d = day.getDate() < 10 ? "0" + day.getDate() : day.getDate(); //获取当前几号，不足10补0
        // console.log( y+"-"+m+"-"+d);
        days.push(y+"-"+m+"-"+d);
    }   
    // console.log(days);
}
function clear_table() {
    users.length = 0;
    datas.length = 0;
    // console.log(datas);
    drawimage();
}
function update_time(time) {
    // console.log("!!!!!!!!!!!!!!!!!!!!!!11");
    $('#time').val(time);
    set_thedays(time);
    datas.length=0;
    for (var i=0;i<users.length;i++)
    {
        select_data(users[i]);
    }
    // console.log(datas);
    drawimage();
    // console.log(series_data);

}
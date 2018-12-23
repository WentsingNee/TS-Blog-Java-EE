function Paging(page_name, function_name, count, page, perpage, pagefoot) {
    // console.log(page_name,function_name,count,page,perpage,pagefoot);

    Setcookie(page_name, page);

    page = parseInt(page);
    min_page = 1;
    if (count < perpage) {
        total_page = 1;
    } else {
        if (count % perpage == 0) {
            total_page = count / perpage;
        } else {
            total_page = parseInt(count / perpage) + 1;
        }
    }
    str = "";
    if (total_page > 1) {
        str += "<li style='cursor:pointer;' class='first'><a>首页</a></li>";
    }
    if (page > 1) {
        str += "<li style='cursor:pointer;' class='prev'><a>&laquo;</a></li>";
    }
    if (page == 1) {
        for (var i = page - 1; i < page + 5; i++) {
            if (i >= min_page && i <= total_page) {
                if (i == page) {
                    str += "<li style='cursor:pointer;' class='active' id='current' bs='" + i + "'><a>" + i + "</a></li>";
                } else {
                    str += "<li style='cursor:pointer;' class='list' bs='" + i + "'><a>" + i + "</a></li>";
                }
            }
        }
    } else if (page == 2) {
        for (var i = page - 1; i < page + 4; i++) {
            if (i >= min_page && i <= total_page) {
                if (i == page) {
                    str += "<li style='cursor:pointer;' class='active' id='current' bs='" + i + "'><a>" + i + "</a></li>";
                } else {
                    str += "<li style='cursor:pointer;' class='list' bs='" + i + "'><a>" + i + "</a></li>";
                }
            }
        }
    } else if (page == total_page) {
        for (var i = page - 4; i < page + 1; i++) {
            if (i >= min_page && i <= total_page) {
                if (i == page) {
                    str += "<li style='cursor:pointer;' class='active' id='current' bs='" + i + "'><a>" + i + "</a></li>";
                } else {
                    str += "<li style='cursor:pointer;' class='list' bs='" + i + "'><a>" + i + "</a></li>";
                }
            }
        }
    } else if (page == total_page - 1) {
        for (var i = page - 3; i < page + 2; i++) {
            if (i >= min_page && i <= total_page) {
                if (i == page) {
                    str += "<li style='cursor:pointer;' class='active' id='current' bs='" + i + "'><a>" + i + "</a></li>";
                } else {
                    str += "<li style='cursor:pointer;' class='list' bs='" + i + "'><a>" + i + "</a></li>";
                }
            }
        }
    } else {
        for (var i = page - 2; i < page + 3; i++) {
            if (i >= min_page && i <= total_page) {
                if (i == page) {
                    str += "<li style='cursor:pointer;' class='active' id='current' bs='" + i + "'><a>" + i + "</a></li>";
                } else {
                    str += "<li style='cursor:pointer;' class='list' bs='" + i + "'><a>" + i + "</a></li>";
                }
            }
        }
    }
    if (page < total_page) {
        str += "<li style='cursor:pointer;' class='next'><a>&raquo;</a></li>";
    }
    str += "<li style='cursor:pointer;' class='end'><a>尾页</a></li>";
    str += '<li id="function" name="' + function_name + '"><a>总共：' + total_page + '页</a></li>';
    // console.log(str);
    $("#"+pagefoot).html(str);

    var func = eval(function_name);
    
    $(".first").click(function() {
        page = 1;
        new func(page); //加载数据
    });
    $(".prev").click(function() {
        page = page - 1;
        if (page < 1) {
            page = 1;
        }
        new func(page); //加载数据
     });
    //给下一页加点击事件
    $(".next").click(function() {
        page = page + 1;
        if (page > total_page) {
            page = total_page;
        }
        new func(page);//加载数据
    });
    //给中间的列表加事件
    $(".list").click(function() {
        page = parseInt($(this).attr("bs"));
        new func(page); //加载数据
    });
    $(".end").click(function() {
        page = total_page;
        new func(page); //加载数据
    });
}

function addtag() {

    var tag = $('#newtag').val();
    if (tag == "") {
        alert("输入不能为空！");
        return;
    }
    if (tag.length > 16) {
        alert("输入字数超出限制,tag限制字数为16！");
        return;
    }
    //  console.log("----------"+tag);
    $.ajax({
        url: '/tag/add',
        type: 'POST',
        data: {tag:tag},
        beforeSend: function(request) {
            request.setRequestHeader("X-Xsrftoken", $.cookie("_xsrf"));
        },
        success: function(obj) {
            // console.log(obj);
            if (obj == "false") {
                alert("您输入的tag名称与原有tag名称重复，请重新输入！");
                $('#newtag').val("");
                $('#newtag').attr("placeholder","新的标签名称");
                return;
            }
            var div = document.createElement("div");
            div.style.display="inline-block";
            div.style.lineHeight="30px";
            var inp = document.createElement("input");
            inp.setAttribute("type","checkbox");
            inp.setAttribute("name","tag");
            inp.setAttribute("value",obj);
            var sp = document.createElement("span");
            sp.innerHTML = tag;
            div.appendChild(inp);
            div.appendChild(sp);
            var tagsdiv = document.getElementById("tagsdiv");
            tagsdiv.appendChild(div);
            var space=document.createTextNode(" ");
            tagsdiv.appendChild(space);
            sp.setAttribute("class","label label-default")
            $('#newtag').val("");
            $('#newtag').attr("placeholder","新的标签名称");
            closeDiv("tag_add");
        },
        error: function() {//获取失败
            alert("failed");
        }
    });
}

function set_u_info(u_info_name)
{
    $.cookie("userinfocard_flag","0");
    // console.log(u_info_name);
    var u_info_value = $("input[name="+u_info_name+"]").val();
    // console.log(u_info_value);
    if (u_info_value)//如果返回的有内容  
    {  
        $.ajax({
            url:"/info",//对应handler的方法
            type:"POST",//Post方法
            data:{column:u_info_name,column_value:u_info_value},//要往服务器传递的数据
            beforeSend: function(request) {
                request.setRequestHeader("X-Xsrftoken", $.cookie("_xsrf"));
            },
            success:function(){ 
                str='#'+u_info_name;
                $(str).html(u_info_value);
            },
            error:function(){//获取失败
                alert("failed");   
            }
        }); 
        name = "new_"+u_info_name;
        $("#modal1").modal("hide");
        $("#modal2").modal("hide");
        $("input[name="+u_info_name+"]").val("");
        
    } 
    else 
    {
        alert("您的输入为空");
    }

}

function check()
{
    var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
    var add = $('#u_email').val(); //要验证的对象
    if(add=== "")
    { 
        //输入不能为空
        alert("输入不能为空!");
        return false;

    }else if(!reg.test(add))
    { 
        //正则验证不通过，格式不对
        alert("邮箱格式错误!");
        return false;

    }else
    {
        return true;
　　 }
}


function set_email()
{
    var add = $('#u_email').val();
    if(check())
    {
        
    $.ajax({
            url:"/email",//对应handler的方法
            type:"POST",//Post方法
            data:{u_email:add},//要往服务器传递的数据
            beforeSend: function(request) {
                request.setRequestHeader("X-Xsrftoken", $.cookie("_xsrf"));
            },
            success:function(){ 
                alert("修改成功！");
            },
            error:function(){//获取失败
                alert("failed");
                // console.log("!!!!!!!!!!!");
            }
        }); 
    }
}

function cutImage(){  
    $("#srcImg").Jcrop( {  
        aspectRatio : 1,  
        onChange : showCoords,  
        onSelect : showCoords,  
        // minSize :[200,200]  
    });  
    //简单的事件处理程序，响应自onChange,onSelect事件，按照上面的Jcrop调用  
    function showCoords(obj) {  
        $("#x").val(obj.x);  
        $("#y").val(obj.y);  
        $("#w").val(obj.w);  
        $("#h").val(obj.h);

        console.log($("#x").val());
        console.log($("#y").val());
        console.log($("#w").val());
        console.log($("#h").val());
    }  
}  

     

function xmTanUploadImg(obj) 
{

        var file = obj.files[0];
        console.log(obj);
        // console.log(file);
        // console.log("file.size = " + file.size);  //file.size 单位为byte

        var reader = new FileReader();

        //读取文件过程方法
        reader.onloadstart = function (e) {
            console.log("开始读取....");
        }
        reader.onprogress = function (e) {
            console.log("正在读取中....");
        }
        reader.onabort = function (e) {
            console.log("中断读取....");
        }
        reader.onerror = function (e) {
            console.log("读取异常....");
        }
        reader.onload = function (e) {
            console.log("成功读取....");
            

        if(file.type!="image/jpeg" && file.type!="image/png")
        {  
            alert("图片的格式必须为png或jpg格式！");  
                
        }
        else if(file.size > 1048576)
        {
            alert("图片太大！");
        }
        else
        {
            rand = Math.random()

            result.innerHTML = '<img id="srcImg" src="'+this.result+'" alt="" width="400px" height="400px"/>'
            
            showDiv("cutImage");
            cutImage();
            

            
        }
//或者 img.src = this.result;  //e.target == this
        }
    reader.readAsDataURL(file);
}
function clearfile()
{
        var sp  =document.getElementById("sp");
        var inp =document.getElementById("file");
        sp.removeChild(inp);

        var inp = document.createElement("input");
        inp.setAttribute("id","file");
        inp.setAttribute("name","file");
        inp.setAttribute("type","file");
        inp.setAttribute("class","ui-input-file");
        inp.setAttribute("accept","image/png, image/jpeg");
        inp.setAttribute("onchange","xmTanUploadImg(this);");
        sp.appendChild(inp);
}
function show_content(obj)
{
// console.log(obj);
    var showDiv = document.getElementById(obj);

    if(showDiv.style.display=="none")
    {
        showDiv.style.display="block";
        showDiv.style.margin = "0 0 0 10px";
    }
    else
    {
        showDiv.style.display="none";
    }

}
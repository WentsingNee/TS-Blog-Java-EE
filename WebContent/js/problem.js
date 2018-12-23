function upload(format){
    var formD=new FormData();
    var fileobj;
    var tw=document.getElementById('tw').value;
    var flag=1;

    if (format=="in.1"){
        if (document.getElementById('filename_in').value==''){
            flag=0;
        }else{
            fileobj=$("#filename_in")[0].files[0];
        }
    }else{
        if (document.getElementById('filename_out').value==''){
            flag=0;
        }else{
            fileobj=$("#filename_out")[0].files[0];
        }
    }
    if (flag==0){
        alert('未选中任何文件!');
    }else{
        if (fileobj['name']!=format){
            alert("文件格式错误!");
        }else{
            formD.append("filename",fileobj);
            $.ajax({
                url:"/problem/upload?tw="+tw,
                type:"POST",
                data:formD,
                processData:false,
                contentType:false,
                rnType:false,
                beforeSend: function(request) {
                    request.setRequestHeader("X-Xsrftoken", $.cookie("_xsrf"));
                },
                success: function (arg){
                    if (arg == "success"){
                        alert("上传成功!");
                    }else{
                        alert("上传失败!");
                    }
                },
                error:function(){
                    alert("failed!");
              }
          })
       }
    }
}

function openShutManager(oSourceObj,oTargetObj,shutAble,oOpenTip,oShutTip){  
    var sourceObj = typeof oSourceObj == "string" ? document.getElementById(oSourceObj) : oSourceObj;  
    var targetObj = typeof oTargetObj == "string" ? document.getElementById(oTargetObj) : oTargetObj;  
    var openTip = oOpenTip || "";  
    var shutTip = oShutTip || "";  
    if(targetObj.style.display!="none"){  
       if(shutAble) return;  
       targetObj.style.display="none";  
       if(openTip  &&  shutTip){  
        sourceObj.innerHTML = shutTip;   
       }  
    } else {  
       targetObj.style.display="block";  
       if(openTip  &&  shutTip){  
        sourceObj.innerHTML = openTip;   
       }  
    }  
}

function problem_add_tag() {
    $.ajax({
        url: '/problem/add_tag',
        type: 'POST',
        cache: false,
        data: new FormData($('#addtag_Form')[0]),
        processData: false,
        contentType: false,
        beforeSend: function(request) {
            request.setRequestHeader("X-Xsrftoken", $.cookie("_xsrf"));
        },
        success: function() {
            alert("标签添加成功！");
        },
        error: function() {//获取失败
            alert("failed");
        }
    });
}

    function show_problem(level){
        var data={level:level};
        var dataToSend=JSON.stringify(data);
        $.ajax({
               url:"/ladder/show/problem",
               type:"POST",
               data:dataToSend,
               beforeSend: function(request) {
                    request.setRequestHeader("X-Xsrftoken", $.cookie("_xsrf"));
                },
                success: function (arg) {//从handler获取的数据
			var obj = jQuery.parseJSON(arg);
			var section_num=obj[0][0];
			var main_div=$("#problem_list");
			if(main_div.children()){
				main_div.children().remove();
			}
			for(i=1;i<=section_num;i++){
				main_div.append(
'<div class="panel m-md">'+
	'<div class="panel-heading  wrapper-xs">'+
    '<div class="row">'+
      '<h4 class=" col-sm-8 m-n">'+
		  
        '<div class="checkbox checkbox-inline"><input  class="styled section"  type="checkbox"><label for="checkbox1"></label>'+
        
        
        '<span id="a'+i+'" class="text-md" >Section '+i+'</span>'+
       
       
      '</h4>'+
        '<div class="col-sm-4 m-n">'+
            '<ul class=" nav-pills pull-right">'+
        '<li><a href="javascript:;" onclick=check_active("s'+i+'",this); class="panel-toggle text-muted      active"><i class="fa fa-caret-down  fa text-active "></i><i class="fa fa-caret-up  fa text "></i></a></li>'+
    '</ul>'+

         '</div>'+
    
	'</div>'+
     
    '</div>'+
	'<div  class="panel-collapse  ">'+
	'<div id="s'+i+'" class="panel-body no-padder   ">'+
			
            '<div class="line line-lg m-n"></div>'+
    '<table class="table table-striped">'+
      '<thead>'+
        '<tr>'+
	    '<th>选择</th>'+
            '<th>题目ID</th>'+
            '<th>题目名称</th>'+
	    '<th>操作</th>'+
        '</tr>'+
      '</thead>'+
      '<tbody id="t'+i+'">'+
      '</tbody>'+
    '</table>'+
    
        '</div>'+
	'</div>'+
'</div>');
}
		$("#a"+section_num).after('&nbsp;&nbsp;<span><a href="javascript:;" onclick=del_sec() ><font size="2">删除Section</font></a></span>');
		
		for(i=1;i<=obj.length-1;i++){
			var td1='<td><div class="checkbox checkbox-inline"><input name="ID" class="form-control styled" type="checkbox" value="' + obj[i][1] + '"><label for="checkbox1"></label></div></td>';
			var td2='<td>'+obj[i][1]+'</td>';
			var td3='<td><a href="/problem/submit?tw='+obj[i][1]+'">'+obj[i][2]+'</td>';
			var td4='<td ><a id='+obj[i][1]+' class="glyphicon glyphicon-trash" onclick="del_pro(0,this.id)" href="javascript:void(0);"></a></td>';
			var tr='<tr>'+td1+td2+td3+td4+'<tr>';
			$("#t"+obj[i][0]).append(tr);
		}
		$(".section").click(function () {
			var par=$(this).parents("div").eq(3);
                	par.find('input[name="ID"]').prop("checked", this.checked);
                });
                var $p_checkbox = $("input[name='ID']");

            	$p_checkbox.click(function () {
                	//console.log( $("input[name='ID']:checked").length);
                	$("#isall").prop("checked", $p_checkbox.length == $("input[name='ID']:checked").length ? true : false);
			var par=$(this).parents("div").eq(3);
			var len1=par.find('input[name="ID"]').length;
			var len2=par.find('input[name="ID"]:checked').length;
			par.find(".section").prop("checked",len1==len2?true:false);
            	});
		},
                error: function () {//获取失败
                    alert("failed");
                }
        });
    }
function check_active(body,obj){
	if($(obj).hasClass("active")==true){
		$(obj).removeClass("active");
		$("#"+body).addClass("collapse");
	}
	else{
		$(obj).addClass("active");
		$("#"+body).removeClass("collapse");
	}

}
function del_sec(obj){
	var data={level:temp_level};
	var dataToSend=JSON.stringify(data);
	$.ajax({
	       url:"/ladder/delete/section",
               type:"POST",
               data:dataToSend,
               beforeSend: function(request) {
                    request.setRequestHeader("X-Xsrftoken", $.cookie("_xsrf"));
                },
                success: function (arg) {
			show_problem(temp_level);
		},
		error:function(){
			alert("failed");
		}
	});
}

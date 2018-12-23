window.onload =function(){
	var aImgIcon = document.getElementById('imgIcon');
	var userInfoCardDiv = document.getElementById('userInfoCard');
	aImgIcon.onmouseover = userInfoCardDiv.onmouseover = showCard;
	aImgIcon.onmouseout = userInfoCardDiv.onmouseout = hideCard;
};
var timer = null;
function getuserinfo()
{
	if (parseInt($.cookie('userinfocard_flag'))==1)
	{
		 return ;
	}
	else
	{
		$.cookie('userinfocard_flag','1');

	}
	$.ajax({
		url:"/getuserinfo",
		type:"post",
		data:{key:"none"},
		beforeSend: function(request) {
            request.setRequestHeader("X-Xsrftoken", $.cookie("_xsrf"));
        },
		success:function(arg)
		{
		var obj = jQuery.parseJSON(arg);
		// console.log(obj);
		//var uname = document.getElementById("user_name");
		var uscore = document.getElementById("user_score");
		var ucourse = document.getElementById("latest_course") 
		//uname.innerHTML=obj[0][0];
        $(".user-name").html(obj[0][0]);
		//uscore.innerHTML=obj[0][1];
		uid=obj[0][2];
		// console.log(obj);
		// console.log(obj.length);
		if (obj.length >1)
		{
			ucourse .innerHTML=obj[1][1];
			var con = document.getElementById("con");
			con.href = '/course/problem?kcbs='+obj[1][0]+'&&page=1';
                        con.innerHTML="继续";
		}
		else
		{
			ucourse .innerHTML="您暂时还没有任何课程";
		}
			
		},
		error:function(){//获取失败
			alert("failed");
		}
	});
}
function showCard(){
		clearInterval(timer);
	    getuserinfo();
		timer = setTimeout(function(){
				var aImgIcon = document.getElementById('imgIcon');
				var userInfoCardDiv = document.getElementById('userInfoCard');
				var navbarDivHeight = document.getElementById('navbar').clientHeight;
				userInfoCardDiv.style.top = document.body.scrollTop + navbarDivHeight+ 'px';
				userInfoCardDiv.style.right = document.documentElement.offsetWidth - (aImgIcon.offsetLeft + aImgIcon.offsetWidth) + 'px';
				userInfoCardDiv.style.visibility = 'visible';
		},300);	
}
function hideCard(){
		clearInterval(timer);
		timer = setTimeout(function(){
				var userInfoCardDiv = document.getElementById('userInfoCard');
				var aImgIcon = document.getElementById('imgIcon');
				userInfoCardDiv.style.visibility = 'hidden';
		},300);	
}
function hideSearchForm(){
	var searchformDiv =document.getElementById('search-form');
	searchformDiv.style.display = 'none';
}


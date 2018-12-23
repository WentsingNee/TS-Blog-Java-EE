<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<html lang="zh-CN">
<head>
<meta http-equiv="content-type" content="text/html;charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<meta name="renderer" content="webkit">
<title>TS Blog</title>
<link rel="shortcut icon" href="url(images/favicon.gif)">

<link href="css/bootstrap.min.css" rel="stylesheet">
<link href="css/base.css" rel="stylesheet">
<link href="css/userInfoCard.css" rel="stylesheet">
<link href="css/bootstrap-select.css" rel="stylesheet">
<script src="js/jquery.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/bootstrap-select.min.js"></script>
<script src="js/jquery.cookie.js"></script>

<link href="css/index.css" rel="stylesheet">
<link href="css/bootstrap-switch.min.css" rel="stylesheet">
<script src="js/paging.js"></script>
<script src="js/cookie.js"></script>
<script src="js/bootstrap-switch.min.js"></script>


<script type="text/javascript">
	$(function() {
		var page = Getcookie("index_page");
		search_by_key(parseInt(page));
		$("#level").on("changed.bs.select", function() {
			search_by_key();
		});
	});
	function search_by_key() {
		var find_key = $('#key').val();
		var data = {
			find_key : find_key
		};
		var post_url = "./index_search";
		callback_func = "search_by_key";
		Do_Ajax(post_url, data, callback_func);
	}
	function Do_Ajax(post_url, data, callback) {
		console.log(data);
		var dataToSend = JSON.stringify(data);//从一个对象解析出字符串 
		$
				.ajax({
					url : post_url,
					type : "post",
					data : dataToSend,
					beforeSend : function(request) {
						request.setRequestHeader("X-Xsrftoken", $
								.cookie("_xsrf"));
					},
					success : function(arg) {
						var obj = jQuery.parseJSON(arg);
						console.log(obj);
						if (document.getElementById('tbody')) {
							$('#tbody').remove();
						}
						$('#table').append('<tbody id="tbody"></tbody>');

						if (obj.length == 0) {
							var tr = '<tr><td style="color:red;">没有符合查询条件的题目</td></tr>';
							$('#tbody').append(tr);
							return;
						}
						for (var i = 0; i < obj.length; ++i) {
							console.log(obj[i]);
							var row = obj[i];
							var b_id = '<td>' + row.b_id + '</td>';
							var u_name = '<td>' + row.u_name + '</td>';
							var b_title = '<td><a href = "' + row.b_url + '">' + row.b_title + '</a></td>';
							var b_posttime = '<td>' + row.b_posttime + '</td>';
							var b_read = '<td>' + 0 + '</td>';
							var b_like = '<td>' + 0 + '</td>';
							var tr = '<tr>' + b_id + u_name + b_title + b_posttime + b_read + b_like + '</tr>';
							$('#tbody').append(tr);
						}
					},
					error : function() {//获取失败
						console.log('Get problem list failed!');
					}
				});
	}
</script>
</head>
<body>

	<div id="basediv">
		<nav class="navbar navbar-inverse navbar-static-top">
			<div class="container">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle" data-toggle="collapse"
						data-target="#navbar" aria-expanded="false" aria-controls="navbar">
						<span class="sr-only">Toggle navigation</span> <span
							class="icon-bar"></span> <span class="icon-bar"></span> <span
							class="icon-bar"></span>
					</button>
					<a class="navbar-brand pull-left">TS Blog</a>
				</div>
				<div class="collapse navbar-collapse" id="navbar">
					<ul class="nav navbar-nav" id="ul">
						<li><a href="./index">博客</a></li>
						<li><a href="./my">我的</a></li>
						<li><a href="./message">消息</a></li>
					</ul>
				</div>
				<!--/.nav-collapse -->
			</div>
		</nav>
	</div>

	<div
		class="col-lg-offset-2 col-md-offset-2 col-sm-offset-1 col-lg-7 col-md-8 col-sm-10 ">
		<div class="panel panel-default">
			<div class="panel-body">
				<div style="text-align: center;">
					<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<form class="form-inline" onsubmit="return false;">
							<div class="input-group">
								<input type="text" class="form-control" id="key" name="key"
									placeholder="博客标题"
									onkeypress="if (event.keyCode == 13) search_by_key(1);" /> <span
									class="input-group-addon glyphicon glyphicon-search fix_position"
									id="search_btn" name="click" value="0"
									onclick="search_by_key(1);" aria-hidden="true"></span>
							</div>
						</form>
						<input type="button" class="btn btn-default xs-position"
							onclick="window.location.href='./index'" value="取消查询" />
					</div>

					<br>
					<div id="select_tag" style="display: none;"></div>
					<br> <br> <br> <strong>博客列表</strong> <br>
					<ul id="pagehead" class="pagination"></ul>
					<br>
				</div>

				<table class="table table-striped" id="table">
					<thead>
						<!-- 表头 -->
						<tr>
							<th style="width: 10%">编号</th>
							<th style="width: 10%">作者</th>
							<th style="width: 27%">标题</th>
							<th style="width: 20%">首次发表时间</th>
							<th style="width: 10%">点赞数</th>
							<th style="width: 10%">阅读数</th>
						</tr>
					</thead>
					<tbody id="tbody">
					</tbody>
				</table>
			</div>
		</div>
	</div>

</body>
</html>

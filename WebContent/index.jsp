<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<jsp:include page="./base.jsp"></jsp:include>

<tmpl:overwrite name="page_script">
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
				"find_key" : find_key
			};
			var post_url = "./index_search";
			callback_func = "search_by_key";
			Do_Ajax(post_url, data, callback_func);
		}
		function Do_Ajax(post_url, data, callback) {
			var dataToSend = JSON.stringify(data);//从一个对象解析出字符串 
			$
					.ajax({
						url : post_url,
						type : "post",
						data : jQuery.parseJSON(dataToSend),
						dataType : "json",
						beforeSend : function(request) {
							request.setRequestHeader("X-Xsrftoken", $
									.cookie("_xsrf"));
						},
						success : function(obj) {
							console.log(obj);
							if (document.getElementById('tbody')) {
								$('#tbody').remove();
							}
							$('#table').append('<tbody id="tbody"></tbody>');

							if (obj.length == 0) {
								var tr = '<tr><td style="color:red;">没有符合查询条件的内容</td></tr>';
								$('#tbody').append(tr);
								return;
							}
							for (var i = 0; i < obj.length; ++i) {
								console.log(obj[i]);
								var row = obj[i];
								var b_id = '<td>' + row.b_id + '</td>';
								var u_name = '<td>' + row.u_name + '</td>';
								var b_title = '<td><a href = "' + row.b_url + '">'
										+ row.b_title + '</a></td>';
								var b_posttime = '<td>' + row.b_posttime
										+ '</td>';
								var b_read = '<td>' + row.b_read + '</td>';
								var b_like = '<td>' + row.b_like + '</td>';
								var tr = '<tr>' + b_id + u_name + b_title
										+ b_posttime + b_read + b_like
										+ '</tr>';
								$('#tbody').append(tr);
							}
						},
						error : function() {//获取失败
							alert('Get problem list failed!');
						}
					});
		}
	</script>
</tmpl:overwrite>


<tmpl:overwrite name="content">
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
									onkeypress="if (event.keyCode == 13) search_by_key();" /> <span
									class="input-group-addon glyphicon glyphicon-search fix_position"
									id="search_btn" name="click" value="0"
									onclick="search_by_key();" aria-hidden="true"></span>
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
							<th style="width: 6%">编号</th>
							<th style="width: 10%">作者</th>
							<th style="width: 27%">标题</th>
							<th style="width: 15%">首次发表时间</th>
							<th style="width: 10%">阅读数</th>
							<th style="width: 10%">点赞数</th>
						</tr>
					</thead>
					<tbody id="tbody">
					</tbody>
				</table>
			</div>
		</div>
	</div>
</tmpl:overwrite>

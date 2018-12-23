<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<jsp:include page="./base.jsp"></jsp:include>

<tmpl:overwrite name="page_script">
	<link href="css/problem_add.css" rel="stylesheet">
	<link href="css/thinker-md.vendor.css" rel="stylesheet">
	<script src="js/problem.js"></script>
	<script src="js/popup.js"></script>
	<script src="js/tag_manage.js"></script>
	<script>
		function edit() {
			var b_title = $("#b_title").val();
			var b_content = $("#b_content").val();
			if (b_title == "" || b_content == "") {
				alert("信息不得为空！")
				return;
			}
			var data = {
				"b_id" : <s:property value="b_id"></s:property>,
				"b_title" : b_title,
				"b_content" : b_content
			};
			console.log(data);
			$.ajax({
				url : './blog_edit_post',
				type : 'post',
				data : data,
				beforeSend : function(request) {
					request.setRequestHeader("X-Xsrftoken", $.cookie("_xsrf"));
				},
				success : function(arg) {
					if (arg != "error") {
						alert("更改成功!");
					} else {
						alert("Java 执行失败!")
					}
				},
				error : function() {
					alert("消息发送失败!");
				}
			});
		}
	</script>

	<script type="text/javascript" charset="utf-8"
		src="js/thinker-md.vendor.min.js"></script>
	<script type="text/javascript" charset="utf-8" src="js/markdown.js"></script>
	<script>
		$(function() {
			$("#rn").markdown({
				language : 'zh',
				fullscreen : {
					enable : true
				},
				resize : 'none',
				localStorage : 'md',
				imgurl : '/problem/manage',
				base64url : '/problem/manage',
				flowChart : false,
			});
		});
	</script>

</tmpl:overwrite>


<tmpl:overwrite name="content">

	<div
		class="col-lg-offset-1 col-md-offset-1 col-lg-10 col-md-10 col-sm-12 col-xs-12">
		<div class="container">
			<h1 class="position_set">编辑</h1>
			<br>
			<div class="form-horizontal" role="form">

				<div class="form-group">
					<label for="b_title"
						class="col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label">标题
						<span class="color_red">(必填)</span>
					</label>
					<div class="col-lg-4 col-md-4 col-sm-5 col-xs-5">
						<input type="text" class="form-control" name="b_title" id="b_title"
							value="<s:property value="b_title"></s:property>" id="title" />
					</div>
				</div>

				<div class="form-group">
					<label for="b_content"
						class="col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label">内容
						<span class="color_red">(必填)</span>
					</label>
					<div class="col-lg-8 col-md-8 col-sm-10 col-xs-10">
						<textarea name="b_content" class="form-control" id="b_content" rows="10"
							style="resize: none"><s:property value="b_content"></s:property></textarea>
					</div>
				</div>

				<div class="form-group position_set">
					<input type="button" id="btn" class="btn btn-default" value="提交更改"
						onclick="edit();" />
				</div>
			</div>
		</div>
	</div>

</tmpl:overwrite>
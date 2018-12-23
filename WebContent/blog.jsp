<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<jsp:include page="./base.jsp"></jsp:include>

<tmpl:overwrite name="page_script">
	<link href="css/bootstrap-switch.min.css" rel="stylesheet">
	<script src="js/paging.js"></script>
	<script src="js/cookie.js"></script>
	<script src="js/bootstrap-switch.min.js"></script>
	<script src="js/markdown.js"></script>
</tmpl:overwrite>


<tmpl:overwrite name="content">

	<div class="col-lg-offset-2 col-md-offset-1 col-lg-8 col-md-10">
		<div class="panel panel-info">
			<div class="panel-heading">
				<h2><s:property value="b_title"></s:property>&nbsp;
					<font size="3"><a href="./blog_edit?b_id=<s:property value="b_id"></s:property>" target="_blank">
					<span class = "glyphicon glyphicon-pencil"></span></a></font>
				</h2>
				<font size="3">作者&nbsp;</font>
                <font size="3" color="blue"><s:property value="b_author"></s:property></font>&nbsp;&nbsp;
                <font size="3">点赞数&nbsp;</font>
                <font size="3" color="blue"><s:property value="b_read"></s:property></font>&nbsp;&nbsp;
                <font size="3">阅读数&nbsp;</font>
                <font size="3" color="blue"><s:property value="b_like"></s:property></font>&nbsp;&nbsp;
			</div>
		</div>
		<div class="panel panel-info">
			<div class="panel-heading">
				<h4>内容</h4>
			</div>
			<div class="panel-body">
				<div style="display:none">
					<textarea id="text-input"><s:property value="b_content"></s:property></textarea>
				</div>
				<div id="preview"></div>
			</div>
			<script>
                function Editor(input, preview) {
                    this.update = function () {
                        preview.innerHTML = markdown.toHTML(input.value);
                    };
                    input.editor = this;
                    this.update();
                }
                var $$ = function (id) { return document.getElementById(id); };
                new Editor($$("text-input"), $$("preview"));
            </script>
		</div>

	</div>

</tmpl:overwrite>
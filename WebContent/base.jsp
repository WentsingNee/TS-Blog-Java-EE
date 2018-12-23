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

<tmpl:block name="page_script">

</tmpl:block>
	
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

	<tmpl:block name="content">
	
	</tmpl:block>

</body>
</html>

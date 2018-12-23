<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<html lang="zh-CN">
<head>
<meta http-equiv="content-type" content="text/html;charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>TS Blog</title>
<link rel="stylesheet" href="css/bootstrap.min.css">
<link rel="stylesheet" href="css/login.css">

</head>

<body style="background: url(images/loginbg.jpg)">
	<div class="container">
		<form id="form_login" class="form-login" role="form" action="login"
			method="post">
			<h1>
				<strong>TS Blog</strong>
			</h1>
			<h3 class="form-signin-heading">Please login!</h3>

			<label for="username" class="sr-only">Username</label> <input
				type="text" name="username" id="form-username" class="form-control"
				placeholder="Username..." required autofocus> <label
				for="inputPassword" class="sr-only">Password</label> <input
				type="password" name="password" id="form-password"
				class="form-control" placeholder="Password..." required>
			<button id="btn_login" class="btn btn-lg btn-primary btn-block"
				type="submit">登陆</button>
		</form>
	</div>
</body>
</html>
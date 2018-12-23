package com.thinkspirit.blog;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;

public class Login {

	public String execute() throws Exception {
		HttpServletRequest reqeust = ServletActionContext.getRequest();
		String u_name = reqeust.getParameter("username");
		System.out.println(u_name);

		String u_passwd = reqeust.getParameter("password");
		System.out.println(u_passwd);

		DBHelper dbHelper = null;
		try {
			dbHelper = new DBHelper();
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
		}

		PreparedStatement stat = dbHelper.connetion().prepareStatement(
				"select exists (select u_id from user where u_name = ? and u_passwd = md5(?))"
		);
		ResultSet query_res = null;
		String res = null;
		try {
			stat.setString(1, u_name);
			stat.setString(2, u_passwd);
			query_res = stat.executeQuery();
			if (query_res.next()) {
				if (query_res.getInt(1) == 1) {
					res = "success";
				} else {
					res = "wrong_password";
				}
			} else {
				res = "error";
			}
		} catch (SQLException e) {
			e.printStackTrace();
			res = "error";
		} catch (Exception e) {
			e.printStackTrace();
			res = "error";
		} finally {
			dbHelper.close();// 关闭连接
		}
		return res;
	}
	
	public String wrong_password() throws Exception {
		return "success";
	}
	
}
package com.thinkspirit.blog;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionContext;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class Blog {

	public String getB_title() {
		return b_title;
	}

	public void setB_title(String b_title) {
		this.b_title = b_title;
	}

	public int getB_id() {
		return b_id;
	}

	public void setB_id(int b_id) {
		this.b_id = b_id;
	}

	public String getB_author() {
		return b_author;
	}

	public void setB_author(String b_author) {
		this.b_author = b_author;
	}

	public String getB_content() {
		return b_content;
	}

	public void setB_content(String b_content) {
		this.b_content = b_content;
	}

	public int getB_read() {
		return b_read;
	}

	public void setB_read(int b_read) {
		this.b_read = b_read;
	}

	public int getB_like() {
		return b_like;
	}

	public void setB_like(int b_like) {
		this.b_like = b_like;
	}

	public String getB_posttime() {
		return b_posttime;
	}

	public void setB_posttime(String b_posttime) {
		this.b_posttime = b_posttime;
	}

	private int b_id;
	private String b_title;
	private String b_author;
	private String b_content;
	private int b_read;
	private int b_like;
	private String b_posttime;

	public String execute() throws Exception {
		HttpServletRequest reqeust = ServletActionContext.getRequest();
		int b_id = Integer.parseInt(reqeust.getParameter("b_id"));

		DBHelper dbHelper = null;
		try {
			dbHelper = new DBHelper();
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
		
		try {
			PreparedStatement add_b_read = dbHelper.connetion().prepareStatement(
					"update blog set b_read = b_read + 1 where b_id = ?"
			);
			add_b_read.setString(1, Integer.toString(b_id));
			add_b_read.execute();
		} catch (Exception e) {
			e.printStackTrace();
			dbHelper.close();// 关闭连接
			throw e;
		}

		PreparedStatement stat = dbHelper.connetion().prepareStatement(
				"select b_id, b_title, u_name as b_author, b_content, b_posttime, b_read, b_like from blog, user where b_id = ? and blog.u_id = user.u_id"
		);
		ResultSet query_res = null;
		String res = null;
		try {
			stat.setString(1, Integer.toString(b_id));
			query_res = stat.executeQuery();
			if (query_res.next()) {
				this.b_title = query_res.getString("b_title");
				this.b_content = query_res.getString("b_content");
				this.b_posttime = query_res.getTime("b_posttime").toString();
				this.b_author = query_res.getString("b_author");
				this.b_read = query_res.getInt("b_read");
				this.b_like = query_res.getInt("b_like");

				res = "success";
			} else {
				res = "error";
			}
		} catch (Exception e) {
			e.printStackTrace();
			res = "error";
		} finally {
			dbHelper.close();// 关闭连接
		}
		return res;
	}

	public void edit_post() throws Exception {
		ActionContext ac = ActionContext.getContext();
		Map<String, Object> paras = ac.getParameters();

		DBHelper dbHelper = null;
		try {
			dbHelper = new DBHelper();
		} catch (Exception e) {
			e.printStackTrace();
			return;
		}

		PreparedStatement stat = dbHelper.connetion()
				.prepareStatement("update blog set b_title = ?, b_content = ? where b_id = ?");

		try {
			String b_title = ((String[]) (paras.get("b_title")))[0];
			String b_content = ((String[]) (paras.get("b_content")))[0];
			int b_id = Integer.parseInt(((String[]) (paras.get("b_id")))[0]);
			stat.setString(1, b_title);
			stat.setString(2, b_content);
			stat.setString(3, Integer.toString(b_id));
			boolean query_res = stat.execute();
			System.out.println(query_res);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		} finally {
			dbHelper.close();// 关闭连接
		}

		HttpServletResponse response = (HttpServletResponse) ac.get(ServletActionContext.HTTP_RESPONSE);
		response.setContentType("text/html;charset=utf-8");
		response.getWriter().write("");
	}
}

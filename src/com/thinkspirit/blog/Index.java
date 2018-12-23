package com.thinkspirit.blog;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.function.Consumer;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionContext;
import com.sun.xml.internal.ws.client.RequestContext;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class Index {

	public String getFind_key() {
		return find_key;
	}

	public void setFind_key(String find_key) {
		this.find_key = find_key;
	}

	private String find_key;

	public String execute() throws Exception {
		Map<String, Object> session = ActionContext.getContext().getSession();
//		System.out.println("登陆成功");
		return "success";
	}

	public void search() throws Exception {
		ActionContext ac = ActionContext.getContext();
		String find_key = ((String[]) (ac.getParameters().get("find_key")))[0];
		System.out.println("search: " + find_key);
		find_key = "b_title like '%" + find_key + "%'";

		ArrayList<IndexList> contents = null;
		try {
			contents = IndexList.getIndexList(find_key);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}

		JSONArray jsonArray = new JSONArray();
		contents.forEach(item -> {
			JSONObject row = new JSONObject();
			row.put("b_id", item.b_id);
			System.out.println(item.b_id);
			row.put("u_name", item.u_name);
			row.put("b_url", "./blog?b_id=" + item.b_id);
			row.put("b_title", item.b_title);
			row.put("b_posttime", item.b_posttime);
			row.put("b_read", item.b_read);
			row.put("b_like", item.b_like);
			jsonArray.add(row);
		});

		System.out.println(jsonArray.toString());
		ac = ActionContext.getContext();
		HttpServletResponse response = (HttpServletResponse) ac.get(ServletActionContext.HTTP_RESPONSE);
		response.setContentType("text/html;charset=utf-8");
		response.getWriter().write(jsonArray.toString());
	}

}

class IndexList {
	int b_id;
	String u_name;
	String b_title;
	String b_posttime;
	int b_read;
	int b_like;

	IndexList(int b_id, String u_name, String b_title, String b_posttime, int b_read, int b_like) {
		this.b_id = b_id;
		this.u_name = u_name;
		this.b_title = b_title;
		this.b_posttime = b_posttime;
		this.b_read = b_read;
		this.b_like = b_like;
	}

	public static ArrayList<IndexList> getIndexList() throws Exception {
		return getIndexList("b_title like '%%'");
	}

	public static ArrayList<IndexList> getIndexList(String find_condition) throws Exception {
		DBHelper dbHelper = new DBHelper();
		try {
			PreparedStatement stat = dbHelper.connetion().prepareStatement(
					"select b_id, u_name, b_title, b_posttime, b_read, b_like from blog, user where blog.u_id = user.u_id and "
							+ find_condition + " order by b_id desc");
			ArrayList<IndexList> res = new ArrayList<IndexList>();
			ResultSet query_res = stat.executeQuery();
			while (query_res.next()) {
				res.add(new IndexList(
						query_res.getInt("b_id"),
						query_res.getString("u_name"),
						query_res.getString("b_title"),
						query_res.getDate("b_posttime").toString(),
						query_res.getInt("b_read"),
						query_res.getInt("b_like")
					));
			}
			return res;
		} finally {
			dbHelper.close();// 关闭连接
		}
	}
}

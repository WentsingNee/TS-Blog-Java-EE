package com.thinkspirit.blog;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBHelper {
	public static final String url = "jdbc:mysql://127.0.0.1/java";
	public static final String name = "com.mysql.jdbc.Driver";
	public static final String user = "Peter";
	public static final String password = "19980822b";

	private Connection conn = null;

	public DBHelper() throws Exception {
		try {
			Class.forName(name);// 指定连接类型
			conn = DriverManager.getConnection(url, user, password);// 获取连接
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

	public Connection connetion() {
		return this.conn;
	}

	public void close() throws SQLException {
		try {
			this.conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
			throw e;
		}
	}
}

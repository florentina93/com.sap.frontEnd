package com.sap.crawler.servlet;

import java.io.IOException;


import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;


@WebServlet("/testdata")
public class MyOtherServer extends HttpServlet {
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

		 resp.setContentType("application/json");

		JSONObject json = new JSONObject();
		try {
			json.put("name", "Popescu");
			json.put("age", "57");
//			json.put("job", "Programmer");
//			json.put("id", "1");
//			json.put("first_name", "Maria");
//			json.put("email", "maria@yahoo.com");
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		resp.getWriter().println(json);
	}

}

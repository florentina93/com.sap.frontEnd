package com.sap.crawler.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.restfb.*;
import com.restfb.json.JsonObject;
import com.sap.crawler.FacebookInfo;

@WebServlet("/getdata")
public class MyServer extends HttpServlet {
	
//	private JsonObject getMyInfo(){
//    	FacebookClient fbClient= new DefaultFacebookClient("EAACEdEose0cBAFrnaTCWR2F6DsHmTfLl322LLQaQ64eZBXbZCsihZA86kDlPYGqBaIR5QjIEa3ZB4iBZCWH2VNou4uQMp4hrGp7D2l36SyvBpsKgNRmHgEUYHMGhxmIxs6MR8usk3h5ngR8rVH1SgyTismhJhslM7XZBzPtQbaNgZDZD");
//    	JsonObject userData = fbClient.fetchObject("me",
//                JsonObject.class, Parameter.with("fields", "name, first_name, hometown"));
//    	
//    	return userData;
//    }
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		 resp.setContentType("application/json");
		 //String objectToReturn = "{ \"name\": \"Maria\", \"age\": \"20\", \"hometown\": \"Timisoara\", \"workspace\": \"SAP\"}";
		 FacebookInfo f = new FacebookInfo("EAACEdEose0cBAIAZAB14TALZAoKh3u65TX2WspuXDNc79NtgSIZC3gmzzHRcU54DX9VPk5ZAXyl8YQpdohknBZBUATZCUhPxek5TZBtcTIPhRhymr6F6za8dnGF98meB4sWNXsGZCJEsTbISlSOxDceMALanxI2hqRddaNgXeHzT5QZDZD");
		 JsonObject j =f.getMyInfo();
		 resp.getWriter().print(j);
	}
	
}

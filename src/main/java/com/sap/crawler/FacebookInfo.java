package com.sap.crawler;

import com.restfb.types.User;
import com.restfb.Connection;
import com.restfb.DefaultFacebookClient;
import com.restfb.FacebookClient;
import com.restfb.Parameter;
import com.restfb.exception.FacebookException;
import com.restfb.json.JsonObject;
import com.restfb.types.FacebookType;
import com.restfb.types.Page;
import com.restfb.types.User;

public class FacebookInfo {
	 /* Variables */
   // private String pageAccessToken = "EAACEdEose0cBAFrnaTCWR2F6DsHmTfLl322LLQaQ64eZBXbZCsihZA86kDlPYGqBaIR5QjIEa3ZB4iBZCWH2VNou4uQMp4hrGp7D2l36SyvBpsKgNRmHgEUYHMGhxmIxs6MR8usk3h5ngR8rVH1SgyTismhJhslM7XZBzPtQbaNgZDZD";
    private final String pageID = "145634995501895";
    private FacebookClient fbClient;
    private User myuser = null;    //Store references to your user and page
    private Page mypage = null;    //for later use. In this answer's context, these
                                   //references are useless.
    private int counter = 0;

    public FacebookInfo(String access) {
        try {

            fbClient = new DefaultFacebookClient(access);
            myuser = fbClient.fetchObject("me", User.class);
            mypage = fbClient.fetchObject(pageID, Page.class);
            counter = 0;
        } catch (FacebookException ex) {     //So that you can see what went wrong
            ex.printStackTrace(System.err);  //in case you did anything incorrectly
        }
    }
    
//    public String getAccessToken(){
//    	return pageAccessToken;
//    }

    public void makeTestPost() {
        fbClient.publish(pageID + "/feed", FacebookType.class, Parameter.with("message", Integer.toString(counter) + ": Hello, facebook World!"));
        counter++;
    }
    
    public JsonObject getFriend(String name){
    	//Connection<User> myFriends = fbClient.fetchConnection("me/friends", User.class);
    	//System.out.println("Count of my friends- " + myFriends.getTotalCount());
    	
    	JsonObject ttry = fbClient.fetchObject("me", JsonObject.class);
    	System.out.println(ttry.toString());
    	
    	JsonObject userData = fbClient.fetchObject("me/friends",
                JsonObject.class, Parameter.with("fields", "name, first_name, hometown"));
    	
    	return userData;
    }
    
    public JsonObject getMyInfo(){
    	
    	JsonObject userData = fbClient.fetchObject("me",
                JsonObject.class, Parameter.with("fields", "name, first_name, hometown, birthday, education, gender, sports, work, email"));
    	
    	return userData;
    }
    
    public static void main(String[] args)
    {
    	//FacebookInfo p = new FacebookInfo("EAACEdEose0cBAIAZAB14TALZAoKh3u65TX2WspuXDNc79NtgSIZC3gmzzHRcU54DX9VPk5ZAXyl8YQpdohknBZBUATZCUhPxek5TZBtcTIPhRhymr6F6za8dnGF98meB4sWNXsGZCJEsTbISlSOxDceMALanxI2hqRddaNgXeHzT5QZDZD");
    	//p.makeTestPost();
		//FacebookClient facebookClient= new DefaultFacebookClient(p.getAccessToken());
        
        //User user = facebookClient.fetchObject("me", User.class);

//        System.out.println("User="+ user);
//        System.out.println("UserName= "+ user.getFirstName());
//        System.out.println("Birthday= "+ user.getBirthday());
//        System.out.println("Email= "+ user.getEmail());
//        
//        JsonObject userData = facebookClient.fetchObject("me",
//                JsonObject.class, Parameter.with("fields", "name, first_name, hometown"));
// 
//        System.out.println("userData=" + userData);
// 
//        System.out.println("FirstName=" + userData.getString("first_name"));
//        System.out.println("Name= " + userData.getString("name"));
//        System.out.println("hometown= " + userData.getString("hometown"));
    	
//    	p.getFriend("");
//    	JsonObject info = p.getMyInfo();
//    	System.out.println(info);
    }

}
sap.ui.controller("sap.ui.demo.myFiori.view.FacebookMaster", {

		getRouter : function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
	
		onInit:function(){
			console.log("in master "+this.getRouter());
			this.getRouter().attachRouteMatched(this.cleanPage , this);
		    if (sap.ui.Device.system.phone) {
				return;
		    }	  
		},
		
		cleanPage : function()  {  
			 
		},
		
		onBeforeRendering:function(){
			console.log("before RENERING");
		},
		
		handleNavButtonPress : function(evt) {
			this.getRouter().navTo("InitialDetail");
			this.getRouter().navTo("InitialMaster");
			console.log("From Facebook to Initial");
		},
		
		
		
		handleListItemPress : function (evt) {
			var entry = evt.getSource().getBindingContext();	
			facebookController.getRouter().navTo("postDetail",{pId:entry.id} );
		},
		
		printNames:function(data){
			var i=0;
			this.getView().byId("list").removeAllItems();
			facebookController=this;
			while(i<data.length){
				var oItem = new sap.m.StandardListItem();
				oItem.attachPress(this.handleListItemPress);	
				oItem.setType(sap.m.ListType.Active);
				if(data[i].name==null){
					oItem.setIcon("http://www.medikeen.com/site/wordpress/wp-content/uploads/2015/05/arrow-25-512.gif");	
					oItem.setIconInset(false);
					if(radioName=="Description"){
						oItem.setTitle(data[i].description);
					}
					else if(radioName=="Message"){
						oItem.setTitle(data[i].message);
					}
					else if(radioName=="Link"){
						oItem.setTitle(data[i].id);
					}
				}
				else {
					oItem.setTitle(data[i].name);
				}
				oItem.setBindingContext(data[i]);
				this.getView().byId("list").addItem(oItem);
				i++;
			}
			
		},
		
		handleSearch : function(evt){
			var query = evt.getParameter("query");
			console.log("Query is: " + query);
			
			var radioActive=this.getView().byId("radioGroup").getSelectedButton();
			radioName = radioActive.getId().substring(17, radioActive.getId().length);
			console.log(radioName);
			
			if(query && query.length > 0 && (radioActive)) {
				
				this.getView().byId("list").setBusy(true);
				var oModel = new sap.ui.model.json.JSONModel();
				var pathModel = "http://localhost:8080/com.sap.crawler/webapi/facebook/posts/"+radioName+"?query="+query;
				console.log(pathModel);
				var facebookController=this;
				oModel.attachRequestCompleted(function() {
					facebookController.getView().byId("list").setBusy(false);
					console.log(oModel.getData());
					facebookController.printNames(oModel.getData());
					
			    });
				oModel.loadData(pathModel);	
				this.getView().setModel(oModel);
			}
		},
});
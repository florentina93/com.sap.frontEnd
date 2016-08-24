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
			var oModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(oModel);
			console.log("From Facebook to Initial");
		},
		
		handleListItemPress : function (evt) {
			var context = evt.getSource().getBindingContext(),
				entry = this.getView().getModel().getProperty(context.getPath());
			
			this.getRouter().navTo("postDetail",{pId:entry.id} );
		},
		
		printNames:function(data){
			var i=0;
			while(i<data.length){
				var oItem = new sap.m.StandardListItem();
				this.getView().byId("list").bindItems("items",oItem);
				oItem.attachPress(this.handleListItemPress);
				oItem.setType(sap.m.ListType.Active);
				oItem.setTitle(data[i].name);
				this.getView().byId("list").addItem(oItem);
				i++;
			}
			
		},
		
		handleSearch : function(evt){
			var query = evt.getParameter("query");
			console.log("Query is: " + query);
			
			var radioActive=this.getView().byId("radioGroup").getSelectedButton();
			var radioName = radioActive.getId().substring(17, radioActive.getId().length);
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
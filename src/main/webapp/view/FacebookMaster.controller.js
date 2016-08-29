sap.ui.controller("sap.ui.demo.myFiori.view.FacebookMaster", {

		getRouter : function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
	
		onInit:function(){
			console.log("in master "+this.getRouter());
			//this.getRouter().attachRouteMatched(this.cleanPage , this);
		    if (sap.ui.Device.system.phone) {
				return;
		    }	  		 
		},
		
		onBeforeRendering:function(){
			console.log("BEFORE RENDERING");
		},
		
		onAfterRendering: function() {
			console.log("AFTER RENDERING");
		},
		onExit: function() {
			console.log("ON EXIT");
		},
		
		handleNavButtonPress : function(evt) {
			this.getRouter().navTo("InitialDetail");
			this.getRouter().navTo("InitialMaster");
			console.log("From Facebook to Initial");
			var emptyModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(emptyModel);
			console.log("Inside handleNavButtonPress facebook and model is: " + emptyModel.getData());
		},		
		
		handleListItemPress : function (evt) {
			var context = evt.getSource().getBindingContext(),
			entry = context.getModel().getProperty(context.getPath());	
			this.getRouter().navTo("postDetail",{pId:entry.id} );
		},
		
		printNames:function(oModel){
			data=oModel.getData();
			var i=0;
			this.getView().byId("list").removeAllItems();
			while(i<data.length){
				if(data[i].name==null){
					data[i].icon="http://www.medikeen.com/site/wordpress/wp-content/uploads/2015/05/arrow-25-512.gif";
					if(radioName=="Description"){
						data[i].name=data[i].description;
					}
					else if(radioName=="Message"){
						data[i].name=data[i].message;
					}
					else if(radioName=="Link"){
						data[i].name=data[i].id;
					}
				}
				i++;
			}
			
			oModel.setData(data);
			//console.log(oModel.getData());
			this.getView().setModel(oModel);
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
					//console.log(oModel.getData());
					if(oModel.getData().length == 0) {
						facebookController.byId("list").setShowNoData(true);
						console.log("setting show no data on TRUE " + oModel.getData().length);
					} else {
						facebookController.byId("list").setShowNoData(false);
						console.log("setting show no data on FALSE " + oModel.getData().length);

					}
					facebookController.printNames(oModel);
					
			    });
				oModel.loadData(pathModel);	
			}
		},
});
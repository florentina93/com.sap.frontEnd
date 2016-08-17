sap.ui.controller("sap.ui.demo.myFiori.view.Detail", {

	getEventBus : function() {
		var sComponentId = sap.ui.core.Component.getOwnerIdFor(this.getView());
		return sap.ui.component(sComponentId).getEventBus();
	},

	getRouter : function() {
		return sap.ui.core.UIComponent.getRouterFor(this);
	},

	handleNavButtonPress : function(evt) {
		this._oRouter.navTo("Master");
	},

	onInit : function() {
		this.oInitialLoadFinishedDeferred = jQuery.Deferred();
		this.getRouter().attachRoutePatternMatched(this.onRouteMatched, this);
	},

	printDetails : function(data){
		if(data.name!="")
			this.getView().byId("nametext").setText("Name: "+data.name);
		else
			this.getView().byId("nametext").setText("");
		
		if(data.description!="")
			this.getView().byId("descriptiontext").setText("Description: "+data.description);
		else
			this.getView().byId("descriptiontext").setText("");
		
		if(data.message!="")
			this.getView().byId("messagetext").setText("Message: "+data.message);
		else
			this.getView().byId("messagetext").setText("");
		
		if(data.linkId!=""){
			this.getView().byId("idtext").setHref("http://"+data.linkId);
			this.getView().byId("idtext").setText("Link to post");
		}
		else
			this.getView().byId("idtext").setText("");
	},
	
	onRouteMatched : function(oEvent) {
		
		var oParameters = oEvent.getParameters();
		var id = oParameters.arguments.postId;
		var pathModel = "http://localhost:8080/com.sap.crawler/webapi/facebook/posts/"+id;
		if (oParameters.name !== "postDetail") {
			return;
		}

		console.log(pathModel);
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.loadData(pathModel,"",false);
		this.printDetails(JSON.parse(oModel.getData().Post[0]));
		
		console.log(id)
	}

});
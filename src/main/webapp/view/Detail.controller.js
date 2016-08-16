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
		//sap.ui.core.BusyIndicator.hide();
	},
	
	onRouteMatched : function(oEvent) {
		
		var oParameters = oEvent.getParameters();
		var id = oParameters.arguments.postId;
		var pathModel = "http://localhost:8080/com.sap.crawler/webapi/posts/"+id;
		//var pathModel = "http://localhost:8080/com.sap.crawler/getdata?&api=facebook&request=postsDetails&postId="+id;
		if (oParameters.name !== "postDetail") {
			return;
		}
	
		//sap.ui.core.BusyIndicator.show(0);
		//this.getView().setBusy(true);
		console.log(pathModel);
		var oModel = new sap.ui.model.json.JSONModel();
		//oModel.attachRequestCompleted(this.printDetails(oModel.getData()));
		oModel.loadData(pathModel,"",false);
		this.printDetails(JSON.parse(oModel.getData().Post[0]));
		//this.getView().setBusy(false);
		
		console.log(id)
	}
	
//	bindView : function(sProductPath) {
//		var oView = this.getView();
//		oView.bindElement(sProductPath);
//
//		// Check if the data is already on the client
//		if (!oView.getModel().getData(sProductPath)) {
//
//			// Check that the product specified actually was found.
//			oView.getElementBinding().attachEventOnce("dataReceived",
//					jQuery.proxy(function() {
//						var oData = oView.getModel().getData(sProductPath);
//						if (!oData) {
//							this.showEmptyView();
//							this.fireDetailNotFound();
//						} else {
//							this.fireDetailChanged(sProductPath);
//						}
//					}, this));
//		} else {
//			this.fireDetailChanged(sProductPath);
//		}
//
//	},

});
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
	
	onRouteMatched : function(oEvent) {
		var oParameters = oEvent.getParameters();
		var id = oParameters.arguments.postId;
		var pathModel = "http://localhost:8080/com.sap.crawler/getdata?&api=facebook&request=postsDetails&postId="+id;

		if (oParameters.name !== "postDetail") {
			return;
		}

		console.log(pathModel);
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.loadData(pathModel, "", false);
		
		if(oModel.getData().Post[0].name!="")
			this.getView().byId("nametext").setText("Name: "+oModel.getData().Post[0].name);
		else
			this.getView().byId("nametext").setText("");
		
		if(oModel.getData().Post[0].description!="")
			this.getView().byId("descriptiontext").setText("Description: "+oModel.getData().Post[0].description);
		else
			this.getView().byId("descriptiontext").setText("");
		
		if(oModel.getData().Post[0].message!="")
			this.getView().byId("messagetext").setText("Message: "+oModel.getData().Post[0].message);
		else
			this.getView().byId("messagetext").setText("");
		
		if(oModel.getData().Post[0].linkId!=""){
			this.getView().byId("idtext").setHref("http://"+oModel.getData().Post[0].linkId);
			this.getView().byId("idtext").setText("Link to post: "+oModel.getData().Post[0].linkId);
		}
		else
			this.getView().byId("idtext").setText("");
		console.log(id)
	},
	
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
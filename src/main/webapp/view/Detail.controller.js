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
		// if(sap.ui.Device.system.phone) {
		// //don't wait for the master on a phone
		// this.oInitialLoadFinishedDeferred.resolve();
		// } else {
		// this.getView().setBusy(true);
		// this.getEventBus().subscribe("Master",
		// "InitialLoadFinished", this.onMasterLoaded, this);
		// }

		this.getRouter().attachRoutePatternMatched(this.onRouteMatched, this);
	},
	
//	findCorrespondingIndex : function(dataArray, idFromLink){
//		length=dataArray.length;
//		var i=0;
//		for(i=0;i<length;i++){
//			if(dataArray[i].id == idFromLink)
//				return i;
//		}
//		return 0;
//	},

	onRouteMatched : function(oEvent) {

		//get model and grab the saved value from searchField(located in master view), 
		//which now is saved in model
		//var val = sap.ui.getCore().getModel("searchModel");
		//console.log(val.getJSON().searchValue);

		var oParameters = oEvent.getParameters();
		var id = oParameters.arguments.postId;
		var pathModel = "http://localhost:8080/com.sap.crawler/getdata?&api=facebook&request=postsDetails&postId="+id;

		if (oParameters.name !== "postDetail") {
			return;
		}

		console.log(pathModel);
		//console.log(this.getView().byId("servlet"));
		//var api = "&api=facebook";
		
		var oModel = new sap.ui.model.json.JSONModel();
		// oModel.loadData("json/plants.json", false);
		oModel.loadData(pathModel, "", false);
		//this.getView().setModel(oModel);
		// sap.ui.getCore().setModel(oModel,"MAIN");
		
		//var dataArray = oModel.getData().PostDetails;
		
		//arrayIndex = this.findCorrespondingIndex(dataArray, id);
		//console.log(arrayIndex);
		
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

		/*
		 * //jQuery.when(this.oInitialLoadFinishedDeferred).then(jQuery.proxy(function () {
		 * var oView = this.getView();
		 *  // when detail navigation occurs, update the binding
		 * context if (oParameters.name !== "userDetail") {
		 * return; }
		 * 
		 * console.log("entered on route matched"); var
		 * sProductPath = "/" + oParameters.arguments.product;
		 * this.bindView(sProductPath);
		 * 
		 * var oIconTabBar = oView.byId("idIconTabBar");
		 * oIconTabBar.getItems().forEach(function(oItem) {
		 * oItem.bindElement(sap.ui.demo.tdg.util.Formatter.uppercaseFirstChar(oItem.getKey()));
		 * });
		 *  // Which tab? var sTabKey =
		 * oParameters.arguments.tab || "supplier";
		 * this.getEventBus().publish("Detail", "TabChanged", {
		 * sTabKey : sTabKey });
		 * 
		 * if (oIconTabBar.getSelectedKey() !== sTabKey) {
		 * oIconTabBar.setSelectedKey(sTabKey); } //}, this));
		 */
	},
	bindView : function(sProductPath) {
		var oView = this.getView();
		oView.bindElement(sProductPath);

		// Check if the data is already on the client
		if (!oView.getModel().getData(sProductPath)) {

			// Check that the product specified actually was found.
			oView.getElementBinding().attachEventOnce("dataReceived",
					jQuery.proxy(function() {
						var oData = oView.getModel().getData(sProductPath);
						if (!oData) {
							this.showEmptyView();
							this.fireDetailNotFound();
						} else {
							this.fireDetailChanged(sProductPath);
						}
					}, this));
		} else {
			this.fireDetailChanged(sProductPath);
		}

	},
});
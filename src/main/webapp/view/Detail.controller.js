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

	onRouteMatched : function(oEvent) {

		//get model and grab the saved value from searchField(located in master view), 
		//which now is saved in model
		//var val = sap.ui.getCore().getModel("searchModel");
		//console.log(val.getJSON().searchValue);

		var oParameters = oEvent.getParameters();
		var pathModel = "http://localhost:8081/com.sap.crawler/getdata";

		if (oParameters.name !== "userDetail") {
			return;
		}

		console.log(pathModel);
		console.log(this.getView().byId("servlet"));
		var api = "&api=facebook";
		var oModel = new sap.ui.model.json.JSONModel();
		// oModel.loadData("json/plants.json", false);
		oModel.loadData(pathModel + "?" + api + "&me", "", false);
		// sap.ui.getCore().setModel(oModel,"MAIN");
		this.getView().byId("nametext").setText(oModel.getData().name);
		this.getView().byId("hometowntext").setText(oModel.getData().hometown.name);
		this.getView().byId("firstnametext").setText(oModel.getData().first_name);
		this.getView().byId("idtext").setText(oModel.getData().id);
		this.getView().byId("birthdaytext").setText(oModel.getData().birthday);
		this.getView().byId("gendertext").setText(oModel.getData().gender);
		this.getView().byId("emailtext").setText(oModel.getData().email);

		var id = oParameters.arguments.userId;
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
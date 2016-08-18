sap.ui.controller("sap.ui.demo.myFiori.view.StackOvDetail", {

	getEventBus : function() {
		var sComponentId = sap.ui.core.Component.getOwnerIdFor(this.getView());
		return sap.ui.component(sComponentId).getEventBus();
	},

	getRouter : function() {
		return sap.ui.core.UIComponent.getRouterFor(this);
	},

	handleNavButtonPress : function(evt) {
		this._oRouter.navTo("StackOvMaster");
	},

	onInit : function() {
		this.oInitialLoadFinishedDeferred = jQuery.Deferred();
		this.getRouter().attachRoutePatternMatched(this.onRouteMatched, this);
	},

	printDetails : function(data){
		if(data.title != "") {
			this.getView().byId("titletext").setText("Title: " + data.title);
		} else {
			this.getView().byId("titletext").setText("");
		}
		
		if(data.creationDate != "") {
			this.getView().byId("creationDatetext").setText("Creation Date: " + data.creationDate);
		} else {
			this.getView().byId("creationDatetext").setText("");
		}
		
		if(data.tags != ""){
			this.getView().byId("tagtext").setText("Tags: " + data.tags);
		}else {	
			this.getView().byId("tagtext").setText("");
		}
		
		if(data.ownerName != "") {
			this.getView().byId("ownerNametext").setText("Owner Name: " + data.ownerName);
		} else {
			this.getView().byId("ownerNametext").setText("");
		}
	},
	
	onRouteMatched : function(oEvent) {
		
		var oParameters = oEvent.getParameters();
		var id = oParameters.arguments.qId;

		var pathModel = "http://localhost:8080/com.sap.crawler/webapi/stackov/questions/"+id;
		if (oParameters.name !== "qDetail") {
			return;
		}

		console.log(pathModel);
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.loadData(pathModel,"",false);
		this.printDetails(oModel.getData().Question[0]);
		
		console.log(id)
	}

});
jQuery.sap.require("sap.ui.core.routing.Router");
jQuery.sap.require("sap.m.routing.RouteMatchedHandler");
jQuery.sap.declare("sap.ui.demo.myFiori.MyRouter");

sap.ui.core.routing.Router.extend("sap.ui.demo.myFiori.MyRouter", {

	constructor : function() {
		console.log("inside router constructor");
		sap.ui.core.routing.Router.apply(this, arguments);
		this.oRouteMatchedHandler = new sap.m.routing.RouteMatchedHandler(this);
		console.log(this.oRouteMatchedHandler);
	},

	myNavBack : function(sRoute, mData) {
		var oHistory = sap.ui.core.routing.History.getInstance();
		var sUrl = this.getURL(sRoute, mData);
		var sDirection = oHistory.getDirection(sUrl);
		if("Backwards"===sDirection){
			window.history.go(-1);
		}
		else{
			var bReplace = true;
			this.navTo(sRoute, mData, bReplace);
		}
	},

	myNavToWithoutHash : function (viewName, viewType, master, data) {
		var oSplitApp = sap.ui.getCore().byId("splitApp");

		// Load view, add it to the page aggregation, and navigate to it
		var oView = this.getView(viewName, viewType);
		oSplitApp.addPage(oView, master);
		oSplitApp.to(oView.getId(), "show",data);
	}

//	backWithoutHash : function (oCurrentView, bIsMaster) {
//		var sBackMethod = bIsMaster ? "backMaster" : "backDetail";
//		this._findSplitApp(oCurrentView)[sBackMethod]();
//	},
//	
//	destroy : function() {
//		sap.ui.core.routing.Router.prototype.destroy.apply(this, arguments);
//		this._oRouteMatchedHandler.destroy();
//	},
//
//	_findSplitApp : function(oControl) {
//		sAncestorControlName = "idAppControl";
//
//		if (oControl instanceof sap.ui.core.mvc.View && oControl.byId(sAncestorControlName)) {
//			return oControl.byId(sAncestorControlName);
//		}
//
//		return oControl.getParent() ? this._findSplitApp(oControl.getParent(), sAncestorControlName) : null;
//	}

});
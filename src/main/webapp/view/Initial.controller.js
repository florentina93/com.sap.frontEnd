sap.ui.controller("sap.ui.demo.myFiori.view.Initial", {

		getEventBus : function () {
			var sComponentId = sap.ui.core.Component.getOwnerIdFor(this.getView());
			return sap.ui.component(sComponentId).getEventBus();
		},

		getRouter : function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
	
	onInit:function(){
		
		this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		console.log("in init "+this._oRouter);
		
	    if (sap.ui.Device.system.phone) {
			return;
	}
	},
	
	onPressFacebook:function(evt){
		this._oRouter.navTo("FacebookMaster");
	},
	
	onPressStackOv:function(evt){
		this._oRouter.navTo("StackOvMaster");
	},
		
		processRequest : function (e) {
		    if (request.readyState == 4 && request.status == 200) {
		        alert(request.responseText);
		    }
		},
});
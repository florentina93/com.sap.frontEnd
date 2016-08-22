sap.ui.controller("sap.ui.demo.myFiori.view.InitialMaster", {

		getRouter : function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
	
		onInit:function(){
			
			console.log("in init "+this.getRouter());
			
		    if (sap.ui.Device.system.phone) {
				return;
		    }
		    
		},
	
		onPressFacebook:function(evt){
			this.getRouter().navTo("FacebookMaster");
		},
		
		onPressStackOv:function(evt){
			this.getRouter().navTo("StackOvMaster");
		},		
});
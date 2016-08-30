sap.ui.controller("sap.ui.demo.myFiori.view.FacebookDetail", {

	getRouter : function() {
		return sap.ui.core.UIComponent.getRouterFor(this);
	},

	handleNavButtonPress : function(evt) {
		this.getRouter().navTo("Master");

	},

	onInit : function() {
		this.oInitialLoadFinishedDeferred = jQuery.Deferred();
		this.getRouter().attachRoutePatternMatched(this.onRouteMatched, this);
	},

	printDetails : function(data){
		if(data.name!=null)
			this.getView().byId("nametext").setText("Name: "+data.name);
		else
			this.getView().byId("nametext").setText("");
		
		if(data.picture!=null){
			this.getView().byId("image").setSrc(data.picture);
			this.getView().byId("image").setHeight("200px");
		}
		else{
			this.getView().byId("image").setSrc("");
			this.getView().byId("image").setHeight("0px");
		}
		
		if(data.story!=null)
			this.getView().byId("storytext").setText("Story: "+data.story);
		else
			this.getView().byId("storytext").setText("");
		
		if(data.from!=null && data.from.name !=null)
			this.getView().byId("fromtext").setText("Posted by: "+data.from.name);
		else
			this.getView().byId("fromtext").setText("");
		
		if(data.description!=null)
			this.getView().byId("descriptiontext").setText("Description: "+data.description);
		else
			this.getView().byId("descriptiontext").setText("");
		
		if(data.message!=null)
			this.getView().byId("messagetext").setText("Message: "+data.message);
		else
			this.getView().byId("messagetext").setText("");
		
		if(data.id!=null){
			this.getView().byId("idtext").setText("http://fb.com/"+data.id);
			this.getView().byId("idtext").setHref("http://fb.com/"+data.id);		
		}
		else
			this.getView().byId("idtext").setText("");
	},
	
	onRouteMatched : function(oEvent) {
		
		var oParameters = oEvent.getParameters();
		var id = oParameters.arguments.pId;
		var pathModel = "http://localhost:8080/com.sap.crawler/webapi/facebook/posts/Id/"+id;
		if (oParameters.name !== "postDetail") {
			return;
		}

		console.log(pathModel);
		var oModel = new sap.ui.model.json.JSONModel();
		facebookController=this;
		facebookController.getView().setBusy(true);
		oModel.attachRequestCompleted(function() {
			facebookController.getView().setBusy(false);
			facebookController.printDetails(oModel.getData());
			console.log(oModel.getData());
	    });
		oModel.loadData(pathModel);
				
		console.log(id)
	}

});
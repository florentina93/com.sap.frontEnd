sap.ui.controller("sap.ui.demo.myFiori.view.StackOvDetail", {

	getRouter : function() {
		return sap.ui.core.UIComponent.getRouterFor(this);
	},

	handleNavButtonPress : function(evt) {
		this.getRouter().navTo("StackOvMaster");
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
			this.getView().byId("creationDatetext").setText("Creation Date: " + new Date(data.creationDate));
			console.log(new Date(data.creationDate));
			
		} else {
			this.getView().byId("creationDatetext").setText("");
		}
		
		if(data.answerCount != "") {
			this.getView().byId("answerCounttext").setText("Nr. of answers: " + data.answerCount);			
		} else {
			this.getView().byId("answerCounttext").setText("Nr. of answers: 0");	
		}
		
		if(data.tags != null){
			this.getView().byId("tagtext").setText("Tags: " + data.tags);
		}else {	
			this.getView().byId("tagtext").setText("");
		}
		
		
		if(data.owner.displayName != "") {
			this.getView().byId("ownerNametext").setText("Owner Name: " + data.owner.displayName);
		} else {
			this.getView().byId("ownerNametext").setText("");
		}
		
		if(data.questionId != "" && data.title != ""){
//			var title = data.title;
//			title.replace(" ", '-');
			this.getView().byId("questionLinktext").setText("http://stackoverflow.com/questions/"+data.questionId+"/"+data.title);
			this.getView().byId("questionLinktext").setHref("http://stackoverflow.com/questions/"+data.questionId+"/"+data.title);
			
			console.log("http://stackoverflow.com/questions/"+data.questionId+"/"+data.title);
		}else {	
			this.getView().byId("questionLinktext").setText("");
		}
		
		if(data.body != "") {
			this.getView().byId("bodytext").setText("Question Body: " + data.body);
		} else {
			this.getView().byId("bodytext").setText("");
		}
	},
	
	onRouteMatched : function(oEvent) {
		
		var oParameters = oEvent.getParameters();
		var id = oParameters.arguments.qId;
		var pathModel = "http://localhost:8080/com.sap.crawler/webapi/stackov/questions/Id/"+id;
		if (oParameters.name !== "questionDetail") {
			return;
		}

		console.log(pathModel);
		var oModel = new sap.ui.model.json.JSONModel();
		stackOvController = this;
		stackOvController.getView().setBusy(true);
		oModel.attachRequestCompleted(function() {
			stackOvController.getView().setBusy(false);
			stackOvController.printDetails(oModel.getData());
			console.log(oModel.getData());
		});
		oModel.loadData(pathModel);
		
		console.log(id)
	}

});
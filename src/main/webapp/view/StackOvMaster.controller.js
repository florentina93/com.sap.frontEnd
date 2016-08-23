sap.ui.controller("sap.ui.demo.myFiori.view.StackOvMaster", {

		getRouter : function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
	
		onInit:function(){
			console.log("in stackOv");
			console.log("in master "+this.getRouter());
			
		    if (sap.ui.Device.system.phone) {
				return;
		    }
		},
		
		handleNavButtonPress : function(evt) { 
			this.getRouter().navTo("InitialDetail");
			this.getRouter().navTo("InitialMaster");  
			console.log("From StackOverFlow to Initial");
		},
	
		handleListItemPress : function (evt) {
			var context = evt.getSource().getBindingContext(),
				entry = context.getModel().getProperty(context.getPath());
			console.log(this._oQuery);
			this.getRouter().navTo("questionDetail",{qId:entry.id, tName:this._oQuery});
		},
	
		handleSearch : function(evt){
			var query = evt.getParameter("query");
			console.log("Query is: " + query);
			//console.log(escape(this.getView().byId("radioGroup").getSelectedButton().getText()));
			
			var radioActive=this.getView().byId("radioGroup").getSelectedButton();
			var radioName = radioActive.getId().substring(17, radioActive.getId().length);
			console.log(radioName);
			
			if(query && query.length > 0 && (radioActive)) {
			
				this.getView().byId("list").setBusy(true);
				var oModel = new sap.ui.model.json.JSONModel();
				var pathModel;
				
				this._oQuery=query;
				if(radioActive.getId().substring(12, radioActive.getId().length)!="radioTag") this._oQuery="allTags";
				pathModel="http://localhost:8080/com.sap.crawler/webapi/stackov/questions/"+radioName+"?query="+query;
				
				var stackOvController=this;
				oModel.attachRequestCompleted(function() {
					stackOvController.getView().byId("list").setBusy(false);
					console.log(oModel.getData());
			    });
				oModel.loadData(pathModel);	
				console.log(pathModel);
				this.getView().setModel(oModel);
			}
		}

});
sap.ui.controller("sap.ui.demo.myFiori.view.FacebookMaster", {

		getRouter : function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
	
		onInit:function(){
			
			console.log("in master "+this.getRouter());
			
		    if (sap.ui.Device.system.phone) {
				return;
		    }	   
		},
		
		handleNavButtonPress : function(evt) {
			this.getRouter().navTo("InitialDetail");
			this.getRouter().navTo("InitialMaster");  
			console.log("From Facebook to Initial");
		},
		
		handleListItemPress : function (evt) {
			var context = evt.getSource().getBindingContext(),
				entry = context.getModel().getProperty(context.getPath());
			
			this.getRouter().navTo("postDetail",{pId:entry.id} );
		},
		
		handleSearch : function(evt){
			var query = evt.getParameter("query");
			console.log("Query is: " + query);
			
			var descriptionButton = this.getView().byId("radioDescription").getSelected();
			var nameButton = this.getView().byId("radioName").getSelected();
			var messageButton = this.getView().byId("radioMessage").getSelected();
			var linkButton = this.getView().byId("radioLink").getSelected();
			console.log(descriptionButton);

			if(query && query.length > 0 && (descriptionButton || nameButton || messageButton || linkButton)) {
				
				this.getView().byId("list").setBusy(true);
				var oModel = new sap.ui.model.json.JSONModel();
				var pathModel = "http://localhost:8080/com.sap.crawler/webapi/facebook/posts";
				var facebookController=this;
				oModel.attachRequestCompleted(function() {
					facebookController.getView().byId("list").setBusy(false);
					console.log(oModel.getData());
			    });
				oModel.loadData(pathModel);		
				this.getView().setModel(oModel);
				
				var aFilters = [];
				var filterName;
				var filterDesc;
				var filterLink;
				var filterMessage;
				
				 
				if(descriptionButton == true) {
					filterDesc = new sap.ui.model.Filter("description", sap.ui.model.FilterOperator.Contains, query);
					console.log("Description selected, search by description!");
					aFilters.push(filterDesc);
				} 
				if(nameButton == true) {
					filterName = new sap.ui.model.Filter("name", sap.ui.model.FilterOperator.Contains, query);
					aFilters.push(filterName);
				}
				if (messageButton == true) {
					filterMessage = new sap.ui.model.Filter("message", sap.ui.model.FilterOperator.Contains, query);
					aFilters.push(filterMessage);
				}
				if (linkButton == true) {
					filterLink = new sap.ui.model.Filter("linkId", sap.ui.model.FilterOperator.Contains, query);
					aFilters.push(filterLink);
				}
				
				
				var list = this.getView().byId("list");
				var binding = list.getBinding("items");
				binding.filter(aFilters);
			}
		},
});
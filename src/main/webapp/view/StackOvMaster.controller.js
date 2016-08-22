sap.ui.controller("sap.ui.demo.myFiori.view.StackOvMaster", {

		getRouter : function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
	
		onInit:function(){
			console.log("in stackOv");
			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			console.log("in master "+this._oRouter);
			
		    if (sap.ui.Device.system.phone) {
				return;
		    }
		},
		
		handleNavButtonPress : function(evt) { 
			this._oRouter.navTo("InitialDetail");
			this._oRouter.navTo("InitialMaster");  
			console.log("From StackOverFlow to Initial");
		},
	
		handleListItemPress : function (evt) {
			var context = evt.getSource().getBindingContext(),
				entry = context.getModel().getProperty(context.getPath());
			console.log(this._oQuery);
			this._oRouter.navTo("questionDetail",{qId:entry.id, tName:this._oQuery});
		},
	
		handleSearch : function(evt){
			this.getView().byId("list").setBusy(true);
			var oModel = new sap.ui.model.json.JSONModel();
			
			var tagButton = this.getView().byId("radioTag").getSelected();
			var pathModel;
			
			var query = evt.getParameter("query");
			console.log(query);
			this._oQuery=query;
			if(tagButton==false) this._oQuery="allTags";
			pathModel="http://localhost:8080/com.sap.crawler/webapi/stackov/questions";
			if((tagButton==true) && (query && query.length > 0)){
				pathModel = "http://localhost:8080/com.sap.crawler/webapi/stackov/questions?tag="+query;
			}
			
			var this1=this;
			oModel.attachRequestCompleted(function() {
				this1.getView().byId("list").setBusy(false);
				console.log(oModel.getData());
		    });
			oModel.loadData(pathModel);	
			console.log(pathModel);
			this.getView().setModel(oModel);
			
			var aFilters = [];
			
			var titleButton = this.getView().byId("radioTitle").getSelected();
			var ownerNameButton = this.getView().byId("radioOwnerName").getSelected();
			var creationDateButton = this.getView().byId("radioCreationDate").getSelected();
			
			if(query && query.length > 0) {
				if(titleButton == true) {
					var filterTitle = new sap.ui.model.Filter("title", sap.ui.model.FilterOperator.Contains, query);
					aFilters.push(filterTitle);
				} 

				if(creationDateButton == true) {
					var filterCr = new sap.ui.model.Filter("creationDate", sap.ui.model.FilterOperator.Contains, query);
					aFilters.push(filterCr);
				}
				if(ownerNameButton == true) {
					var filterOwner = new sap.ui.model.Filter("ownerName", sap.ui.model.FilterOperator.Contains, query);
					aFilters.push(filterOwner);
				}
			}
			
			var list = this.getView().byId("list");
			var binding = list.getBinding("items");
			binding.filter(aFilters);
		},

});
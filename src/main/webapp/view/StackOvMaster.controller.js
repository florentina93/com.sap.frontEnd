sap.ui.controller("sap.ui.demo.myFiori.view.StackOvMaster", {

		getEventBus : function () {
			var sComponentId = sap.ui.core.Component.getOwnerIdFor(this.getView());
			return sap.ui.component(sComponentId).getEventBus();
		},

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
			
			this._oRouter.navTo("questionDetail",{qId:entry.id} );
		},
		
		processRequest : function (e) {
		    if (request.readyState == 4 && request.status == 200) {
		        alert(request.responseText);
		    }
		},
	
		handleSearch : function(evt){
			this.getView().byId("list").setBusy(true);
			var oModel = new sap.ui.model.json.JSONModel();
			var pathModel = "http://localhost:8080/com.sap.crawler/webapi/stackov/questions";
			var this1=this;
			oModel.attachRequestCompleted(function() {
				this1.getView().byId("list").setBusy(false);
				console.log(oModel.getData());
		    });
			oModel.loadData(pathModel);		
			this.getView().setModel(oModel);
			
			var aFilters = [];
			var query = evt.getParameter("query");
			console.log(query);
			
			var titleButton = this.getView().byId("radioTitle").getSelected();
			var tagButton = this.getView().byId("radioTag").getSelected();
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
//				if(tagButton == true) {
//				var filterTag = new sap.ui.model.Filter("tags", sap.ui.model.FilterOperator.Contains, query);
//				aFilters.push(filterTag);
//			}
			}
			
			var list = this.getView().byId("list");
			var binding = list.getBinding("items");
			binding.filter(aFilters);
		},

});
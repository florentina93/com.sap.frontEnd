sap.ui.controller("sap.ui.demo.myFiori.view.Master", {

		getEventBus : function () {
			var sComponentId = sap.ui.core.Component.getOwnerIdFor(this.getView());
			return sap.ui.component(sComponentId).getEventBus();
		},

		getRouter : function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
	
	onInit:function(){
		
		this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		console.log("in master "+this._oRouter);
		
	    if (sap.ui.Device.system.phone) {
			return;
	}
	   // this.getRouter().attachRoutePatternMatched(this.onRouteMatched, this);
	},
	

//	onRouteMatched : function(oEvent) {		
//		var sName = oEvent.getParameter("name");
//
//			if (sName !== "main") {
//				return;
//			}
//
//			//Load the detail view in desktop
//			this._oRouter.myNavToWithoutHash({ 
//				currentView : this.getView(),
//				targetViewName : "sap.ui.demo.myFiori.view.Detail",
//				targetViewType : "XML"
//			});
//
//			//Wait for the list to be loaded once
//			this.waitForInitialListLoading(function () {
//
//				//On the empty hash select the first item
//				this.selectFirstItem();
//
//			});
//
//		},
	
	handleListItemPress : function (evt) {
		var context = evt.getSource().getBindingContext(),
			entry = context.getModel().getProperty(context.getPath());
		
		this._oRouter.navTo("postDetail",{postId:entry.id} );
	},
		
		processRequest : function (e) {
		    if (request.readyState == 4 && request.status == 200) {
		        alert(request.responseText);
		    }
		},
	
		handleSearch : function(evt){
			this.getView().byId("list").setBusy(true);
			var oModel = new sap.ui.model.json.JSONModel();
			var pathModel = "http://localhost:8080/com.sap.crawler/webapi/facebook/posts/allDetails";
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
			
			var descriptionButton = this.getView().byId("radioDescription").getSelected();
			var nameButton = this.getView().byId("radioName").getSelected();
			var messageButton = this.getView().byId("radioMessage").getSelected();
			var linkButton = this.getView().byId("radioLink").getSelected();
			console.log(descriptionButton);
			
			var filterName;
			var filterDesc;
			var filterLink;
			var filterMessage;
			
			if(query && query.length > 0) {
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
			}
			
			var list = this.getView().byId("list");
			var binding = list.getBinding("items");
			binding.filter(aFilters);
		},
		
		onSearch : function (evt) {
					
		}
});
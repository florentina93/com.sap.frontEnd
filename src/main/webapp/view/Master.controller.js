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
		
		//Initialize model to save data from searchField needed to pass it as a parameter in backend link
//		this.myModel = new sap.ui.model.json.JSONModel();
//		this.myModel.setProperty("name","andi");
//		console.log(this.myModel.getProperty("/name"));
//		//console.log("--------------------------....----");
	    if (sap.ui.Device.system.phone) {
			return;
	}
	   // this.getRouter().attachRoutePatternMatched(this.onRouteMatched, this);
	},
	

	onRouteMatched : function(oEvent) {		
		var sName = oEvent.getParameter("name");

			if (sName !== "main") {
				return;
			}

			//Load the detail view in desktop
			this._oRouter.myNavToWithoutHash({ 
				currentView : this.getView(),
				targetViewName : "sap.ui.demo.myFiori.view.Detail",
				targetViewType : "XML"
			});

			//Wait for the list to be loaded once
			this.waitForInitialListLoading(function () {

				//On the empty hash select the first item
				this.selectFirstItem();

			});

		},
	
	handleListItemPress : function (evt) {
		var context = evt.getSource().getBindingContext(),
			entry = context.getModel().getProperty(context.getPath());
		
		this._oRouter.navTo("userDetail",{userId:entry.FriendId} );
	},
	
//		handleSearch : function (evt) {      
//				// create model filter   
//			var filters = [];   
//			var query = evt.getParameter("query"); 
//			
//			if (query && query.length > 0) {    
//				var filter1 = new sap.ui.model.Filter("FriendName", sap.ui.model.FilterOperator.Contains, query);
//				var filter2 = new sap.ui.model.Filter("FriendId", sap.ui.model.FilterOperator.Contains, query);
//				var filter3 = new sap.ui.model.Filter("FriendWorkPlace", sap.ui.model.FilterOperator.Contains, query);
//				var allFilters = new sap.ui.model.Filter([filter1, filter2,filter3],false);
//				filters.push(allFilters);   
//				}     
//			
//				// update list binding   
//			var list = this.getView().byId("list");   
//			var binding = list.getBinding("items");
//			binding.filter(filters);  
//		},
		
		processRequest : function (e) {
		    if (request.readyState == 4 && request.status == 200) {
		        alert(request.responseText);
		    }
		},
	
		handleSearch1 : function(evt){

			var button = this.getView().byId("radioname").getSelected();
			
			var context = evt.getSource().getBindingContext();
			this._oRouter.navTo("userDetailx", context);
			
			console.log('evt.getSource: ' + evt.getSource());
		    console.log('evt.getBindingContext: ' + evt.getSource().getBindingContext());
		    
		    console.log(this.getView().byId("servlet").getValue());
		    
		    //Create json that contains value from searchField and save JSON in model created in init
//		    var json = {};
//		    json.searchValue = this.getView().byId("servlet").getValue();
//		    this.myModel.setData(json);
//		    console.log("Am setat jsonu");
//		    sap.ui.getCore().setModel(this.myModel, "searchModel");
			//console.log(oModel.getData().name);
		}

	
	//handleListSelect : function (evt) {   
		//var context = evt.getParameter("listItem").getBindingContext();   
		//this.nav.to("Detail", context);  
	//}
});
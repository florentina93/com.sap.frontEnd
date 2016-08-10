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
		var api = "&api=facebook";
		var oModel = new sap.ui.model.json.JSONModel();
		var pathModel = "http://localhost:8080/com.sap.crawler/getdata";
		oModel.loadData(pathModel + "?" + api + "&friends", "", false);
		this.getView().setModel(oModel);
		
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
		
		this._oRouter.navTo("userDetail",{userId:entry.id} );
	},
		
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
});
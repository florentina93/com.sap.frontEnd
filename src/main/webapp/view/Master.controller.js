sap.ui.controller("sap.ui.demo.myFiori.view.Master", {

	handleListItemPress : function (evt) {
		var context = evt.getSource().getBindingContext();
		this.nav.to("Detail", context);
	},
	
		handleSearch : function (evt) {      
				// create model filter   
			var filters = [];   
			var query = evt.getParameter("query"); 
			
			if (query && query.length > 0) {    
				var filter1 = new sap.ui.model.Filter("FriendName", sap.ui.model.FilterOperator.Contains, query);
				var filter2 = new sap.ui.model.Filter("FriendId", sap.ui.model.FilterOperator.Contains, query);
				var filter3 = new sap.ui.model.Filter("FriendWorkPlace", sap.ui.model.FilterOperator.Contains, query);
				var allFilters = new sap.ui.model.Filter([filter1, filter2,filter3],false);
				filters.push(allFilters);   
				}     
			
				// update list binding   
			var list = this.getView().byId("list");   
			var binding = list.getBinding("items");
			binding.filter(filters);  
		},
		
		processRequest : function (e) {
		    if (request.readyState == 4 && request.status == 200) {
		        alert(request.responseText);
		    }
		},
	
		handleSearch1 : function(evt){
			// create a "json" Model
			var oModel = new sap.ui.model.json.JSONModel();
			// load data from URL
			oModel.loadData("http://localhost:8081/com.sap.crawler/testdata", "", false);
			sap.ui.getCore().setModel(oModel,"jsonModelName");
			//var data = JSON.stringify(oModel.getData());				
			var text = oModel.getData().name;

			//this.getView().byId("text").setText(text);	
			this.getView().byId("nametext").setText(oModel.getData().name);
			this.getView().byId("agetext").setText(oModel.getData().age);
//			this.getView().byId("firstnametext").setText(oModel.getData().first_name);	
//			this.getView().byId("idtext").setText(oModel.getData().id);	
//			this.getView().byId("birthdaytext").setText(oModel.getData().birthday);			
//			this.getView().byId("gendertext").setText(oModel.getData().gender);
//			this.getView().byId("sportstext").setText(oModel.getData().sports[0].name);
//			this.getView().byId("worktext").setText(oModel.getData().work[0].employer.name);
//			this.getView().byId("emailtext").setText(oModel.getData().email);
			
			var context = evt.getSource().getBindingContext();
			this.nav.to("Detail", context);
			
			console.log('evt.getSource: ' + evt.getSource());
		    console.log('evt.getBindingContext: ' + evt.getSource().getBindingContext());
			
		    var list = this.getView().byId("servlet");   
			var binding = list.getBinding("items");
			//binding.filter(filters); 
		    
			console.log(oModel.getData().name);
		}

	
	//handleListSelect : function (evt) {   
		//var context = evt.getParameter("listItem").getBindingContext();   
		//this.nav.to("Detail", context);  
	//}
});
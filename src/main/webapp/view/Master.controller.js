sap.ui.controller("sap.ui.demo.myFiori.view.Master", {

	handleListItemPress : function (evt) {
		var context = evt.getSource().getBindingContext();
		this.nav.to("Detail", context);
	},
		
//	processRequest : function (e) {
//	    if (request.readyState == 4 && request.status == 200) {
//	    	alert(request.responseText);
//		   }
//	},
	
		handleSearch : function(evt){
			// create a "json" Model
			var oModel = new sap.ui.model.json.JSONModel();
			
			// load data from URL
			oModel.loadData("http://localhost:8081/com.sap.crawler/getdata", "", false);
			sap.ui.getCore().setModel(oModel,"jsonModelName");	

			//this.getView().byId("text").setText(text);	
			this.getView().byId("nametext").setText(oModel.getData().name);
			this.getView().byId("emailtext").setText(oModel.getData().email);			
			this.getView().byId("idtext").setText(oModel.getData().id);	
			this.getView().byId("birthdaytext").setText(oModel.getData().birthday);			
			this.getView().byId("gendertext").setText(oModel.getData().gender);
			
//			var context = evt.getSource().getBindingContext();
//			this.nav.to("Detail", context);
//			
//			console.log('evt.getSource: ' + evt.getSource());
//		    console.log('evt.getBindingContext: ' + evt.getSource().getBindingContext());
//			
//		    var list = this.getView().byId("servlet");   
//			var binding = list.getBinding("items");
//		    
//			console.log(oModel.getData().name);
		}
});
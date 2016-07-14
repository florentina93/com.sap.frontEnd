sap.ui.controller("sap.ui.demo.myFiori.view.Detail", {

	handleNavButtonPress : function (evt) {
		this.nav.back("Master");		
	},

	 onInit: function() {
		 
		  var oModel = new sap.ui.model.json.JSONModel();
		  //oModel.loadData("json/plants.json", false);
		  oModel.loadData("http://localhost:8081/com.sap.crawler/getdata", "", false);
		  sap.ui.getCore().setModel(oModel,"MAIN");
		  },
	
	handleSearch : function(evt){
		oTable.setModel(sap.ui.getCore().getModel());
	}
});
sap.ui.controller("sap.ui.demo.myFiori.view.Detail", {

	handleNavButtonPress : function (evt) {
		this.nav.back("Master");		
	},

	handleSearch : function(evt){
		oTable.setModel(sap.ui.getCore().getModel());
	}
});
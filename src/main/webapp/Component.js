jQuery.sap.declare("sap.ui.demo.myFiori.Component");
jQuery.sap.require("sap.ui.demo.myFiori.MyRouter");
sap.ui.core.UIComponent.extend("sap.ui.demo.myFiori.Component",{
	metadata:{
		routing:{
			config:{
				routerClass:sap.ui.demo.myFiori.MyRouter,
				viewType:"XML",
				viewPath:"sap.ui.demo.myFiori.view",
				targetControl:"splitApp",
				clearTarger:false,
			},
			routes:[
			        {
			        	pattern:"",
			        	name:"main",
			        	view:"Master",
			        	targetAggregation:"masterPages",
			        },
			        {
			        	pattern:"Detail",
			        	name:"Detail",
			        	view:"Detail",
			        	targetAggregation:"detailPages",
			        	targetControl:"splitApp",
			        },
			        {
			        	pattern:"postDetail/{postId}",
			        	name:"postDetail",
			        	view:"Detail",
			        	targetAggregation:"detailPages",
			        },
			        {
			        	pattern:"postDetailx",
			        	name:"postDetailx",
			        	view:"Detail",
			        	targetAggregation:"detailPages",
			        },
			        ]
		}
	},

	init:function(){
		console.log("hi from inside the init method of the component");
		jQuery.sap.require("sap.ui.demo.myFiori.MyRouter");
		jQuery.sap.require("sap.m.routing.RouteMatchedHandler");
		sap.ui.core.UIComponent.prototype.init.apply(this, arguments);
		var router = this.getRouter();
		console.log(router);
		
		this.routeHandler = new sap.m.routing.RouteMatchedHandler(router);
		console.log("before init "+this.routeHandler);
		console.log(this.routeHandler);
		router.initialize();
	},
	
	destroy:function(){
		if(this.routeHandler){
			this.routeHandler.destroy();
		}
		sap.ui.core.UIComponent.prototype.destroy.apply(this, arguments);
	},
	
	createContent : function() {

		// create root view
		var oView = sap.ui.view({
			id : "app",
			viewName : "sap.ui.demo.myFiori.view.App",
			type : "JS",
			viewData : { component : this }
		});

//		// Using OData model to connect against a real service
//		var url = "/proxy/http/<server>:<port>/sap/opu/odata/sap/ZGWSAMPLE_SRV/";
//		var oModel = new sap.ui.model.odata.ODataModel(url, true, "<user>", "<password>");
//		oView.setModel(oModel);

		//set i18n model
		var i18nModel = new sap.ui.model.resource.ResourceModel({
				bundleUrl : "i18n/messageBundle.properties",
		});
		
		oView.setModel(i18nModel, "i18n");
		
		// Using a local model for offline development
		//var oModel = new sap.ui.model.json.JSONModel("model/mock.json");
		var oModel = new sap.ui.model.json.JSONModel("model/mock.json");
		oView.setModel(oModel);

		// done
		return oView;
	}
});
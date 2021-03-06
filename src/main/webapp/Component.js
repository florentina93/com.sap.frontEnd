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
			        	pattern:"stackovmaster",
			        	name:"StackOvMaster",
			        	view:"StackOvMaster",
			        	targetAggregation:"masterPages",
			        },
			        {
			        	pattern:"home",
			        	name:"InitialMaster",
			        	view:"InitialMaster",
			        	targetAggregation:"masterPages",
			        },
			        {
			        	pattern:"facebookmaster",
			        	name:"FacebookMaster",
			        	view:"FacebookMaster",
			        	targetAggregation:"masterPages",
			        },
			        {
			        	pattern:"facebookdetails/postid/{pId}",
			        	name:"postDetail",
			        	view:"FacebookDetail",
			        	targetAggregation:"detailPages",
			        },
			        {
			        	pattern:"stackoverdetails/questionid/{qId}",
			        	name:"questionDetail",
			        	view:"StackOvDetail",
			        	targetAggregation:"detailPages",
			        },

			        {
			        	pattern:"initialdetail",
			        	name:"InitialDetail",
			        	view:"InitialDetail",
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

		//set i18n model
		var i18nModel = new sap.ui.model.resource.ResourceModel({
				bundleUrl : "i18n/messageBundle.properties",
		});
		
		oView.setModel(i18nModel, "i18n");

		// done
		return oView;
	}
});
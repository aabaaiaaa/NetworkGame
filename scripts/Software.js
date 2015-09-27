Software = function(args){
	//private properties
	var name = args.name;
	var parameters = args.parameters;
	var sourceCode = null;
	var server = null;

	//pubilc methods
	this.setServer = function(hostServer){
		server = hostServer;
	};
	this.getServer = function(){
		return server;
	}
	this.setSourceCode = function(sourceCodeFunction){
		sourceCode = sourceCodeFunction.bind(this);
	};
	this.run = function(args){
		sourceCode(args);
	};
}
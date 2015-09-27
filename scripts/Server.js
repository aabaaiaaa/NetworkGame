Server = function(args){
	//private properties
	var name = args.name;
	var hardwareModules = [];
	var softwareModules = [];

	//public methods
	this.addHardware = function(hardwareModule){
		hardwareModule.setServer(this);
		hardwareModules.push(hardwareModule);
		return hardwareModule;
	};
	this.addSoftware = function(softwareModule){
		softwareModule.setServer(this);
		softwareModules.push(softwareModule);
		return softwareModule;
	}
	this.listConnectedServers = function(){
		var servers = [];
		$.each(listNics(), function(index, nic){
			servers.push(nic.getConnectedServer());
		});
		return servers;
	};
	this.getName = function(){
		return name;
	};

	//private methods
	var listNics = function(){
		var nics = [];
		$.each(hardwareModules, function(index, hardwareModule){
			if(hardwareModule instanceof Nic) {
				nics.push(hardwareModule);
			}
		});
		return nics;
	};


	//unknown yet
	// var nic = new Nic({ server: this });
	// var getDistanceFrom = function(targetServer){
	// 	return Math.floor((Math.random() * 10)+1);
	// };
}
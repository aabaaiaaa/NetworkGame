Packet = function(args){
	//private properties
	var originServer = args.server;
	var type = null;
	var payload = null;
	var destinationServer = null;
	var currentServer = originServer;
	var nextServer = null;
	var visitedServers = [];

	//public methods
	this.setType = function(packetType){
		type = packetType;
	};
	this.setPayload = function(data){
		payload = data;
	};
	this.setDestinationServer = function(targetServer){
		destinationServer = targetServer;
	};
	this.send = function(){
		addVisitedServer(originServer);
		var servers = currentServer.listConnectedServers();
		if(servers.length > 0){
			var destinationServerIdentified = false;
			$.each(servers, function(index, server){
				if(server == destinationServer) {
					destinationServerIdentified = true;
					return false;
				}
			});
			if(destinationServerIdentified){
				setTimeout((function(){
					console.log("Reached destination: " + destinationServer.getName() + " / " + payload);
					destinationServer.inboundPacket(this);
				}).bind(this), 2000);
			} else {
				var nextServer = getNextUnvisitedServer(servers);
				if(nextServer != null) {
					addVisitedServer(nextServer);
				} else {
					nextServer = servers[0];
				}
				setTimeout((function(){
					console.log(currentServer.getName() + " > " + nextServer.getName() + " / " + payload);
					currentServer = nextServer;
					this.send();
				}).bind(this), 2000);
			}
		}
	};
	this.needsResponse = function(){
		return (type == "TCP");
	};
	this.getOriginServer = function(){
		return originServer;
	};

	//private methods
	var addVisitedServer = function(targetServer){
		visitedServers.push(targetServer);
	};
	var getNextUnvisitedServer = function(servers){
		var nextServer = null;
		$.each(servers, function(index, server){
			if($.inArray(server, visitedServers) == -1){
				nextServer = server;
				return false;
			}
		});
		return nextServer;
	};


	// this.type = args.type;
	// this.nicDestination = args.destination;
	// this.nicOrigin = args.nic;
	// this.nicNextLocation = null;
	// this.nicCurrentLocation = args.nic;
	// this.payload = args.payload;
	// this.getDeliveryTime = function(){
	// 	return (this.nicCurrentLocation.cableLength);
	// },
	// this.getOriginNic = function(){
	// 	return this.nicOrigin;
	// },
	// this.getPayload = function(){
	// 	return this.payload;
	// },
	// this.send = function(){
	// 	this.nicNextLocation = this.nicCurrentLocation.getConnectedNic();
	// 	console.log("time to destination: " + this.getDeliveryTime());
	// 	setTimeout((function(){
	// 		//TODO: scoping issue here - use jquery possibly
	// 		console.log("reached destination server");
	// 		this.nicCurrentLocation = this.nicDestination;
	// 		this.nicNextLocation.inboundPacket(this);
	// 	}).bind(this), this.getDeliveryTime() * 1000);
	// },
	// this.needsResponse = function(){
	// 	return (this.type == "TCP");
	// }
};
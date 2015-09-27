Packet = function(args){
	//private properties
	var originServer = args.server;
	var type = null;
	var payload = null;
	var destinationServer = null;
	var currentServer = originServer;
	var nextServer = null;

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
		var servers = currentServer.listConnectedServers();
		if(servers.length > 0){
			var destinationServerIdentified = false;
			$.each(servers, function(index, server){
				if(server == destinationServer) {
					setTimeout((function(){
						console.log("Reached destination: " + destinationServer.getName());
					}).bind(this), 2000);
					destinationServerIdentified = true;
					return false;
				}
			});
			if(!destinationServerIdentified){
				setTimeout((function(){
					console.log(currentServer.getName() + " > " + servers[0].getName());
					currentServer = servers[0];
					this.send();
				}).bind(this), 2000);
			}
		}
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
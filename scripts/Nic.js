Nic = function(){
	//private properties
	var connection = null;
	var server = null;

	//public methods
	this.setConnection = function(targetNic){
		console.log("ACK: " + server.getName() + " > " + targetNic.getServer().getName());
		var targetNicConnection = targetNic.getConnection();
		if(targetNicConnection == null) {
			connection = targetNic;
			targetNic.setConnection(this);
			return true;
		} else if (targetNicConnection == this){
			connection = targetNic;
			console.log("CONN COMPLETE: " + server.getName() + " > " + targetNic.getServer().getName());
			return true;
		}
		return false;
	};
	this.getConnection = function(){
		return connection;
	};
	this.getConnectedServer = function(){
		return connection.getServer();
	};
	this.getServer = function(){
		return server;
	};
	this.setServer = function(hostServer){
		server = hostServer;
	};

	//private methods




	//unknown yet
	// this.server = args.server;
	// this.connectedTo = null;
	// this.cableLength = null;
	// this.connectTo = function(nic){
	// 	console.log("connect to");
	// 	this.connectedTo = nic;
	// 	this.cableLength = nic.acknowledgeNewConnection(this);
	// },
	// this.getConnectedNic = function(){
	// 	return this.connectedTo;
	// },
	// this.acknowledgeNewConnection = function(nic){
	// 	this.connectedTo = nic;
	// 	console.log("acknowledged connection");
	// 	var distance = this.server.getDistanceFrom(nic.server);
	// 	this.cableLength = distance;
	// 	return distance;
	// },
	// this.getServerConnectedTo = function(){
	// 	if(this.hasConnection()){
	// 		return this.connectedTo.server;
	// 	} else {
	// 		return null;
	// 	}
	// },
	// this.hasConnection = function(){
	// 	return (this.connectedTo != null);
	// },
	// this.sendTestPacket = function(){
	// 	// generate a packet and send to the connected device from this server's nic
	// 	// tell the packet where it needs to go
	// 	// tell it where it's come from
	// 	// tell it to go
	// 	var packet = new Packet({
	// 		type: "TCP",
	// 		nic: this,
	// 		destination: this.connectedTo,
	// 		payload: "PING MESSAGE"
	// 	});
	// 	packet.send();
	// },
	
	// this.inboundPacket = function(packet){
	// 	if(packet.needsResponse()){
	// 		this.sendResponsePacket(packet);
	// 	}
	// 	if(packet.nicDestination == this){
	// 		console.log("packet arrived at destination");
	// 		console.log("PAYLOAD: " + packet.getPayload());
	// 	} else {
	// 		console.log("forward on to another nic");
	// 	}
	// },
	// this.sendResponsePacket = function(packet){
	// 	var responsePacket = new Packet({
	// 		type: "ACK",
	// 		nic: this,
	// 		destination: packet.getOriginNic(),
	// 		payload: "ACK"
	// 	});
	// 	responsePacket.send();
	// }
}
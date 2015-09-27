Nic = function(args){
	this.server = args.server;
	this.connectedTo = null;
	this.cableLength = null;
	this.connectTo = function(nic){
		console.log("connect to");
		this.connectedTo = nic;
		this.cableLength = nic.acknowledgeNewConnection(this);
	},
	this.acknowledgeNewConnection = function(nic){
		this.connectedTo = nic;
		console.log("acknowledged connection");
		var distance = this.server.getDistanceFrom(nic.server);
		this.cableLength = distance;
		return distance;
	},
	this.getServerConnectedTo = function(){
		if(this.hasConnection()){
			return this.connectedTo.server;
		} else {
			return null;
		}
	},
	this.hasConnection = function(){
		return (this.connectedTo != null);
	},
	this.sendTestPacket = function(){
		// generate a packet and send to the connected device from this server's nic
		// tell the packet where it needs to go
		// tell it where it's come from
		// tell it to go
		var packet = new Packet({
			nic: this,
			destination: this.connectedTo,
			payload: "PING MESSAGE"
		});
		packet.send();
	},
	
	this.inboundPacket = function(packet){
		if(packet.nicDestination == this){
			console.log("packet arrived at destination");
		} else {
			console.log("forward on to another nic");
		}
	}
}
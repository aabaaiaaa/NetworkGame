app = new (function(){
	//private properties
	var status = "pre-init";
	var servers = [];

	//public methods
	this.init = function(){
		console.log("init: " + status);
	};
	this.getServers = function(){
		return servers;
	};
	this.tests = {
		abConnection: function(){
			
			var a = addServer({
				name: "A"
			});
			var aNic = a.addHardware(new Nic());
			
			var b = addServer({
				name: "B"
			});
			var bNic = b.addHardware(new Nic());

			aNic.setConnection(bNic);
			console.log("test 1 complete");


			var aSoftware = a.addSoftware(new Software({
				name: "PING Tool",
				parameters: "(destinationServer)"
			}));
			aSoftware.setSourceCode(function(args){
				var testPacket = new Packet({
					server: this.getServer()
				});
				testPacket.setType("TCP");
				testPacket.setPayload("test message");
				testPacket.setDestinationServer(args.destinationServer);
				testPacket.send();
			});
			aSoftware.run({
				destinationServer: b
			});
			console.log("test 2 complete");


			var bNic2 = b.addHardware(new Nic());
			var c = addServer({
				name: "C"
			});
			var cNic = c.addHardware(new Nic());
			bNic2.setConnection(cNic);
			aSoftware.run({
				destinationServer: c
			});
			console.log("test 3 complete");


			var cNic2 = c.addHardware(new Nic());
			var d = addServer({
				name: "D"
			});
			var dNic = d.addHardware(new Nic());
			cNic2.setConnection(dNic);
			aSoftware.run({
				destinationServer: d
			});
			console.log("test 4 complete");
		}
	};

	//private methods
	var addServer = function(args){
		var newServer = new Server(args);
		servers.push(newServer);
		return newServer;
	};
});
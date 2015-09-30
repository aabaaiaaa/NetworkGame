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
		generateTestCaseA: function(){
			generateServer("A", ["B"]);
			generateServer("C", ["B", "G", "D"]);
			generateServer("E", ["B", "D", "F"]);
			generateServer("H", ["F"]);
			generateServer("I", ["C"]);

			var aSoftware = generatedServerMapping["A"].addSoftware(new Software({
				name: "PING Tool"
			}));
			aSoftware.setSourceCode(function(args){
				var testPacket = new Packet({
					server: this.getServer()
				});
				testPacket.setType("TCP");
				testPacket.setPayload(args.data);
				testPacket.setDestinationServer(args.destinationServer);
				testPacket.send();
			});

			aSoftware.run({
				destinationServer: generatedServerMapping["I"],
				data: "data for I"
			});
		}
	};

	//private methods
	var addServer = function(args){
		var newServer = new Server(args);
		servers.push(newServer);
		return newServer;
	};
	var generatedServerMapping = {};
	var generateServer = function(serverName, serversConnected){
		serversConnected = serversConnected || [];
		generatedServerMapping[serverName] = addServer({
			name: serverName
		});
		if(serversConnected.length > 0){
			$.each(serversConnected, function(index, server){
				generatedServerMapping[server] = generatedServerMapping[server] || addServer({
					name: server
				});
				var xNic = generatedServerMapping[server].addHardware(new Nic());
				var aNic = generatedServerMapping[serverName].addHardware(new Nic());
				xNic.setConnection(aNic);
			});
		}
	};
});
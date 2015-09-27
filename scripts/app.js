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
				testPacket.setPayload(args.data);
				testPacket.setDestinationServer(args.destinationServer);
				testPacket.send();
			});
			aSoftware.run({
				destinationServer: b,
				data: "data for server B"
			});
			console.log("test 2 complete");


			var bNic2 = b.addHardware(new Nic());
			var c = addServer({
				name: "C"
			});
			var cNic = c.addHardware(new Nic());
			bNic2.setConnection(cNic);
			aSoftware.run({
				destinationServer: c,
				data: "data for server C"
			});
			console.log("test 3 complete");


			var cNic2 = c.addHardware(new Nic());
			var d = addServer({
				name: "D"
			});
			var dNic = d.addHardware(new Nic());
			cNic2.setConnection(dNic);
			aSoftware.run({
				destinationServer: d,
				data: "data for server D"
			});
			console.log("test 4 complete");


			var bNic3 = b.addHardware(new Nic());
			var e = addServer({
				name: "E"
			});
			var eNic = e.addHardware(new Nic());
			bNic3.setConnection(eNic);
			var eNic2 = e.addHardware(new Nic());
			var f = addServer({
				name: "F"
			});
			var fNic = f.addHardware(new Nic());
			eNic2.setConnection(fNic);
			aSoftware.run({
				destinationServer: f,
				data: "missing data for F - URGENT!"
			});
			console.log("test 5 complete");


			var cNic3 = c.addHardware(new Nic());
			var g = addServer({
				name: "G"
			});
			var gNic = g.addHardware(new Nic());
			cNic3.setConnection(gNic);
			aSoftware.run({
				destinationServer: g,
				data: "Find G quick!"
			});
			console.log("test 6 complete");
		},
		generateTestCaseA: function(){
			generateServer("A", ["B"]);
			generateServer("C", ["B", "G", "D"]);
			generateServer("E", ["B", "D", "F"]);

			var aSoftware = generatedServerMapping["A"].addSoftware(new Software({
				name: "PING Tool",
				parameters: "(destinationServer)"
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
				destinationServer: generatedServerMapping["F"],
				data: "data for F"
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
		var aNic = generatedServerMapping[serverName].addHardware(new Nic());
		if(serversConnected.length > 0){
			$.each(serversConnected, function(index, server){
				generatedServerMapping[server] = generatedServerMapping[server] || addServer({
					name: server
				});
				var xNic = generatedServerMapping[server].addHardware(new Nic());
				xNic.setConnection(aNic);
			});
		}
	};
});
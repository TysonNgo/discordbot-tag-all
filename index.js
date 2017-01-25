var Discord = require("discord.js");

var mybot = new Discord.Client();

mybot.on("message", function(message) {
	if (message.server.id === process.env.DISCORD_SERVER){
		if (/^@everyone/i.test(message.content)){
		    var members = message.server.members;
		    var memberIds = [];
		    var msgs = [""];
		    for (var key in members){
		    	if (!isNaN(key)){
		    		memberIds.push(members[key].id);
		    	}
		    }
		    memberIds.forEach(function(id){
		    	if (msgs[msgs.length-1].length+3+id.length <= 2000){
		    		msgs[msgs.length-1] += '<@'+id+'>';
		    	}else{
		    		msgs.push('<@'+id+'>');
		    	}
			});
			msgs.forEach(function(msg){
				// newline character and X are fillers
				mybot.sendMessage(message,msg+"\n".repeat(2000-msg.length).replace(/\W$/,"X"),function(error,message){
					console.log(error);
					mybot.deleteMessage(message);
				});
			});
		}
	}
});

mybot.loginWithToken(process.env.DISCORD_TOKEN);

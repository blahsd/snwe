var MPD = require('../');
var mpd = new MPD({
	host : "localhost",
	port : process.env.MPD_PORT
});

mpd.on("ready", function() {
	mpd.add("This song should not exist in your database.mp3", function(err) {
		if(err) {
			console.log("An error occured:");
			console.log(err);
			mpd.disconnect();
		}
	});
});

mpd.connect();

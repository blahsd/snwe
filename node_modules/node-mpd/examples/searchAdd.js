var MPD = require('../');
var mpd = new MPD({
	host : "localhost",
	port : process.env.MPD_PORT
});

mpd.on("ready", function() {
	mpd.searchAdd({
		"artist" : "Metallica",
		"title" : "Battery"
	}, function(err) {
		if(err) {
			console.log("Song could not be added.");
		}
		else {
			console.log("Song was added.");
		}
		mpd.disconnect();
	});
});

mpd.connect();

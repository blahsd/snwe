var MPD = require('../');
var mpd = new MPD({
	host : "localhost",
	port : process.env.MPD_PORT
});

mpd.on("ready", function() {
	console.log(mpd.status);
	console.log(mpd.songs);
	console.log(mpd.playlist);
	mpd.play();
});

mpd.on("update", function(status) {
	console.log("Update:", status);
	switch(status) {
		case "mixer":
		case "player":
		case "options":
			console.log("Status after update", mpd.status);
			break;
		case "playlist":
			console.log("Playlist after update", mpd.playlist);
			break;
		case "database":
			console.log("Songs after update", mpd.songs);
			break;
	}
});

mpd.connect();

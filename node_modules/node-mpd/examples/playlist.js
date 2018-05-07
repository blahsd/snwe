var MPD = require('../');
var mpd = new MPD({
	host : "localhost",
	port : process.env.MPD_PORT
});

mpd.on("ready", function() {
	for(var num = 0; num < mpd.playlist.length; num++) {
		var n = num + 1;
		console.log(n + ": " + mpd.playlist[num].artist + " - " + mpd.playlist[num].title);
	}
	mpd.disconnect();
});



mpd.connect();

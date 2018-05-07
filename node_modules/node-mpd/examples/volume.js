var MPD = require('../');
var mpd = new MPD({
	host : "localhost",
	port : process.env.MPD_PORT
});

mpd.on("ready", function() {
	mpd.volume(30, function(err) {
		console.log(err);
		mpd.disconnect();
	});
});


mpd.connect();

var MPD = require('../');
var mpd = new MPD({
	host : "localhost",
	port : process.env.MPD_PORT
});

function addRandom(i) {
	if(i <= 0) {
		mpd.disconnect();
		return;
	}
	var songs = mpd.songs;
	var song = songs[Math.floor(Math.random() * songs.length)];
	console.log("Adding song " + song.title + "(" + song.file + ")");
	song.add(function() {
		console.log("Song added!");
		addRandom(i - 1);
	});
}

mpd.on("ready", function() {
	addRandom(10);
});

mpd.connect();

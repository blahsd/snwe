var MPD = require('../');
var mpd = new MPD({
	host : "localhost",
	port : process.env.MPD_PORT
});

function addRandom(callback) {
	var songs = mpd.songs;
	var song = songs[Math.floor(Math.random() * songs.length)];
	console.log("Add song " + song.title + "(" + song.file + ")");
	mpd.add(song.file, callback);
}

mpd.on("ready", function() {
	mpd.clear();
	addRandom();
	addRandom();
	addRandom(function() {
		mpd.disconnect();
	});
});

mpd.connect();

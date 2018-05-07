var MPD = require('../');
var mpd = new MPD({
	host : "localhost",
	port : process.env.MPD_PORT
});

function addRandom(callback) {
	var songs = mpd.songs;
	var song = songs[Math.floor(Math.random() * songs.length)];
	console.log("Queued add song " + song.title + "(" + song.file + ")");
	mpd.add(song.file, callback);
}

mpd.on("ready", function() {
	var all = 20;
	var j = 0;
	for(var i = 0; i < all - 1; i++) {
		addRandom(function() {
			j++;
			console.log("Added " + j + "/" + all);
		});
	}
	addRandom(function() {
		console.log("Last one added! Done");
		mpd.disconnect();
	});
});

mpd.connect();

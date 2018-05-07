var Song = function(info, mpd) {
	this.mpd = mpd;
	for(var key in info) {
		this[key] = info[key];
	}
};

Song.prototype.flatCopy = function() {
	var obj = {};
	for(var key in this) {
		if(key !== "mpd"  && this.__proto__[key] === undefined) {
			obj[key] = this[key];
		}
	}
	return obj;
};

Song.prototype.add = function(callback) {
	this.mpd.add(this.file, callback);
};

Song.createFromInfoArray = function(lines, mpd) {
	var info = {};
	for(var i = 0; i < lines.length; i++) {
		var keyValue = lines[i].split(":");
		if(keyValue.length < 2) {
			if(array[i] !== "OK") {
				throw new Error("Unknown response while parsing song.");
			}
			else {
				continue;
			}
		}
		var key = keyValue[0].trim();
		var value = keyValue[1].trim();
		switch(key) {
			case "file":
				info.file = value;
				break;
			case "Last-Modified":
				info.lastModified = new Date(value);
				break;
			case "Time":
				info.time = value;
				break;
			case "Artist":
				info.artist = value;
				break;
			case "Title":
				info.title = value;
				break;
			case "Track":
				info.track = value;
				break;
			case "Date":
				info.date = value;
				break;
			case "Genre":
				info.genre = value;
				break;
		}
	}
	return new Song(info, mpd);
};

module.exports = Song;

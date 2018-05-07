var Socket = require('net').Socket;
var EventEmitter = require("events").EventEmitter;
var Util = require("util");
var Song = require("./song");

if(!String.prototype.trim) {
	(function() {
		// Make sure we trim BOM and NBSP
		var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
		String.prototype.trim = function() {
		return this.replace(rtrim, '');
	};
	})();
}

if(!String.prototype.startsWith) {
	String.prototype.startsWith = function(searchString, position) {
		position = position || 0;
		return this.lastIndexOf(searchString, position) === position;
	};
}

var MPD = function(obj) {
	this.port = obj.port ? obj.port : 6600;
	this.host = obj.host ? obj.host : "localhost";
	this._requests = [];
	this.status = {};
	this.server = {};
	this.playlist = [];
	this.songs = [];
	this.buffer = "";
};

Util.inherits(MPD, EventEmitter);

/*
 * Top Level Methods
 */

MPD.prototype.play = function(callback) {
	this._sendCommand("play", function(r) {
		this._answerCallbackError(r, callback);
	}.bind(this));
};

MPD.prototype.pause = function(callback) {
	this._sendCommand("pause", function(r) {
		this._answerCallbackError(r, callback);
	}.bind(this));
};

MPD.prototype.next = function(callback) {
	this._sendCommand("next", function(r) {
		this._answerCallbackError(r, callback);
	}.bind(this));
};

MPD.prototype.clear = function(callback) {
	this._sendCommand("clear", function(r) {
		this._answerCallbackError(r, callback);
	}.bind(this));
};

MPD.prototype.prev = function(callback) {
	this._sendCommand("prev", function(r) {
		this._answerCallbackError(r, callback);
	}.bind(this));
};

MPD.prototype.toggle = function(callback) {
	this._sendCommand("toggle", function(r) {
		this._answerCallbackError(r, callback);
	}.bind(this));
};

MPD.prototype.updateSongs = function(callback) {
	this._sendCommand("update", function(r) {
		var arr = r.split(/\n/);
		this._answerCallbackError(arr[1], callback);
	}.bind(this));
};

MPD.prototype.add = function(name, callback) {
	this._sendCommand("add", name, function(r) {
		this._answerCallbackError(r, callback);
	}.bind(this));
};

MPD.prototype.volume = function(vol, callback) {
	this._sendCommand("setvol", vol, function(r) {
		this._answerCallbackError(r, callback);
	}.bind(this));
};

MPD.prototype.searchAdd = function(search, callback) {
	var args = ["searchadd"];;
	for(var key in search) {
		args.push(key);
		args.push(search[key]);
	}
	args.push(function(r) {
		this._answerCallbackError(r, callback);
	}.bind(this));
	this._sendCommand.apply(this, args);
}

MPD.prototype._answerCallbackError = function(r, cb) {
	var err = this._checkReturn(r);
	if(cb) {
		cb(err);
	}
	else {
		if(err) {
			throw err;
		}
	}
};

/*
 * Connect and disconnect
 */

MPD.prototype.connect = function() {
	this.client = new Socket();
	this.client.setEncoding('utf8');
	this.commanding = true;
	this.client.connect(this.port, this.host, function() {
		this.client.once('data', this._initialGreeting.bind(this))
	}.bind(this));
};

MPD.prototype.disconnect = function() {
	this.client.destroy();
};

/*
 * Not-so-toplevel methods
 */

MPD.prototype._updatePlaylist = function(callback) {
	this._sendCommand("playlistinfo", function(message) {
		var lines = message.split("\n");
		this.playlist = [];
		var songLines = [];
		var pos;
		for(var i = 0; i < lines.length - 1; i++) {
			var line = lines[i];
			if(i !== 0 && line.startsWith("file:")) {
				this.playlist[pos] = Song.createFromInfoArray(songLines, this);
				songLines = [];
				pos = -1;
			}
			if(line.startsWith("Pos")) {
				pos = parseInt(line.split(":")[1].trim());
			}
			else {
				songLines.push(line);
			}
		}
		if(songLines.length !== 0 && pos !== -1) {
			this.playlist[pos] = Song.createFromInfoArray(songLines, this);
		}
		var err = this._checkReturn(lines[lines.length - 1]);
		if(err) { throw err; }
		if(callback) {
			callback(this.playlist);
		}
	}.bind(this));
};

MPD.prototype._updateSongs = function(callback) {
	this._sendCommand("listallinfo", function(message) {
		var lines = message.split("\n");

		this.songs = [];
		var songLines = [];
		for(var i = 0; i < lines.length - 1; i++) {
			var line = lines[i];
			if(i !== 0 && line.startsWith("file:")) {
				this.songs.push(Song.createFromInfoArray(songLines, this));
				songLines = [];
			}
			songLines.push(line);
		}
		if(songLines.length !== 0) {
			this.songs.push(Song.createFromInfoArray(songLines, this));
		}
		var err = this._checkReturn(lines[lines.length - 1]);
		if(err) { throw err; }
		if(callback) {
			callback(this.songs);
		}
	}.bind(this));
};

MPD.prototype.updateStatus = function(callback) {
	this._sendCommand("status", function(message) {
		var array = message.split("\n");
		for(var i in array) {
			var keyValue = array[i].split(":");
			if(keyValue.length < 2) {
				if(array[i] !== "OK") {
					throw new Error("Unknown response while fetching status.");
				}
				else {
					continue;
				}
			}
			var key = keyValue[0].trim();
			var value = keyValue[1].trim();
			switch(key) {
				case "volume":
					this.status.volume = parseFloat(value.replace("%", "")) / 100;
					break;
				case "repeat":
					this.status.repeat = (value === "1");
					break;
				case "single":
					this.status.single = (value === "1");
					break;
				case "consume":
					this.status.consume = (value === "1");
					break;
				case "playlistlength":
					this.status.playlistlength = parseInt(value);
					break;
				case "state":
					this.status.state = value;
					break;
				case "song":
					this.status.song = parseInt(value);
					break;
				case "time":
					this.status.time = {
						elapsed : parseInt(keyValue[1]),
						length : parseInt(keyValue[2])
					};
					break;
				case "bitrate":
					this.status.bitrate = parseInt(value);
					break;
			}
		}
		if(callback) {
			callback(this.status, this.server);
		}
	}.bind(this));
};

/*
 * Idle handling
 */

MPD.prototype._onMessage = function(message) {
	var match;
	if(!(match = message.match(/changed:\s*(.*?)\s+OK/))) {
		throw new Error("Received unknown message during idle: " + message);
	}
	this._enterIdle();
	var updated = match[1];
	var afterUpdate = function() {
		this.emit("update", updated);
	}.bind(this);
	switch(updated) {
		case "mixer":
		case "player":
		case "options":
			this.updateStatus(afterUpdate);
			break;
		case "playlist":
			this._updatePlaylist(afterUpdate);
			break;
		case "database":
			this._updateSongs(afterUpdate);
			break;
	};
};

/*
 * Message handling
 */

MPD.prototype._initialGreeting = function(message) {
	//console.log("Got initial greeting: " + message);
	var m;
	if(m = message.match(/OK\s(.*?)\s((:?[0-9]|\.))/)) {
		this.server.name = m[1];
		this.server.version = m[2];
	}
	else {
		throw new Error("Unknown values while receiving initial greeting");
	}
	this._enterIdle();
	this.client.on('data', this._onData.bind(this));
	//this._enterIdle();
	var refreshPlaylist = function() {
		this._updatePlaylist(this._setReady.bind(this));
	}.bind(this);
	var refreshDatabase = function() {
		this._updateSongs(refreshPlaylist);
	}.bind(this);
	var refreshStatus = function() {
		this.updateStatus(refreshDatabase);
	}.bind(this);
	refreshStatus();
};

MPD.prototype._setReady = function() {
	this.emit('ready', this.status, this.server);
};

function findReturn(message) {
	var arr;
	var rOk = /OK(?:\n|$)/g;
	var rAck = /ACK\s*\[\d*\@\d*]\s*\{.*?\}\s*.*?(?:$|\n)/g;
	if(arr = rOk.exec(message)) {
		return arr.index + arr[0].length;
	}
	else if(arr = rAck.exec(message)) {
		return arr.index + arr[0].length;
	}
	else return -1;
}

MPD.prototype._onData = function(message) {
	if(!message) {
		message = "";
	}
	message = message.trim();
	//console.log("RECV: " + message);
	if(this.idling || this.commanding) {
		this.buffer += message;
		var index;
		if((index = findReturn(this.buffer)) !== -1) { // We found a return mark
			var string = this.buffer.substring(0, index).trim();
			this.buffer = this.buffer.substring(index, this.buffer.length);
			//console.log("PARSED: " + string);
			//console.log("Message returned: " + string);
			if(this.idling) {
				this._onMessage(string);
			}
			else if(this.commanding) {
				//console.log("onData response for: \"" + message + "\"");
				this._handleResponse(string);
			}
		}
		//else console.log("Doesn't have return: " + this.buffer);
	}
};

MPD.prototype._checkReturn = function(msg) {
	if(msg !== "OK") {
		return new Error("Non okay return status: \"" + msg + "\"");
	}
};

/*
 * Idling
 */

MPD.prototype._enterIdle = function(callback) {
	this.idling = true;
	this.commanding = false;
	this._write("idle");
};

MPD.prototype._leaveIdle = function(callback) {
	this.idling = false;
	this.client.once("data", function(message) {
		//this._checkReturn(message.trim());
		this.commanding = true;
		callback();
	}.bind(this));
	this._write("noidle");
};

MPD.prototype._checkIdle = function() {
	//console.log(this._requests.length + " pending requests");
	if(!this._activeListener && this._requests.length == 0 && !this.idling) {
		//console.log("No more requests, entering idle.");
		this._enterIdle();
	}
};

/*
 * Sending messages
 */

MPD.prototype._checkOutgoing = function() {
	var request;
	if(this._activeListener || this.busy) {
		//console.log("No deque as active listener.");
		return;
	}
	if(request = this._requests.shift()) {
		//console.log("Pending deque, leaving idle.");
		this.busy = true;
		var deque = function() {
			//console.log("Dequed.");
			this._activeListener = request.callback;
			this.busy = false;
			this._write(request.message);
		}.bind(this);
		if(this.idling) {
			this._leaveIdle(deque);
		}
		else {
			deque();
		}
	}
};

MPD.prototype._sendCommand = function() {
	var cmd = "", args = "", callback;
	if(arguments.length == 0) {
		return;
	}
	if(arguments.length >= 1) {
		cmd = arguments[0];
	}
	if(arguments.length >= 2) {
		callback = arguments[arguments.length - 1];
	}
	for(var i = 1; i < arguments.length -1; i++) {
		args += " \"" + arguments[i] + "\" ";
	}
	if(!callback) {
		callback = function() { };
	}
	this._send(cmd + args, callback);
};

MPD.prototype._send = function(message, callback) {
	this._requests.push({
		message : message,
		callback : callback
	});
	//console.log("Enqueued: " + message, ", " + this._requests.length + " pending");
	this._checkOutgoing();
};

MPD.prototype._handleResponse = function(message) {
	var callback;
	//console.log("Handling response: \"" + message + "\" active listener is " + this._activeListener);
	if(callback = this._activeListener) {
		this._activeListener = null;
		this._checkOutgoing();
		//console.log("Checking idle as message was sucessfully answered.");
		this._checkIdle();
		callback(message);
	}
};

MPD.prototype._write = function(text) {
	//console.log("SEND: " + text);
	this.client.write(text + "\n");
};
module.exports = MPD;

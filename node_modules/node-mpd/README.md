node-mpd
========

node-mpd is a library for simple communicating with a [music player daemon](http://www.musicpd.org/).
It uses a TCP-socket to communicate with the daemon and provides a list of highlevel methods.

Make sure to take a look at the [examples](https://github.com/Prior99/node-mpd/tree/master/examples).

Example
------
This is a minimal exmaple which connects to a mpd running on localhost on the default port and prints the current playlist:

	var MPD = require('node-mpd');
	var mpd = new MPD();

```javascript
	mpd.on("ready", function() {
		for(var num = 0; num < mpd.playlist.length; num++) {
			var n = num + 1;
			console.log(n + ": " + mpd.playlist[num].artist + " - " + mpd.playlist[num].title);
		}
		mpd.disconnect();
	});
```
	
Make sure to take a look at the [examples](https://github.com/Prior99/node-mpd/tree/master/examples).

License
-------
Copyright 2015 Frederick Gnodtke
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

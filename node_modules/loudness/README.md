# node-loudness

A node.js library to control the systems output volume

## Usage

The library currently has support for four simple async functions. The volume is specified as an integer between 0 and 100 (inc.).

```javascript
var loudness = require('loudness');

loudness.setVolume(45, function (err) {
    // Done
});

loudness.getVolume(function (err, vol) {
    // vol = 45
});

loudness.setMuted(false, function (err) {
    // Done
});

loudness.getMuted(function (err, mute) {
    // mute = false
});
```

## OS Support

Currently Mac OS X and Linux (ALSA) is supported, please send a pull requests if you are using another setup.

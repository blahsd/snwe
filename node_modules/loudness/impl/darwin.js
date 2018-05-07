
var spawn = require('child_process').spawn;

var osascript = function (cmd, cb) {

  var ret = '';
  var err = null;
  var p = spawn('osascript', ['-e', cmd]);

  p.stdout.on('data', function (data) {
    ret += data;
  });

  p.stderr.on('data', function (data) {
    err = new Error('Apple Script Error: ' + data);
  });

  p.on('close', function () {
    cb(err, ret.trim());
  });

};

module.exports.getVolume = function (cb) {
  osascript('output volume of (get volume settings)', function (err, vol) {
    if(err) {
      cb(err);
    } else {
      cb(null, parseInt(vol, 10));
    }
  });
};

module.exports.setVolume = function (val, cb) {
  osascript('set volume output volume ' + val, function (err) {
    cb(err);
  });
};

module.exports.getMuted = function (cb) {
  osascript('output muted of (get volume settings)', function (err, mute) {
    if(err) {
      cb(err);
    } else {
      cb(null, (mute === 'true'));
    }
  });
};

module.exports.setMuted = function (val, cb) {
  osascript('set volume ' + (val?'with':'without') + ' output muted', function (err) {
    cb(err);
  });
};

'use strict';

const fs = require('fs');

exports.exists = function(file) {
  try {
    fs.statSync(file);
    return true;
  } catch (err) {
    if (err.code === 'ENOENT') {
      return false;
    }
  }
};

exports.sync = function(file, object) {
  fs.writeFileSync(file, JSON.stringify(object));
};

exports.search = function(object, key) {
  let path = key.split('.');
  for(let i = 0; i < path.length; i++) {
    if(object[path[i]] === undefined) {
      return undefined;
    }
    object = object[path[i]];
  }
  return object;
};

exports.set = function(object, key) {
  let path = key.split('.');
  for(var i = 0; i < path.length - 1; ++i) {
    if(!object[path[i]]) {
      object[path[i]] = {};
    }
    object = object[path[i]];
  }
  return function(object, attribute) {
    return function(value) { object[attribute] = value; };
  } (object, path[i]);
};

exports.remove = function(object, key) {
  let path = key.split('.');
  for(var i = 0; i < path.length - 1; ++i) {
    if(!object[path[i]]) {
      object[path[i]] = {};
    }
    object = object[path[i]];
  }
  return function(object, attribute) {
    return function() { delete object[attribute]; };
  } (object, path[i]);
};

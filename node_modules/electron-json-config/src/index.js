'use strict';

const u = require('./utils.js');
const fs = require('fs');
const electron = require('electron');
const file = (electron.app || electron.remote.app).getPath('userData')+'/config.json';

let config = {};


(electron.app || electron.remote.app).on('ready', () => {
  if(!u.exists(file)) {
    fs.writeFileSync(file, '{}');
  }

  config = JSON.parse(fs.readFileSync(file));
});


exports.file = function() {
  return file;
};

exports.has = function(key) {
  return u.search(config, key) !== undefined;
};

exports.set = function(key, value) {
  u.set(config, key)(value);
  u.sync(file, config);
};

exports.setBulk = function(items) {
  for (let key in items) {
    u.set(config, key)(items[key]);
  }
  u.sync(file, config);
};

exports.get = function(key, defaultValue)  {
  const value = u.search(config, key);
  return value === undefined ? defaultValue : value;
};

exports.keys = function(key) {
  return Object.keys((key) ? u.search(config, key) : config);
};

exports.all = function() {
  return config;
};

exports.delete = function(key) {
  u.remove(config, key)();
  u.sync(file, config);
};

exports.deleteBulk = function(keys) {
  for (let key of keys) {
    u.remove(config, key)();
  }
  u.sync(file, config);
};

exports.purge = function() {
  config = {};
  u.sync(file, config);
};

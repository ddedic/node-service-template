'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var conf = {
  dbName: 'myDb',
  host: 'localhost',
  user: '',
  password: '',
  port: 27017,

  getURI: function getURI() {
    var port = conf.port ? ':' + conf.port : '';
    var login = conf.user ? conf.user + ':' + conf.password + ':@' : '';
    return 'mongodb://' + login + conf.host + port + '/' + conf.dbName;
  }
};

exports.default = conf;
import { assert } from 'chai';
import request from 'request';
import mongoose from 'mongoose';
import _ from 'lodash';
import http from 'http';
import app from '../../app';
import dbConf from '../../config/data/db';
import DBConnector from '../../config/db';

// TODO: Tenodi - Express' controllers should be mocked:
// https://www.terlici.com/2015/09/21/node-express-controller-testing.html

describe('Things API', function () {
  const SERVER_URI = 'http://127.0.0.1:3000';
  const thing = {
    name: 'Thing',
    info: 'Info about thing',
    active: true,
  };

  // Set test database
  dbConf.dbName = 'myTestDb';
  const dbConnector = new DBConnector(dbConf);

  function makePUT(clientThing, cb) {
    request({
      method: 'PUT',
      uri: `${SERVER_URI}/things/${clientThing.id.toString()}`,
      json: true,
      body: clientThing,
    }, function (error, response) {
      assert.isNull(error, 'Server responded with error');
      assert.equal(response.statusCode, 200, 'Server did not respond with 200');
      cb();
    });
  }

  before(function (done) {
    // Connect to database
    dbConnector.connect((err) => {
      if (err) {
        throw err;
      }

      // Create HTTP server.
      const port = app.get('port');
      const server = http.createServer(app);

      // Event listener for HTTP server "error" event.
      server.on('error', (error) => {
        throw error;
      });

      server.listen(port, () => {
        done();
      });
    });
  });

  it('reads resources on GET /things', function (done) {
    request({
      method: 'GET',
      uri: `${SERVER_URI}/things`,
    }, function (error, response) {
      assert.isNull(error, 'Server responded with error');
      assert.strictEqual(response.statusCode, 200, 'Server did not respond with 200');
      done();
    });
  });

  it('creates resource on POST /things', function (done) {
    request({
      method: 'POST',
      uri: `${SERVER_URI}/things`,
      json: true,
      body: thing,
    }, function (error, response, body) {
      const serverThing = _.pick(body, 'name', 'info', 'active');

      assert.isNull(error, 'Server responded with error');
      assert.equal(response.statusCode, 201, 'Server did not respond with 200');
      assert.isObject(serverThing, 'Server did not return thing');
      assert.deepEqual(serverThing, thing);
      done();
    });
  });

  it('creates resource on PUT /things/:id', function (done) {
    thing.id = new mongoose.Types.ObjectId().toString();
    makePUT(thing, done);
  });

  it('creates resource on PUT and reads that resource on GET', function (done) {
    thing.id = new mongoose.Types.ObjectId().toString();

    makePUT(thing, function () {
      request({
        method: 'GET',
        uri: `${SERVER_URI}/things/${thing.id.toString()}`,
      }, function (err, res, body) {
        const serverThing = _.pick(JSON.parse(body), 'name', 'info', 'active');
        const clientThing = _.pick(thing, 'name', 'info', 'active');

        assert.isNull(err, 'Server responded with error');
        assert.equal(res.statusCode, 200, 'Server did not respond with 200');
        assert.deepEqual(serverThing, clientThing);
        done();
      });
    });
  });

  it('creates resource on PUT and deletes that resource on DELETE', function (done) {
    thing.id = new mongoose.Types.ObjectId().toString();

    makePUT(thing, function () {
      request({
        method: 'DELETE',
        uri: `${SERVER_URI}/things/${thing.id.toString()}`,
      }, function (error, response) {
        assert.isNull(error, 'Server responded with error');
        assert.equal(response.statusCode, 204, 'Server did not respond with 204');
        done();
      });
    });
  });

  after(function (done) {
    dbConnector.dropDB(() => {
      dbConnector.disconnect(done);
    });
  });
});

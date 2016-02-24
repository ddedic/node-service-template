import { assert } from 'chai';
import request from 'request';
import mongoose from 'mongoose';
import _ from 'lodash';

describe('Things API', function () {
  const SERVER_URI = 'http://127.0.0.1:3000';
  const thing = {
    name: 'Thing',
    info: 'Info about thing',
    active: true,
  };
  const thingWithId = {
    id: mongoose.Types.ObjectId().toString(),
    name: 'Thing',
    info: 'Info about thing',
    active: true,
  };

  before(function () {
    // Connect to server
    require('../../../build/bin/www');
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
      assert.equal(response.statusCode, 200, 'Server did not respond with 200');
      assert.isObject(serverThing, 'Server did not return thing');
      assert.deepEqual(serverThing, thing);
      done();
    });
  });

  it('create resource on PUT /things/:id', function (done) {
    request({
      method: 'PUT',
      uri: `${SERVER_URI}/things/${thingWithId.id.toString()}`,
      json: true,
      body: thingWithId,
    }, function (error, response) {

      assert.isNull(error, 'Server responded with error');
      assert.equal(response.statusCode, 200, 'Server did not respond with 200');
      done();
    });
  });

  it('reads saved resource on GET /things/:id', function (done) {
    request({
      method: 'GET',
      uri: `${SERVER_URI}/things/${thingWithId.id.toString()}`,
    }, function (error, response, body) {

      const serverThing = _.pick(JSON.parse(body), 'name', 'info', 'active');

      assert.isNull(error, 'Server responded with error');
      assert.equal(response.statusCode, 200, 'Server did not respond with 200');
      assert.deepEqual(serverThing, thing);
      done();
    });
  });

  it('deletes resource on DELETE /things/:id', function (done) {
    request({
      method: 'DELETE',
      uri: `${SERVER_URI}/things/${thingWithId.id.toString()}`,
    }, function (error, response, body) {

      assert.isNull(error, 'Server responded with error');
      assert.equal(response.statusCode, 204, 'Server did not respond with 204');
      done();
    });
  });
});



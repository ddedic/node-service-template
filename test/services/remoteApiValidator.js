import { assert } from 'chai';
import sinon from 'sinon';
import RemoteApiValidator from '../../services/remoteApiValidator';
import authClient from '../../services/authClient';

describe('Remote API Validator', function () {
  const msg = 'Ok';
  const mockedPayload = {
    something: 'something',
  };

  before(function () {
    sinon.stub(authClient.prototype, 'verifyToken', () => msg);
  });

  after(function () {
    sinon.restore();
  });

  it('calls auth client and returns its value', function (done) {
    assert.equal(msg, RemoteApiValidator.authenticate(mockedPayload));
    done();
  });
});

import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import AuthClient from '../../services/authClient';
import authConfig from '../../config/auth';
import nock from 'nock';

chai.use(chaiAsPromised);
const assert = chai.assert;

describe('Authentication Client', function () {
  const authClient = new AuthClient(authConfig.authService.url);
  const mockedPayload = {
    iss: 'shoutem',
    sub: 'user:12345',
    usr: 'user@shoutem.com',
    iat: 123635256,
    rlm: 'app-builder',
    acl: {
      'user:1234/*': ['read'],
      'user:1234/agency:1/application:1-5/*': ['write'],
      'user:1234/agency:1/application:552255/*': ['read', 'write'],
      'user:1234/agency:1/application:*/*': ['read'],
    },
    vsi: {
      typ: 'v',
      v: 12345,
    },
  };

  // Don't specify `done` argument in callback function if using promises
  it('returns error on empty payload', function () {
    return assert.isRejected(authClient.verifyToken({}), 'AuthClient did not reject empty.');
  });

  it('verifies good token', function () {
    nock(authConfig.authService.url).post('/v1/validate-auth-token').reply(200, '');
    return assert.isFulfilled(authClient.verifyToken(mockedPayload),
      'AuthClient rejected good payload.');
  });

  it('rejects bad token', function () {
    nock(authConfig.authService.url).post('/v1/validate-auth-token').reply(400, '');
    return assert.isRejected(authClient.verifyToken(mockedPayload),
      'AuthClient did not reject bad payload.');
  });
});

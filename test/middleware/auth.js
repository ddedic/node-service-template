import { assert } from 'chai';
import rewire from 'rewire';
import authConfig from '../../config/auth';

describe('Auth Middleware', function () {
  const verifyContentJWT = rewire('../../middleware/auth').__get__('verifyContentJWT');
  const goodJWTPayload = {
    iss: authConfig.jwt.iss,
    rlm: authConfig.jwt.rlm,
    sub: `${authConfig.jwt.subTypes[0]}:`,
  };

  it('rejects bad issuer in payload', function () {
    const badIssuerPayload = Object.assign({}, goodJWTPayload, {
      iss: '123',
    });
    assert.isNotNull(verifyContentJWT(badIssuerPayload), 'There was no error');
  });

  it('rejects bad issuer in payload', function () {
    const badRealmPayload = Object.assign({}, goodJWTPayload, {
      rlm: '123',
    });
    assert.isNotNull(verifyContentJWT(badRealmPayload), 'There was no error');
  });

  it('rejects bad subject type', function () {
    const badSubjectPayload = Object.assign({}, goodJWTPayload, {
      sub: '123',
    });
    assert.isNotNull(verifyContentJWT(badSubjectPayload), 'There was no error');
  });

  it('accepts good payload', function () {
    assert.isNull(verifyContentJWT(goodJWTPayload), 'There was error');
  });
});
